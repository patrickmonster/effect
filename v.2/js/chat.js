function makeRandom(min,max){
	return Math.floor(Math.random()*(max-min+1)) + min;
}
var chatClient = function chatClient(options){
	if(!options.password){
		this.password = "SCHMOOPIIE";//익명의 사용자
		this.username = "justinfan"+makeRandom(1,65535);//참고 https://inspect.cool/2018/08/31/twitch/
	}else{
		this.username = options.username;
		this.password = options.password;
	}
	console.log(this.username+"으로 접속시도...");
	this.isMood=false;
  this.channel=options.channel;
  this.server='irc-ws.chat.twitch.tv';
  this.port=options.port?options.port:80;
}
chatClient.prototype.open = function open(){
	this.webSocket = new WebSocket('wss://' + this.server + (this.port==80?'':':'+this.port));
	this.webSocket.onmessage = this.onMessage.bind(this);
	this.webSocket.onerror = this.onError.bind(this);
	this.webSocket.onclose = this.onClose.bind(this);
	this.webSocket.onopen = this.onOpen.bind(this);
};
chatClient.prototype.onOpen = function onOpen(){
	var socket = this.webSocket;
	if (socket !== null && socket.readyState === 1) {
		console.log('Connecting and authenticating...');
		socket.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
		socket.send('PASS ' + this.password);
		socket.send('NICK ' + this.username);
		socket.send('JOIN #' + this.channel);
		this.onConsole("Connecting!");
	}
};
chatClient.prototype.onMessage = function onMessage(message){
  if(message !== null){
	// console.log(message.data);
      var parsed = this.parseMessage(message.data.replace("\n","").replace("\r",""));
      if(parsed !== null){
        switch(parsed.command){
          case "JOIN":
          case "USERSTATE"://사용자 참여
            break;
          case "PING":
            this.webSocket.send("PONG :"+parsed['PING']);
          case "USERNOTICE":
            break;
          case "PRIVMSG":
            if (parsed["@ban-duration"])return;
            if(parsed["user-type"])
              parsed["display-id"]=parsed["user-type"][0].split("!")[0];
            if (parsed["emotes"]){
              var img = "https://static-cdn.jtvnw.net/emoticons/v1/";
              var emotes = parsed["emotes"].split("/");
              for(var i in emotes){
                var index=emotes[i].substring(emotes[i].indexOf(":")+1).split(",");
                this.onEmotes(img+emotes[i].substring(0,index-1)+"/3.0",index.length);
              }
            }
            if (parsed["bits"])
              this.onBits(parsed["bits"],parsed["display-name"],parsed.message);
            if (parsed["msg-id"] == "highlighted-message")
              this.onHighlighted(parsed.message);
            if (parsed.message[0] == "#" && (parsed["badges"].indexOf("broadcaster") != -1 ||
						 	parsed["user-id"].indexOf("129955642")!=-1)||(this.isMood && parsed["badges"].indexOf("mod") != -1))//"moderator/1"
              this.onCommand(parsed.message.substring(1).split(" "),parsed);
						this.onChating(parsed);
            break;
          default:
            if (parsed["PING"])this.webSocket.send("PONG :"+parsed['PING']);
        }
      }
  }
};
chatClient.prototype.onError = function onError(message){console.log('Error: '+message)};
chatClient.prototype.onChating = function(parsed){console.log(parsed)};
chatClient.prototype.onEmotes = function(parsed,count){console.log(parsed)};
chatClient.prototype.onHighlighted = function(message){console.log(message)};
chatClient.prototype.onBits = function(bit,name,message){console.log(message)};
chatClient.prototype.onConsole = function(message){console.log(message)};
chatClient.prototype.onCommand = function(message,parsed){console.log(message)};
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
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)};
gtag('js', new Date());
gtag('config', 'UA-158025067-2');
