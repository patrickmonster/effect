(function($){
	$.fn.effect_options=function(){
		var options = {};
		if(options.demo)document.addStyle("html{background:#"+options.demo+";}");
		if(qury.hasOwnProperty("color"))options["flakeColor"]="#"+qury["color"];
		if(options.hasOwnProperty("color"))options["flakeColor"]="#"+options["color"];
		if(options.effect=="cherryblossom2"){
			options = $.extend({},{html:['<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-1.png">',
											'<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-2.png">',
											'<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-3.png">',
											'<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-4.png">',
											'<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-5.png">'],
											minSize:10,maxSize:20, newOn: 3000,leftMove:-300},options)
		}else if(options.effect=="cherryblossom"){
			options = $.extend({},{html:['<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-1.png">',
											'<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-2.png">',
											'<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-6.png">',
											'<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-7.png">',
											'<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-8.png">',
											'<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-9.png">'],
											minSize:10,maxSize:20, newOn: 3000,leftMove:-300},options);
		}else if(options.effect=="chocolate"){
			options = $.extend({},{html:['<image src="https://patrickmonster.github.io/tgd/img/cacao.png">',
											'<image src="https://patrickmonster.github.io/tgd/img/chocolate.png">',
											'<image src="https://patrickmonster.github.io/tgd/img/chocolate-1.png">',
											'<image src="https://patrickmonster.github.io/tgd/img/chocolate-box-2.png">',
											'<image src="https://patrickmonster.github.io/tgd/img/chocolate-chip.png">'],
											minSize:10,maxSize:20, newOn: 3000},options);
		}else if (options.effect=="raining"){
			options = $.extend({},{html:"|",rocking:false,newOn:500,speed:.5},options)
		}else if(options.effect=="bubbble"){
			options = $.extend({},{html:"○",minSize:10,maxSize:20,direction:"bottom",speed:10, newOn:500},options)
		}else if(options.effect=="cloud"){
			options = $.extend({},{html:'<i class="fa fa-cloud"></i>',maxSize:20},options)
		}else if(options.effect=="cannabis"){//단풍
			options = $.extend({},{html:'<i class="fas fa-cannabis"></i>',newOn:500,maxSize:15},options)
		}else if(options.effect=="heart"){
			options = $.extend({},{html:['<i class="far fa-heart"></i>',
										'<i class="fas fa-heart"></i>'],leftMove:-300},options);
		}else if(options.effect=="meteor"){//운석
			options = $.extend({},{html:'<i class="fas fa-meteor"></i>',maxSize:15,leftMove:-1000},options);
		}else if(options.effect=="carrot"){//당근
			options = $.extend({},{html:'<i class="fas fa-carrot"></i>',maxSize:15},options);
		}else if(options.effect=="comment"){//말풍선
			options = $.extend({},{html:['<i class="fas fa-comment"></i>',
										'<i class="far fa-comment"></i>',
										'<i class="fas fa-comment-dots"></i>',
										'<i class="far fa-comment-dots"></i>'],maxSize:15,newOn: 900},options);
		}else if(options.effect=="twitch"){//트위치 아이콘
			options = $.extend({},{html:'<i class="fab fa-twitch"></i>',maxSize:15,newOn: 900},options);
		}else if(options.effect=="umbrella"){//우산
			options = $.extend({},{html:'<i class="fab fa-twitch"></i>',maxSize:15,newOn: 900},options);
		}else if(options.effect=="umbrella-beach"){//파라솔
			options = $.extend({},{html:'<i class="fas fa-umbrella-beach"></i>',maxSize:15,leftMove:-1000},options);
		}else if(options.effect=="sparkles"){//반짝임
			options = $.extend({},{html:['<i class="fas fa-sparkles"></i>'], glitter:"opacity_obj",direction:"none",anitime:3,newOn:1000},options);
		}else if(options.effect=="star3"){//별
			options = $.extend({},{html:['<i class="fas fa-splotch"></i>',
										'<i class="far fa-splotch"></i>'],
										newOn:3000,speed:10,direction:"fine_movement",leftMove:400,
										speed:20},options);
		}else if(options.effect=="star2"){//별
			options = $.extend({},{html:['<i class="fas fa-splotch"></i>',
										'<i class="far fa-splotch"></i>'],leftMove:-500,newOn:1000,speed:10},options);
		}else if(options.effect=="star"){//별
			options = $.extend({},{html:['<i class="fas fa-star"></i>',
										'<i class="far fa-star"></i>'], glitter:"opacity_obj",direction:"none",anitime:3,newOn:3000},options);
		}else if(options.effect=="cookie"){//쿠키
			options = $.extend({},{html:['<i class="fas fa-cookie"></i>',
										'<i class="far fa-cookie"></i>',
										'<i class="fad fa-cookie"></i>'],direction:"bottom",anitime:3,newOn:3000},options);
		}else if(options.effect=="bone"){//뼈
			options = $.extend({},{html:['<i class="fas fa-bone"></i>',
										'<i class="fal fa-bone"></i>',
										'<i class="fad fa-bone"></i>'],newOn:3000},options);
			//<i class="fas fa-bone"></i>
		}else if(options.effect=="disease"){//별3
			options = $.extend({},{html:['<i class="fas fa-disease"></i>',
										'<i class="far fa-disease"></i>'],direction:"none",newOn:3000},options);
		}else if(options.effect=="pig"){//돼지
			options = $.extend({},{html:['<i class="fas fa-pig"></i>',
										'<i class="far fa-pig"></i>'],direction:"left",newOn:3000},options)
		}else{
			options = $.extend({},{html:['.','&#10052'],maxSize:15},options);
		}
		return options;
	}
})(jQuery);