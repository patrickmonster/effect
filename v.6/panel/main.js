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
  
  // const client = new tmi.Client({ connection: { reconnect: true, secure: true }, channels : [user_name] });
  // client.on("redeem", function(channel, user, type, tags, msg){
  //   if("highlighted-message" == type){
  //     // 메세지전송
  //     if(window["highlighted-message"])
  //       window["highlighted-message"](tags, message);
  //   }
  // });
  // client.connect().catch(e=>{});//연결  
}
if (!window.user_id) {
  window.user_id = "129955642";
}
// getData();

// window.channelname=getParams("channel")||"neocats_";

function getData() {
  let follow = document.getElementById("follow_count");
  console.log("업데이트");

  setTimeout(getData, 60 * 1000);

  window.broadcast = JSON.parse(getAPI("https://api.twitch.tv/kraken/channels/" + window.user_id));

  // live-viewer
  document.getElementById("live-viewer").innerHTML = numberToKorean(window.broadcast["followers"]);

  document.getElementById("profile-broadcast-img-src-sub").src = window.broadcast["logo"];
  document.getElementById("stream-title").innerHTML =  `${window.broadcast["display_name"]}(${window.broadcast["name"]})`;

}


function numberToKorean(number) {
    const inputNumber = number < 0 ? false : number;
    const unitWords = ["", "K", "M", "G", "T"];
    const splitUnit = 1000;
    const resultArray = [];
    const convert = (n, width) => {
        n += "";
        return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
    };
    for (var i = 0; i < unitWords.length; i++) {
        var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0) {
            resultArray[i] = unitResult;
        }
    }
    if (resultArray.length > 1)
        return ( resultArray[resultArray.length - 1] + "." + convert(resultArray[resultArray.length - 2], 3)[0] + unitWords[resultArray.length - 1]);
    return ( resultArray[resultArray.length - 1] + unitWords[resultArray.length - 1] );
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
