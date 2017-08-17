$(function()
{
	var oXiangce_wrap=$('.xiangce_wrap');
	var oTotal_wrap=$('.total_wrap');
	var oWidth=$('body').width();
	oXiangce_wrap.width(oWidth*0.92);
	oXiangce_wrap.css({
		'margin-top': oWidth*0.05+'px',
		'margin-left': oWidth*0.04+'px'
	});
	oTotal_wrap.width(oWidth*0.96*(oXiangce_wrap.length+1));
	var time=0;
	var timer;
	var flag=false;//是否可滑动相册
	var canTap=false;//是否可放大图片
	var canSuo=true;//是否可缩小图片
	// 长按图片缩小函数
	function change()
	{
		if(canSuo)
		{
			canSuo=false;
			oTotal_wrap.addClass('try');
			// oXiangce_wrap.each(function()
			// {		
			// 	oXiangce_wrap.on('tap',function()
			// 	{
						

			// 	})
			
			// })
			
			$('.star_name').css('font-size', '1em');
			$('.xiangce_footer_center_heart').css('width', '40%');
			$('.zan').css('font-size', '0.8em');
		}
		
	}
	// 点击图片放大
	function unchange()
	{
		oTotal_wrap.removeClass('try');
		$('.star_name').css('font-size', '1.2em');
		$('.xiangce_footer_center_heart').css('width', '58%');
		$('.zan').css('font-size', '1em');
		canSuo=true;
	}
	// 长按
	oXiangce_wrap.on('touchstart',function(e)
	{
		timer=setInterval(function()
			{
				time++;
				if(time==55)
				{
					clearInterval(timer);
					change();
					var zou=setTimeout(function()
						{
							canTap=true;
							clearTimeout(zou);
						}, 700);
					flag=true;
				}
			}, 1)	
		oXiangce_wrap.on('touchend',function()
		{
			clearInterval(timer);
			time=0;
		})	
	})

	// 图片标签	
	function tag()
	{
		var arr=[[oXiangce_wrap.width()*0.5,oXiangce_wrap.height()*0.3],[oXiangce_wrap.width()*0.2,oXiangce_wrap.height()*0.2]
	,[oXiangce_wrap.width()*0.1,oXiangce_wrap.height()*0.5]];
		$('.tags').each(function()
		{
			var posX=arr[$(this).index()][0];
			var posY=arr[$(this).index()][1];
			// document.title=posX+"|"+posY;
			$(this).css({
				left: posX+'px',
				top: posY+'px'
			});
		});
	}
	tag();

	

	// 滑动相册	
		var index=0;
		oTotal_wrap.on('swipeLeft',function(e)
		{
			e.preventDefault();
			if(flag)
			{
				index++;
				if(index>=oXiangce_wrap.length)
				{
					index=oXiangce_wrap.length;
				}
				oTotal_wrap.animate({
					'left':-index*(oXiangce_wrap.width()+parseInt(oXiangce_wrap.css('margin-left')))+'px'},300,'ease',function(){
						canTap=true;
					});
			}
		})
		oTotal_wrap.on('swipeRight',function(e)
		{
			e.preventDefault();
			if(flag)
			{
				index--;
				if(index<=0)
				{
					index=0
				}
				oTotal_wrap.animate({
					'left':-index*(oXiangce_wrap.width()+parseInt(oXiangce_wrap.css('margin-left')))+'px'
				},300,'ease',function()
					{
						canTap=true;
					})
			}	
		})
		oXiangce_wrap.each(function()
		{		
			oXiangce_wrap.on('tap',function()
			{
				if(canTap)
				{
					unchange();		
					// oTotal_wrap.animate({
					// 	// 'left': -$(this).index()*(oWidth*0.92+parseInt(oXiangce_wrap.css('margin-left')))+'px'
					// },1000,'ease');		
					oTotal_wrap.css('left',-$(this).index()*(oWidth*0.92+parseInt(oXiangce_wrap.css('margin-left')))+'px');				
					flag=false;
					canTap=false;
				}
			})
		
		})
		

		// 上滑选星
		$('html,body').scroll(function(e)
		{
			e.preventDefault();
		})	
		var oAlt=$('.alt');
		$('html,body').scroll(function()
			{
				// if($('body').scrollTop()==0)
				// {
					oAlt.css('display', 'none');
				// }
			});
		// }
		// alt();
		// $('body').on('swipeUp',function(e)
		// {
		// 	$('body').removeClass('body_nochange');
		// 	$('body').css('overflow-y', 'scroll');

		// 	// e.preventDefault();
		// 	// $('.bottom').animate({'bottom': '2%'},400,'ease');
		// })	
		// $('body').on('swipeDown',function(e)
		// {
		// 	e.preventDefault();
		// 	// oTotal_wrap.animate({'top':'0%'}, 400,'ease');
		// 	// $('.bottom').animate({'bottom': '-10%'},200,'ease');
		// 	// flag=false;
		// })	

		$('body').on('tap',function(e){
			e.preventDefault();
		})
		// 选星
		var oBottom=$('.bottom');
		var oStar=$('.star');
		var circle=$('.circle');
		oStar.width(oWidth*0.15).css('margin', '0'+' '+oStar.width()/6+'px');
		oBottom.width(oStar.width()*1.67*oStar.length);
		circle.width(oWidth*0.15).height(circle.width());
		circle.css({'left':oWidth*0.418+'px','bottom':-(parseInt(circle.height())+oWidth*0.028)+'px'});
		var index2=0;
		oBottom.on('swipeLeft',function(e)
		{
				e.preventDefault();
				index2++;
				if(index2>=oStar.length-3)
				{
					index2=oStar.length-3;
				}
				oBottom.animate({
					'left':-index2*oStar.width()*1.34+'px'},300,'ease',star);
		})
		oBottom.on('swipeRight',function(e)
		{
			e.preventDefault();
				index2--;
				if(index2<=-2)
				{
					index2=-2
				}
				oBottom.animate({
					'left':-index2*oStar.width()*1.34+'px'},300,'ease',star)	
		})

		// 判断明星更新图片
		function star()
		{
			oStar.each(function()
			{
				if($(this).offset().left>2.8*oStar.width()&&$(this).offset().left<2.9*oStar.width())
				{
					// alert($(this).index());
					// 发送数据更新图片
				}
			})
		}
		star();
			
}) 
 