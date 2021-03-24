window.EFFECT = (function () {
  "use strict";

  const isArrayLike = (obj) =>
    obj != null && typeof obj[Symbol.iterator] === "function";
  const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;
  const randomArrayItemSelect = (array) =>
    array[Math.floor(Math.random() * array.length)];
  const chunkIntoN = (arr, n) => {
    const size = Math.ceil(arr.length / n);
    return Array.from({ length: n }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const randomHexColorCode = () =>
    `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;

  const exception_style = ["font-size", "opacity"];

  const TYPE = {
    default: "ani_default",
    reverse: "ani_reverse",
    rotate: "ani_subRotate",
    opacity: "ani_opacity",
  };

  /**
   * 배열 데이터를 산정하는 함수
   * @param {*} o 배열 리스트
   * @param {*} correction 범위지정값의 오차범위값
   * @returns
   */

  function selectArrayValue(o, correction = 50) {
    if (isArrayLike(o)) {
      switch (o.length) {
        case 1:
          return o[0];
        case 2:
          return randomNumberInRange(o[0] - correction, o[1] + correction);
        default:
          return randomArrayItemSelect(o);
      }
    } else {
      return o;
    }
  }

  /**
   * 위치를 산정하는 함수
   * -1 : 전체화먄에서 한곳
   * -2 : 반대쪽끝
   * -3 : 중앙
   * -4 : 전채2배중 1곳
   * @param {*} pos 원하는 포지션값 (-1 = 모든위치 내에서 한 장소)
   * @param {*} clientSize 윈하는 위치 (-1이 아닐경우 무시되는 값)
   * @returns
   */
  function getLocationValue(pos, clientSize) {
    if (pos === -1) {
      // 전체의 렌덤
      const randPoint = Math.random() * clientSize;
      return randPoint;
    } else if (pos === -2) {
      // 반대편끝
      return clientSize;
    } else if (pos === -3) {
      //중앙
      return clientSize / 2;
    } else if (pos === -4) {
      // 전채의 2절반
      const pos = clientSize / 2;
      return Math.random() * (clientSize * 2) - pos;
    } else {
      return selectArrayValue(pos);
    }
  }

  /**
   * 이동 경로 가중치 연산
   * @param {*} weigths 가중치
   */
  function getLocationSpeed(weigths) {
    let weg = [];
    for (let i = 1; i < weigths.length; i++) {
      weg.push(parseFloat((weigths[i] - weigths[i - 1]).toFixed(5)));
    }
    const weigth = parseFloat((1 / weg.length).toFixed(5));
    console.log(weigth, weg);
    weg = weg.map((o) => (o == 0 ? 0 : (o + (o > 0 ? -weigth : weigth)) * 10));
    return weg;
  }

  /**
   * 프레임 조작 디폴트 함수
   * @param {*} frame 현재 오브젝트의 프레임 값
   * @param {*} style 해당하는 오브젝트가 가지고 있는 스타일 정보
   * @returns 진행해야하는 프레임값
   */
  Effect.prototype.ani_default = function (frame, style) {
    return frame;
  };

  Effect.prototype.ani_reverse = function (frame, style) {
    frame = style.frameSize - (frame + 1);
    if (frame < 0) return 0;
    return frame;
  };

  // Effect.prototype.ani_curve = function (frame, style) {
  //   const index = style.frameSize - (frame + 1);
  //   if (index < 0) return 0;
  //   return index;
  // };

  Effect.prototype.ani_subRotate = function (frame, style) {
    const { subStyle } = style;
    if (!subStyle.init_ani_subRotate) {
      subStyle.init_ani_subRotate = true;
      subStyle.rotateP = selectArrayValue(subStyle.rotateP, 0);
      subStyle.rotate = randomNumberInRange(0, 360);
      subStyle.rotateV = subStyle.rotateP > 0 ? 0 : 360;
    }
    let index = subStyle.rotate + subStyle.rotateP;
    style.transform = `rotate(${index}deg)`;
    if (index > 360 || index < 0) {
      subStyle.rotate = subStyle.rotateV;
    } else if (index < 0) {
    } else {
      subStyle.rotate = index;
    }
    return frame;
  };

  Effect.prototype.ani_opacity = function (frame, style) {
    const { subStyle } = style;
    if (!subStyle.init_ani_opacity) {
      subStyle.init_ani_opacity = true;
      if (isArrayLike(subStyle.opacity_animation_time)) {
        subStyle.opacity_location = getLocationSpeed(
          subStyle.opacity_animation_time
        );
        if (style.frameSize > subStyle.opacity_animation_location.length) {
          subStyle.opacity_count = Math.floor(
            style.frameSize / console.log(subStyle)
          );
          subStyle.opacity_size = style.frameSize;
        } else {
          subStyle.opacity_count = Math.floor(
            subStyle.opacity_animation_location.length / console.log(subStyle)
          );
          subStyle.opacity_size = subStyle.opacity_animation_location.length;
        }
      } else {
        subStyle.opacityP = 0;
        subStyle.opacity = subStyle.opacity_animation_time;
      }
      subStyle.opacity_frame_count = 0; // 고정적인 프레임
      subStyle.opacity_frame = 0; // 프레임 카운터
    }

    if (!subStyle.opacity_size) {
      return frame;
    }
    subStyle.opacity_frame_count++;
    subStyle.opacity_frame;

    return frame;
  };

  function Effect(cfg) {
    this.elements = [];
    this.isPlaying = false;
    this.size = cfg.size || [10, 30];
    this.count = cfg.count || 10;
    this.target = cfg.target || document.body;
    this.text = cfg.text || "&#10052";
    this.color = cfg.color || "#FFFFFF";
    this.position = "absolute";
    this.speed = cfg.speed || [1, 1]; //프레임당 이동거리
    this.delay = cfg.delay || [1, 100];
    this.animationType = cfg.animationType || [0, 1]; // 에니메이션 효과
    this.animationFunction = cfg.animationFunction || "default";
    this.resize = cfg.resize || false; // 화면 업데이트 여부
    this.subStyle = cfg.subStyle || {}; // 보조 변경 옵션
    this.location = cfg.location || [-1, -1, [-200, 200], [-200, 200]];
    this.isBodyScroll = cfg.isBodyScroll || false;
  }

  function init() {
    const uuid = `effect-${this.uuid()}`; // 아이디 생성
    this.uuid = uuid;

    this.rootObject = document.createElement("div"); //루트
    this.rootObject.classList.add(uuid);
    this.target.appendChild(this.rootObject);
    this.rootObject.setAttribute(
      "style",
      "width:100%;height:100%;margin:0;padding:0;overflow:hidden"
    );

    console.log(`Create new Effect ${uuid}`);

    this.rootStyle = document.createElement("style"); //루트 스타일
    this.rootStyle.classList.add(`style-${uuid}`);
    document.head.appendChild(this.rootStyle);
    this.styleUpdate(); // 스타일 업데이트

    for (let i = 0; i < this.count; i++) {
      this.flake();
    }
    return this;
  }

  /**
   * 고유아이디 생성 uuid
   * @returns
   */
  Effect.prototype.uuid = function () {
    const e = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return `${e()}-${e()}${e()}${e()}`;
  };

  Effect.prototype.styleUpdate = function () {
    this.default_style = this.default_style || Object.keys(document.body.style);
    const style_key = Object.keys(this).filter((o) =>
      this.default_style.includes(o)
    );

    this.style = {};
    style_key.forEach((o) => {
      this.style[o] = this[o];
    }); // 스타일 맵핑

    const style = Object.keys(this.style)
      .map((o) => `${o}:${this[o]}`)
      .join(";");
    const body_option = this.isBodyScroll ? "body{overflow:hidden}" : "";
    this.rootStyle.innerHTML = `.${this.uuid}.flake{${style}} ${body_option}`;
    return this;
  };

  Effect.prototype.changeCount = function (count = -1) {
    if (count > 0) {
      this.count = count;
    }

    if (this.count != this.elements.length) {
      if (this.elements.length > this.count) {
        count = this.elements.length - this.count;
        for (let i = 0; i < count; i++) {
          const { element, style } = this.elements.pop();
          this.rootObject.removeChild(element);
        }
      } else {
        count = this.count - this.elements.length;
        for (let i = 0; i < count; i++) {
          this.flake();
        }
      }
    }
  };

  Effect.prototype.css = function (tag, value) {
    if (arguments.length == 1) {
      return this.style[tag];
    }

    this.style[tag] = value;
    this.styleUpdate();
    return this;
  };

  /**
   * 엘리먼트 전용 저장함수 (차차...)
   * @returns
   */
  Effect.prototype.data = function () {
    const a = arguments,
      b = a.length;
    if (!(b - 1)) return this.rootObject.getAttribute("data-" + a[0]);
    else this.rootObject.setAttribute("data-" + a[0], a[1]);
    return this;
  };

  /**
   * 엘리먼트 생성
   *
   * 엘리먼트 출발지 목적지 산정방식
   * location : [출발x,출발y,도착x,도착y];
   *
   * 전제조건
   *    출발x,y값은 array/integer 로 지정
   *    출발x,y값이 음수(-1)일경우, 시작포인트는 화면(뷰) 사이즈에서 렌덤포인트로 지정됨.
   *    출발x,y값이 array값이 지정되었을 경우, array범위 내에서 적용됨 (항목 길이가 2 이상일 경우,
   *        해당 배열의 값들 중에서 선별되어 지정됨)
   *
   *    도착x,y값이 음수(-)일 경우, 시작포인트에서 해당 죄표만큼 이동한 값으로 지정
   *    도착x,y값이 음수(-1)일경우, 도착포인트는 화면(뷰) 사이즈에서 렌덤포인트로 지정됨.
   *    도착x,y값이 array값이 지정되었을 경우, array범위 내에서 적용됨 (항목 길이가 2 이상일 경우,
   *        해당 배열의 값들 중에서 선별되어 지정됨)
   *
   * 엘리먼트 속도 산정방식
   * speed : speed | [x,y] | [x,[1~y]] | [[1~x],y] | [[1~x],[1~y]] | [function,function]
   *
   * 전제조건
   *    5가지 방식을 모두 처리하며, 각각 x,y의 프레임별 이동 거리 산정방식
   *    거리 산정방식에 의하여 각 프레임별 이동 거리와 이동 속도를 미리 연산시킴
   *
   */
  Effect.prototype.flake = function (index = -1) {
    let obj;
    let style = {};
    if (index === -1) {
      obj = document.createElement("div");

      this.rootObject.appendChild(obj);
      obj.classList.add(this.uuid);
      obj.classList.add("flake");
      obj.innerHTML =
        typeof this.text === "string"
          ? this.text
          : randomArrayItemSelect(this.text);

      // 이미지 포함여부 검사 - 이미지가 존재할 경우 조절을 해 줘야 함
      if (obj.childNodes.length) {
        const img_size = selectArrayValue(this.size, -1);
        obj.childNodes.forEach((e) => {
          if (e.tagName && ["img", "svg"].includes(e.tagName.toLowerCase())) {
            e.setAttribute(
              "style",
              `width: ${img_size}ex;height:${img_size}ex`
            );
          }
        });
      }
    } else {
      const element = this.elements[index];
      obj = element.element;
      style = element.style;
    }

    if (typeof this.color !== "string") {
      style.color = randomArrayItemSelect(this.color);
      if (style.color === -1) {
        style.color = randomHexColorCode();
      }
    } else {
      style.color = this.color;
    }

    const {
      documentElement: { clientWidth, clientHeight },
    } = document;
    const define_location = [-1, -1, -200, -200];
    for (let i = this.location.length; i < 4; i++) {
      this.location[i] = define_location[i];
    }

    const pos = this.location.map((o, i) =>
      getLocationValue(o, i % 2 ? clientHeight : clientWidth)
    );

    if (isArrayLike(this.location[2])) {
      // x좌표
      if (this.location[2].length == 2 && this.location[2][0] < 0) {
        const value = randomNumberInRange(
          this.location[2][0],
          this.location[2][1]
        ); // 값 선택
        pos[2] = pos[0] + value;
      }
    } else if (this.location[2] == -5) {
      // 위치고정
      pos[2] = pos[0];
    }
    if (isArrayLike(this.location[3])) {
      // y좌표
      if (this.location[3].length == 2 && this.location[3][0] < 0) {
        const value = randomNumberInRange(
          this.location[3][0],
          this.location[3][1]
        ); // 값 선택
        pos[3] = pos[1] + value;
      }
    } else if (this.location[3] == -5) {
      // 위치고정
      pos[3] = pos[1];
    }

    // 속도 연산
    let speeds = this.speed;
    if (isArrayLike(speeds)) {
      let x = selectArrayValue(speeds[0] || 1);
      let y = selectArrayValue(speeds[1] || 1);
      speeds = [x, y];
    } else {
      // 정수일경우
      speeds = [speeds, speeds];
    }

    const location = { x: [], y: [] };
    // 위치 미리 연산
    speeds.forEach((o, i) => {
      const loc = [Math.min(pos[i], pos[i + 2]), Math.max(pos[i], pos[i + 2])];
      if (!o) return; // 움직임 없음
      let postion = o > 0 ? loc[0] : loc[1];
      const target = o > 0 ? loc[1] : loc[0]; // 목표
      const lo = i % 2 ? "y" : "x";

      //   console.log(postion, target, pos, loc, lo);
      do {
        location[lo].push(postion);
        postion += o;
      } while (postion < target);
      if (pos[i] > pos[i + 2]) location[lo] = location[lo].reverse();
    });

    const delay = Math.floor(selectArrayValue(this.delay));

    const frameSize = Math.max(location.x.length, location.y.length); // 최대 프레임 크기
    const frameSleep =
      frameSize / Math.min(location.x.length, location.y.length); // 건너뛰어야 하는 시간

    style["font-size"] = `${selectArrayValue(this.size, 0)}px`; // 폰트크기
    style.animationFunction = this.animationFunction; // 프레임 조작
    style.animationType = this.animationType; // 에니메이션 옵션
    style.subStyle = Object.assign({}, this.subStyle); // 보조 옵션
    style.init = pos;
    style.left = `${pos[0]}px`; //x
    style.top = `${pos[1]}px`; // y
    style.speed = speeds;
    style.frame = 0;
    style.delay = delay;
    style.location = location;
    style.frameSize = frameSize;
    style.frameSleep = frameSleep;
    style.frameTarget = location.x.length == frameSize ? "x" : "y";
    style.frameNTarget = location.x.length == frameSize ? "y" : "x";

    // console.log(style);

    // style.location;
    // style.delay;
    // style.frameSize;
    // style.frameSleep;

    const attribute = Object.keys(style)
      .filter(
        (o) => this.default_style.includes(o) || exception_style.includes(o)
      )
      .map((o) => `${o}:${style[o]}`)
      .join(";");
    obj.setAttribute("style", attribute);

    let element;
    if (index === -1) {
      element = { element: obj, style };
      index = this.elements.push(element);
    }

    return { element, index };
  };

  Effect.prototype.move = function () {
    this.elements.forEach((o) => {
      const { element, style } = o;
      const {
        delay,
        location,
        frameSize,
        frameTarget,
        frameNTarget,
        animationFunction, // 애니메이션 조작 함수
      } = style;
      let frame = style.frame;

      style.frame += 1; // 프레임카운트 증가
      if (delay > frame) {
        return;
      }

      frame = frame - delay;

      // console.log(animationFunction);
      /**
       * 프레임 연산 - 프레임 동작방식 혹은 프레임 자연스러운 처리를 위한 데이터 조작
       */

      if (frameSize <= frame) {
        style.frame = 0;
      } else {
        if (animationFunction && typeof animationFunction === "string") {
          frame = this[TYPE[animationFunction]](frame, style); // 프레임 연산
        } else if (animationFunction) {
          animationFunction.forEach((o) => {
            frame = this[TYPE[o]](frame, style);
          });
        }
        // 프레임이 진행중
        style[
          frameTarget === "x" ? "left" : "top"
        ] = `${location[frameTarget][frame]}px`;
        // 매인프레임
        const index = Math.floor(frame / style.frameSleep);
        style[
          frameNTarget === "x" ? "left" : "top"
        ] = `${location[frameNTarget][index]}px`;
        // 보조 프레임

        // console.log(location, frameTarget, frameNTarget);
      }
      const attribute = Object.keys(style)
        .filter(
          (o) => this.default_style.includes(o) || exception_style.includes(o)
        )
        .map((o) => `${o}:${style[o]}`)
        .join(";");
      element.setAttribute("style", attribute);
    });
  };

  /**
   * 애니메이션 루프
   */
  Effect.prototype.loop = function () {
    this.move();
    if (this.isPlaying) {
      requestAnimationFrame(this.loop.bind(this));
    }
  };

  Effect.prototype.start = function () {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.loop();
    }
    return this;
  };

  Effect.prototype.stop = function () {
    if (this.isPlaying) {
      this.isPlaying = false;
    }
    return this;
  };

  return function (cfg) {
    const effect = new Effect(cfg || {});
    init.call(effect).start();
    console.log(effect);
    return effect;
  };
})();
