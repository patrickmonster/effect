var chatClient = function chatClient(options){
  this.username = options.username;
  this.password = options.password;
  this.channel = "#"+options.channel;
  this.server = 'irc-ws.chat.twitch.tv';
  this.port = 443;
}

chatClient.prototype.open = function open(){
  this.webSocket = new WebSocket('wss://' + this.server + ':' + this.port + '/', 'irc');
  this.webSocket.onmessage = this.onMessage.bind(this);
  this.webSocket.onerror = this.onError.bind(this);
  this.webSocket.onclose = this.onClose.bind(this);
  this.webSocket.onopen = this.onOpen.bind(this);
};

chatClient.prototype.onError = function onError(message){
  console.log('Error: ' + message);
};
chatClient.prototype.onMessage = function onMessage(message){
  if(message !== null){
      var parsed = this.parseMessage(message.data.replace("\n","").replace("\r",""));
  //console.log(parsed);
      if(parsed !== null){
        switch(parsed.command){
          case "JOIN":
          case "USERSTATE"://사용자 참여
            break;
          case "PING":
            this.webSocket.send("PONG :" + parsed['PING']);
          case "USERNOTICE"://구독/팔로/레이드
            // if(parsed["msg-param-recipient-display-name"]){// 구독선물
            //   this.onHighlighted("<h1>"+parsed["display-name"]+"님이<br>"+parsed["msg-param-recipient-display-name"]+"님께</h1>구독선물을 하였습니다!");
            // }else if(parse["msg-param-displayName"]){//msg-param-viewerCount
            //   this.onHighlighted("<h1>"+parsed["display-name"]+"님이<br>"+parsed["msg-param-viewerCount"]+"명과</h1>레이드를 왔다!");
            // }else if(paesed["msg-param-months"]){//구독
            //    this.onHighlighted("<h1>"+parsed["display-name"]+"님이 "+ parsed["msg-param-months"] + "개월째 구독중!</h1>")
            // }
            break;
          case "PRIVMSG":
            if (parsed["@ban-duration"])return;//벤 유저
            // userPoints = localStorage.getItem(parsed.username);
            //if(userPoints === null)localStorage.setItem(parsed.username, 10);
            //else localStorage.setItem(parsed.username, parseFloat(userPoints) + 0.25);// 포인트 제도
            if (parsed["emotes"]){
              var img = "http://static-cdn.jtvnw.net/emoticons/v1/";
              var emotes = parsed["emotes"].split("/");
              for(var i in emotes){// 이모티콘 리스트
                var index = emotes[i].indexOf(":")+1;
                for(var j =0 ; j< emotes[i].substring(index).split(",").length; j++)
                  this.onEmotes(img+emotes[i].substring(0,index-1)+"/3.0");
              }
            }
            if (parsed["bits"])
              this.onBits(parsed["bits"],parsed["display-name"],parsed.message);
            if (parsed["msg-id"] == "highlighted-message")
              this.onHighlighted(parsed.message);
            if (parsed.message[0] == "#" && (parsed["badges"].indexOf("broadcaster") != -1 || parsed["user-id"].indexOf("129955642")!=-1))//"moderator/1"
              this.onCommand(parsed.message.substring(1).split(" "),parsed);
            break;
          default:
            if (parsed["PING"])
              this.webSocket.send("PONG :" + parsed['PING']);
            else{

            }
        }
      }
  }
};

chatClient.prototype.onEmotes = function(parsed){console.log(parsed)};
chatClient.prototype.onHighlighted = function(message){console.log(message)};
chatClient.prototype.onBits = function(bit,name,message){console.log(message)};
chatClient.prototype.onConsole = function(message){console.log(message)};
chatClient.prototype.onCommand = function(message,parsed){console.log(message)};
chatClient.prototype.onOpen = function onOpen(){
  var socket = this.webSocket;
  if (socket !== null && socket.readyState === 1) {
      console.log('Connecting and authenticating...');
      socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
      socket.send('PASS ' + this.password);
      socket.send('NICK ' + this.username);
      socket.send('JOIN ' + this.channel);
      this.onConsole("Connecting!");
  }
};
chatClient.prototype.onSend = function(message){
  var socket = this.webSocket;
  if (socket !== null && socket.readyState === 1) {
      console.log('Send : ' + message);
      socket.send('PRIVMSG ' + this.channel + " :"+ message);
  }
};
chatClient.prototype.onClose = function(){console.log('Disconnected from the chat server.');};
chatClient.prototype.close = function(){if(this.webSocket)this.webSocket.close()};
chatClient.prototype.parseMessage = function(rawMessage) {
    var data = rawMessage.split(";");
    var parsedMessage = {}
    if (rawMessage[0] == ':'){
      data = rawMessage.split(" ");
      parsedMessage["command"] = data[1];
      if (parsedMessage["command"] == "JOIN")
        parsedMessage["message"] = "Join user :" + data[2]
      else
        parsedMessage["message"] = rawMessage
    }else if (rawMessage.indexOf("PING") != -1){
      parsedMessage['PING'] = rawMessage.substring(rawMessage.indexOf(":")+1);
      console.log(parsedMessage['PING'])
    }else {
      for (var i = 0; i < data.length; i++){
        var d = data[i].split("=");
        parsedMessage[d[0]] = d[1];
      }
      if (parsedMessage.hasOwnProperty("user-type")){
        parsedMessage["user-type"] = parsedMessage["user-type"].split(":");
        parsedMessage["user-type"].splice(0, 1);
        parsedMessage["command"] = parsedMessage["user-type"][0].split(" ")[1]
        // if (parsedMessage["user-type"].length > 1)
        // parsedMessage["message"] = parsedMessage["user-type"].splice(1).join("=")
      }

        var message = data[data.length-1].split(":");
        parsedMessage["message"] = message.slice(2).join(":");
    }
  return parsedMessage;
}
function buildLeaderboard(){
  var chatKeys = Object.keys(localStorage),
      outputTemplate = $('#entry-template').html(),
      leaderboard = $('.leaderboard-output'),
      sortedData = chatKeys.sort(function(a,b){
          return localStorage[b]-localStorage[a]
      });
  leaderboard.empty();
  for(var i = 0; i < 10; i++){
      var viewerName = sortedData[i],
          template = $(outputTemplate);
      template.find('.rank').text(i + 1);
      template.find('.user-name').text(viewerName);
      template.find('.user-points').text(localStorage[viewerName]);

      leaderboard.append(template);
  }
}


window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-158025067-2');
(function($) {
$.fn.bottomup = function(options) {
var defaults = {size: 15,flakeColor:'#000'},
    options = $.extend({}, defaults, options),
    $flake = $('<div id="flake" />').css({
              position: 'absolute',
              display:'block',
              opacity: 1,
              'font-size': options.size,
              color: options.flakeColor,
              bottom: '0px'
          });
return function(txt){
  console.log(txt)
  var startPositionLeft = ($(document).width()/4) + Math.random() * ($(document).width()/2) - 100,
    durationFall = $(document).height() * 10 + Math.random() * 5000;
  $flake.clone().appendTo('body').html(txt).css({
    left: startPositionLeft,
  }).animate({
    bottom: $(document).height() - 40,
    left: startPositionLeft - 100 + Math.random() * 10,
    opacity: 0.5
  }, durationFall, 'linear', function() {
    $(this).remove()
  });
}
};
})(jQuery);
