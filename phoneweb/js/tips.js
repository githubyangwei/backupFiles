function tips(a,fn){
    var $content='<div class="m-tips" id="m-tips"><div><p>'+a+'</p><div id="tips-sure">确定</div></div></div>';
    $('html').append($content);
    $('#m-tips').css('display', 'block');
    $("#tips-sure").click(function(event) {
        event.stopPropagation()
        console.log("x")
        if (fn) {
            fn();
             console.log("xs")
            setTimeout(function(){
                $("#m-tips").hide();
            },500)
        }else{
             console.log("xa")
            $("#m-tips").hide();
        }
    });

}