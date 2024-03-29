window.oauth_client_id = "g1rhyzp1s7y2d755xqjn1otspdgvc3";

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


function getData() {
	let follow = document.getElementById("follow_count");
	console.log("업데이트");
  
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