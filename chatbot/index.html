<!doctype html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <title>Leaderboards</title>
		<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-158025067-2"></script> -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
		<script src="https://patrickmonster.github.io/effect/js/effect.js" charset="utf-8"></script>
		 <script src="chatbot.js"></script>
	<style>

*{
	margin: 0px;
	background-color:#0000;
}
body{
	width:100%;/*1920px;*/
	height:100%;/*1080px;*/
  overflow:hidden;
	text-align:center;
}
img{
	width: 4vh;
	height: 4vh;
}
#flake{
	overflow:hidden;
}
@keyframes heartbeat {
    0% { transform: scale(0); }
    70% { transform: scale(1); }
    100% { transform: scale(0); }
}
@keyframes opacity_obj {
    0% {opacity:0}
    70% {opacity:1}
    100% {opacity:0}
}
	</style>
</head>
<body>
    <script>

function randomItem(a) {
  return a[Math.floor(Math.random() * a.length)];
}
var eff = null,option;
$(document).ready(function(){
	var qury = document.location.href.split("?")[1];
	if (!qury){
		document.body.style.background = "#000";// 로드 안함
		list = [28,301396363,301396373,301396453,301205415,301396357,301396406]
		var ele = $.fn.bottomup();
		setInterval(function(){
			ele('<image src="https://static-cdn.jtvnw.net/emoticons/v1/'+randomItem(list)+'/1.0">');
		},2000);
		return;
	}
	var o = qury.split("&"),options = {},effects = [];
	for(var i in o){
		var j = o[i].indexOf("=");// = 가 시작하는 포인터
		options[o[i].substring(0,j)] = o[i].substring(j+1);
	}
	options = $.extend({}, {count:1},options)
	window.chatClient = new chatClient(options);
	option = JSON.parse(localStorage.getItem(options.username));
	if(!option){
		option = {minSize: 10,maxSize: 30,newOn: 300,html:'&#10052',rocking:true,glitter:false,anitime:.5,speed:10,direction:"top",flakeColor: "#FFFFFF",leftMove:200,maxEmote:3};
		localStorage.setItem(options.username,JSON.stringify(option));
	}else {eff = $.fn.effect(option)}
	localStorage.setItem(options.username,JSON.stringify(option));//기록 리셋 방지
	window.chatClient.open();
	window.chatClient.console = $.fn.bottomup(options);
	window.chatClient.onEmotes=function(url){this.onConsole({html:'<img src="'+url+'">'})};
	window.chatClient.onHighlighted=function(message){window.chatClient.console(message)};
	window.chatClient.onConsole=function(message){for(var i=0;i<option.maxEmote;i+=1)window.chatClient.console(message['html'])};
	window.chatClient.webSocket.onclose =function(){window.chatClient.console("연결재요청!");setTimeout(function(){window.chatClient.open()},100)};
	window.chatClient.onBits= function(bit,name,message){
		var str2 = message.replace(/(.{20})/g,"$1<br>")
		window.chatClient.console("<h1>"+name+"님 "+bit+"비트후원</h1>" + str2);
	};
	window.chatClient.onCommand =function(message){
		if(message[0].indexOf("레봇") != -1)
			this.onSend("화면 이펙트용으로 구성된 네오캣짱(rsj1120)님 노예입니다!(스트리머 오버레이에서 동작중...)");
		else if(message[0].indexOf("?") != -1){
			if (message.length <= 1)
				this.onSend("?:help/effect:설정할수 있는 옵션/option:옵션/(on/off):이펙트/re:화면 리로드/discord:디스코드방(업데이트/이펙트확인용)/reset:봇 초기화");
		}else if(message[0].indexOf("ef") != -1){
			if (message.length <= 1)
				this.onSend("옵션값 설명: #ef [옵션]");
			else{
				switch (message[1]) {
					case "minSize":this.onSend("#ef "+message[1]+"최대 이펙트 크기(int)");break;
					case "maxSize":this.onSend("#ef "+message[1]+"최소 이펙트 크기(int)");break;
					case "newOn":this.onSend("#ef "+message[1]+"갱신되는 개수(int/ms)");break;
					case "html":this.onSend("#ef "+message[1]+"출력될 이펙트(text)");break;
					case "rocking":this.onSend("#ef "+message[1]+"좌우 흔들림(bool)");break;
					case "glitter":this.onSend("#ef "+message[1]+"(opacity_obj/heartbeat/false)");break;
					case "anitime":this.onSend("#ef "+message[1]+"glitter옵션길이(int/ms)");break;
					case "speed":this.onSend("#ef "+message[1]+"떨어지는 속도(int/px)");break;
					case "direction":this.onSend("#ef "+message[1]+"위치(top/bottom/left/right/none)");break;
					case "flakeColor":this.onSend("#ef "+message[1]+"이펙트 색상(#000)");break;
					case "leftMove":this.onSend("#ef "+message[1]+"좌측 기울기(int/px)");break;
					case "maxEmote":this.onSend("#ef "+message[1]+"이모티콘 개수(옵션값 * 개수)");break;
					default:this.onSend("옵션이 존재하지 않음!");break;
				}
			}
		}else if(message[0].indexOf("off") != -1){//
			this.onSend("이펙트가 꺼짐");
			try {eff()}catch(e){;}
		}else if(message[0].indexOf("on") != -1){
			this.onSend("이펙트가 켜짐");
			try {eff()}catch(e){;}
			eff = $.fn.effect(option);
		}else if(message[0].indexOf("op") != -1){
			if (message.length <= 1)
				this.onSend("옵션값:" + Object.keys(option).join("/"));
			else if(message.length == 2){
				if(option.hasOwnProperty(message[1]))
					this.onSend("["+message[1]+"] " + option[message[1]]);
				else this.onSend("옵션이 존재하지 않습니다! - " + message[1]);
			}else{
				if(option.hasOwnProperty(message[1])){
					var num = Number(message[2]);
					if (message[1].indexOf("html") != -1)
						message[2] = message.slice(2).join(" ");
					if (message[2].indexOf("false") != -1)
						message[2] = false;
					if(!isNaN(num))
						message[2] = num;
					option[message[1]] = message[2];
					try {eff()}catch(e){;}
					if(message[1].indexOf("flakeColor") != -1)
						window.chatClient.console = $.fn.bottomup(options);
					eff = $.fn.effect(option);
					this.onSend("옵션이 변경되었습니다! ("+message[1]+"):" + message[2]);
					localStorage.setItem(options.username,JSON.stringify(option));
				}else {
					this.onSend("옵션이 존재하지 않습니다! + ");
				}
			}
		}else if(message[0].indexOf("reset") != -1){//리셋
			try {eff()}catch(e){;}
			option = {minSize: 10,maxSize: 30,newOn: 300,html:'&#10052',rocking:true,glitter:false,anitime:.5,speed:10,direction:"top",flakeColor: "#FFFFFF",leftMove:200,maxEmote:3};
			eff = $.fn.effect(option);
			localStorage.setItem(options.username,JSON.stringify(option));
			this.onSend("봇 초기화");
		}else if(message[0].indexOf("discord") != -1){
			this.onSend("discord점gg/Th3a6JE 설명및 등록설정(저작권 관리)");
		}else if(message[0].indexOf("re") != -1){//리셋
			this.onSend("화면을 다시 불러옵니다...");
			setTimeout(function(){
				location.reload();
			},1000);
		}
	};

});
    </script>
</body>
</html>
