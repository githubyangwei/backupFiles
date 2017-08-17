(function(){
    var Main = {
        img: null,
        addEvent: function(selector, eventType, func){
            var proName = "";

            switch(true){
                case /^\./.test(selector) :
                    proName = "className";
                    selector = selector.replace(".", "");
                    break;
                case /^\#/.test(selector) :
                    proName = "id";
                    selector = selector.replace("#", "");
                    break;
                default:
                    proName = "tagName";
            }

            document.body.addEventListener(eventType,function(e){
                function check(node){
                    if(! node.parentNode) return;

                    if(node[proName] == selector){
                        func.call(node, e);
                    };
                    check(node.parentNode);
                }
                check(e.target);
            }, false);
        },
        eventAtt: function(){
            var _this = this;


            var clickFlag = 0, dx, dy, left, top;

            this.addEvent(".pic", "mousedown", function(e){
                /*
                 dx = e.offsetX ? e.offsetX : e.layerX;
                 dy = e.offsetY ? e.offsetY : e.layerY;
                 */

                dx = e.clientX;
                dy = e.clientY;

                left = parseInt(pic.style.left);
                top = parseInt(pic.style.top);

                clickFlag = 1;
            });
            this.addEvent(".picWrapper", "mouseup", function(e){
                clickFlag = 0;
            });

            this.addEvent("#left", "mouseup", function(e){
               console.log("left")
                prevpage()
            });
            this.addEvent("#right", "mouseup", function(e){
                console.log("right")
                nextpage()
            });
            touch.on("#product_t","swipeleft swiperight",function(ev) {



//            if (pageReady) {
//
//                pageReady = false;

                    if (ev.type == "swiperight") {

                        prevpage();



//                    console.log(ev.currentTarget.id+"sss")
                    }
                    else {

                        nextpage();
//                    console.log(ev.currentTarget.id+"sss")
                    }
//

                    ev.preventDefault()



                }



            );
            var ms2
            function  prevpage(){
                $("#no"+page).hide()
                page--

                if(page<1){

                    page=3

                }
                $("#no"+page).show()
            }
            function  nextpage(){
                $("#no"+page).hide()
                page++

                if(page>3){

                    page=1

                }
                $("#no"+page).show()
            }
            document.getElementById("picWrapper").onmousemove = function(e){
                /*
                 var x = e.offsetX ? e.offsetX : e.layerX;
                 var y = e.offsetY ? e.offsetY : e.layerY;
                 */
                var x = e.clientX;
                var y = e.clientY;

                if(clickFlag){
                    var pic = document.getElementById("pic");

                    /*
                     var x = e.offsetX ? e.offsetX : e.layerX;
                     var y = e.offsetY ? e.offsetY : e.layerY;
                     */
                    var x = e.clientX;
                    var y = e.clientY;

                    var rLeft = left + (x - dx);
                    var rTop = top + (y - dy);
                    if(rLeft < 0) rLeft = 0;
                    if(rTop < 0) rTop = 0;

                    pic.style.left = rLeft + "px";
                    pic.style.top = rTop + "px";
                }
            };

            this.addEvent(".d_item", "click", function(e){
                var img = this.getElementsByTagName("img")[0];
                var pic = document.getElementById("pic");
                pic.src = img.src;
                pic.onload = function(){
                    _this.initView();
                    _this.img = AlloyImage(this);
                };
            });

            /*this.addEvent(".button", "click", function(e){
                document.getElementById("open").click();



            });*/
            var  text
            var bb=false
            this.addEvent("#return", "click", function(e){
//                document.getElementById("open").click();
                  console.log("bbb")
                var img = document.getElementById("pic");
                var AP = _this.img.clone();
                 AP.replace(img)
                bb=true
                $('.icon>span').css(
                    {
                        color:"#fff"
                    }
                )
                ms=null
                ms2=null
                $("#down_eye").hide();
                $("#down_eye2").hide();
            });

            var aa=true
          var   isclick=false
            var page_c=0
            touch.on("#compare","touchstart  touchend",function(ev) {

                    var img = document.getElementById("pic");
                    var AP = _this.img.clone();
                    if (ev.type == "touchstart"){
                        if(bb){
                            aa=true
                        }
                       if(aa){
                        AP.replace(img)
                           aa=false
                           console.log("false")
                           $("#down_eye").hide();
                           $("#down_eye2").hide();

                       }else{
                           if(page_c==8){
                               $("#down_eye").show();
                               $("#down_eye2").show();
                           }
                           AP.ps(text).replace(img)
                           aa=true
                           console.log("true")

                      }


                    }
                    ev.preventDefault()
                }
            );
            
            /*this.addEvent(".open", "change", function(e) {
                _this.openFile(e.target.files[0]);
                //确定选择的照片

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
            });*/

  touch.on(".imgWrapper1","touchstart",function(ev) {
      var mc=ev.target
      if(mc!=ms){
                $('.icon>span').css(
                    {
                        color:"#fff"
                    }
                )
                $('.imgWrapper1+span').css(
                    {
                        color:"#47a2be"
                    }
                )
                $('#yuan').hide()
                msgEle.style.display = "block";
                mc=ms2
          $("#down_eye").hide();
          $("#down_eye2").hide();
      }
            })

 touch.on(".imgWrapper2","touchstart",function(ev) {
     var mc=ev.target
         if(mc!=ms) {
             $('.icon>span').css(
                 {
                     color: "#fff"
                 }
             )
             $('.imgWrapper2+span').css(
                 {
                     color: "#47a2be"
                 }
             )
             $('#yuan').hide()
             msgEle.style.display = "block";
             mc=ms2
             $("#down_eye").hide();
             $("#down_eye2").hide();
         }
            })
 touch.on(".imgWrapper3","touchstart",function(ev) {
     var mc=ev.target
         if(mc!=ms) {
             $('.icon>span').css(
                 {
                     color: "#fff"
                 }
             )
             $('.imgWrapper3+span').css(
                 {
                     color: "#47a2be"
                 }
             )
             $('#yuan').hide()
             msgEle.style.display = "block";
             mc=ms2
             $("#down_eye").hide();
             $("#down_eye2").hide();
         }
            })
 touch.on(".imgWrapper4","touchstart",function(ev) {
     var mc=ev.target
         if(mc!=ms) {
             $('.icon>span').css(
                 {
                     color: "#fff"
                 }
             )
             $('.imgWrapper4+span').css(
                 {
                     color: "#47a2be"
                 }
             )
             $('#yuan').hide()
             msgEle.style.display = "block";
             mc=ms2
             $("#down_eye").hide();
             $("#down_eye2").hide();
         }
            })
 touch.on(".imgWrapper5","touchstart",function(ev) {
     var mc=ev.target
         if(mc!=ms) {
             $('.icon>span').css(
                 {
                     color: "#fff"
                 }
             )
             $('.imgWrapper5+span').css(
                 {
                     color: "#47a2be"
                 }
             )
             $('#yuan').hide()
             msgEle.style.display = "block";
             mc=ms2
             $("#down_eye").hide();
             $("#down_eye2").hide();
         }
            })
 touch.on(".imgWrapper6","touchstart",function(ev) {
     var mc=ev.target
         if(mc!=ms) {
             $('.icon>span').css(
                 {
                     color: "#fff"
                 }
             )
             $('.imgWrapper6+span').css(
                 {
                     color: "#47a2be"
                 }
             )
             $('#yuan').hide()
             msgEle.style.display = "block";
             mc=ms2
             $("#down_eye").hide();
             $("#down_eye2").hide();
         }
            })
 touch.on(".imgWrapper7","touchstart",function(ev) {
     var mc=ev.target
         if(mc!=ms) {
             $('.icon>span').css(
                 {
                     color: "#fff"
                 }
             )
             $('.imgWrapper7+span').css(
                 {
                     color: "#47a2be"
                 }
             )
             $('#yuan').hide()
             msgEle.style.display = "block";
             mc=ms2
             $("#down_eye").hide();
             $("#down_eye2").hide();
         }

            })
 touch.on(".imgWrapper8","touchstart",function(ev) {
     var mc=ev.target
         if(mc!=ms) {
             $('.icon>span').css(
                 {
                     color: "#fff"
                 }
             )
             $('.imgWrapper8+span').css(
                 {
                     color: "#47a2be"
                 }
             )
             $('#yuan').hide()
             msgEle.style.display = "block";
             mc=ms2
         }
            })
 touch.on(".imgWrapper9","touchstart",function(ev) {
                var mc=ev.target
                if(mc!=ms) {
                    $('.icon>span').css(
                        {
                            color: "#fff"
                        }
                    )
                    $('.imgWrapper9+span').css(
                        {
                            color: "#47a2be"
                        }
                    )
                    $('#yuan').hide()
                    msgEle.style.display = "block";
                    mc=ms2
                    $("#down_eye").hide();
                    $("#down_eye2").hide();
                }
            })
            touch.on(".imgWrapper10","touchstart",function(ev) {
                var mc=ev.target
                if(mc!=ms) {
                    $('.icon>span').css(
                        {
                            color: "#fff"
                        }
                    )
                    $('.imgWrapper10+span').css(
                        {
                            color: "#47a2be"
                        }
                    )

                    $('.zz>img').hide()
                    $('#imgWrapper_zz10').show()
                    $('.icon>img').removeClass('xkborder')
                    $('.imgWrapper10').addClass('xkborder')
                    mc=ms2
                    $("#down_eye").hide();
                    $("#down_eye2").hide();
                }
            })
            touch.on(".imgWrapper11","touchstart",function(ev) {
                var mc=ev.target
                if(mc!=ms) {
                    $('.icon>span').css(
                        {
                            color: "#fff"
                        }
                    )
                    $('.imgWrapper11+span').css(
                        {
                            color: "#47a2be"
                        }
                    )
                    $('.zz>img').hide()
                    $('#imgWrapper_zz11').show()
                    $('.icon>img').removeClass('xkborder')
                    $('.imgWrapper11').addClass('xkborder')
                    mc=ms2
                    $("#down_eye").hide();
                    $("#down_eye2").hide();
                }
            })
            touch.on(".imgWrapper12","touchstart",function(ev) {
                var mc=ev.target
                if(mc!=ms) {
                    $('.icon>span').css(
                        {
                            color: "#fff"
                        }
                    )
                    $('.imgWrapper12+span').css(
                        {
                            color: "#47a2be"
                        }
                    )
                    $('.zz>img').hide()
                    $('#imgWrapper_zz12').show()
                    $('.icon>img').removeClass('xkborder')
                    $('.imgWrapper12').addClass('xkborder')
                    mc=ms2
                    $("#down_eye").hide();
                    $("#down_eye2").hide();
                }
            })
     var ms
            this.addEvent(".imgWrapper1", "click", function(e){
//                console.log("aa")
                var mc= e.target
                if(mc!=ms){
                page_c=1
                aa=true
                bb=false
                var img = document.getElementById("pic");
//                $AI.useWorker("js/alloyimage.js");
                 text ="柔焦"
                 var AP = _this.img.clone()
                        AP.ps(text).replace(img)
                        setTimeout(function(){
                            msgEle.style.display = "none";
                            $('#yuan').show()
                            $('#text').text("无暇气垫BB霜")
                            $('#text').css({
                                width:"120px",
                                right:"8%",
                                top:'78%'
                            })
                            $('#star').show()
                            sound.play();

                        },500)
                setTimeout(function(){
                           $('#star').hide()
                },1500)
                      //美化效果
                    ms=mc
                }
            });
            this.addEvent(".imgWrapper2", "click", function(e){
                var mc= e.target
                    if(mc!=ms) {
                        page_c=2
//                console.log("aa")
                        aa = true
                        bb = false

                        var img = document.getElementById("pic");
//                $AI.useWorker("js/alloyimage.js");
                        text = "亮白增强"

                        var AP = _this.img.clone()


//                var t = + new Date();
                        AP.ps(text).replace(img)
                        setTimeout(function () {
//                            console.log(text + "：" + (+ new Date() - t) / 1000 + "s");
                            msgEle.style.display = "none";
                            $('#star').show()
                            sound.play();
                            $('#yuan').show()
                            $('#text').text("极致润白面霜")
                            $('#text').css({
                                width: "120px",
                                right: "8%",
                                top: '78%'
                            })
                        }, 500)
                        setTimeout(function () {
                            $('#star').hide()
                        }, 1500)
                        //美化效果
                        ms=mc
                    }
            });
            this.addEvent(".imgWrapper3", "click", function(e){
                var mc= e.target
                    if(mc!=ms) {
                        page_c=3
//                console.log("aa")
                        aa = true
                        bb = false

                        var img = document.getElementById("pic");
//                $AI.useWorker("js/alloyimage.js");
                        text = "暖秋"
//                console.log(text)

                        var AP = _this.img.clone();


//                var t = + new Date();
                        AP.ps(text).replace(img)
                        setTimeout(function () {
//                            console.log(text + "：" + (+ new Date() - t) / 1000 + "s");
                            msgEle.style.display = "none";
                            $('#star').show()
                            sound.play();
                            $('#yuan').show()
                            $('#text').text("魔力焕白面膜")
                            $('#text').css({
                                width: "120px",
                                right: "8%",
                                top: '78%'

                            })

                        }, 500)
                        setTimeout(function () {
                            $('#star').hide()
                        }, 1500)
                        ms=mc
                        //美化效果
                    }
            });
            this.addEvent(".imgWrapper4", "click", function(e){
                var mc= e.target
                    if(mc!=ms) {
                        page_c=4
                        aa = true
                        bb = false
                        var img = document.getElementById("pic");
                        text = "仿lomo"
//                console.log(text)

                        var AP = _this.img.clone();


//                var t = + new Date();
                        AP.ps(text).replace(img)
                        setTimeout(function () {
//                            console.log(text + "：" + (+ new Date() - t) / 1000 + "s");
                            msgEle.style.display = "none";
                            $('#star').show()
                            sound.play();
                            $('#yuan').show()
                            $('#text').text("胶原蛋白拍拍乳")
                            $('#text').css({
                                width: "120px",
                                right: "8%",
                                top: "78%"
                            })

                        }, 500)
                        setTimeout(function () {
                            $('#star').hide()
                        }, 1500)
                        ms=mc
                        //美化效果
                    }
            });
            this.addEvent(".imgWrapper5", "click", function(e){
                var mc= e.target
                    if(mc!=ms) {
                        page_c=5
//                console.log("aa")
                        aa = true
                        bb = false

                        var img = document.getElementById("pic");
                        text = "自然增强"
//                console.log(text)

                        var AP = _this.img.clone();


//                var t = + new Date();
                        AP.ps(text).replace(img)
                        setTimeout(function () {
//                            console.log(text + "：" + (+ new Date() - t) / 1000 + "s");
                            msgEle.style.display = "none";
                            $('#star').show()
                            sound.play();
                            $('#yuan').show()
                            $('#text').text("精灵眼霜")
                            $('#text').css({
                                width: "120px",
                                right: "8%",
                                top: '80%'

                            })

                        }, 500)

                        //美化效果
                        setTimeout(function () {
                            $('#star').hide()
                        }, 1500)
                        ms=mc
                    }
            });
            this.addEvent(".imgWrapper6", "click", function(e){
                var mc= e.target
                    if(mc!=ms) {
                        page_c=6
//                console.log("aa")
                        aa = true
                        bb = false

                        var img = document.getElementById("pic");
                        text = "美肤"
//                console.log(text)

                        var AP = _this.img.clone();


//                var t = + new Date();
                        AP.ps(text).replace(img)
                        setTimeout(function () {
//                            console.log(text + "：" + (+ new Date() - t) / 1000 + "s");
                            msgEle.style.display = "none";
                            $('#star').show()
                            sound.play();
                            $('#yuan').show()
                            $('#text').text("中药祛痘膏")
                            $('#text').css({
                                width: "100px",
                                right: "10%",
                                top: '78%'

                            })

                        }, 500)
                        ms=mc
                    }

                //美化效果
                setTimeout(function(){
                    $('#star').hide()
                },1500)
            });
            this.addEvent(".imgWrapper7", "click", function(e){
                var mc= e.target
                    if(mc!=ms) {
                        page_c=7
//                console.log("aa")
                        aa = true
                        bb = false

                        var img = document.getElementById("pic");
                        text = "柔焦"
//                console.log(text)

                        var AP = _this.img.clone();


//                var t = + new Date();
                        AP.ps(text).replace(img)
                        setTimeout(function () {
//                            console.log(text + "：" + (+ new Date() - t) / 1000 + "s");
                            msgEle.style.display = "none";
                            $('#star').show()
                            sound.play();
                        }, 500)
                        $('#star').show()
                        $('#yuan').show()
                        $('#text').text("美白隔离防晒乳")
                        $('#text').css({
                            width: "120px",
                            right: "8%",
                            top: "78%"
                        })
                        //美化效果
                        setTimeout(function () {
                            $('#star').hide()
                        }, 1500)
                    }
                         ms=mc
            });
            this.addEvent(".imgWrapper8", "click", function(e){
                var mc= e.target
//                console.log("aa")
                    if(mc!=ms) {
                        page_c=8
                        aa = true
                        bb = false

             $.ajax({
                url: "ajaxHander.php",
                type: "Post",
                datatype: "text",
                data: {
                    op: 'faceapi',
                    openid: OpenID
                },
                async: false,
                cache: false,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (text, status) {
                    if (text.length>0) {
                        
                        var _obj = eval("(" + text + ")");
                        
                        //  _obj.result[0].landmark 
                        //alert(_obj.result[0].landmark.left_eye_bottom.x);
                        var lelc_x=_obj.result[0].landmark.left_eye_left_corner.x
                        var lelc_y=_obj.result[0].landmark.left_eye_left_corner.y
                        var lerc_x=_obj.result[0].landmark.left_eye_right_corner.x
                        var lerc_y=_obj.result[0].landmark.left_eye_right_corner.y
                        var leb_x=_obj.result[0].landmark.left_eye_bottom.x
                        var leb_y=_obj.result[0].landmark.left_eye_bottom.y
                        var let_x=_obj.result[0].landmark.left_eye_top.x
                        var let_y=_obj.result[0].landmark.left_eye_top.y
                        var lc_x=_obj.result[0].landmark.left_eye_center.x
                        var lc_=_obj.result[0].landmark.left_eye_center.y
                        
                        var relc_x=_obj.result[0].landmark.right_eye_left_corner.x
                        var relc_y=_obj.result[0].landmark.right_eye_left_corner.y
                        var rerc_x=_obj.result[0].landmark.right_eye_right_corner.x
                        var rerc_y=_obj.result[0].landmark.right_eye_right_corner.y
                        var reb_x=_obj.result[0].landmark.right_eye_bottom.x
                        var reb_y=_obj.result[0].landmark.right_eye_bottom.y
                        var ret_x=_obj.result[0].landmark.right_eye_top.x
                        var ret_y=_obj.result[0].landmark.right_eye_top.y
                        function angle(starta,enda,startb,endb){
                        var diff_x = enda - starta,
                        diff_y = endb -startb;
                        //返回角度,不是弧度
                        return 360*Math.atan(diff_y/diff_x)/(2*Math.PI);
            }
                        var edeg=angle(lelc_x,lerc_x,lelc_y,lerc_y)
                        var edeg_r=angle(relc_x,rerc_x,relc_y,rerc_y)
                        $("#down_eye").show();
                        $("#down_eye2").show();
                         $("#down_eye").css(
                          {
                              
                             left:lelc_x+"%",
                             top:let_y+"%",
                             width:(lerc_x-lelc_x)+"%",
                             height:(leb_y-let_y)+"%",
                              '-webkit-transform':'rotate('+edeg+'deg)'
                            
                            
                          });  

                    $("#down_eye2").css(
                      { 
                         left:relc_x+"%",
                         top:ret_y+"%",
                         width:(rerc_x-relc_x)+"%",
                         height:(reb_y-ret_y)+"%",
                          '-webkit-transform':'rotate('+edeg_r+'deg)'
                       
                        
                      }
                   )

                    msgEle.style.display = "none";
                    $('#star').show()
                    sound.play();
                }
                    
                }
            });
                   
                        
//                $('#star').show()
//                sound.play();
//                var img = document.getElementById("pic");
//                var text ="柔焦"
//                console.log(text)
//
//                var AP = _this.img.clone();
//
//
//                msgEle.style.display = "block";
//
//
//                var t = + new Date();
//                AP.ps(text).replace(img)
//                setTimeout(function(){
////                            console.log(text + "：" + (+ new Date() - t) / 1000 + "s");
//                    msgEle.style.display = "none";
//                },500)

                        //美化效果
                        setTimeout(function () {
                            $('#star').hide()
                            $('#yuan').show()
                            $('#text').text("4D约会睫毛膏")
                            $('#text').css({
                                width: "120px",
                                right: "7%",
                                top: '78%'
                            })
                        }, 1500)
                        ms=mc
                    }
            });
            this.addEvent(".imgWrapper9", "click", function(e){
                var mc= e.target
//                console.log("aa")
                    if(mc!=ms) {
                        page_c=9
                        aa = true
                        bb = false

                        var img = document.getElementById("pic");
                        text = "美肤"
//                console.log(text)

                        var AP = _this.img.clone();


//                var t = + new Date();
                        AP.ps(text).replace(img)
                        setTimeout(function () {
//                            console.log(text + "：" + (+ new Date() - t) / 1000 + "s");
                            msgEle.style.display = "none";
                            $('#star').show()
                            sound.play();
                            $('#yuan').show()
                            $('#text').text("樱花水润唇膏")
                            $('#text').css({
                                width: "120px",
                                right: "8%",
                                top: "78%"
                            })
                        }, 500)
                        setTimeout(function () {
                            $('#star').hide()
                        }, 1500)
                        //美化效果
                        ms=mc
                    }
            });
            document.body.addEventListener("drop", function(e){
                e.preventDefault();
                var fileList = e.dataTransfer.files;
                _this.openFile(fileList[0]);
            },false);

            window.onresize = function(){
                _this.initView();
            };

        },

        init: function(){
            this.initView();
            this.showModel();
            this.eventAtt();

            var _this = this;
            var pic = document.getElementById("pic");
            pic.onload = function(){
                _this.img = AlloyImage(this);
                _this.initView();
            };
        },

        initView: function(){
            var func = function(){
                /*
                 var computedStyle = getComputedStyle(document.getElementById("picWrapper"));
                 */
                var w_width = parseInt(document.body.clientWidth) - 250;
                var w_height = document.body.clientHeight;
                var p_width = this.width;
                var p_height = this.height;

                var left = (parseInt(w_width) - parseInt(p_width)) / 2;
                var top = (parseInt(w_height) - parseInt(p_height)) / 2;
                top = top < 0 ? 0 : top;
                left = left < 0 ? 0 : left;
                this.style.left = left + "px";
                this.style.top = top + "px";
                msgEle.style.left = (parseInt(w_width) - 100) / 2 + "px";
                msgEle.style.top = (parseInt(w_height) - 100) / 2 + "px";
            };
            func.call(document.getElementById("pic"));

            var height = document.body.clientHeight;

        },

        openFile: function(fileUrl){//打开文件

            var reader = new FileReader();
            var _this = this;
            reader.readAsDataURL(fileUrl);
            reader.onload = function(){
                var pic = document.getElementById("pic");
                pic.src = this.result;
                pic.onload = function(){
                    _this.initView();
                    _this.img = AlloyImage(this);
                };
            };

        },

        showModel: function(){
            var EasyReflection = {
                "美肤" : "e1",
                "素描" : "e2",
                "自然增强" : "e3",
                "紫调" : "e4",
                "柔焦" : "e5",
                "复古" : "e6",
                "黑白" : "e7",
                "仿lomo" : "e8",
                "亮白增强" : "e9",
                "灰白" : "e10",
                "灰色" : "e11",
                "暖秋" : "e12",
                "木雕" : "e13",
                "粗糙" : "e14"
            };


//            document.getElementById("effects").innerHTML = html;
        }

    };

    var msgEle;

    window.addEventListener("DOMContentLoaded", function(){
        msgEle = document.getElementById("infoMsg");
       //$AI.useWorker("js/combined/alloyimage.js");
        Main.init();
    }, false);

})();
