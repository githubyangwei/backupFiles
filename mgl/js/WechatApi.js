
//用户微信ID
var OpenID = '';

//页面所需js脚本。。。。。
$(document).ready(function () {
    if (!IsWeixin()) {
        alert('请使用微信浏览器访问，否则部分功能可能无法使用！');
        //return;
    }
    OpenID = woBase.getCookie("WeChatOpenID");
    if (OpenID.length == 0) {
        var code = woBase.getQueryString("code");
        if (code.length > 0) {
            $.ajax({
                url: 'WeChatApi/WeChatApi.php',
                type: 'Post', dataType: 'text', async: false, cache: false,
                data: {
                    'op': 'GetToken',
                    'code': code,
                    'type': ''
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (text, status) {
                    if (text.length > 0) {
                        var _obj = eval("(" + text + ")");
                        woBase.addCookie("WeChatOpenID", _obj.openid, 10);
                        OpenID = _obj.openid;
                    }
                }
            });
        }
        else {
            $.ajax({
                url: 'WeChatApi/WeChatApi.php',
                type: 'Post', dataType: 'text', async: false, cache: false,
                data: {
                    'op': 'GetAuthUrl',
                    'type': '',
                    'url': unescape(location.href)
                },
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (auth_url, status) {
                    if (auth_url.length > 0) {
                        location.href = auth_url;
                    }
                }
            });
        }
    }

});
/*判断是否通过微信内置浏览器打开*/
function IsWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
