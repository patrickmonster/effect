function getEffect(){
  if(options.hasOwnProperty("color")&&options['color'].indexOf("#")==-1)options["color"]="#"+options["color"];
  if(options.effect=="cherryblossom2"){
    options = $.extend({},{text:['<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-1.png">',
                    '<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-2.png">',
                    '<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-3.png">',
                    '<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-4.png">',
                    '<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-5.png">'],
                    minSize:10,maxSize:20,move_direction:"right",move:300,color:options.color},options)
  }else if(options.effect=="cherryblossom"){//https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-1.png
    options = $.extend({},{text:['<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-1.png">',
                    '<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-2.png">',
                    '<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-6.png">',
                    '<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-7.png">',
                    '<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-8.png">',
                    '<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-9.png">'],
                    minSize:10,maxSize:20,move:-300,color:options.color},options);
  }else if(options.effect=="chocolate"){
    options = $.extend({},{text:['<image src="https://patrickmonster.github.io/tgd/img/cacao.png">',
                    '<image src="https://patrickmonster.github.io/tgd/img/chocolate.png">',
                    '<image src="https://patrickmonster.github.io/tgd/img/chocolate-1.png">',
                    '<image src="https://patrickmonster.github.io/tgd/img/chocolate-box-2.png">',
                    '<image src="https://patrickmonster.github.io/tgd/img/chocolate-chip.png">'],
                    minSize:10,maxSize:20,color:options.color},options);
  }else if (options.effect=="raining"){
    options = $.extend({},{text:"|",move:0,count:10,speed:.1,color:options.color},options)
  }else if(options.effect=="bubbble"){
    options = $.extend({},{text:"○",minSize:10,maxSize:20,direction:"bottom",color:options.color},options)
  }else if(options.effect=="cloud"){
    options = $.extend({},{text:'<i class="fa fa-cloud"></i>',maxSize:10,color:options.color},options)
  }else if(options.effect=="cannabis"){//단풍
    options = $.extend({},{text:'<i class="fas fa-cannabis"></i>',maxSize:15,color:options.color},options)
  }else if(options.effect=="heart"){
    options = $.extend({},{text:['<i class="far fa-heart"></i>',
                              '<i class="fas fa-heart"></i>'],move:-300,color:options.color},options);
  }else if(options.effect=="meteor"){//운석
    options = $.extend({},{text:'<i class="fas fa-meteor"></i>',maxSize:15,move:-1000,color:options.color},options);
  }else if(options.effect=="carrot"){//당근
    options = $.extend({},{text:'<i class="fas fa-carrot"></i>',maxSize:15,color:options.color},options);
  }else if(options.effect=="comment"){//말풍선
    options = $.extend({},{text:['<i class="fas fa-comment"></i>',
                              '<i class="far fa-comment"></i>',
                              '<i class="fas fa-comment-dots"></i>',
                              '<i class="far fa-comment-dots"></i>'],maxSize:15,color:options.color},options);
  }else if(options.effect=="twitch"){//트위치 아이콘
    options = $.extend({},{text:'<i class="fab fa-twitch"></i>',maxSize:15,color:options.color},options);
  }else if(options.effect=="umbrella"){//우산
    options = $.extend({},{text:'<i class="fab fa-twitch"></i>',maxSize:15,color:options.color},options);
  }else if(options.effect=="umbrella-beach"){//파라솔
    options = $.extend({},{text:'<i class="fas fa-umbrella-beach"></i>',maxSize:15,color:options.color},options);
  }else if(options.effect=="star5"){//별
    options = $.extend({},{text:['.'],count:50,speed:1,direction:"none",color:options.color},options);
  }else if(options.effect=="star4"){//별
    options = $.extend({},{text:['.'],count:40,speed:10,direction:"fine_movement",move:100,color:options.color},options);
  }else if(options.effect=="star3"){//별
    options = $.extend({},{text:['<i class="fas fa-splotch"></i>',
                                '<i class="far fa-splotch"></i>'],
                                count:30,speed:10,direction:"fine_movement",move:400,color:options.color},options);
  }else if(options.effect=="star2"){//별
    options = $.extend({},{text:['<i class="fas fa-splotch"></i>',
                                '<i class="far fa-splotch"></i>'],move:-500,speed:10,color:options.color},options);
  }else if(options.effect=="star"){//별
    options = $.extend({},{text:['<i class="fas fa-star"></i>',
                                '<i class="far fa-star"></i>'],
                                direction:"none",speed:.1,count:30,color:options.color},options);
  }else if(options.effect=="cookie"){//쿠키
    options = $.extend({},{text:['<i class="fas fa-cookie"></i>',
                                '<i class="far fa-cookie"></i>',
                                '<i class="fad fa-cookie"></i>'],direction:"bottom",anitime:3,color:options.color},options);
  }else if(options.effect=="bone"){//뼈
    options = $.extend({},{text:['<i class="fas fa-bone"></i>',
                                '<i class="fal fa-bone"></i>',
                                '<i class="fad fa-bone"></i>'],color:options.color},options);
  }else if(options.effect=="pig"){//돼지
    options = $.extend({},{text:['<i class="fas fa-pig"></i>',
                                '<i class="far fa-pig"></i>'],direction:"left",color:options.color},options)
  }else{
    options = $.extend({},{text:['.','&#10052'],maxSize:15,color:options.color},options);
  }
}
