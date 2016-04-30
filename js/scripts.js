var browser={
    versions:function(){
       	var u = navigator.userAgent, app = navigator.appVersion;
       	console.log(u);
       	return {//移动终端浏览器版本信息
				is360: window.chrome && window.chrome.webstore ? Object.keys(window.chrome.webstore).length >= 1: false,
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                isEdge: u.indexOf('Edge') > -1
            };
     	}(),
     	anguage:(navigator.browserLanguage || navigator.language).toLowerCase()
}

if(browser.versions.mobile){
	if(!browser.versions.is360){
		if(!browser.versions.isEdge) {
			window.location.href = 'http://ivydom.com/mobile';
		}
	}
}

$(function(){

	var docHeight = $(document).height();
	var docWidth = $(document).width();

	var mainArticle = $('.main-article');
	var mainArticleWidth = mainArticle.width();

	var footerContainer = $('.footer-container');

	//动态显示footer
	footerContainer.css({
		opacity: '1',
		transition: 'all 3s ease 0s'
	});

	var mainQuoteInterval = 0;

	var inimainQuoteAll = function() {

		var mainQuoteAll = $('#main-quote-all');
		var mainQuoteAllWidth = mainQuoteAll.width();
		var mainQuoteAllHeight = mainQuoteAll.height();

		var mainQuote = $('.main-quote');
		var lineQuote = $('.line-quote');

		var quote1 = $('quote1');
		var quote2 = $('quote2');

		var currentQuote = 'quote1';
		var nextQuote = 'quote2';

		var fixQuotePosition = function() {
			mainQuoteAll.css({
				left: ((docWidth - mainQuoteAllWidth) / 2),
				top: ((docHeight - mainQuoteAllHeight) / 2),
				display: 'block'
			});
		}

		var shrinkLineQuote = function(line) {
			for (var i = 0; i < 1000; i++) {
				var count = 0.00000 + i / 10000000;
				line.css({
					'opacity': '1',
					'transform-origin': 'center 100% 0px',
					'transform': 'matrix('+count+', 0, 0, 1, 0, 0)',
					'transition': 'all 1s ease 0s',
				});
			};
		}

		var stretchLineQuote = function(line) {
			for (var i = 1000; i > 0; i--) {
				var count =  i / (100000 * 0.00001);
				line.css({
					'opacity': '1',
					'transform-origin': 'center 100% 0px',
					'transform': 'matrix('+count+', 0, 0, 1, 0, 0)',
					'transition': 'all 1.6s ease 0s',
				});
			};
		}

		var upMainQuote = function(quote, line) {

			var quoteLogic = {

				'quote1': function() {
					quote2.hide();
					quote1.show();
					currentQuote = 'quote1';
					nextQuote = 'quote2';
				},

				'quote2': function() {
					quote1.hide();
					quote2.show();
					currentQuote = 'quote2';
					nextQuote = 'quote1';
				}

			};

			// quoteLogic[currentQuote]();

			quote.css({
				transform: 'matrix(1, 0, 0, 1, 0, -0.6451)',
				transition: 'all 1s ease 0s',
				opacity: '1'
			});
			stretchLineQuote(line);//伸长lineQuote
		}

		var downMainQuote = function(quote, line) {

			var quoteLogic = {

				'quote1': function() {
					quote1.hide();
					quote2.show();
					currentQuote = 'quote2';
					nextQuote = 'quote1';
				},

				'quote2': function() {
					quote2.hide();
					quote1.show();
					currentQuote = 'quote1';
					nextQuote = 'quote2';
				}

			};

			// quoteLogic[currentQuote]();

			quote.css({
				transform: 'matrix(1, 0, 0, 1, 0, 105.6451)',
				transition: 'all 0.6s ease 0s',
				opacity: '0'
			});
			shrinkLineQuote(line);//收起lineQuote
		}

		var toggleCurrentQuote = function(value) {
			var arr = {
				'quote1': function() {
					return 'quote2';
				},

				'quote2': function() {
					return 'quote1';
				}
			};

			return arr[value]();
		}

		fixQuotePosition(); //使quote居中
		
		var startQuoteAnimation = function() {
			upMainQuote(mainQuote, lineQuote);//拉起quote
			setTimeout(function() {
				downMainQuote(mainQuote, lineQuote);//降起quote
				// currentQuote = toggleCurrentQuote(currentQuote);
			},3000);
		}

		startQuoteAnimation();

		mainQuoteInterval = setInterval(startQuoteAnimation,4500);

	};

	inimainQuoteAll();

	var menuItem = $('.menu-container .menu-item');
	menuItem.click(function() {

		$('.sub-title-header').css({
			'opacity': '0',
			'transform': 'matrix(-0.9, 0, 0, 1, 0, 0)'
		});

		$('.full-text').css({
			'opacity': '0',
			'transform': 'matrix(-0.9, 0, 0, 1, 0, 0)'
		});

		var _this = $(this);
		var id = _this.attr('id');

		var mainArticle = $('.main-article');

		var articleTab = mainArticle.find('.article-tab');
		var tabActive = mainArticle.find('.active');

		var tabActiveId = tabActive.attr('id');

		console.log(tabActiveId);
		console.log('main-' + id);

		// if(tabActiveId == 'main-' + id) {
		// 	return false;
		// }
 
		var thisTab = $('#main-' + id);

		thisTab.addClass('active');//标记当前tab为活跃页
		thisTab.css({display: 'block',opacity: 1,'z-index': '65535'});//重新确认不隐藏,防止冲突

		tabActive.removeClass('active');//去掉当前活跃页活跃标记
		tabActive.css({opacity: '0','z-index': '-1'});//将活跃tab置不可视

		clearInterval(mainQuoteInterval);//清除主页面的interval指针

		setTimeout(function() {
			
			for (var i = 0; i < 1000; i++) {
				var count = (-0.9 + i / 1000) + 0.9; 
				$('.sub-title-header').css({
					'opacity': '1',
					'transform': 'matrix(' + 1 + ', 0, 0, 1, 0, 0)',
					'transition': 'all 1s ease 0s',
				});

				$('.full-text').css({
					opacity: 1,
					'transform': 'matrix(' + 1 + ', 0, 0, 1, 0, 0)',
					'transition': 'all 1s ease 0s',
				});
			};

		},10);

		var idMethod = {

			'blog': function() {
				window.location.href = "http://me.ivydom.com";
			},

			'intro': function() {

			},

			'works': function() {

			},

			'team': function() {

			},

			'contact': function() {

			},

			'home': function() {
				window.location.reload();
			}

		};

		if(typeof idMethod[id] != 'undefined') {
			idMethod[id]();
		}

	});

	var tickOut = $('.tick-out');
	menuItem.hover(function() {
		var index = $(this).index();
		var pos = (100 * (index + 1)) - (50 - index - 1);

		tickOut.css({
			transform: 'matrix(1, 0, 0, 1, 0, ' + pos + ')'
		});
	});

	var socialIcon = $('.footer-side ul li');

	socialIcon.hover(function() {
		var _this = $(this);
		var _thisImg = _this.find('img');
		var hoverSrc = _thisImg.attr('data-hover');
		_thisImg.attr('src', 'imgs/' + hoverSrc + '.svg');
		_thisImg.css({opacity: 1});

		if(_this.attr('id') == 'weixin') {
			$('.wx-container').css({
				display: 'flex'
			});
		}

	}, function() {
		var _this = $(this);
		var _thisImg = _this.find('img');
		var normalSrc = _thisImg.attr('data-normal');
		_thisImg.attr('src', 'imgs/' + normalSrc + '.svg');
		_thisImg.css({opacity: 0.5});

		if(_this.attr('id') == 'weixin') {
			$('.wx-container').css({
				display: 'none'
			});
		}
	});

	socialIcon.click(function() {
		var thisId = $(this).attr('id');

		if(thisId == 'weixin') {

			return false;
		}

		window.open(thisId);
	});

	var productsItem = $('.products-item');
	var currentIcon, currentMainProdText;
	var mainProductIcon = $('.main-prod-icon');

	productsItem.hover(function() {

		var _this = $(this);
		var thisIcon = _this.find('.main-prod-icon');
		var thisMainProdText = _this.find('.main-prod-text');

		currentIcon = thisIcon;
		currentMainProdText = thisMainProdText;

		for (var i = 64; i > 0; i--) {
			thisIcon.css({
				opacity: '1',
				transform: 'matrix(1, 0, 0, 1, 0, ' + i + ')'
			});
		};

		for (var i = -1; i > -30; i--) {
			thisMainProdText.css({
				transform: 'matrix(1, 0, 0, 1, 0, ' + i + ')'
			});
		};

	},function() {

		for (var i = 0; i < 64; i++) {
			currentIcon.css({
				opacity: '0',
				transform: 'matrix(1, 0, 0, 1, 0, ' + i + ')'
			});
		};

		for (var i = -30; i < 0; i++) {
			currentMainProdText.css({
				transform: 'matrix(1, 0, 0, 1, 0, ' + i + ')'
			});
		};

	});

	mainProductIcon.click(function() {
		var thisHref = $(this).attr('href');
		if(typeof thisHref != 'undefined') {
			window.open($(this).attr('href'));			
		}
	});

	$('.logo-typo').click(function() {
		window.open('http://me.ivydom.com');
	});

});
