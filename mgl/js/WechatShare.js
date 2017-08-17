/* 注意：页面必须引用<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script> */

var thisURL = window.location.href;
//请求地址（当前页面地址，可以保留?符号，去掉#号后面的）
var returnURL = "";
var parms = "";
if (thisURL.indexOf('#') > 0) {
    returnURL = thisURL.substring(0, thisURL.indexOf('#'));
}
else {
    returnURL = thisURL;
}
if (returnURL.length > 0) {
    if (returnURL.indexOf('?') > 0) {
        parms = returnURL.substring(returnURL.indexOf('?'));
    }
}
var linkUrl = "http://xcheshi.com/pro/meiyan";




//微信分享通用配置
var _Conf = {
    img: "http://xcheshi.com/pro/meiyan/img/index_1.jpg",
    url: linkUrl,
    title: 'Mageline颜值养成记--我的美肌秘密',
    desc: "他们都说我的颜值可是属于女神级别哦，小伙伴们不信就来帮我助力吧~",
    appid: '',
    timestamp: 0,
    w: 100,
    h: 100,
    nonceStr: '',
    signature: ''
};



/*页面加载即请求*/
$(document).ready(function () {
    $.ajax({
        url: "WeChatApi/WeChatApi.php",
        type: "Post",
        datatype: "text",
        data: {
            op: 'GetSign',
			"r": Math.random() * 10000,
            config_url: returnURL
        },
        async: false,
        cache: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (text, status) {
            if (text.length > 0) {
                var _obj = eval("(" + text + ")");

                _Conf.appid = _obj.appId;
                _Conf.timestamp = _obj.timestamp;
                _Conf.nonceStr = _obj.nonceStr;
                _Conf.signature = _obj.signature;

                /*微信分享配置文件*/
                wx.config({
                    debug: false,
                    appId: _Conf.appid,
                    timestamp: _Conf.timestamp,
                    nonceStr: _Conf.nonceStr,
                    signature: _Conf.signature,
                    jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'chooseImage',
                    'uploadImage',
                    ''
                    ]
                });
            }
        }
    });
});



/*旧版分享*/
function _ShareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
        'appid': _Conf.appid,
        'img_url': _Conf.img,
        'img_width': _Conf.w,
        'img_height': _Conf.h,
        'link': _Conf.url,
        'desc': _Conf.title,
        'title': _Conf.desc
    }, function (res) {
        //_report('send_msg', res.err_msg);
		 UpdateShare();
    })
}

function _ShareTL() {
    WeixinJSBridge.invoke('shareTimeline', {
        'img_url': _Conf.img,
        'img_width': _Conf.w,
        'img_height': _Conf.h,
        'link': _Conf.url,
        'desc': _Conf.desc,
        'title': _Conf.desc
    }, function (res) {
        //_report('timeline', res.err_msg);
        UpdateShare();
    });
}


// 当微信内置浏览器初始化后会触发WeixinJSBridgeReady事件。
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    //隐藏下方工具栏，需要显示顶部导航栏，请把hideToolbar换成showToolbar
    WeixinJSBridge.call('showToolbar');
    //隐藏右上角菜单，需要显示请把hideOptionMenu换成showOptionMenu
    WeixinJSBridge.call('showOptionMenu');

    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        _ShareFriend();
    });

    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        _ShareTL();
    });

}, false);


/*新版分享*/
wx.ready(function () {


    // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
    wx.checkJsApi({
        jsApiList: [
         'checkJsApi','onMenuShareTimeline', 'onMenuShareAppMessage','chooseImage'
        ],
        success: function (res) {
            // alert("微信可用");
        },
        fail: function (res) {
            alert("请将微信升级到6.1版本以上，才能使用全部功能。");
        }
    });


    /*获取“分享到朋友圈”按钮点击状态及自定义分享内容接口*/
    wx.onMenuShareTimeline({
        title: _Conf.title, // 分享标题
        link: _Conf.url, // 分享链接
        imgUrl: _Conf.img, // 分享图标
        success: function () {
            UpdateShare();
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    /*获取“分享给朋友”按钮点击状态及自定义分享内容接口*/
    wx.onMenuShareAppMessage({
        title: _Conf.title, // 分享标题
        desc: _Conf.desc, // 分享描述
        link: _Conf.url, // 分享链接
        imgUrl: _Conf.img, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
			 UpdateShare();
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });


    $(".button").click(function(){
        if(dd==true){
                choosePic(wx);
        }
    });
});


function initShare() {
    wx.ready(function () {


        // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
        wx.checkJsApi({
            jsApiList: [
                'onMenuShareTimeline', 'onMenuShareAppMessage'
            ],
            success: function (res) {
                // alert("微信可用");
            },
            fail: function (res) {
                alert("请将微信升级到6.1版本以上，才能使用全部功能。");
            }
        });


        /*获取“分享到朋友圈”按钮点击状态及自定义分享内容接口*/
        wx.onMenuShareTimeline({
            title: _Conf.title, // 分享标题
            link: _Conf.url, // 分享链接
            imgUrl: _Conf.img, // 分享图标
            success: function () {
                UpdateShare();
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        /*获取“分享给朋友”按钮点击状态及自定义分享内容接口*/
        wx.onMenuShareAppMessage({
            title: _Conf.title, // 分享标题
            desc: _Conf.desc, // 分享描述
            link: _Conf.url, // 分享链接
            imgUrl: _Conf.img, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

    });
}
