view_change();

var isBegin = false;

$(function(){
	var u = 39;
	var cj_money=0;
	var add_c='0';
	touch.on('#btnss', 'hold', function(ev){
		event.preventDefault(); 
		if(isBegin) return false;
		isBegin = true;
		$(".num").css('backgroundPositionY',0);
		var result = numRand();					
		//传值直接传给result传4位数数字，第一位奇数表示负，偶数表示正，后三位为募捐的钱数  可把随机数函数numRand()删掉
		// 例如 var result = 1024;  结果为 -24
		cj_money=result.toString().substr(1);
		cj_money=parseInt(cj_money);
		add_c=result.toString().substr(0,1);
		console.log(result);
		console.log(cj_money);
		console.log(add_c);
		if((parseInt(add_c)%2)!=0){
			cj_money='-  '+cj_money;
			$(".over_change>img:eq(1)").css('display', 'none');
		}else{
			$(".over_change>img:eq(0)").css('display', 'none');
		}
		var num_arr = (result+'').split('');
		$(".num").each(function(index){
			var _num = $(this);
			var timess=0;
			if(index=='0'){
				timess=1500+5*350;
			}else{
				timess=1500+index*350;
			}
			setTimeout(function(){
				_num.animate({ 
					backgroundPositionY: (u*60) - (u*num_arr[index])
				},{
					duration: timess,
					easing: "easeInOutCirc",
					complete: function(){
						if(index==3) isBegin = false;
						$('#cj_money').html(cj_money);
						setTimeout(show_over, 1800);
					}
				});
			}, (4-index) * 220);
		});
	});	
	$('#over_sue').click(function(event) {
		$(".over").hide();
		$(".over").css('z-index', '0');
	});
});

function view_change(){
	$(".num_box").css({
		'left':($(".lhjcontent").width()-$(".lhjcontent>img").width())/2
	});
}

function C_turn(url){
	window.location.href=url;
}

function show_over(){
	$(".over_change").css('opacity', '1');
	// document.getElementById("bgmusic").pause();
	// document.getElementById("rightmusic").play();
	setTimeout(function(){
		$(".over").css('z-index', '30');
		$(".over").show();
	}, 500)
		
}

function getParam(name){
	var val = null,
		reg = new RegExp('[\\?&]' + name + '=([^&]+)','i');
	if(reg.test(document.location.search)){
		val = RegExp.$1;
	}
	return val ? decodeURIComponent(val): null;
}


function numRand() {
	var x = 9999; //上限
	var y = 1111; //下限
	var rand = parseInt(Math.random() * (x - y + 1) + y);
	return rand;
}