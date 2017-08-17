/**
 * Created by Ket on 2015/1/9.
 */

function bg_image(classid){
    var windWidth = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
    var windHeight = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
    $("."+classid).width(windWidth);
    $("."+classid).height(windHeight);
}

function fixation_bg_size(bgImageId){
    var windWidth = window.innerWidth;
    var windHeight = window.innerHeight;
    if(typeof windWidth != "number"){
        if(document.compatMode == "number"){
            windWidth = document.documentElement.clientWidth;
            windHeight = document.documentElement.clientHeight;
        }else{
            windWidth = document.body.clientWidth;
            windHeight = document.body.clientHeight;
        }
    }
    var inage_bg = document.getElementById(bgImageId);
    inage_bg.style.height = windHeight + "px";
}

function fixation_percent_top(controlId,top){
    var windHeight = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
    var image = document.getElementById(controlId);
    image.style.top = windHeight*top+"px";
}
function animation(flashId){
    var oBox = document.getElementById(flashId);
    var timer = null;
    var i = 0;
    clearInterval(timer);
    timer = setInterval(function () {
        oBox.style.display = i++ % 2 ? "none" : "block";
        i > 6 && (clearInterval(timer))
    }, 500)
}

function showDiv(divId){
    $("#"+divId).show();
}
function hideDiv(divId){
    $("#"+divId).hide();
}

function link_html(name){
    window.location.href=name;
}

function UpDownJitter(id,top){
    var ys = $("#"+id);
    var windHeight = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
    var top = windHeight*top;
    if(!($(ys).is(":animated"))){
        $(ys).animate({"top":top +30},400).animate({"top":top-30},200)
            .animate({"top":top+20},200).animate({"top":top -10},200)
            .animate({"top":top+5},200).animate({"top":top},200)
    }
}
function arrowAnimation(id,top){
    var windHeight = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
    var css_top = windHeight*top;
    $("#"+id).css({top:css_top});
    $("#"+id).animate({"top":css_top-10},600);
}
function leftAnimation(id, left){
    var windWidth = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
    var css_left = windWidth*left;
    var divId = $("#"+id);
    var sj =1200;
    divId.animate({left:css_left+20},sj).animate({left:css_left-10},sj)
        .animate({left:css_left+5},sj).animate({left:css_left-5},sj).animate({left:css_left},sj);
}
function rightAnimation(id, right){
    var windWidth = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
    var css_left = windWidth*right;
    var divId = $("#"+id)
    var sj =1200;
    divId.animate({right:css_left+20},sj).animate({right:css_left-10},sj)
        .animate({right:css_left+5},sj).animate({right:css_left-5},sj).animate({right:css_left},sj);
}
var twinkle = 1;
function twinkleAnimation(id, twk){
    if(twinkle == 1){
        $("#"+id).fadeTo("slow",twk);
        $("#"+id).fadeTo(1000);
        twinkle = 2;
    }else{
        $("#"+id).fadeTo("slow",1);
        $("#"+id).fadeTo(1000);
        twinkle = 1;
    }
}
