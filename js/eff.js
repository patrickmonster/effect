(function($) {
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-158025067-2');
/*
1회용이 아닌, 고정개수
*/
$.fn.effect = function(options) {
    var documentHeight = $(document).height(),
        documentWidth = $(document).width(),
        defaults = {
            minSize: 10,maxSize: 50,
            target:"body",
            text:'&#10052',
            direction:"top",
            color: "#FFFFFF",
						startOpacity:1,endOpacity:.2,
						move_direction:"left",move:200,//흔들림 방향
						delay:10000,
						count:50,loop:true
        },isPlay = true,
        options=$.extend({},defaults,options),
        $flake=$('<div id="flake" />').css({'position':'absolute',color:options.color}).html(options.text);
				if(options.glitter)//사용자 애니메이션
					$flake.css("animation",options.glitter+" "+options.anitime+"s infinite")
				for(var i=0;i<options.count;i++){
					var obj=$flake.clone().appendTo(options.target).css("font-size",options.minSize+Math.random()*options.maxSize);
					(function(o,d,s,e,f){
							var r="";
							if(["fine_movement"].indexOf(d.direction)!=-1){
								var wp=Math.random()*documentWidth;
								if(["top","bottom"].indexOf(d["move_direction"])!=-1)r="left";
								else r="top";
								s[r]=Math.random()*documentHeight;s[d["move_direction"]]=wp;
								e[d["move_direction"]]=wp+(options.move*Boolean(Math.round(Math.random())));
								r=false;
							}else if(["top","bottom"].indexOf(d.direction)!=-1)r="left";
							else if(["left","right"].indexOf(d.direction)!=-1)r="top";
							s[d.direction]=s.pos;e[d.direction]=e.pos;
							if(r){
								s[r]=(Math.random()*documentWidth*(d.move==200?1:1.5))+(d.move==200?0:d.move);
								e[r]=s[r]-100+Math.random()*d.move;
							}
							console.log(s);
							console.log(e);
							f=()=>{d.loop?o.css(s).delay(Math.random()*d.delay).animate(e,documentHeight*10+Math.random()*1000,'linear',f):"";return function(){isplay=false;$(o).remove()}};
							return f;
		      })(obj,options,{
							pos:0-(options.maxSize+20),opacity:options.startOpacity,
		      },{pos:documentHeight+10,opacity:options.endOpacity
		      })();
				}
    $(window).resize(function (){
      documentHeight=$(document).height();
      documentWidth=$(document).width();
    });
    return function(){isPlay=false};
  };
})(jQuery);
