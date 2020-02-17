$(document).ready(function(){
    podMeni();
    function podMeni(){
        $("#telefonija").hover(function(){
            $("#podMeniTelefonija").show();
        },
        function(){
            $("#podMeniTelefonija").hide();
        });
        $("#korisnickaPodrska").hover(function(){
            $("#podMeniKorisnickaPodrska").show();
        },function(){
            $("#podMeniKorisnickaPodrska").hide();
        });
        $(document).click(function(){
            $("#podMeniKorisnickaPodrska").hide();
            $("#podMeniTelefonija").hide();
        });
        $("#podMeniTelefonija").hover(function(){ $(this).show()},function(){ $(this).hide()});
        $("#podMeniKorisnickaPodrska").hover(function(){ $(this).show()},function(){ $(this).hide()});
        
        $("#bars").click(function(){
            $("#podMeni").slideToggle();
            $("#bars").toggleClass("MeniBar")
        });
        $("#podMeni ul a").click(function(){
            $(this).parent("li").children("ul").slideToggle("slow");
        });
    }
    
    slajder();
    function slideShow(){
        var aktivan=$("#slajder .vidljiv");
        var sledeci=aktivan.next().length?$(".vidljiv").next():aktivan.parent().children(":first");
        aktivan.removeClass("vidljiv").addClass("nevidljiv");
        sledeci.addClass("vidljiv").removeClass("nevidljiv");
    }
    function slajder(){
        var interval=setInterval(function(){
            slideShow();
    }, 10000);
    var strelicaDesno=$(".strelicaDesno");
    var strelicaLevo=$(".strelicaLevo");
    strelicaDesno.click(function(){
        slideShow();
    });
    strelicaLevo.click(function(){
        var aktivan=$("#slajder .vidljiv");
        var sledeci=aktivan.prev().length?$(".vidljiv").prev():aktivan.parent().children(":last");
        aktivan.removeClass("vidljiv").addClass("nevidljiv");
        sledeci.addClass("vidljiv").removeClass("nevidljiv");
    })
    }
    
    function prikaziSaznajVise(blok){
        $(blok).hover(function(){
            $(this).find("a").stop(true, true).fadeIn();
            $(this).find("img").stop(true, true).animate({"opacity": 0.5}, "slow");
            $(this).find("h3").stop(true, true).animate({"opacity": 0.5}, "slow");
            $(this).stop(true, true).css({"boxShadow" : "5px 5px 10px 5px #c2c2c2", "transition" : "box-shadow 1s"})
        },function(){
            $(this).find("a").stop(true, true).fadeOut();
            $(this).find("img").stop(true, true).animate({"opacity": 1}, "slow");
            $(this).find("h3").stop(true, true).animate({"opacity": 1}, "slow");
            $(this).stop(true, true).css({"boxShadow" : "none"})
        });
    }
    var velikiBlok=$(".velikiBlok");
    var maliBlok=$(".maliBlok");
    prikaziSaznajVise(velikiBlok);
    prikaziSaznajVise(maliBlok);

    function focus(input){
        $(input).focus(function(){
            $(this).prev().css("color",  "rgb(115, 164, 255)");
        });
        $(input).blur(function(){
            $(this).prev().css("color",  "rgb(0, 0, 0)");
        });
    }
    focus($("input"));
    focus($("textarea"));
});