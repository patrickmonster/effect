function randomItem(a){return a[Math.floor(Math.random()*a.length)]};
let width=1920,height=1080;
window.oauth_redirect_uri = "https://patrickmonster.github.io/tgd/twitch/tts.html";//리다이렉션
window.channelname = getParams("channel");

if(!window.channelname){
  // document.write("잘못된 접근");return;
  window.channelname="neocats_"
}
window.chatClientE = new chatClient({channel:window.channelname});
window.chatClientE.open();
window.chatClientE.time=1000
window.chatClientE.queue={};
window.chatClientE.queueTimer={};
window.chatClientE.onEmotes = function(url,length){
  if(!window.chatClientE.queueTimer[url]){
    window.chatClientE.queue[url]=length;
    window.chatClientE.queueTimer[url]=setTimeout(window.chatClientE.onShow,window.chatClientE.time,url);
  }else window.chatClientE.queue[url]+=length;
};
window.chatClientE.onShow=function(url){
  window.chatClientE.queueTimer[url]=0;
  let length=window.chatClientE.queue[url];
  if(length>=10)length=10;
  const imgElement=new Image();
  setup();
  imgElement.onload=()=>{
    window.chatClientE.emotes.push(new Emote(imgElement,width*(0.005*length),window.chatClientE.mod));//이미지 개수만큼//야발 옵션값 잘 봐야한다.
  };
  imgElement.src=url;
  window.chatClientE.queue[url]=0;
}
window.chatClientE.mods={};
window.chatClientE.mod="1";
window.chatClientE.onCommand=function(comm,parsed){
  if("이모트".indexOf(comm[0])!=-1)//이모트 전용 명령
    window.chatClientE.mod=comm[1];
};
function getParams(name, address = window.location.href) {
 let url;
 let results = "";
 url = new URL(address);
 if (typeof url.searchParams === 'undefined') {
	 results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(address);
	 if (results == null) {
		 return null;
	 } else {
		 return decodeURI(results[1])||0;
	 }
 } else {
	 return url.searchParams.get(name);
 }
}

function setup(){
  if(window.chatClientE.canvas)return;
  window.chatClientE.canvas = document.querySelector("#canvas");
  window.chatClientE.ctx=window.chatClientE.canvas.getContext("2d");
  window.chatClientE.emotes=[];
  width=1920;
  height=1080;
  loop();
}

const loop = () => {
  window.chatClientE.ctx.clearRect(0, 0, 1920, 1080);
  window.chatClientE.emotes.forEach(emote=>{
    emote.draw();
    emote.update();
  });
  window.chatClientE.emotes = window.chatClientE.emotes.filter(emote=>!emote.shouldBeDeleted);
  requestAnimationFrame(loop);
};
let f={"top":function(){
    this.x = Math.random() * width;
    this.y=height+this.height;
    this.speed = Math.random() * height * 0.01 + height * 0.001;
    this.update=()=>{
      this.y -= this.speed;
      this.shouldBeDeleted = -this.height > this.y;
    };
    this.draw=()=>{
      let x=this.x,y=this.y;
      window.chatClientE.ctx.drawImage(this.element, x, y, this.width, this.height);
    }
  },"bottom":function(){
    this.x = Math.random() * width;
    this.y=-this.height;
    this.speed = Math.random() * width * 0.01 + width * 0.0005;
    this.update=()=>{
      this.y += this.speed;
      this.shouldBeDeleted = height < (this.y + this.height);
    };
    this.draw=()=>{
      let x=this.x,y=this.y;
      window.chatClientE.ctx.drawImage(this.element, x, y, this.width, this.height);
    }
  },"!":function(){
    this.a = -Math.random() * 0.005 - 0.0002;
    this.b = Math.random() * height * 0.4 + height * 0.6;
    this.offset = Math.sqrt(Math.abs(this.b / this.a));
    this.x = -this.offset;
    this.speed = Math.random() * width * 0.002 +  width * 0.0005;
    this.update=()=>{
      this.x += this.speed;
      this.shouldBeDeleted = this.x > this.offset;
    };
    this.draw=()=>{
      if(!this.height)
        this.shouldBeDeleted=true;
      let x = this.x + this.offset;
      let y = height - (this.a * Math.pow(this.x, 2) + this.b)
      window.chatClientE.ctx.drawImage(this.element, x, y, this.width, this.height);
    }
  },//end list
};
class Emote {
  constructor(element,size,op) {
    this.element = element;
    this.height = size;
    this.width = size * element.width / element.height;
    console.log(Object.keys(f).indexOf(op),op);
    if(Object.keys(f).indexOf(op)==-1)
      op=window.chatClientE.mod=Object.keys(f)[0];
    f[op].call(this);
    // switch (op) {
      // case "route"://해당 위치까지 이동
      //
      //   break;
      // case "fireworks":
      //   this.x = Math.random() * width;
      //   this.y=height+this.height;
      //   this.isBoom=false;
      //   this.opacity=1;
      //   this.boomPoint=Math.random() * height + height*0.5;
      //   this.offset=Math.max(this.width,this.height)/100;//증가값
      //   this.speed = Math.random() * height * 0.01 + height * 0.001;
      //   this.update=()=>{
      //     this.y-=this.speed;
      //     if(this.y < this.boomPoint && !this.isBoom){
      //       console.log("폭팔");
      //       this.point=this.y;// 폭팔 장소
      //       this.isBoom = true;// 폭팔
      //     }
      //     if(this.isBoom){// 폭팔 이벤트 연산
      //       if(this.opacity > 0.01)
      //         this.opacity-=0.01;
      //     }
      //     this.shouldBeDeleted = 0 > this.y;
      //     if(this.shouldBeDeleted)this.onBoom();
      //   };
      //   this.onBoom=()=>{// 폭팔이벤트
      //
      //   }
      //   this.draw=(x,y)=>{
      //     if(!y){
      //       x=this.x;
      //       y=this.y;
      //     }
      //     if(this.isBoom){
      //       window.chatClientE.ctx.globalAlpha=this.opacity+"";
      //       window.chatClientE.ctx.drawImage(this.element, x, this.point, this.width, this.height);//현재위치
      //       window.chatClientE.ctx.globalAlpha="1";
      //     }else
      //       window.chatClientE.ctx.drawImage(this.element, x, y, this.width, this.height);
      //   }
      //   break;
    // }
    this.shouldBeDeleted = false;
  }
}
