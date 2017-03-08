$(".navbar-nav").find("li").eq(0).addClass("activenav").siblings().removeClass("activenav")
// 首页轮播
var HomeBanner = function() {
    return {
        Run: function(param) {
            banner.secound = 60;
            banner.init(param);
            banner.createKnob();
            banner.timeout = setInterval(function() {
                banner.timing();
            }, banner.secound);
        }
    };
}();
var banner = {
    "size": 5,
    "timeout": null,
    "secound": 100,
    "secondTime": 0,
    "maxSecond": 100,
    "init": function(param) {
        this.size = param.size;
        $(".sl_icon").unbind().click(function() {
            var nextId = $(this).attr("ctrlindex");
            banner.clickChange(nextId);
        });
    },
    "changeImg": function(nextId) {
        var $this = this;
        if ($this.timeout != null) {
            clearInterval($this.timeout);
            $this.timeout = null;
        }
        var currentId = $("[onctrl='1']").attr("ctrlindex");
        //change pointer
        $("[ctrlindex='" + currentId + "']").removeClass("active");
        $("[ctrlindex='" + nextId + "']").addClass("active");
        $("[ctrlindex='" + currentId + "']").attr("onctrl", "0");
        $("[ctrlindex='" + nextId + "']").attr("onctrl", "1");
        //隐藏按钮
        $("[for_index]").css({
            "display": "none"
        });
        //隐藏按钮 end
        //change background
        $("[showindex='" + currentId + "']").stop(true, false).animate({
            "opacity": 0
        }, 700, "easeOutCubic", function() {
            //显示按钮
            $("[for_index]").each(function(index, element) {
                var imgIndex = $(element).attr("for_index");
                if (imgIndex == nextId) {
                    $(element).css({
                        "display": "block"
                    });
                }
            });
            //显示按钮end
        });
        $("[showindex='" + nextId + "']").stop(true, false).animate({
            "opacity": 1
        }, 700, "easeOutCubic", function() {

        });
        $this.timeout = setInterval(function() {
            $this.timing();
        }, $this.secound);
    },
    "nextBackground": function() {
        var $this = this;
        var currentId = $("[onctrl='1']").attr("ctrlindex");
        currentId = parseInt(currentId, 10);
        var next = currentId % $this.size + 1;
        $this.changeImg(next);
    },
    "createKnob": function() {
        var $this = this;
        for (var i = 1; i <= $this.size; i++) {
            $("#kb" + i).knob({
                "width": 40,
                'min': 0,
                'max': $this.maxSecond,
                "displayInput": false,
                "displayPrevious": true,
                "thickness": ".1",
                "fgColor": "#3cd2f5",
                "bgColor": "none",
                "readOnly": true
            });
        }

    },
    "timing": function() {
        var $this = this;
        var showIndex = $("[onctrl='1']").attr("ctrlindex");
        showIndex = parseInt(showIndex, 10);
        var next;
        next = showIndex % $this.size + 1;

        if ($this.secondTime == $this.maxSecond) {
            $this.secondTime = 0;
            $("#kb" + showIndex).val(0).trigger('change');
            $this.changeImg(next);
        } else {
            $this.setKnobValue("kb" + showIndex);
        }
    },
    "clickChange": function(next) {
        var $this = this;
        var showIndex = $("[onctrl='1']").attr("ctrlindex");
        $this.secondTime = 0;
        $("#kb" + showIndex).val(0).trigger('change');
        $this.changeImg(next);
    },
    "setKnobValue": function(id) {
        var $this = this;
        $("#" + id).val($this.secondTime).trigger('change');
        $this.secondTime++;
    }
}
var takeShow = true;
var bankShow = true;
var partShow = true;
var browShow = true;
var shareShow = true;
var depositShow = true;
var animatePlay = true;
var autoPlayTime;
var anmIndex = 0;
//动画切换
function changeAnm(index){
    var num = 0;
    clearInterval(autoPlayTime);
    for(var i = 1; i <= 3; i++){
        if(index == i){
            $(".idx"+i).removeClass("uslt");
            $(".idx"+i).addClass("slt");
            $("[ons='" + i + "']").fadeIn(1500);
            num = i
            setTimeout(function(){
            $("[ons='"+num+"']").addClass("move");
            },200);
            anmIndex = num;
            autoPlayTime = setTimeout(function(){autoPlay()},10000);
            $("#anmTxt" + i).fadeIn(1500);
        }else{
            $(".idx"+i).removeClass("slt");
            $(".idx"+i).addClass("uslt");
            $("[ons='"+i+"']").css({"display":"none"});
            $("[ons='"+i+"']").removeClass("move");
            $("#anmTxt" + i).css({"display":"none"});
        }
    }
}
function autoPlay(){
    changeAnm(anmIndex%3+1);
}
// 首页数字跳动——动画
function setNumber(id,type){
    var value;
    if(type == "s"){
        value = $("#"+id+"_s").scrollTop();
        value = Math.round(value);
    }else if(type == "m"){
        var temp = $("#"+id+"_s").scrollTop();
        temp = Math.round(temp);
        value = Math.floor(temp/60)+"'";
        if(temp%60 < 10){
            value += "0"+(temp%60);
        }else{
            value += (temp%60);
        }
    }
    $("#"+id+"_num").html(value);
}
// 首页数字跳动——进度条加载CSS
function scrollOn(){
    var showPosition = $(window).height() + $(window).scrollTop();
    if(showPosition > 800 && depositShow){
        depositShow = false;
        setRate("deposit",120,25,2000,"easeOutCirc");
    }
    if(showPosition > 850 && animatePlay){
        animatePlay = false;
        changeAnm(1);
    }
    if(showPosition > 900 && takeShow){
        takeShow = false;
        
        setRate("take",240,177,2000,"easeOutCirc");
    }
    if(showPosition > 1000 && bankShow){
        bankShow = false;
        setRate("bank",240,34,2000,"easeOutSine");
    }
    if(showPosition > 1250 && partShow){
        partShow = false;
        
        $(".ff_pt").addClass("show");
        $(".ff_help").addClass("show");
    }
    if(showPosition > 1330 && browShow){
        browShow = false;
        
        setTimeout(function(){$(".ffb_all").addClass("show");},500);
    }
    if(showPosition > 1400 && shareShow){
        shareShow = false;
        
        setTimeout(function(){$(".ffs_all").addClass("show");},1000);
    }
}
// 首页数字跳动——判断浏览高度
function setRate(id,maxNum,value,time,easing){
    var rate = Math.round(value*1000/maxNum)/10;
    rate = rate-100;
    if(rate > 0){rate = 0;}
    if(id != "bank"){
        $("#"+id).animate({"left":rate+"%"},time,easing,function(){
        });
    }
    $("#"+id+"_s").animate({scrollTop: value},time,easing,function(){
    });
}
// 首页-最热游戏平台——选项卡
var ClientList = function () {
    var intervalSwitch = 3000;
    var $clientlist = $("#client-list"),
        $blockArr = [$clientlist.children(".l1"), $clientlist.children(".l2"), $clientlist.children(".l3")];
        $nav = $("#client-list-nav"),
        $navArr = [$nav.children(":eq(0)"), $nav.children(":eq(1)"), $nav.children(":eq(2)")];
    var activeIndex = 0;
    var timer = null;
    function Switch(i) {
        if ($blockArr.length < i + 1) {
            return;
        }
        if (activeIndex == i) {
            return;
        }
        if (timer != null) {
            clearTimeout(timer);
        }
        $blockArr[activeIndex].fadeOut("slow");
        $blockArr[i].fadeIn("slow");
        $navArr[activeIndex].removeClass("on");
        $navArr[i].addClass("on");
        activeIndex = i;
    }
    function BindEvent() {
        $nav.children(".i").click(function () {
            var i = $nav.children().index(this);
            Switch(i);
            AutoRun();
        });
    }
    function AutoRun() {
        timer = setTimeout(function () {
            var index = activeIndex + 1;
            if (index > 2) {
                index = 0;
            }
            Switch(index);
            AutoRun();
        }, intervalSwitch);
    }
    return {
        Init: function () {
            BindEvent();
            AutoRun();
        }
    };

}();
 $(function() {
    console.log(baseUrl)
    $(".notice").addClass("index-notice");
    $(".slide-inner div").each(function(index) {
        if (index == 0) {
            $(this).attr("showindex", index + 1).addClass("active").css("opacity", 1).css("filter", "alpha(opacity=100)");
        } else {
            $(this).attr("showindex", index + 1);
        }
    })
    $(".slide-indicators div").each(function(index) {
        $(this).children("input").attr("id", "kb" + (index + 1));
        if (index == 0) {
            $(this).attr("onctrl", 1).attr("ctrlindex", index + 1).addClass("active");
        } else {
            $(this).attr("onctrl", 0).attr("ctrlindex", index + 1);
        }
    })
    HomeBanner.Run({
        "size": $(".slide-inner").children().length
    });
    $("#deposit_s").scroll(function() {
        setNumber("deposit", "s");
    });
    $("#take_s").scroll(function() {
        setNumber("take", "m");
    });
    $("#bank_s").scroll(function() {
        setNumber("bank", "s");
    });
    $(window).scroll(function() {
        scrollOn();
    });
    scrollOn();
    ClientList.Init();
});