$.fn.extend({
	luckDraw:function(data){
		var anc = $(this); //祖父元素
		var list = anc.children("li");
		var click; //点击对象
		var lineNumber; //几行 3
		var	listNumber; //几列 4
		var thisWidth;
		var thisHeight,a;
		if(data.line==null){return;}else{lineNumber=data.line;}
		if(data.list==null){return;}else{listNumber=data.list;}
		if(data.width==null){return;}else{thisWidth=data.width;}
		if(data.height==null){return;}else{thisHeight=data.height;}
		if(data.click==null){return;}else{click=data.click;}

		///---初始化
		anc.css({
			width:thisWidth*listNumber,
			height:thisHeight*lineNumber,
			position:"relative"
		});
		list.css({
			width:thisWidth,
			height:thisHeight,
			position:"absolute"
		});
		
		var all = listNumber*lineNumber - (lineNumber-2)*(listNumber-2)  //应该有的总数
		if(all>list.length){ //如果实际方块小于应该有的总数
			for(var i=0;i<(all-list.length);i++){
				anc.append("<li>"+all+"</li>");
			}
		}
		
		list = anc.children("li");
		list.css({
			width:thisWidth,
			height:thisHeight,
			position:"absolute"
		});

		list.each(function(index){
			if(index < listNumber){  //---小于listNumber列
				$(this).css({
					left:index%listNumber*thisWidth
				});
			}
			else if(index >= listNumber && index < listNumber+lineNumber-2){
				$(this).css({
					top:(index+1)%listNumber*thisHeight,
					right:0
				});
			}
			else if(index >= listNumber+lineNumber-2 && index < all-lineNumber+2){
				$(this).css({
					bottom:0,
					right:(index+2)%listNumber*thisWidth
				});
			}else{
				/*
				*/
				$(this).css({
					bottom:(index-1)%listNumber*thisHeight,
					left:0
				});
			}
			if(index+1 > all){
				$(this).remove();
			}
		});
		var ix = 0;
		var speed = 500;
		var Countdown = 1000; //倒计时
		var isRun = false;
		var dgTime = 200,i=0;


		$(click).click(function(){
			// 在这里加post
			a={"success":1,"message":"恭喜您抽中一等奖！","show_pos":5,"left_num":3};
			// console.log(typeof a.success);
			if(a==null){alert("message")}//未传值
			else if(a.success==1){
				if(isRun){
					return;
				}else{
					i=+1;
					console.log(i)
					stime=a.show_pos;
					dgTime += stime*10 + 80;
						
					speedUp();
				}
			}
			else if(a.success==-1){
				layer.open({
				    btn: ['OK'],
				    content:a.message,
				    style: 'text-align:center;width:80%;',
				})
			}else if(a.success==-2){
				layer.open({
				    btn: ['OK'],
				    content:a.message,
				    style: 'text-align:center;width:80%;',
				})				
			}else if(a.success==-3){
				layer.open({
				    btn: ['OK'],
				    content:a.message,
				    style: 'text-align:center;width:80%;',
				})				
			}else if(a.success==-4){
				layer.open({
				    btn: ['OK'],
				    content:a.message,
				    style: 'text-align:center;width:80%;',
				})				
			}
		});
		function speedUp(){ //加速
			isRun = true;
			list.removeClass("adcls");
			list.eq(ix).addClass("adcls");
			ix++;
			init(ix);
			speed -= 50;
			if(speed == 100){
				clearTimeout(stop);
				uniform();  
			}else{
				var stop = setTimeout(speedUp,speed/2);
			}
		}
		function uniform(){ //匀速
			list.removeClass("adcls");
			list.eq(ix).addClass("adcls");
			ix++;
			init(ix);
			Countdown -= 50 ;
			if(Countdown == 0){
				clearTimeout(stop);
				speedDown();
			}else{
				var stop = setTimeout(uniform,speed/2);
			}
		}
		function speedDown(){ //减速
			list.removeClass("adcls");
			list.eq(ix).addClass("adcls");
			ix++;
			init(ix);
			speed += 10;
			if(speed == dgTime+20){
				clearTimeout(stop);
				end();
			}else{
				var stop = setTimeout(speedDown,speed/2);
			}
		} 
		function end(){
			if(ix == 0){
				ix = 16;
			}
			layer.open({
			    btn: ['OK'],
			    content:a.message,
			    style: 'text-align:center;width:80%;',
			})

			initB();
		}
		///--归0
		function init(o){
			if(o == all){
				ix = 0;	
			}
		}
		///
		function initB(){
			ix = 0;
			dgTime = 200;
			speed = 500;
			Countdown = 1000;
			isRun = false;
		}
	}

}); 