function ez_init(){
    // inetializers
    var navBarHeight=$('.ez-nav-bar').css("height");
    var footerHeight=$('.ez-footer').css("height");
    $('.nav-dd').css("top",navBarHeight);
    var logo=$('.ez-nav-bar .nav-logo');
    var links=$('.ez-nav-bar .nav-link');
    var navButtonIcon=$('.nav-button-icon');
    $('.ez-nav-bar').empty();
    $('.ez-nav-bar').append('<div class="logo-part"></div>');
    $('.ez-nav-bar').append('<div class="links-part"></div>');
    $('.logo-part').append(logo);
    $('.links-part').append('<button class="nav-button" clicked="false"></button>');
    $('.nav-button').append(navButtonIcon);
    $('.links-part').append(links);

    // HTML programming:
    // loop

    // var loops=$('.loop');
    // for (var c1=0;c1<loops.length;c1++){
    //     var loopContents=loops.eq(c1).html();
    //     loops.eq(c1).empty();
    //     var min=parseInt(loops.eq(c1).attr('min'));
    //     var max=parseInt(loops.eq(c1).attr('max'));
    //     var inc=parseInt(loops.eq(c1).attr('inc'));
    //     var loopVar="{-"+loops.eq(c1).attr('var')+"-}";
    //     while(min<=max){
    //         loops.eq(c1).append(loopContents.replaceAll(loopVar,min));
    //         min+=inc;
    //     }
    // }


    // flex bases and orders and css
    var basesElements=$('*').filter(function () {
        return this.className.match(/\bbase-/);
    });
    var ordersElements=$('*').filter(function () {
        return this.className.match(/\border-/);
    });
    var cssElements=$('*').filter(function () {
        return this.className.match(/\bcss_/);
    });
    var basesClasses=[];
    var ordersClasses=[];
    var cssClasses=[];
    for(var c=0; c<basesElements.length; c++){
        var classesList=basesElements[c].className.split(' ');
        for(var cc=0; cc<classesList.length; cc++){
            if(classesList[cc]===""){
                classesList.splice(cc, 1);
                cc=0;
            }
        }
        basesClasses.push(classesList);
    }

    for(var c=0; c<ordersElements.length; c++){
        var classesList=ordersElements[c].className.split(' ');
        for(var cc=0; cc<classesList.length; cc++){
            if(classesList[cc]===""){
                classesList.splice(cc, 1);
                cc=0;
            }
        }
        ordersClasses.push(classesList);
    }

    for(var c=0; c<cssElements.length; c++){
        var classesList=cssElements[c].className.split(' ');
        for(var cc=0; cc<classesList.length; cc++){
            if(classesList[cc]===""){
                classesList.splice(cc, 1);
                cc=0;
            }
        }
        cssClasses.push(classesList);
    }

    
    // listeners

    // navbar button listener
    function navbarButtonListenerAction(){
        if (!(navButton_MQ.matches)) {
            $('.nav-button').attr('clicked','false');
            $('.nav-button').css('display','none');
            var links=$('.nav-dd .nav-link');
            $('.nav-dd').remove();
            $('.links-part').append(links);
        }else{
            $('.nav-button').css('display','inline-block');
            var links=$('.links-part .nav-link');
            links.remove()
            $('.ez-nav-bar').append('<div class="nav-dd"></div>');
            $('.nav-dd').css('display','none');
            $('.nav-dd').append(links);
            var navBarHeight=$('.ez-nav-bar').css("height");
            $('.nav-dd').css("top",navBarHeight);
        }
    }

    var navButtonThreshold=$('.ez-nav-bar').attr('threshold');
    if(!(navButtonThreshold)){
        navButtonThreshold='1250';
    }
    var navButton_MQ = window.matchMedia("(max-width: "+navButtonThreshold+"px)");
    navbarButtonListenerAction(navButton_MQ);
    navButton_MQ.addEventListener("change", () => {
        navbarButtonListenerAction(navButton_MQ);
    });


    // flex bases and orders listeners with the css listener and content holder height calculation and it's listener:

    function setBases(screens2Check){
        for(var c1=0;c1<basesElements.length;c1++){
            for(var c2=0;c2<screens2Check.length;c2++){
                for(var c3=0;c3<basesClasses[c1].length;c3++){
                    if (basesClasses[c1][c3].substring(0,5)=='base-'){
                        classInfo=basesClasses[c1][c3].split('-');
                        if(classInfo[2]==screens2Check[c2]){
                            basesElements.eq(c1).css('flex-basis',classInfo[1]+'%');
                        }
                    }
                }
            }
        }
        $('.content-holder').css("height",$(".content-size-calculator").height());
    }

    function setOrders(screens2Check){
        for(var c1=0;c1<ordersElements.length;c1++){
            for(var c2=0;c2<screens2Check.length;c2++){
                for(var c3=0;c3<ordersClasses[c1].length;c3++){
                    if (ordersClasses[c1][c3].substring(0,6)=='order-'){
                        classInfo=ordersClasses[c1][c3].split('-');
                        if(classInfo[2]==screens2Check[c2]){
                            ordersElements.eq(c1).css('order',classInfo[1]);
                        }
                    }
                }
            }
        }
        $('.content-holder').css("height",$(".content-size-calculator").height());
    }


    function setCss(screens2Check){
        for(var c1=0;c1<cssElements.length;c1++){
            for(var c2=0;c2<screens2Check.length;c2++){
                for(var c3=0;c3<cssClasses[c1].length;c3++){
                    if (cssClasses[c1][c3].substring(0,4)=='css_'){
                        classInfo=cssClasses[c1][c3].split('_');
                        if(classInfo[3]==screens2Check[c2]){
                            var cssProperties=classInfo[2].split('*');
                            for(var c4=0;c4<cssProperties.length;c4++){
                                cssElements.eq(c1).css(classInfo[1],cssProperties[c4]);
                            }
                        }
                    }
                }
            }
        }
        $('.content-holder').css("height",$(".content-size-calculator").height());
    }


    function setContentHolderHeight(){
        var contentHolderChildren = $(".content-holder").children();
        $(".content-holder").empty();
        $(".content-holder").append('<div class="ez-col content-size-calculator"></div>');
        $(".content-size-calculator").append(contentHolderChildren);
        var navType=$('.ez-nav-bar').css("position");
        if(navType=='fixed')
            $('.content-holder').css("margin-top",navBarHeight);
        if($('.ez-footer').length>0 && $('.ez-nav-bar').length>0)
            $('.content-holder').css("min-height",'calc(100vh - '+navBarHeight+' - '+footerHeight+')');
        else if($('.ez-footer').length>0 && $('.ez-nav-bar').length<1)
            $('.content-holder').css("min-height",'calc(100vh  - '+footerHeight+')');
        else if($('.ez-footer').length<1 && $('.ez-nav-bar').length>0)
            $('.content-holder').css("min-height",'calc(100vh  - '+navBarHeight+')');
        else
            $('.content-holder').css("min-height",'100vh');
        $('.content-holder').css("height",$(".content-size-calculator").height());
        contentHolderChildren = $(".content-size-calculator").children();
        $(".content-holder").empty();
        $(".content-holder").append(contentHolderChildren);
    }

    setContentHolderHeight();
    window.addEventListener("resize", () => {
        setContentHolderHeight();
    });


    var smScreens = window.matchMedia("(max-width:768px)");
    if (smScreens.matches) {
        var screens=['sm'];
        setBases(screens);
        setOrders(screens);
        setCss(screens);
    }
    smScreens.addEventListener("change", () => {
        if (smScreens.matches) {
            var screens=['sm'];
            setBases(screens);
            setOrders(screens);
            setCss(screens);
        }
    });


    var mdScreens = window.matchMedia("(max-width:992px) and (min-width:769px)");
    if (mdScreens.matches) {
        var screens=['sm','md'];
        setBases(screens);
        setOrders(screens);
        setCss(screens);
    }
    mdScreens.addEventListener("change", () => {
        if (mdScreens.matches) {
            var screens=['sm','md'];
            setBases(screens);
            setOrders(screens);
            setCss(screens);
        }
    });


    var lgScreens = window.matchMedia("(max-width:1200px) and (min-width:993px)");
    if (lgScreens.matches) {
        var screens=['sm','md','lg'];
        setBases(screens);
        setOrders(screens);
        setCss(screens);
    }
    lgScreens.addEventListener("change", () => {
        if (lgScreens.matches) {
            var screens=['sm','md','lg'];
            setBases(screens);
            setOrders(screens);
            setCss(screens);
        }
    });


    var xlScreens = window.matchMedia("(min-width:1201px)");
    if (xlScreens.matches) {
        var screens=['sm','md','lg','xl'];
        setBases(screens);
        setOrders(screens);
        setCss(screens);
    }
    xlScreens.addEventListener("change", () => {
        if (xlScreens.matches) {
            var screens=['sm','md','lg','xl'];
            setBases(screens);
            setOrders(screens);
            setCss(screens);
        }
    });

    setContentHolderHeight();

    //aos animations

    function animateIn(element, direction, amount, delay, animationFunction){
        if(element.attr('animatedIn')=='false'){
            var animationObject={};
            animationObject['opacity']='1';
            animationObject[direction]='+='+amount;
            element.animate(animationObject,delay,animationFunction);
            element.attr('animatedIn','true')
        }
    }
    
    function animateOut(element, direction, amount, delay, animationFunction){
        if(element.attr('animatedIn')=='true'){
            var animationObject={};
            animationObject['opacity']='0';
            animationObject[direction]='-='+amount;
            element.animate(animationObject,delay,animationFunction);
            element.attr('animatedIn','false')
        }
    }
    
    
    
    var aosElements=$('*').filter(function () {
        return this.className.match(/\baos-/);
    });
    
    aosClasses=[];
    
    for(var c=0; c<aosElements.length; c++){
        var classesList=aosElements[c].className.split(' ');
        for(var cc=0; cc<classesList.length; cc++){
            if(classesList[cc]===""){
                classesList.splice(cc, 1);
                cc=0;
            }
        }
        aosClasses.push(classesList);
    }
    
    for(var c=0;c<aosElements.length;c++){
        if(aosElements.eq(c).attr('animatedIn')!='false'){
            aosElements.eq(c).attr('animatedIn','true');
        }
    }
    
    aosElements.css("position","relative");
    
    
    var directions=[];
    var amounts=[];
    var delays=[];
    var animationFunctions=[];
    
    
    for(var c1=0; c1<aosElements.length; c1++){
        var direction='';
        var amount='';
        var delay=0;
        var animationFunction='';
        for(var c2=0; c2<aosClasses[c1].length; c2++){
            if(aosClasses[c1][c2].substring(0,4)=='aos-'){
                var animationProperties=aosClasses[c1][c2].split('-');
                direction=animationProperties[1];
                amount=animationProperties[2];
                delay=parseInt(animationProperties[3]);
                animationFunction=animationProperties[4];
            }
        }
        if(aosElements.eq(c1).attr('animatedIn')=='true'){
            aosElements.eq(c1).css(direction,'-='+amount);
            aosElements.eq(c1).css('opacity','0');
            aosElements.eq(c1).attr('animatedIn','false');
        }
        directions.push(direction);
        amounts.push(amount);
        delays.push(delay);
        animationFunctions.push(animationFunction);
    }
    
    $(document).scroll(function () {
        var screenbottom = $(this).scrollTop()+(((window.innerHeight)*70)/100);
        for(var c1=0; c1<aosElements.length; c1++){
            if (aosElements.eq(c1).position().top< screenbottom) {
                animateIn(aosElements.eq(c1), directions[c1], amounts[c1], delays[c1], animationFunctions[c1]);
            } else {
                animateOut(aosElements.eq(c1), directions[c1], amounts[c1], delays[c1], animationFunctions[c1]);
            }
        }
    
    });
    
}


// events listeners
$('.ez-nav-bar').on('click tap touch','.nav-button',function() {
    var ispressed=false;
    var x=$('.nav-button').attr('clicked');
    if(x=='false'){
        ispressed=false;
        $('.nav-button').attr('clicked','true');
    }else{
        ispressed=true;
        $('.nav-button').attr('clicked','false');
    }
    if(ispressed){
        $('.nav-dd').css('display','none');
    }else{
        $('.nav-dd').css('display','flex');
        var navBarHeight=$('.ez-nav-bar').css("height");
        $('.nav-dd').css("top",navBarHeight);
        var navBarPadding=[$('.ez-nav-bar').css("padding-left"),$('.ez-nav-bar').css("padding-right")];
        $('.nav-dd').css("padding-left",navBarPadding[0]);
        $('.nav-dd').css("padding-right",navBarPadding[1]);
    }
})


ez_init();