/**
 * 
 * @date    2015-09-24 17:06:16
 */
var footflag = {
	foot: false,
	change: true
};
var onFullPage = { //定义插件fullpage相关参数
	// sectionsColor: ['#007cc1', '#DEDEDC', '#fff', '#EBEAEA', '#fff'],
	sectionsColor: ['#007cc1', '#fff', '#fff', '#EBEAEA', '#fff'],
	verticalCentered: true,
	paddingTop: '75px', //距离顶部的距离
	navigation: true,
	navigationColor: '#8c8c8c',
	navigationPosition: 'right', //导航位置，left、right
	// loopHorizontal:false,
	// autoScrolling:false,		//是否使用插件的滚动方式，如果选择 false，则会出现浏览器自带的滚动条
	navigationTooltips: ['产品定位', '产品服务', '功能摘要', '核心优势', '服务模式'],
	afterRender: function() {
		$('.cpname').addClass('animated fadeInDown');
		$('.cpt').addClass('animated slideInLeft');
		$('.part_one_icon_bg').animate({
				'left': 0,
				'opacity': 1
			},
			300,
			function() {
				$('.part_one_icon').each(function(index, el) {
					(function(index) {
						$('.part_one_icon').eq(index).css({
							'top': parseFloat($('.part_one_icon').eq(index).attr('st')),
							'left': parseFloat($('.part_one_icon').eq(index).attr('sl')),
							opacity: '1'
						})
						$('.part_one_icon').addClass('animated pulse');
					})(index)
				});
			});
		$('.part_one_foot').animate({
			'opacity': '1'
		}, 1000);
		$('#fp-nav').addClass('actives');
		$('.fp-slidesNav').addClass('actives');
	},
	afterLoad: function(anchorLink, index) {
		if (index == 1) {
			$('.part_one_foot').animate({
				'opacity': '1'
			}, 1000);
			$('#fp-nav').addClass('actives');
			$('.fp-slidesNav').addClass('actives');
		}
		if (index == 2) {
			$('.part_two').removeClass().addClass('part_two zoomBigIn animated');
		}
		if (index == 3) {
			$('.part_three_left div').removeClass()
			var listnum = 1;
			$('.part_three_left div').eq(0).addClass('animated fadeInLeft quickly');
			var sint = setInterval(function() {
				$('.part_three_left div').eq(listnum).addClass('animated fadeInLeft quickly');
				listnum = listnum + 1;
				if (listnum >= 6) {
					clearInterval(sint);
				}
			}, 500)
			$('.three_up').removeClass().addClass('three_up animated fadeInRight');
			$('.three_down').removeClass().addClass('three_down animated fadeInLeft');
			$('.three_up').css('opacity', '1');
			$('.three_down').css('opacity', '1');
		}
		if (index == 4) {
			$('.part_four_one').removeClass().addClass('part_four_one fadeInRight animated');
			$('.part_four_three').removeClass().addClass('part_four_three zoomBigIn animated');
			$('.part_four_two').removeClass().addClass('part_four_two fadeInLeft animated');
			$('.part_four_right li').removeClass().addClass('flipInY animated animateShow');
			$('.part_four_left img').css('opacity', '1');
		}
		if (index == 5) {
			$('.part_five_text p').removeClass('active');
			$('.part_five_right div').removeClass();
			$('.part_five_left').removeClass().addClass('part_five_left zoomBigIn animated');
			$('.part_five_left').css('opacity', '1');
			$('.part_five_right').removeClass('animated zoomBigIn').addClass('zoomBigIn animated');
			$('.outModel').removeClass('active');
			$('.part_five_right div').eq(0).addClass('active bounceInDown animated');
			$('.outModel').eq(0).addClass('active');
			$('.part_five_text p').eq(0).addClass('active');
			$('.part_five_text p').eq(0).removeClass('animated bounceInLeft').addClass('bounceInLeft animated');
			$.fn.fullpage.setAllowScrolling(0);
			$.fn.fullpage.setKeyboardScrolling(0);
			footflag.foot = true;
		}
	},
	onLeave: function(index, nextIndex, direction) {
		if (index == 1) {
			$('.part_one_icon').addClass('animated pulse');
			$('#fp-nav').removeClass('actives');
			$('.fp-slidesNav').removeClass('actives');
		}
		if (index == 2) {
			$('.part_two').removeClass().addClass('part_two zoomBigOut animated');
		}
		if (index == 3) {
			$('.part_three_left div').removeClass().addClass('animated fadeOutLeft quickly');
			$('.three_up').removeClass().addClass('three_up animated fadeOutRight');
			$('.three_down').removeClass().addClass('three_down animated fadeOutLeft');
			$('.three_up').css('opacity', '0');
			$('.three_down').css('opacity', '0');
		}
		if (index == 4) {
			$('.part_four_one').removeClass().addClass('part_four_one fadeOutRight animated');
			$('.part_four_three').removeClass().addClass('part_four_three zoomBigOut animated');
			$('.part_four_two').removeClass().addClass('part_four_two fadeOutLeft animated');
			$('.part_four_right li').removeClass().addClass('flipOutY animated');
		}
		if (index == 5) {
			$('.part_five_left').removeClass().addClass('part_five_left zoomBigOut animated');;
			$('.part_five_text p').removeClass();
			$('.part_five_right div').removeClass('bounceInUp animated').addClass('bounceOutDown animated');
			$.fn.fullpage.setAllowScrolling(1);
			$.fn.fullpage.setKeyboardScrolling(1);
			footflag.foot = false;
		}
	}
}

$('#fullpage').fullpage(onFullPage);
$('.outModel').each(function(index, el) {
	$(this).hover(function(event) {
		$('.outModel').removeClass('active');
		$('.part_five_text p').removeClass('active');
		$('.part_five_right div').removeClass();
		$('.outModel').eq(index).addClass('active');
		$('.part_five_right div').eq(index).addClass('active bounceInUp animated');
		$('.part_five_text p').eq(index).addClass('active');
		$('.part_five_text p').eq(index).removeClass('animated bounceInLeft').addClass('bounceInLeft animated');
	});
});
//检测滚轮事件
$('#fullpage').stop(100).mousewheel(function(ev) {
	console.log(footflag);
	if (footflag.foot) {
		if (ev.deltaY > 0) { //滚轮向上滚
			if (footflag.change) { //页面向上滚
				$.fn.fullpage.moveSectionUp();
				setTimeout(function() {
					$.fn.fullpage.setAllowScrolling(1);
					$.fn.fullpage.setKeyboardScrolling(1);
				}, 100); //添加fullPage.js滚轮控制
			} else { //底部收回
				$('#foot_part').animate({'top':'0'},400);
				footflag.change = 'true'
			}
		} else { //滚轮向下滚
			if (footflag.change) { //展示底部
				// alert('展示底部'); //添加fullPage.js滚轮控制
				footflag.change = false;
				$('#foot_part').append('<div class="footer">这里展示底部信息</div>')
				$('#foot_part').animate({'top':'-100px'},400);
			} else { //没得滚了
				$('#foot_part').animate({'top':'-100px'},400);
			}
		}
	}
});