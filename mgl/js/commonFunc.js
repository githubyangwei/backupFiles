/**
 * Created by Ket on 2015/1/9.
 */
function div_align_center(parentId, divId) {
    var parent_div = document.getElementById(parentId);
    var this_div = document.getElementById(divId);
    var lef = (parent_div.clientWidth - this_div.clientWidth) / 2 + "px";
    this_div.style.left = lef;
}
function fixation_bg_size(bgImageId) {
    var windHeight = window.innerHeight;
    var inage_bg = document.getElementById(bgImageId);
    inage_bg.style.height = windHeight + "px";
}

function fixation_percent_heighe(controlId, top) {
    var image = document.getElementById("show_id");
    image.style.top = window.innerHeight * top + "px";
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return "";
}
function ValidationMobile(mobile) {
    if (mobile.length != 11) {
        return false;
    }
    var reg0 = /^13\d{5,9}$/; //130--139。至少7位
    var reg1 = /^15\d{5,9}$/; //15至少7位
    var reg2 = /^17\d{5,9}$/; //15至少7位
    var reg3 = /^18\d{5,9}$/; //18

    var res = false;
    if (reg0.test(mobile)) res = true;
    if (reg1.test(mobile)) res = true;
    if (reg2.test(mobile)) res = true;
    if (reg3.test(mobile)) res = true;
    return res;
}

function MathRand()
{
var Num="";
for(var i=0;i<6;i++)
{
Num+=Math.floor(Math.random()*10);
}return Num;
} 

var cc=true
dd=true
var picID='';
function choosePic(wx){
      //选择图片
    wx.chooseImage({
        success: function (res) {
                        if(res.localIds.length>0){
                            alert("正在上传图片")
//                            $("#pic").attr("src",res.localIds[0]);
                           //上传图片
                            $(".command_items").hide()
                            $("#meiyan_t").hide()
                            $("#quxiao").hide()
                            $("#di").show()
                            $("#photo").show()
                            $("#product").show()
                            $("#cansai").show()
                            $("#photo").addClass('azoomIn')
                            $("#cansai").addClass('abounceInLeft')

                            if (cc) {
                                $("#product").addClass('aup')
                                cc = false
                            } else {
                                if (dd == true) {

                                } else{
                                    $('.icon>span').css(
                                        {
                                            color:"#fff"
                                        }
                                    )
                                    $("#product").hide()
                                    $("#yuan").hide()
                                }
                            }

                            $("#return").show()
                            $("#compare").show()
                           wx.uploadImage({
                                localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    var serverId = res.serverId; // 返回图片的服务器端ID
									picID=MathRand();
                                    //下载图片到服务器
                                     $.ajax({
                                        url: "downWeiXinImg.php",
                                        type: "Post",
                                        datatype: "text",
                                        data: {
                                            imgId: serverId,
											oldimgPath: "images/"+OpenID.toLowerCase()+".jpg",
                                            imgPath: "images/"+OpenID.toLowerCase()+picID+".jpg"
                                        },
                                        async: false,
                                        cache: false,
                                        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                                        success: function (text, status) {
                                            $("#pic").attr("src","images/"+OpenID.toLowerCase()+picID+".jpg");

											 //修改图片picid
											$.ajaxSetup({
												async: false
											});
											$.post('ajaxHander.php', {
													op : 'updatepic',
													openid : OpenID,
													picID :picID
											}, function(result, status2) {
												//location.href="p2.html";        
											});
	


                                        }
                                    });
                                }
                            });


                            

                        }
                    }
            }); 
}


function savepic(){
   
    var image=$("#pic").attr('src');
    var isres=false;
    //保存美颜后的图片
    if(image.indexOf('data:image')>-1){
        image=image.substring(image.indexOf(',')+1);
    
                $.ajaxSetup({
                    async: false
                });
                $.post('ajaxHander.php', {
                    op : 'saveimg',
                    imgurl: image,
					picID :picID,
                    openid : OpenID.toLowerCase()
                }, function(result, status2) {
                    isres=true;
                });
    }
	else{
		isres=true;
	}

	if(isres){
		 location.href="p2.html"; 
	}

    /*html2canvas($("#picWrapper"), {

                                onrendered: function(canvas) {
                                 //document.body.appendChild(canvas);
                                canvas.width=350;
                                canvas.height=520;
                                var image    = canvas.toDataURL("image/jpeg");
                image=image.substring(image.indexOf(',')+1);
                $.ajaxSetup({
                    async: false
                });
                alert(image);
                $.post('ajaxHander.php', {
                    op : 'saveimg',
                    imgurl: image,
                    openid : OpenID.toLowerCase()
                }, function(result, status2) {
                    //alert('1');
                });

                                }

                });*/

   
}




