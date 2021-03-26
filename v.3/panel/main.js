Element.prototype.C = function (ele) {
  var ele = document.createElement(ele);
  this.appendChild(ele);
  return ele;
};

window.oauth_client_id = "g1rhyzp1s7y2d755xqjn1otspdgvc3";
window.last_follow = [];
window.user_id = getParams("user-id");
window.user_name = getParams("user-name");
if (window.user_name || !window.user_id) {
  const users = JSON.parse(
    getAPI("https://api.twitch.tv/kraken/users?login=" + window.user_name)
  )["users"];
  if (users.length) {
    window.user_id = users[0]["_id"];
  }
}
if (!window.user_id) {
  window.user_id = "129955642";
}
getData();

/**
 * 방향전환
 * @returns
 */
if (getParams("direction")) {
  const sections = document.getElementsByTagName("section");
  const parent = sections[0].parentNode;
  parent.insertBefore(sections[1], sections[0]);
}

// window.channelname=getParams("channel")||"neocats_";

function getData() {
  let follow = document.getElementById("follow_count");
  console.log("업데이트");

  setTimeout(getData, 60 * 1000);

  window.broadcast = JSON.parse(
    getAPI("https://api.twitch.tv/kraken/channels/" + window.user_id)
  );
  let is = follow.getAttribute("data-follow") == window.broadcast["followers"];

  follow.innerHTML = numberToKorean(window.broadcast["followers"]);

  document.getElementById("profile-broadcast-img-src").src =
    window.broadcast["logo"];
  // document.getElementById("profile-broadcast-img-src-sub").src=window.broadcast["logo"];

  //profile-broadcast-img-src-sub
  document.getElementById("profile-broadcast").innerHTML =
    window.broadcast["display_name"];
  document.getElementById("profile-broadcast-id").innerHTML =
    window.broadcast["name"];

  document.getElementById("stream-title").innerHTML =
    window.broadcast["status"];
  document.getElementById("stream-game").innerHTML = window.broadcast["game"];

  if (is) return; //데이터 변경사항 없음

  follow.setAttribute("data-follow", window.broadcast["followers"]);
  const follows = getFollow().reverse();

  const init_follow = !window.last_follow.length;
  // 새로운 사용자 리스트 필터링
  const newFollows = follows
    .map((o) => o.user)
    .filter((o) => !window.last_follow.includes(o));
  newFollows.forEach((o) => {
    window.last_follow.push(o);
  });

  console.log(newFollows);

  if (!newFollows.length) return; // 새로운 사용자 없음
  const lastUser = follows[follows.length - 1];
  document.getElementById("follow-img").src = lastUser.logo;
  document.getElementById("follow-name").innerHTML = lastUser.name;
}

function getFollow() {
  let follows = JSON.parse(
    getAPI(
      "https://api.twitch.tv/kraken/channels/" + window.user_id + "/follows"
    )
  )["follows"];
  return follows.map((x) => {
    return {
      user: x.user["_id"],
      name: x.user["display_name"],
      logo: x.user.logo,
    };
  });
}

function append_message(user, msg, id, img, isright) {
  console.log(user, msg, img, isright);
  let bord = document
    .getElementById("chatting_bord")
    .getElementsByClassName("message");
  let message = bord[bord.length - 1];
  if (!message || user != message.getAttribute("data-name")) {
    message = document.getElementById("chatting_bord").C("div");
    message.classList.add("message");
    if (isright) message.classList.add("broadcast");
    message.setAttribute("data-name", user);
    let imgE = message.C("img");
    imgE.src = img;
  }
  let ele = message.C("div");
  ele.classList.add("item");
  ele.setAttribute("data-id", id);
  ele = ele.C("div");
  ele.classList.add("text");
  ele.innerHTML = msg;
}
function numberToKorean(number) {
  const inputNumber = number < 0 ? false : number;
  const unitWords = ["", "K", "M", "G", "T"];
  const splitUnit = 1000;
  const resultArray = [];
  const convert = (n, width) => {
    n += "";
    return n.length >= width
      ? n
      : new Array(width - n.length + 1).join("0") + n;
  };
  for (var i = 0; i < unitWords.length; i++) {
    var unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  if (resultArray.length > 1)
    return (
      resultArray[resultArray.length - 1] +
      "." +
      convert(resultArray[resultArray.length - 2], 3)[0] +
      unitWords[resultArray.length - 1]
    );
  return (
    resultArray[resultArray.length - 1] + unitWords[resultArray.length - 1]
  );
}

function getParams(name, address = window.location.href) {
  let url;
  let results = "";
  url = new URL(address);
  if (typeof url.searchParams === "undefined") {
    results = new RegExp("[?&]" + name + "=([^&#]*)").exec(address);
    if (results == null) {
      return null;
    } else {
      return decodeURI(results[1]) || 0;
    }
  } else {
    return url.searchParams.get(name);
  }
}

function getAPI(host) {
  var xmlhttp = new XMLHttpRequest(),
    state = "";
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) state = this.responseText;
  };
  xmlhttp.open("GET", host, false);
  xmlhttp.setRequestHeader("Client-ID", window.oauth_client_id);
  xmlhttp.setRequestHeader("Accept", "application/vnd.twitchtv.v5+json");
  xmlhttp.send();
  return state;
}
