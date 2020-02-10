Element.prototype.createElement=Element.prototype.C=function(ele){var ele=document.createElement(ele);this.appendChild(ele);return ele};
window.addScript=document.addScript=function(){var a=arguments,b=a.length,c=0;for(;c<b;c++)document.head.C("script").src=a[c]};
(function($) {
window.addScript("https://www.googletagmanager.com/gtag/js?id=UA-158025067-2");
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-158025067-2');
if ($.fn.effect)return;
$.fn.effect = function(options) {
	var documentHeight = $(document).height(),
			documentWidth = $(document).width(),
			defaults = {
					minSize: 10,
					maxSize: 30,
					target:"body",
					newOn: 300,
					html:'&#10052',
					rocking:true,//흔들
					glitter:false,
					anitime:.5,
					speed:10,
					direction:"top",
					flakeColor: "#FFFFFF",
					leftMove:200
			},isPlay = true,
			options = $.extend({}, defaults, options),
			$flake=$('<div id="flake"/>').html(options.html),
			func=function(){
				if (isPlay)setTimeout(func,options.newOn);
				var startPositionLeft=(Math.random()*documentWidth*(options.leftMove==200?1:1.5))
							+(options.leftMove==200?0:options.leftMove),
						startOpacity=1+Math.random(),
						sizeFlake = options.minSize + Math.random() * options.maxSize,
						endPositionLeft = startPositionLeft - 100 + Math.random() * options.leftMove,
						durationFall = (documentHeight * options.speed) + Math.random() * 1000,
						ele = $flake.clone().appendTo(options.target).css({
								position:"absolute",
								opacity:startOpacity,
								'font-size':sizeFlake,
								color: options.flakeColor
						}),
						sp=((options.direction=="top"||options.direction=="left")?'-50px':documentHeight-10),
						ep=((options.direction=="top"||options.direction=="left")?documentHeight-10:'-50px');
				if (options.glitter)//사용자 애니메이션
					ele.css("animation",options.glitter+" "+options.anitime+"s infinite")
				if(options.direction == "none"){
					ele.css({
						top: (Math.random() * documentWidth*(options.leftMove==200?1:1.5)),
						left:(Math.random() * documentWidth*(options.leftMove==200?1:1.5)),
					}).animate({opacity:.5}, durationFall,'linear',function(){$(this).remove()});
				}else if (options.direction=="top"||options.direction=="bottom"){
					ele.css({
						top: sp,
						left: startPositionLeft-(options.leftMove==200?0:options.leftMove*2),
					}).animate({
							top: ep,
							left: (options.rocking?endPositionLeft:startPositionLeft-(options.leftMove==200?0:options.leftMove*2)),
							opacity: 0.5
					}, durationFall,'linear',function(){$(this).remove()});
				}else{
					ele.css({
						left: sp,
						top: startPositionLeft-(options.leftMove==200?0:options.leftMove*2),
					}).animate({
							left:ep,
							top:(options.rocking?endPositionLeft:startPositionLeft-(options.leftMove==200?0:options.leftMove*2)),
							opacity:.5
					}, durationFall,'linear',function(){$(this).remove()});
				}
			};
	func();
	$(window).resize(function (){
		documentHeight = $(document).height()
		documentWidth = $(document).width()
	});
	return function(){
		isPlay = false
	};
};


$.fn.bottomup = function(options) {//단일모드
  var defaults = {size: 15,flakeColor:'#000'},
      options = $.extend({}, defaults, options),
    	$flake = $('<div id="flake" />').css({
                position: 'absolute',
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
