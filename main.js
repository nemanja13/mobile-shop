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
            $(this).find("a").fadeIn();
            $(this).find("img").animate({"opacity": 0.5}, "slow");
            $(this).find("h3").animate({"opacity": 0.5}, "slow");
        },function(){
            $(this).find("a").fadeOut();
            $(this).find("img").animate({"opacity": 1}, "slow");
            $(this).find("h3").animate({"opacity":1}, "slow");
        });
    }
    var velikiBlok=$(".velikiBlok");
    var maliBlok=$(".maliBlok");
    prikaziSaznajVise(velikiBlok);
    prikaziSaznajVise(maliBlok)

});