var url=location.href
    podMeni();
    function podMeni(){
        $("#telefonija").hover(function(){
            $("#podMeniTelefonija").show();
        },
        function(){
            $("#podMeniTelefonija").hide();
        });
        $("#podMeniTelefonija").hover(function(){ $(this).show()},function(){ $(this).hide()});
        
        $("#bars").click(function(){
            $("#podMeni").slideToggle();
            $("#bars").toggleClass("MeniBar")
        });
        $("#podMeni ul a").click(function(e){
            e.preventDefault();
            $(this).parent("li").children("ul").slideToggle("slow");
        });
    }

if(url.indexOf("index.html")!=-1){
    window.onload=function(){
        $.ajax({
            url: "js/proizvodi.json",
            type:"POST",
            dataType:"json",
            success:function(data){
                ispisNajpopularnijih(data);
                prikaziSaznajViseIBlokovi();
                $("#najnovije").click(function(e){
                    e.preventDefault();
                    $("#najpopularnije").removeClass("aktivan");
                    $("#najnovije").addClass("aktivan");
                    ispisNajnovijih(data);
                    prikaziSaznajViseIBlokovi();
                });
                $("#najpopularnije").click(function(e){
                    e.preventDefault();
                    $("#najnovije").removeClass("aktivan");
                    $("#najpopularnije").addClass("aktivan");
                    ispisNajpopularnijih(data);
                    prikaziSaznajViseIBlokovi();
                });
            },
            error:function(xhr){
    
            }
        });
    
    
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
    
        function prikaziSaznajViseIBlokovi(){
            var velikiBlok=$(".velikiBlok");
            var maliBlok=$(".maliBlok");
            prikaziSaznajVise(velikiBlok);
            prikaziSaznajVise(maliBlok);
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
    
    
    }
    function ispisNajpopularnijih(data){
        var noviNiz=data.filter(p=>p.najpopularniji)
        ispisNajnovijihNajpopularnijih(noviNiz);
    }
    function ispisNajnovijih(data){
        var noviNiz=data.filter(p=>p.najnoviji)
        ispisNajnovijihNajpopularnijih(noviNiz);
    }
    function ispisNajnovijihNajpopularnijih(noviNiz){
        var ispis=`
        <div class="col-lg-5 col-11 flex2 velikiBlok">
            <img src="${noviNiz[0].slika.putanja}" alt="${noviNiz[0].marka} ${noviNiz[0].model}"/>
            <h3>${noviNiz[0].marka} ${noviNiz[0].model}</h3>
            <a href="#" class="nevidljiv">Saznaj više</a>
        </div>
        <div class="col-lg-6">
            <div class="flex3 prviRed">
                <div class="col-5 maliBlok flex2">
                    <img src="${noviNiz[1].slika.putanja}" alt="${noviNiz[1].marka} ${noviNiz[1].model}"/>
                    <h3>${noviNiz[1].marka} ${noviNiz[1].model}</h3>
                    <a href="#" class="nevidljiv">Saznaj više</a>
                </div>
                <div class="col-5 maliBlok flex2">
                    <img src="${noviNiz[2].slika.putanja}" alt="${noviNiz[2].marka} ${noviNiz[2].model}"/>
                    <h3>${noviNiz[2].marka} ${noviNiz[2].model}</h3>
                    <a href="#" class="nevidljiv">Saznaj više</a>
                </div>
            </div>
            <div class="flex3 drugiRed">
                <div class="col-5 maliBlok flex2">
                    <img src="${noviNiz[3].slika.putanja}" alt="${noviNiz[3].marka} ${noviNiz[3].model}"/>
                    <h3>${noviNiz[3].marka} ${noviNiz[3].model}</h3>
                    <a href="#" class="nevidljiv">Saznaj više</a>
                </div>
                <div class="col-5 maliBlok flex2">
                    <img src="${noviNiz[4].slika.putanja}" alt="${noviNiz[4].marka} ${noviNiz[4].model}"/>
                    <h3>${noviNiz[4].marka} ${noviNiz[4].model}</h3>
                    <a href="#" class="nevidljiv">Saznaj više</a>
                </div>
            </div>
        </div>`;
        document.getElementById("sadrzaj").innerHTML=ispis;
    }
}