var woBase = {
	preventDefault:function(){
		document.addEventListener("touchmove",function(e){
			e.preventDefault();
		})
	},
	animateEnd:function(o,callback){
		if(o[0]){
			o[0].addEventListener("webkitAnimationEnd",function(){
				if(typeof callback == 'function')
					callback();
			});
			o[0].addEventListener("animationend",function(){
				if(typeof callback == 'function')
					callback();
			});
		}
	},
	isMobile:function(mobile){
		return /^1[3|5|8][0-9]\d{8}$/.test(mobile);
	},
	addAnimate:function(className){
		var $list = (typeof className == "undefined") ? $(".animate") : $("."+className).find(".animate");
		$list.each(function(){
			var that = $(this),animateName = that.attr("animate-name");
			if(animateName){
				that.addClass(animateName);
			}
		});
	},
	removePreLoading:function(){
		var loading = $(".loading");
		if(loading[0]){
			loading.css("opacity","0");
			loading[0].addEventListener("webkitTransitionEnd",function(){
				loading.remove();
			})
			loading[0].addEventListener("transitionend",function(){
				loading.remove();
			})
		}
	},
	removeCommonLoading:function(){
		var loading = $(".shadeLoading");
		if(loading[0]){
			loading.css("opacity","0");
			loading[0].addEventListener("webkitTransitionEnd",function(){
				loading.remove();
			})
			loading[0].addEventListener("transitionend",function(){
				loading.remove();
			})
		}
	},
	getQueryString:function(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return "";
	},
	loading:function(title){
		if($(".overlazyLoading")[0])
			$(".overlazyLoading").remove();
		var loading = $("<div />").addClass("overlazyLoading").appendTo("body");
		var woloadingArea = $("<div />").addClass("woloadingArea");
		woloadingArea.append("<div class='loadingPic'></div>");
		var woloadingText = $("<div />").addClass("loadingText").text("正在加载,请稍后");
		if(title)
			woloadingText.text(title);
		woloadingArea.append(woloadingText).appendTo(loading);
		var width = woloadingArea.width(),height = woloadingArea.height();
		woloadingArea.css({
			"margin-left":-(width/2)+"px",
			"margin-top":-(height/2)+"px",
			"padding":"2%"
		});
		loading[0].addEventListener("touchmove",function(e){
			e.preventDefault();
		});
	},
	tip:function(title){
		var that = this;
		if($(".overlazyLoading")[0])
			$(".overlazyLoading").remove();
		var loading = $("<div />").addClass("overlazyLoading").appendTo("body");
		var woloadingArea = $("<div />").addClass("woloadingArea woloadingTip");
		var woloadingText = $("<div />").addClass("loadingText").text("提示");
		if(title)
			woloadingText.text(title);
		woloadingArea.append(woloadingText).appendTo(loading).css("opacity",0)
		var width = woloadingArea.width(),height = woloadingArea.height();
		woloadingArea.css({
			"left":"20%",
			"right":"20%"
		});
		woloadingArea.css({
			"top":"40%",
			"margin-top":-(height/2)+"px",
			"opacity":"",
			"padding":"2%"
		})
		loading[0].addEventListener("touchmove",function(e){
			e.preventDefault();
		});
		setTimeout(function(){
			that.closeLoading();
		},3000);
	},
	closeLoading:function(){
		if($(".overlazyLoading")[0])
			$(".overlazyLoading").remove();
	},
	showShareFriend:function(isClose,type){
		if($(".overlazyGuide")[0])
			$(".overlazyGuide").remove();
		var overlazy = $("<div />").addClass("overlazyGuide").appendTo("body");
		var img = $("<img />").addClass("showGuide").attr("src","images/global/share-guide.png");
		if(type)
			img.attr("src","images/global/share-guide"+type+".png");
		img.appendTo(overlazy);
		if(typeof isClose == 'boolean'){
			if(isClose)
			{
				$(":root").delegate(".overlazyGuide","touchstart",function(){
					$(".overlazyGuide").remove();
				});
			}
		}
	},
	closeShareFriend:function(callback){
		if($(".overlazyGuide")[0])
			$(".overlazyGuide").remove();
	},
	getRandom:function(min,max){
    	return parseInt(Math.random()*(max-min+1) + min);
   	},
   	addCookie:function(name,value,expiresHours){
   		var cookieString=name+"="+escape(value);
   		if(expiresHours>0){
	       	var date=new Date();
	       	date.setTime(date.getTime+expiresHours*3600*1000);
	       	cookieString=cookieString+"; expires="+date.toGMTString();
   		}
		document.cookie=cookieString; 
   	},
   	getCookie:function(name){
   		var strCookie=document.cookie; 
		var arrCookie=strCookie.split("; "); 
		for(var i=0;i<arrCookie.length;i++){ 
			var arr=arrCookie[i].split("="); 
			if(arr[0]==name) return arr[1]; 
		} 
		return ""; 
   	},
   	whichTransitionEvent:function(){  
	    var t ,el = document.createElement('fakeelement');
	    var transitions = {  
	      'transition':'transitionend',  
	      'OTransition':'oTransitionEnd',  
	      'MozTransition':'transitionend',  
	      'WebkitTransition':'webkitTransitionEnd',  
	      'MsTransition':'msTransitionEnd'  
	    }  
	    for(t in transitions){  
	        if( el.style[t] !== undefined ){  
	            return transitions[t];  
	        }  
	    }  
	}
}
$.fn.Touch = function(callback){
	var that = $(this);
	if(that[0]){
		that[0].addEventListener("touchend",function(e){
			e.stopPropagation();
			if(typeof callback == 'function'){
				callback();
			}
		});
	}
}
$.WoDialog = function(options){
	var opts = $.extend({}, {
		content:"欢迎使用WoDialog",
		showClose:true,
		callback:null,
		wodialogClass:"",
		woclass:"wo-dialog-content",
		showBtn:true,
		btnText:"确定",
		btnCloseAuto:true,
		bottom:null,
		lock:true,
		afterShow:null
	}, options);
	$.overlazy = $("<div />").addClass("overlazy overlazyDialog").appendTo("body");
	$.woDialogWrap = $("<div />").addClass("wodialog").attr("id","wodialog"+woBase.getRandom(10000,99999));
	if(opts.wodialogClass)
		$.woDialogWrap.addClass(opts.wodialogClass);
	$.woBtnClose = $("<a />").attr("href","javascript:;").addClass("wo-dialog-close");
	//$.woBtnCloseImg = $("<img src='images/global/close.png' alt='' />").addClass("img").appendTo($.woBtnClose);
	$.woBtnSure = $("<a />").addClass("wo-btn-sure").attr("href","javascript:;").text(opts.btnText);
	
	if(opts.showClose){
		$.woBtnClose.appendTo($.woDialogWrap);
	}
	if(typeof opts.content == 'string')
		$.woText = $("<div class=\""+opts.woclass+"\" />").html(opts.content).appendTo($.woDialogWrap);
	
	if(opts.showBtn)
		$.woBtnSure.appendTo($.woDialogWrap);
	if(typeof opts.bottom == 'string')
		$.woDialogWrap.append(opts.bottom);
	$.woDialogWrap.appendTo($.overlazy);
	$.woBtnClose.click(function(){ //关闭对话框
		$(this).parents(".overlazy").remove();
	});
	if(typeof opts.afterShow == 'function'){
		opts.afterShow();
	}
	$.woBtnSure.click(function(){
		if(opts.btnCloseAuto){
			$.WoDialog.close();
			if(typeof opts.callback == 'function'){
				opts.callback();
			}
		}else{
			if(typeof opts.callback == 'function'){
				opts.callback();
			}
		}
	})
	if(opts.lock){
		$.overlazy[0].addEventListener("touchmove",function(e){
			e.preventDefault();
		})
	}
};
$.fn.extend($.WoDialog,{
	close:function(){
		if($(".overlazyDialog")[0])
   			$(".overlazyDialog").remove();
	}
});
$.fn.extend($.WoDialog,{
	loading:function(title,callback){
		var ctitle = title ? title :"正在加载";
		var dialogArea = $("<div />").addClass("wo-dialog-area").appendTo("body");
		var dialogWrap = $("<div />").addClass("wo-dialog-wrap").appendTo(dialogArea);
		dialogWrap.append("<div class=\"clearfix\"></div>")
		var dialogTop = $("<div />").addClass("dialog-loading-top").appendTo(dialogWrap);
		dialogTop.append("<div class=\"double-bounce1\"></div>");
		dialogTop.append("<div class=\"double-bounce2\"></div>");
		var dialogTitle = $("<div />").addClass("wo-title").text(ctitle).appendTo(dialogWrap);
		dialogArea[0].addEventListener("touchmove",function(e){
			e.preventDefault();
		});
	},
	success:function(title,callback){
		var dialogArea = $("<div />").addClass("wo-dialog-area").appendTo("body");
		var dialogWrap = $("<div />").addClass("wo-dialog-wrap").appendTo(dialogArea);
		dialogWrap.append("<div class=\"clearfix\"></div>")
		var dialogTop = $("<div />").addClass("dialog-success-top").appendTo(dialogWrap);
		var dialogTitle = $("<div />").addClass("wo-title").text(title).appendTo(dialogWrap);
		setTimeout(function(){
			if(typeof callback == 'function') callback();
			$.WoDialog.destory();
		},3000);
		dialogArea[0].addEventListener("touchmove",function(e){
			e.preventDefault();
		});
	},
	error:function(title,callback){
		var dialogArea = $("<div />").addClass("wo-dialog-area").appendTo("body");
		var dialogWrap = $("<div />").addClass("wo-dialog-wrap").appendTo(dialogArea);
		dialogWrap.append("<div class=\"clearfix\"></div>")
		var dialogTop = $("<div />").addClass("dialog-error-top").appendTo(dialogWrap);
		var dialogTitle = $("<div />").addClass("wo-title").text(title).appendTo(dialogWrap);
		setTimeout(function(){
			if(typeof callback == 'function') callback();
			$.WoDialog.destory();
		},3000);
		dialogArea[0].addEventListener("touchmove",function(e){
			e.preventDefault();
		});
	},
	destory:function(callback){
		var dialogArea = $(".wo-dialog-area");
		if(dialogArea[0]){
			if(typeof callback == 'function'){
				callback();
			}
			dialogArea.remove();
		}
	}
})
