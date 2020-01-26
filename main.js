$(document).ready(function(){
    podMeni();
    function podMeni(){
        $("#telefonija").hover(function(){
            $("#podMeniTelefonija").stop( true, true ).show();
        },
        function(){
            $("#podMeniTelefonija").hide();
        });
        $("#korisnickaPodrska").hover(function(){
            $("#podMeniKorisnickaPodrska").stop( true, true ).show();
        },function(){
            $("#podMeniKorisnickaPodrska").stop( true, true ).hide();
        });
        $(document).click(function(){
            $("#podMeniKorisnickaPodrska").stop( true, true ).hide();
            $("#podMeniTelefonija").stop( true, true ).hide();
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
    function slajder(){
        var interval=setInterval(function(){
            var aktivan=$("#slajder .vidljiv");
            var sledeci=aktivan.next().length?$(".vidljiv").next():aktivan.parent().children(":first");
            aktivan.removeClass("vidljiv").addClass("nevidljiv");
            sledeci.addClass("vidljiv").removeClass("nevidljiv");
    }, 10000);
    var strelicaDesno=$(".strelicaDesno");
    var strelicaLevo=$(".strelicaLevo");
    strelicaDesno.click(function(){
        var aktivan=$("#slajder .vidljiv");
        var sledeci=aktivan.next().length?$(".vidljiv").next():aktivan.parent().children(":first");
        aktivan.removeClass("vidljiv").addClass("nevidljiv");
        sledeci.addClass("vidljiv").removeClass("nevidljiv");
    });
    strelicaLevo.click(function(){
        var aktivan=$("#slajder .vidljiv");
        var sledeci=aktivan.prev().length?$(".vidljiv").prev():aktivan.parent().children(":last");
        aktivan.removeClass("vidljiv").addClass("nevidljiv");
        sledeci.addClass("vidljiv").removeClass("nevidljiv");
    })
    }
    
    
});