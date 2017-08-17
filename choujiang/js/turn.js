$(function(){
$.fn.rollTop = function(opt,callback){
                //参数初始化
                if(!opt) var opt={};
                var _btnUp = $(this).find(opt.up);//Shawphy:向上按钮
                var _btnDown = $(this).find(opt.down);//Shawphy:向下按钮
                var timerID;
                var _this=this.eq(0).find("ul:first");
                var     lineH=_this.find("li:first").height(), //获取行高
                        line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10), 
						//每次滚动的行数，默认为一屏，即父容器高度
                        speed=opt.speed?parseInt(opt.speed,10):500; //卷动速度，数值越大，速度越慢（毫秒）
                        timer=opt.timer; //?parseInt(opt.timer,10):3000; //滚动的时间间隔（毫秒）
                if(line==0) line=1;
                var upHeight=0-line*lineH;
                //滚动函数
                var scrollUp=function(){
                        _btnUp.unbind("click",scrollUp); //Shawphy:取消向上按钮的函数绑定
                        _this.animate({
                                marginTop:upHeight
                        },speed,'linear',function(){
                                for(i=1;i<=line;i++){
                                        _this.find("li:first").appendTo(_this);
                                }
                                _this.css({marginTop:-1});
                                _btnUp.bind("click",scrollUp); //Shawphy:绑定向上按钮的点击事件
                        });

                }
               //Shawphy:自动播放
                var autoPlay = function(){
                        if(timer)timerID = window.setInterval(scrollUp,timer);
                };
                autoPlay();

};
$.each($('*[dsh=rollTop]'),function(i){
	$('*[dsh=rollTop]').eq(i).rollTop({line:$('*[dsh=rollTop]').eq(i).attr('line'),speed:$('*[dsh=rollTop]').eq(i).attr('speed'),timer:$('*[dsh=rollTop]').eq(i).attr('timer'),up:'*[btnt]',down:'*[btnb]'});
	});
})