function RegisterUser() {
    var _open = OpenID;
    if (_open == "") {
        alert("请使用微信客户端浏览该页面");
        return false;
    }
   
    var _name = $("#username").val();
    if (_name == "") {
        $("#username").focus();
        alert("姓名必须填写");
        return false;
    }
    var _mobile = $("#phone").val();
    if (_mobile == "") {
        $("#mobile").focus();
        alert("手机号码必须填写");
        return false;
    }
    if (!ValidationMobile(_mobile)) {
        $("#phone").focus();
        alert("手机号不正确");
        return false;
    }
    var res = "";
    $.ajax({
        url: "ajaxHander.php",
        type: "Post",
        datatype: "text",
        data: {
            op: 'register',
            openid: _open,
            mobile: escape(_mobile),
            name: _name
        },
        async: false,
        cache: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (text, status) {
			if (text == "ok") {
				location.href = "p1.html";
            }
            else {
                alert(text);
            }

        }
    });
}

function CheckRegister() {
    var _isregister = false;
    var _openid = OpenID;
    if (_openid == "") {
        return;
    }
    $.ajax({
        url: "ajaxHander.php",
        type: "Post",
        datatype: "text",
        data: {
            op: 'checkregister',
            openid: _openid
        },
        async: false,
        cache: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (text, status) {
            if (parseInt(text) > 0) {
                _isregister=true;
            }
        }
    });
    return _isregister;
}


function UpdateShare() {
    var _openid = OpenID;
    if (_openid == "") {
        return;
    }
    $.ajax({
        url: "ajaxHander.php",
        type: "Post",
        datatype: "text",
        data: {
            op: 'updateshare',
            openid: _openid
        },
        async: false,
        cache: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (text, status) {
            
        }
    });
}


function UpdatePoint(_points,_times) {
    var _openid = OpenID;
    if (_openid == "") {
        return;
    }
    $.ajax({
        url: "ajaxHander.php",
        type: "Post",
        datatype: "text",
        data: {
            op: 'updatepoint',
            openid: _openid,
			points: _points,
			times:_times
        },
        async: false,
        cache: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (text, status) {
            
        }
    });
}

function UpdateVote(obj) {
    var _openid = OpenID;
    var _ropenid=$(obj).attr('openid');
    if (_openid == "") {
        return;
    }
    if(_openid==_ropenid){
        alert("你不能给自己点赞");
        return;
    }
    $.ajax({
        url: "ajaxHander.php",
        type: "Post",
        datatype: "text",
        data: {
            op: 'updatevote',
            sopenid: _openid,
            openid: _ropenid
        },
        async: false,
        cache: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (text, status) {
            alert(text);
        }
    });
}


function RankList(_type) {
    $.ajax({
        url: "ajaxHander.php",
        type: "Post",
        datatype: "text",
        data: {
            op: 'ranklist',
            type:_type
        },
        async: false,
        cache: false,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (text, status) {
           var rankList = eval("("+text+")");
		   var rankStr='';
		   
            for(var i=0;i<rankList.length;i++){
		   //for(var i=0;i<100;i++){
				rankStr += "<li><img onclick='UpdateVote(this)' src='img/page3/empty-dot.gif' data-src='images/"+rankList[i]["openid"].toLowerCase()+rankList[i]["PicId"]+".jpg?o="+Math.random()+"' openid='"+rankList[i]["openid"]+"'><span>"+rankList[i]["username"]+"</span></li>";
		   }
           var aImgs = getByClass("imgBox")[0].getElementsByTagName("img");

           loadpic(aImgs);
           //alert(aImgs.length);
           // alert(rankStr);
		   
		   $("#RankList").html(rankStr);
        }
    });
}
