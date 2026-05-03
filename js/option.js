function getEffect(options) {
  var sub_op = false;
  if (options.hasOwnProperty("color") && options["color"].indexOf("#") == -1)
    options["color"] = "#" + options["color"];
  if (options.effect.indexOf("rand") != -1) {
    options = $.extend({}, options, {
      direction: "rand",
      delay: 0,
      isSdelay: false,
      easing: "swing",
    });
    options.effect = options.effect.replace("rand", "");
  }
  if (options.effect == "315") {
    options = $.extend(
      {},
      {
        text: ".",
        direction: "top",
        count: 60,
        speed: 8,
        move: 0,
        transform:
          " translate(-" +
          document.documentElement.clientWidth / 2 +
          "px, -50px) rotate(315deg)",
        documentHeight: () => {
          return document.documentElement.clientHeight * 2;
        },
      },
      options,
    );
  } else if (options.effect == "macaroon") {
    options = $.extend(
      {},
      {
        text: [
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/706147061380153434/macaron_3.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/706147062466740304/macaron_2.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/706147065050300467/macaron_5.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/706147065574588486/macaron_1.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/706147068980232266/macaron_4.png">',
        ],
        minSize: 10,
        maxSize: 20,
        move_direction: "right",
        move: 300,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "cherryblossom3") {
    options = $.extend(
      {},
      {
        text: [
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/697740099907092520/sakura_posom-6.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/697740103770046514/sakura_posom-1.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/697740104541798418/sakura_posom-8.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/697740104822947890/sakura_posom-2.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/697740101962170429/sakura_posom-7.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/697740105929982092/sakura_posom-3.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/697740107993841664/sakura_posom-4.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/697740109289750528/sakura_posom-5.png">',
        ],
        minSize: 10,
        maxSize: 20,
        move_direction: "right",
        move: 300,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "cherryblossom2") {
    options = $.extend(
      {},
      {
        text: [
          '<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-1.png">',
          '<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-2.png">',
          '<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-3.png">',
          '<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-4.png">',
          '<image src="https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-5.png">',
        ],
        minSize: 10,
        maxSize: 20,
        move_direction: "right",
        move: 300,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "cherryblossom") {
    //https://patrickmonster.github.io/tgd/img/cherryblossom/%EB%B2%9A%EA%BD%831-1.png
    options = $.extend(
      {},
      {
        text: [
          '<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-1.png">',
          '<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-2.png">',
          '<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-6.png">',
          '<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-7.png">',
          '<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-8.png">',
          '<image src="https://patrickmonster.github.io/tgd/img/CherryBlossom-9.png">',
        ],
        minSize: 10,
        maxSize: 20,
        move: -300,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "chocolate") {
    options = $.extend(
      {},
      {
        text: [
          '<image src="https://patrickmonster.github.io/tgd/img/cacao.png">',
          '<image src="https://patrickmonster.github.io/tgd/img/chocolate.png">',
          '<image src="https://patrickmonster.github.io/tgd/img/chocolate-1.png">',
          '<image src="https://patrickmonster.github.io/tgd/img/chocolate-box-2.png">',
          '<image src="https://patrickmonster.github.io/tgd/img/chocolate-chip.png">',
        ],
        minSize: 10,
        maxSize: 20,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "rabbit") {
    options = $.extend(
      {},
      {
        text: [
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="1em" height="1em" fill="currentColor"><ellipse cx="38" cy="14" rx="3" ry="10"/><ellipse cx="47" cy="14" rx="3" ry="10"/><ellipse cx="44" cy="28" rx="9" ry="8"/><ellipse cx="53" cy="30" rx="3.2" ry="2.6"/><ellipse cx="31" cy="44" rx="16" ry="13"/><ellipse cx="40" cy="54" rx="5" ry="6"/><ellipse cx="22" cy="57" rx="10" ry="3.8"/><circle cx="12" cy="44" r="4.2"/></svg>',
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="1em" height="1em" fill="currentColor"><ellipse cx="26" cy="14" rx="3" ry="10"/><ellipse cx="17" cy="14" rx="3" ry="10"/><ellipse cx="20" cy="28" rx="9" ry="8"/><ellipse cx="11" cy="30" rx="3.2" ry="2.6"/><ellipse cx="33" cy="44" rx="16" ry="13"/><ellipse cx="24" cy="54" rx="5" ry="6"/><ellipse cx="42" cy="57" rx="10" ry="3.8"/><circle cx="52" cy="44" r="4.2"/></svg>',
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="1em" height="1em" fill="currentColor"><ellipse cx="40" cy="16" rx="3" ry="10" transform="rotate(-15 40 16)"/><ellipse cx="48" cy="14" rx="3" ry="10" transform="rotate(-8 48 14)"/><ellipse cx="46" cy="30" rx="9" ry="8"/><ellipse cx="55" cy="32" rx="3" ry="2.4"/><ellipse cx="28" cy="40" rx="17" ry="11"/><ellipse cx="38" cy="48" rx="5" ry="5.5"/><ellipse cx="14" cy="48" rx="10" ry="4"/><circle cx="6" cy="40" r="4"/></svg>',
        ],
        minSize: 15,
        maxSize: 30,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "rose1") {
    options = $.extend(
      {},
      {
        text: [
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/716624601215664230/1.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/716624594139873348/2.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/716624600267620392/3.png">',
        ],
        minSize: 10,
        maxSize: 20,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "rose2") {
    options = $.extend(
      {},
      {
        text: [
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/716625654283501599/1.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/716625656313544734/2.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/716625652962557952/3.png">',
        ],
        minSize: 10,
        maxSize: 20,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "rose") {
    options = $.extend(
      {},
      {
        text: [
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/683894829666795530/1.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/683894830471970887/2.png">',
        ],
        minSize: 10,
        maxSize: 20,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "whiteday") {
    options = $.extend(
      {},
      {
        text: ['<i class="fas fa-flower"></i>'],
        minSize: 10,
        maxSize: 20,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "roseos") {
    options = $.extend(
      {},
      {
        text: '<image src="https://cdn.discordapp.com/attachments/682449668428529743/682531593570877440/SPOILER_Rose_of_Sharon.png">',
        minSize: 10,
        maxSize: 20,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "pepero") {
    options = $.extend(
      {},
      {
        text: [
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/682531595076501556/SPOILER_pepero1.png">',
          '<image src="https://cdn.discordapp.com/attachments/682449668428529743/682531596569542737/SPOILER_pepero2.png">',
        ],
        minSize: 10,
        maxSize: 20,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "flag_korean") {
    options = $.extend(
      {},
      {
        text: '<image src="https://cdn.discordapp.com/attachments/682449668428529743/682531599006695444/SPOILER_Korean_Flag.png">',
        minSize: 10,
        maxSize: 20,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "money-bill-wave") {
    options = $.extend(
      {},
      {
        text: [
          '<i class="fad fa-money-bill-wave"></i>',
          '<i class="fad fa-money-bill-wave"></i>',
        ],
        direction: "left",
        move: 0,
        count: 50,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "raining") {
    options = $.extend(
      {},
      {
        text: "|",
        move: 0,
        count: 10,
        speed: 0.5,
        rspeed: false,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "bubbble") {
    options = $.extend(
      {},
      {
        text: "○",
        minSize: 10,
        maxSize: 20,
        direction: "bottom",
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "cloud") {
    options = $.extend(
      {},
      {
        text: '<i class="fa fa-cloud"></i>',
        maxSize: 10,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "cannabis") {
    //단풍
    options = $.extend(
      {},
      {
        text: '<i class="fas fa-cannabis"></i>',
        maxSize: 15,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "heart2") {
    options = $.extend(
      {},
      {
        text: [
          '<img src="https://cdn.discordapp.com/attachments/682449668428529743/683894816614252592/3.png">',
          "<img src=https://cdn.discordapp.com/attachments/682449668428529743/683894835094355978/2.png>",
          "<img src=https://cdn.discordapp.com/attachments/682449668428529743/683894832967843885/1.png>",
        ],
        minSize: 10,
        maxSize: 20,
        move: 100,
        count: 50,
      },
      options,
    );
  } else if (options.effect == "heart") {
    options = $.extend(
      {},
      {
        text: ['<i class="far fa-heart"></i>', '<i class="fas fa-heart"></i>'],
        move: -300,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "meteor") {
    //운석
    options = $.extend(
      {},
      {
        text: '<i class="fas fa-meteor"></i>',
        maxSize: 15,
        move: -1000,
        color: options.colaor,
      },
      options,
    );
  } else if (options.effect == "carrot") {
    //당근
    options = $.extend(
      {},
      {
        text: '<i class="fas fa-carrot"></i>',
        maxSize: 15,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "comment") {
    //말풍선
    options = $.extend(
      {},
      {
        text: [
          '<i class="fas fa-comment"></i>',
          '<i class="far fa-comment"></i>',
          '<i class="fas fa-comment-dots"></i>',
          '<i class="far fa-comment-dots"></i>',
        ],
        maxSize: 15,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "twitch") {
    //트위치 아이콘
    options = $.extend(
      {},
      {
        text: '<i class="fab fa-twitch"></i>',
        maxSize: 15,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "umbrella") {
    //우산
    options = $.extend(
      {},
      {
        text: '<i class="fab fa-umbrella"></i>',
        maxSize: 15,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "umbrella-beach") {
    //파라솔
    options = $.extend(
      {},
      {
        text: '<i class="fas fa-umbrella-beach"></i>',
        maxSize: 15,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "star5") {
    //별
    options = $.extend(
      {},
      {
        text: ["."],
        count: 50,
        speed: 1,
        direction: "none",
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "star4") {
    //별
    options = $.extend(
      {},
      {
        text: ["."],
        count: 40,
        speed: 10,
        direction: "fine_movement",
        move: 100,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "star3") {
    //별
    options = $.extend(
      {},
      {
        text: [
          '<i class="fas fa-splotch"></i>',
          '<i class="far fa-splotch"></i>',
        ],
        count: 30,
        speed: 10,
        direction: "fine_movement",
        move: 400,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "star2") {
    //별
    options = $.extend(
      {},
      {
        text: [
          '<i class="fas fa-splotch"></i>',
          '<i class="far fa-splotch"></i>',
        ],
        move: -500,
        speed: 10,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "star") {
    //별
    options = $.extend(
      {},
      {
        text: ['<i class="fas fa-star"></i>', '<i class="far fa-star"></i>'],
        direction: "none",
        speed: 0.1,
        count: 30,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "cookie") {
    //쿠키
    options = $.extend(
      {},
      {
        text: [
          '<i class="fas fa-cookie"></i>',
          '<i class="far fa-cookie"></i>',
          '<i class="fad fa-cookie"></i>',
        ],
        direction: "bottom",
        anitime: 3,
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "bone") {
    //뼈
    options = $.extend(
      {},
      {
        text: [
          '<i class="fas fa-bone"></i>',
          '<i class="fal fa-bone"></i>',
          '<i class="fad fa-bone"></i>',
        ],
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "pig") {
    //돼지
    options = $.extend(
      {},
      {
        text: ['<i class="fas fa-pig"></i>', '<i class="far fa-pig"></i>'],
        direction: "left",
        color: options.color,
      },
      options,
    );
  } else if (options.effect == "fish") {
    //물고기 #op text far fish fas fish fad fish
    options = $.extend(
      {},
      {
        text: [
          '<i class="fas fa-fish"></i>',
          '<i class="far fa-fish"></i>',
          '<i class="fad fa-fish"></i>',
        ],
        direction: "left",
        color: options.color,
      },
      options,
    );
  } else {
    options = $.extend(
      {},
      { text: [".", "&#10052"], maxSize: 15, color: options.color },
      options,
    );
  }
  return options;
}
