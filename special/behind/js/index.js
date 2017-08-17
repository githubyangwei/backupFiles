var autotim1='', autotim2='', autotim3='';
change_css();
action();

function change_css(){
    $(".m-paper .m-p-show ul li").each( function(index, val) {
         $(this).mouseenter(function(event) {
             $(".m-paper .m-p-show ul li div").eq(index).fadeIn();
         });
         $(this).mouseout(function(event) {
             $(".m-paper .m-p-show ul li div").eq(index).fadeOut();
         });
    });
}

function action(){
    autotim1=setTimeout(function(){
          content_change('.m-ad .m-a-list .m-show .m-control','left',700,'1');
    }, 5000)
    autotim2=setTimeout(function(){
          content_change('.m-story .m-cont .m-right .m-control','left',700,'2');
    }, 5000)
    autotim3=setTimeout(function(){
          content_change('.m-preach .m-cont .m-right .m-control','left',700,'3');
    }, 5000)
    $(".m-ad .m-a-list .m-t-left").click(function(event) {
        clearTimeout(autotim1);
        content_change('.m-ad .m-a-list .m-show .m-control','left',700,'1');
    });
    $(".m-ad .m-a-list .m-t-right").click(function(event) {
        clearTimeout(autotim1);
        content_change('.m-ad .m-a-list .m-show .m-control','right',700,'1');
    });
    $(".m-story .m-cont .m-right .m-t-left").click(function(event) {
        clearTimeout(autotim2);
        content_change('.m-story .m-cont .m-right .m-control','left',700,'2');
    });
    $(".m-story .m-cont .m-right .m-t-right").click(function(event) {
        clearTimeout(autotim2);
        content_change('.m-story .m-cont .m-right .m-control','right',700,'2');
    });
    $(".m-preach .m-cont .m-right .m-t-left").click(function(event) {
        clearTimeout(autotim3);
        content_change('.m-preach .m-cont .m-right .m-control','left',700,'3');
    });
    $(".m-preach .m-cont .m-right .m-t-right").click(function(event) {
        clearTimeout(autotim3);
        content_change('.m-preach .m-cont .m-right .m-control','right',700,'3');
    });
    $('.m-paper .m-nav li').each( function(index, val) {
         $(this).click(function(event) {
             turnblack('.m-paper .m-nav li');
             turn('.m-paper .m-p-show .m-control',500,index);
             $(this).attr('class', 'active');
         });
    });
    $('.m-model .m-nav li').each( function(index, val) {
         $(this).click(function(event) {
             turnblack('.m-model .m-nav li');
             turn('.m-model .m-m-show .m-control',500,index);
             $(this).attr('class', 'active');
         });
    });
}

function content_change(a,lor,time,tp,fn){
    var mark=-1;
    if(lor=='right'){
        mark=0;
        $(a).css('left', -$(a).children('ul').eq(0).width());
        $(a).children('ul').eq($(a).children('ul').length-1).insertBefore($(a).children('ul').eq(0))
    }
    $(a).stop(true,false).animate({
        'left': mark*$(a).children('ul').eq(0).width()},
        time,'swing', function() {
            if(mark=='-1'){
                $(a).css('left', '0');
                $(a).append($(a).children('ul').eq(0))
            }
            if(tp=='1'){
               autotim1=setTimeout(function(){
                      content_change(a,'left',700,'1');
                }, 6000)
            }else if (tp=='2') {
                autotim2=setTimeout(function(){
                      content_change(a,'left',700,'2');
                }, 7000)
            }else if (tp=='3') {
              autotim3=setTimeout(function(){
                      content_change(a,'left',700,'3');
                }, 8000)
            };
            if(fn){fn();}
    });
}

function turnblack(a){
    $(a).removeClass('active');
}
function turn(a,time,index){
    $(a).stop(true,false).animate({
        'left': -parseInt(index)*$(a).children('ul').eq(0).width()},
        time, function() {});
}