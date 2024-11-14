nie.define(function () {
  var videoModule = nie.require("nie.util.videoV2"),
    $popbg = $('.Layer');
  var Frame = nie.require("nie.util.frame");

  /*function alert(msg) {
    return PopDialog.Alert({
      msg: msg,
      confirmTxt: 'OK'
    });
  }*/

  var page = {
    init: function () {
      this.bind();
      this.statics();
      this.singleswiper();
      this.crosswiseswiper();
      this.initFeature();
      // this.google();
      $(window).resize(function () {
        page.videoRespond();
        // smallPage();
      });
      this.videoRespond();
      this.frome();
    },
    frome:function(){
      // 支付按钮序列帧动画
      let inPg1Frame = ["https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00000.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00001.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00002.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00003.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00004.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00005.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00006.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00007.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00008.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00009.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00010.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00011.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00012.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00013.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00014.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00015.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00016.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00017.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00018.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00019.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00020.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00021.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00022.png","https://www.lifeafter.game/pc/gw/20190115141702/data/btn/PC-EN_00023.png"];
      let p1Frame = Frame.create({
        imgs: inPg1Frame,
        imgNum: 24,
        speed: 100,
        frameWidth: 361,
        frameHeight: 90,
        frameWrap: $(".btn-recharge"),
        loop: true,
        callback: function () {}
      });
      p1Frame.start();
    },
    google: function () {
      function setCookie(name, value, days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = name + "=" + value + expires + ";path=/";
      }

      function getParam(p) {
        var match = RegExp('[?&]' + p + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
      }
      var gclid = getParam('gclid');

      if (gclid) {
        $.ajax({
          type: "GET",
          url: 'https://shark-tracer.netease.com/v1/google/gclid/'+gclid+'/',
          dataType: "json",
          success: function (result) {
            if (result.msg == "OK") {
              var code = result.code;
              var gclsrc = getParam('gclsrc');
              if (!gclsrc || gclsrc.indexOf('aw') !== -1) {
                setCookie('gclid', code, 90);
              }
              ObtainCookie();
            } else {
              alert(result.msg);
            }
          }
        });
      } else {
        ObtainCookie();
      }

      function ObtainCookie() {
        var arrCookie = document.cookie.split("; ");
        for (var i = 0; i < arrCookie.length; i++) {
          var arr = arrCookie[i].split("=");
          if ("gclid" == arr[0]) {
            var code = arr[1];
            $("#computer").attr({
              "href": "https://g66na.gdl.easebar.com/dl/mrzh_test_20210609_" + code + ".exe"
            })
            dataLayer.push({
              'event': 'gclid-ready'
            });
            break;
          }
        }

      }
    },
    //图片下载
    download: function download(href, name) {
      console.log(href);
      var image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      var context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, image.width, image.height);
      var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
      var a = document.createElement("a"); // 生成一个a元素
      var event = new MouseEvent("click"); // 创建一个单击事件
      a.download = name; // 设置图片名称
      a.href = url; // 将生成的URL设置为a.href属性
      a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = href;
  },
    bind: function () {
      $('.down_tab').on('click',function(){
        $('.download-btnbox').toggleClass('dhide')
      })
      var self = this,
        $playVd = $(".playVideo");
      $playVd.on("click", function () {
        var index = $playVd.index(this),
          vurl = $playVd.eq(index).data('video');
        if (vurl != '') {
          var video = videoModule({
            fat: ".video-box",
            width: "800",
            height: "450",
            wmode: "direct",
            movieUrl: vurl,
            autoPlay: true
          });
          self.showPop("video-pop");
        } else {
          alert('Coming Soon!');
        }
      });
      // 点击下载
      // $('.swiperKv').bind('click', function () {
      //   var srcurl = $(this).find("img").attr("src");
      //   $('.neir').attr("src",srcurl)
      //   $('#pic-down').attr("href",srcurl)
      //   $('.Layer').addClass('on');
      //   $('.popImg').show();
      // });

      $('#pic-down').click(function (evt) {
        if(evt.preventDefault){
            evt.preventDefault(); // 非IE浏览器
        }else{
            evt.returnValue = false;// 在早期的IE版本中
        }
        let ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          alert("请在浏览器内下载");
        } else {
        console.log(1);
          var hrefurl = $(this).attr('href')
          console.log(hrefurl);
          page.download(hrefurl, "画像")
        }
      })

      $('#tpl').on('click', '.Layer,.close,.v_close', function () {
        self.hidePop();
        $("#video-pop .video-box").html('');
      });

      var $year = $('.footer_box .year'),
        year = $year.text(),
        now = new Date().getFullYear(),
        yearArticle = year.replace(2018, now);
      $year.text(yearArticle);

      $(".news-dot span").click(function (event) {
        $(this).addClass('on').siblings('span').removeClass('on');
        $(".slide-news li").removeClass("on").eq($(this).index()).addClass("on");
      });
      // 海域点击
      $('.page3 .tags>div').click(function (){
        var id = $(this).attr('data-id')
        $('.sea-pop .sea').attr('data-id',id)
        self.showPop('sea-pop')
      })
      //点击下拉
      $('.po-select').click(function (e){
        e.stopPropagation()
        $(this).toggleClass('on')
      })
      $('#tpl').click(function (){
        $('.po-select').removeClass('on')
      })
    },
    videoRespond: function () {
      var ratio = 1920 / 1080,
        curRatio = document.documentElement.clientWidth / document.documentElement.clientHeight;
      if (ratio < curRatio) {
        // 宽度100%
        $('.video_bg video').removeClass('h100').addClass('w100');
      } else {
        // 高度100%
        $('.video_bg video').removeClass('w100').addClass('h100');
      }
    },
    // 单屏切换swiper
    singleswiper: function () {
      var $pagination = $('.swiper-pagination'),
        $bullet = $('.swiper-pagination-bullet')

      function showLeftBanner(swiper) {
        var _index = swiper.activeIndex;
        _index > 0 ? $pagination.addClass('on') : $pagination.removeClass('on');
        $bullet.eq(_index).addClass('on').siblings().removeClass('on');
      }

      var all = new Swiper('#content_txt', {
        direction: 'vertical',
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        initialSlide: 0,
        resistanceRatio: 0,
        simulateTouch: false,
        mousewheelControl: true,
        paginationClickable: true,
        onTransitionStart: showLeftBanner,
        onTransitionEnd: function (swiper) {

        }
      });

      // banner
      if ($(".banner .swiper-slide").length > 1) {
        var banner = new Swiper('.banner', {
          direction: 'horizontal',
          loop: true,
          autoplay: 3000,
          simulateTouch: false,
          pagination: '.left_banner .swiper-pagination',
          paginationClickable: true,
        })
      }
      // all.slideTo(1, 0);
      var KvSwiper = new Swiper('.KvSwiper', {
        pagination: '.KvSwiper-pagination',
        nextButton: '.page1-next',
        prevButton: '.page1-prev',
        paginationClickable: true,
        loop: true,
        autoplay:5000,
        onClick: function(swiper,event){
          var srcurl = event.target.src;
          $('.neir').attr("src",srcurl)
          $('#pic-down').attr("href",srcurl)
          $('.Layer').addClass('on');
          $('.popImg').show();
        }
      });

      $('.to-top').on('click', function () {
        all.slideTo(0, 0);
      });
      $bullet.on('click', function () {
        var _index = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        all.slideTo(_index);
      });
    },
    // 横屏角色性别切换swiper
    crosswiseswiper: function () {
      var cross = new Swiper('#crosswise_txt', {
        direction: 'horizontal',
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        resistanceRatio: 0,
        simulateTouch: true, // 不允许拖动切换
        mousewheelControl: false, // 不允许滚轮滚动切换
        pagination: '#swiper-pagination-2',
        paginationClickable: true,
        paginationType: 'custom',
        paginationCustomRender: function (swiper, current, total) {
          var _html = '';
          for (var i = 1; i <= total; i++) {
            if (current == i) {
              _html += '<li class="swiper-pagination-custom swiper-pagination-custom-active" data-index="' + i + '"></li>' + '<li class="sp-custom active1" data-index="' + i + '"></li>';
            } else {
              _html += '<li class="swiper-pagination-custom" data-index="' + i + '"></li>' + '<li class="sp-custom active2" data-index="' + i + '"></li>';
            }
          }
          return _html;
        },
        onTransitionStart: function (swiper) {

        },
        onTransitionEnd: function (swiper) {
          //出场动画写这里
        }
      });
      // all.slideTo(0, 0);
      $('#swiper-pagination-2').on('click', 'li', function () {
        var index = $(this).data().index;
        cross.slideTo(index - 1, 300, false);
      })
    },
    initFeature: function () {
      var $lineCtl = $('.feature_line2 span'),
        $dotSpan = $('.feature_dot span');

      var time_1,time_2;
      $(".s2").slide({ // 需要加载slide的外层包裹，用来寄出定位
        titCell: ".feature_dot span", //对应的需要作为tab的单位元素
        mainCell: ".fea_box", //对应的需要作为内容展示的元素的父层（这里是父层，不是多重子元素！！）
        // titOnClassName:"on",
        // switchLoad:"_src",
        effect: "fold", //动画效果，
        mouseOverStop: false,
        autoPlay: true, //是否自动切换
        delayTime: 2000, //切换所需要的时间
        interTime: 4000, //自动切换的间隔
        trigger: "click", //"click"  触发tab的事件
        startFun: function (i, c) {

          $lineCtl.hide(0).removeClass('slidewidth');
          $lineCtl.eq(i).show(0).addClass('slidewidth');

          $('.feature_desc .feature_desc_con').removeClass('show');

          $dotSpan.removeClass('on');
          $dotSpan.eq(i).addClass('show');
          $('.feature_num .fea_cur').html('0' + (i + 1));

          clearTimeout(time_1);
          time_1 = setTimeout(function () {
            clearTimeout(time_1);
            time_1 = null;
            $('.feature_desc .feature_desc_con').eq(i).addClass('show');
          }, 500)

          clearTimeout(time_2);
          time_2 = setTimeout(function () {
            clearTimeout(time_2);
            time_2 = null;
            $('.feature_dot span').eq(i).removeClass('show').addClass('on');
          }, 300)
        }
      });
    },
    // 数据监测
    statics: function () {
      /*统计访问量*/
      ga('send', 'event', 'open', 'click');

      $('#down-an').on('click', function () {
        ga('send', 'event', 'click_google play', 'click');
      });

      $('#down-ap').on('click', function () {
        ga('send', 'event', 'click_app store', 'click');
      });

      $(".btn-tw-m").on({
        mouseover: function () {
          $(".btn-tw-m-hover").show()
        },
        mouseout: function () {
          $(".btn-tw-m-hover").hide()
        },
      })

      $(".btn-tw-m").click(function () {
        nie.config.stats.url.addto("Download_en_m","英版移动下载");
      });
      $(".btn-tw-pc").click(function () {
        nie.config.stats.url.addto("Download_en_pc","英版PC下载");
      });
      $(".btn-gq-pc").click(function () {
        nie.config.stats.url.addto("Download_en_gq_pc","英版高画质版PC下载");
      });
      $(".btn-topup").click(function () {
        nie.config.stats.url.addto("Download_en_dh","英版兑换");
      });
      $(".btn-recharge").click(function () {
        nie.config.stats.url.addto("Download_en_cz","英版充值");
      });

      $('#down-pc').on('click', function () {
        ga('send', 'event', 'PC_download', 'click');
      });
      $('#down-gq-pc').on('click', function () {
        ga('send', 'event', 'PC_gq_download', 'click');
      });

      $('#more-bonus').on('click', function () {
        ga('send', 'event', 'click_topup', 'click');
      });
    },
    showPop: function (className) {
      var obj = $('.' + className);
      obj.show();
      var h = (obj.height() * 1 + parseInt(obj.css('padding-top')) + parseInt(obj.css('padding-bottom'))) / 2;
      $popbg.addClass("on");
      obj.css('margin-top', -h);
    },
    hidePop: function () {
      $popbg.removeClass("on");
      $('.pop').hide();
    }
  }
  page.init();
});