var url=location.href
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
        $("#podMeni ul li a").click(function(e){
            e.preventDefault();
            $(this).parent("li").children("ul").slideToggle("slow");
        });
    }

if(url.indexOf("index.html")!=-1){
    window.onload=function(){
        podMeni();
        $.ajax({
            url: "data/proizvodi.json",
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
                console.log(xhr);
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
            setInterval(function(){
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
        data.sort(function(a,b){
            if(a.najpopularniji==b.najpopularniji) return 0;
            return a.najpopularniji>b.najpopularniji? -1: 1;
        });
        
        ispisNajnovijihNajpopularnijih(data.slice(0,5));
    }
    function ispisNajnovijih(data){
        data.sort(function(a,b){
            let datum1=new Date(a.najnoviji);
            let datum2=new Date(b.najnoviji);
            return (Date.UTC(datum2.getFullYear(), datum2.getMonth(), datum2.getDate())-Date.UTC(datum1.getFullYear(), datum1.getMonth(), datum1.getDate()));
        });
        ispisNajnovijihNajpopularnijih(data.slice(0,5));
    }
    function ispisNajnovijihNajpopularnijih(noviNiz){
        let ispis=`
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
if(url.indexOf("telefoni.html")!=-1){
    podMeni();
    localStorage.removeItem("filtriraniTelefoni");
    localStorage.removeItem("filtriraniTelefoniPoMarci");
    window.onload=function(){
        $.ajax({
            url: "data/proizvodi.json",
            type:"POST",
            dataType:"json",
            success:function(data){
                var telefoni=data.filter(p=>p.tip=="telefon");
                upisiULocalStorage("telefoni", telefoni);
                upisiULocalStorage("filtriraniTelefoni", telefoni);
                upisiULocalStorage("filtriraniTelefoniPoMarci", telefoni);
                ispis(sviTelefoni());
                inputCheckboxMarke();
                $("input[name='robnaMarka']").click(filtriranjePoMarci);
                $("input[name='ramMemorija']").click(filtriranjePoRamMem);
                $("input[name='internaMemorija']").click(filtriranjePoIntMem);
                $("input[name='rezolucija']").click(filtriranjePoRezoluciji);
            },
            error:function(err){
                console.error(err);
            }
        });
        document.getElementById("sortiraj").addEventListener("change", sortiraj);
        document.getElementById("search").addEventListener("keyup", filtriranjeSearch);
    }
    function upisiULocalStorage(string, vrednost){
        if(localStorage){
            localStorage.setItem(string, JSON.stringify(vrednost));
        }
    }
    function sviTelefoni(){
        let telefoni = JSON.parse(localStorage.getItem("telefoni"));
        return telefoni;
    }
    function ispis(proizvodi){
        let ispis="";
        proizvodi.forEach(proizvod => {
            ispis+=`
            <div class="col-4 flex2">
                <img src="${proizvod.slika.putanja}" alt="${proizvod.marka} ${proizvod.model}">
                <h3>${proizvod.marka} ${proizvod.model}</h3>
                <h4>${proizvod.cena}0</h4>
                <a href="#">Kupi</a>
            </div>`
        });
        document.getElementById("sadrzajTelefoni").innerHTML=ispis;
    }
    function inputCheckboxMarke(){
        let data=sviTelefoni();
        let marke=[];
        let ramMem=[];
        let rezolucija=[];
        let intMem=[];
        data.forEach(el => {
            if(!marke.includes(el.marka)){
                marke.push(el.marka)
            }
            if(!ramMem.includes(el.ramMemorija)){
                ramMem.push(el.ramMemorija)
            }
            if(!rezolucija.includes(el.rezolucija.substr(0, 14))){
                rezolucija.push(el.rezolucija.substr(0, 14))
            }
            if(!intMem.includes(el.internaMemorija)){
                intMem.push(el.internaMemorija)
            }
        });
        prikazCheckbox(marke.sort(), "robnaMarka", "#divRobneMarke");
        prikazCheckbox(ramMem.sort(), "ramMemorija", "#divRamMemorije");
        prikazCheckbox(rezolucija.sort(), "rezolucija", "#divRezolucije");
        prikazCheckbox(intMem.sort(), "internaMemorija", "#divInterneMemorije");
    }
    function prikazCheckbox(niz, name, div){
        let ispis="";
        niz.forEach(naziv=>{
            ispis+=`<span><input type="checkbox" form="filtriranjeProizvoda" name="${name}" id="${name}${naziv}" value="${naziv}">
            <label>${naziv}</label></span>`
        });
        document.querySelector(div).innerHTML+=ispis;
    }
    function sortiraj() {
        let val= this.value;
               let telefoni=sviTelefoni();
               if(localStorage.getItem("filtriraniTelefoni")){
                   telefoni=JSON.parse(localStorage.getItem("filtriraniTelefoni"));
               }
               telefoni.sort(function(a,b) {
                if(val=="cenaDesc"){
                    if(a.cena == b.cena)
                        return 0;
                    return a.cena > b.cena ? -1 : 1;
                }
                else if(val=="cenaAsc"){
                    if(a.cena == b.cena)
                        return 0;
                    return a.cena > b.cena ? 1 : -1;
                }
                else if(val=="nazivAsc"){
                    if(a.marka==b.marka) return 0;
                    return a.marka > b.marka ? 1 : -1;
                }else if(val=="nazivDesc"){
                    if(a.marka==b.marka) return 0;
                    return a.marka > b.marka ? -1 : 1;
                }
                else{
                    return;
                }
            });
            ispis(telefoni)
    }
    var nizMarki=[];
    var nizRamMem=[];
    var nizRezolucija=[];
    var nizIntMem=[];
    function filtriranjePoMarci(){
        
        let val=this.value;
        document.getElementById("sortiraj").selectedIndex=0;
        document.getElementById("search").value="";
        if(!nizMarki.includes(val)){
            nizMarki.push(val);
        }else{
            nizMarki=nizMarki.filter(p=>p!=val);
        }
        var telefoni= sviTelefoni();
        let telefoniNovi;
        
        telefoniNovi=telefoni.filter(function(p){
            if(nizMarki.length!=0){
                for(let i=0; i<nizMarki.length; i++){
                    if(p.marka==nizMarki[i]){ return true }
                }
            }else{
                return true;
            }
        });
        if(nizMarki==0){
            telefoniNovi=sviTelefoni()
        }
        upisiULocalStorage("filtriraniTelefoni", telefoniNovi);
        upisiULocalStorage("filtriraniTelefoniPoMarci", telefoniNovi);
        ispis(telefoniNovi);
    }
    function filtriranjePoRamMem(){
        
        let val=this.value;
        document.getElementById("sortiraj").selectedIndex=0;
        document.getElementById("search").value="";
        if(!nizRamMem.includes(val)){
            nizRamMem.push(val);
        }else{
            nizRamMem=nizRamMem.filter(p=>p!=val);
        }
        var telefoni= sviTelefoni();
        let telefoniNovi;
        if(localStorage.getItem("filtriraniTelefoni")){
            telefoni=JSON.parse(localStorage.getItem("filtriraniTelefoni"))
        }
        telefoniNovi=telefoni.filter(function(p){
            if(nizRamMem.length!=0){
                for(let i=0; i<nizRamMem.length; i++){
                    if(p.ramMemorija==nizRamMem[i]){ return true }
                }
            }else{
                return true;
            }
        });
        if(nizRamMem==0 && nizIntMem==0 && nizRezolucija==0){
            telefoniNovi=JSON.parse(localStorage.getItem("filtriraniTelefoniPoMarci"));
        }
        upisiULocalStorage("filtriraniTelefoni", telefoniNovi);
        console.log(telefoniNovi)
        ispis(telefoniNovi);
    }
    function filtriranjePoIntMem(){
        
        let val=this.value;
        document.getElementById("sortiraj").selectedIndex=0;
        document.getElementById("search").value="";
        if(!nizIntMem.includes(val)){
            nizIntMem.push(val);
        }else{
            nizIntMem=nizIntMem.filter(p=>p!=val);
        }
        var telefoni= sviTelefoni();
        let telefoniNovi;
        if(localStorage.getItem("filtriraniTelefoni")){
            telefoni=JSON.parse(localStorage.getItem("filtriraniTelefoni"))
        }
        telefoniNovi=telefoni.filter(function(p){
            if(nizIntMem.length!=0){
                for(let i=0; i<nizIntMem.length; i++){
                    if(p.internaMemorija==nizIntMem[i]){ return true }
                }
            }else{
                return true;
            }
        });
        if(nizIntMem==0 && nizRezolucija==0 && nizRamMem==0){
            telefoniNovi=JSON.parse(localStorage.getItem("filtriraniTelefoniPoMarci"));
        }
        upisiULocalStorage("filtriraniTelefoni", telefoniNovi);
        ispis(telefoniNovi);
    }
    function filtriranjePoRezoluciji(){
        
        let val=this.value;
        document.getElementById("sortiraj").selectedIndex=0;
        document.getElementById("search").value="";
        if(!nizRezolucija.includes(val)){
            nizRezolucija.push(val);
        }else{
            nizRezolucija=nizRezolucija.filter(p=>p!=val);
        }
        var telefoni= sviTelefoni();
        let telefoniNovi;
        if(localStorage.getItem("filtriraniTelefoni")){
            telefoni=JSON.parse(localStorage.getItem("filtriraniTelefoni"));
        }
        telefoniNovi=telefoni.filter(function(p){
            if(nizRezolucija.length!=0){
                for(let i=0; i<nizRezolucija.length; i++){
                    if(p.rezolucija.substr(0,14)==nizRezolucija[i].substr(0,14)){ return true }
                }
            }else{
                return true;
            }
        });
        if(nizRezolucija==0 && nizIntMem==0 && nizRamMem==0){
            telefoniNovi=JSON.parse(localStorage.getItem("filtriraniTelefoniPoMarci"));
        }
        upisiULocalStorage("filtriraniTelefoni", telefoniNovi);
        ispis(telefoniNovi);
    }
    function filtriranjeSearch(){
        $("input[type='checkbox']").prop("checked", false);
        document.getElementById("sortiraj").selectedIndex=0;

        let val=this.value.trim().toLowerCase();
        let telefoni=sviTelefoni();
        telefoni=telefoni.filter(t=>{
            if(t.marka.toLowerCase().indexOf(val)!=-1 || t.model.toLowerCase().indexOf(val)!=-1)
            return true;
        });
        if(val==""){
            telefoni=sviTelefoni();
        }
        upisiULocalStorage("filtriraniTelefoni", telefoni);
        ispis(telefoni);
    }
}
