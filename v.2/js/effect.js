
Element.prototype.createElement=Element.prototype.C=function(ele){var ele=document.createElement(ele);this.appendChild(ele);return ele};
window.addScript=document.addScript=function(){var a=arguments,b=a.length,c=0;for(;c<b;c++)document.head.C("script").src=a[c]};
window.addLink=document.addLink=function(){var a=arguments,b=a.length,c=0;for(;c<b;c++)document.head.C("link").src=a[c]};
window.addStyle=document.addStyle=function(){var a=arguments,b=a.length,c=0;for(;c<b;c++)document.head.C('style').innerHTML=a[c]};
(function($) {
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-158025067-2');
$.fn.effect = function(options) {
  var randArray=(a)=>{return a[Math.floor(Math.random() * a.length)]},
    defaults = {
        minSize: 10,maxSize: 50,
        documentWidth:()=>{return document.documentElement.clientWidth},
        documentHeight:()=>{return document.documentElement.clientHeight},
        target:"body",
        text:'&#10052',
        direction:"top",
        transform:"",
        color: "#fff",
        time:300,anitime:1000,glitter:false,//애니메이션
        startOpacity:1,endOpacity:.2,
        move_direction:"left",move:200,//흔들림 방향
        delay:10000,speed:10,func:false,anitiming:"linear",
        count:10,loop:true
    },isPlay = true,
    options=$.extend({},defaults,options),
    $flake=$('<div id="flake" />').css({'position':'absolute',color:options.color}).html(options.text);
    $(options.target).css({"transform":options.transform})
    if(options.glitter)$flake.css("animation",options.glitter+" "+options.anitime+"s infinite")
    for(var i=0;i<options.count;i++){
      var obj=$flake.clone().appendTo(options.target).css("font-size",options.minSize+Math.random()*options.maxSize);
      if(typeof options.text=="object")
        obj.html(randArray(options.text))
      else obj.html(options.text);
      (function(o,d,s,e,f){
          var r="";
          if(["rand"].indexOf(d.direction)!=-1){
              // var pos_rand=(option)=>{
              //   var istop=Boolean(Math.round(Math.random()));//탑값 렌덤?
              //   console.log(istop);
              //   return [option["document"+(istop?"Width":"Height")]()*Math.random(),
              //     option["document"+(istop?"Width":"Height")]()*Math.random(),istop?"top":"left"];
              // };
              r="top";
              s.left=options.documentWidth()*d.x*.01;
              s.top=options.documentHeight()*d.y*.01;
              d.func=function(d,r,s,e){
                //var op=pos_rand(options);
                e.top=options.documentWidth()*Math.random();
                e.left=options.documentWidth()*Math.random();
              };
          }else if(["fine_movement","none"].indexOf(d.direction)!=-1){
            r="top";
            if(["top","bottom"].indexOf(d["move_direction"])!=-1)r="left";
            if(!d.func)
              d.func=function(d,r,s,e){
                var wp=Math.random()*options.documentWidth();
                s[r]=Math.random()*options.documentHeight();
                s[d["move_direction"]]=wp;
                if(d.direction!="none")
                  e[d["move_direction"]]=wp+(options.move*Boolean(Math.round(Math.random())));
              };
          }else if(["top","bottom"].indexOf(d.direction)!=-1)r="left";
          else if(["left","right"].indexOf(d.direction)!=-1)r="top";
          s[d.direction]=s.pos;
          if(d.direction=="top")
            e[d.direction]=e.pos;
          else e[d.direction]=options.documentWidth()+10;
          if(!d.func)
            d.func=function(d,r,s,e){
              s[r]=(Math.random()*options.documentWidth())+(d.move==200?0:d.move);
              e[r]=s[r]+Math.random()*d.move;
            };
          if(r)d.func(d,r,s,e);
          f=()=>{
            (typeof d.func=="function")&&d.func(d,r,s,e);
            d.loop?
              o.css(s).
              animate({opacity:options.startOpacity},d.time,d.anitiming).
              animate(e,options.documentHeight()*d.speed+Math.random() * 1000,d.anitiming).delay(Math.random()*d.delay).
              animate({opacity:options.endOpacity},d.time,d.anitiming,f):0;
            return function(){isplay=false;$(o).remove()}};
          return f;
      })(obj,options,{
          pos:-1*(options.maxSize+50),opacity:0,
      },{pos:options.documentHeight()+10})();
    }
  return function(){isPlay=false};
};
})(jQuery);
