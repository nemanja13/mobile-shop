var url=location.href
function podMeni(){
    $("#telefonija").hover(function(){
        $("#podMeniTelefonija").show();
    },
    function(){
        $("#podMeniTelefonija").hide();
    });
    $("#podMeniTelefonija").hover(function(){ $(this).show()},function(){ $(this).hide()});
    $("#telefonija").find("a").click(function(e){e.preventDefault()})
    
    $("#bars").click(function(){
        $("#podMeni").slideToggle();
        $("#bars").toggleClass("MeniBar")
    });
    $("#podMeni ul a").click(function(){
        $(this).parent("li").children("ul").slideToggle("slow");
        $(this).find("i").toggleClass("fas fa-angle-down");
        $(this).find("i").toggleClass("fas fa-angle-up");
    });
}
function dodajUKorpu(e){
    e.preventDefault();
    let val=$(this).data("id");
    let proizvodi=[];
    if(localStorage.getItem("kupljenProizvod")){
       proizvodi=JSON.parse(localStorage.getItem("kupljenProizvod"));
       if(proizvodi.filter(p=>p.id==val).length){
            proizvodi.forEach(proizvod=>{
                if(proizvod.id==val){
                    proizvod.kolicina++;
                }
            });
            upisiULocalStorage("kupljenProizvod", proizvodi);
       }else{
            proizvodi.push({
                id:val,
                kolicina:1
            });
            upisiULocalStorage("kupljenProizvod", proizvodi);
       }
    }else{
        proizvodi[0]={
            id:val,
            kolicina:1
        }
        upisiULocalStorage("kupljenProizvod", proizvodi);
    }
    brojProizvodaUKorpi();
}
function korpa(){
    let prazno="<div class='prazno flex'><h1>Vaša korpa je prazna <i class='fas fa-shopping-cart'></i></h1></div>";
    let suma=0;
    if(localStorage.getItem("kupljenProizvod")){
        $.ajax({
            url: "data/proizvodi.json",
            method:"get",
            dataType: "json",
            success: function(data){
                let proizvodi= JSON.parse(localStorage.getItem("kupljenProizvod"));
                let kupljeniProizvodi=data.filter(p=>{
                    for(let i=0; i<proizvodi.length; i++){
                        if(proizvodi[i].id==p.id){
                            p.kolicina=proizvodi[i].kolicina;
                            return true;
                        }
                    }
                });
                if(kupljeniProizvodi.length){
                let ispis=`
                <table id="tabelaKupljenihProizvoda">
                    <tr>
                        <th>Slika</th>
                        <th>Naziv</th>
                        <th>Cena</th>
                        <th>Količina</th>
                        <th>Ukupna cena</th>
                        <th>Ukloni</th>
                    </tr>`;
                kupljeniProizvodi.forEach(p=>{
                    ispis+=`<tr>
                        <td><img class="thumbnail" src="${p.slika.thumbnail}" alt="${p.marka} ${p.model}"/></td>
                        <td>${p.marka} ${p.model}</td>
                        <td>${p.cena.nova} RSD</td>
                        <td>${p.kolicina}</td>
                        <td>${iznos(p.cena.nova,p.kolicina)} RSD</td>
                        <td><a href="#" data-id="${p.id}">Ukloni</a></td>
                    </tr>`;
                    suma+=parseInt(zbir(iznos(p.cena.nova,p.kolicina)));
                });
                ispis+=`</table>
                <div id="kupovina">
                <div class="red"><h4>Ukupna cena: </h4> <p id="ukupnaCena"> ${suma.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} RSD</p></div>
                <a href="#" id="nastaviKupovinu">Nastavi kupovinu</a></div>
                `;
                document.getElementById("proizvodi").innerHTML=ispis;
                $("#tabelaKupljenihProizvoda a").click(function(e){
                    let val=$(this).data("id");
                    e.preventDefault();
                    let proizvodi=JSON.parse(localStorage.getItem("kupljenProizvod"));
                    let filtriraniProizvodi=proizvodi.filter(p=>p.id!=val);
                    upisiULocalStorage("kupljenProizvod", filtriraniProizvodi);
                    korpa();
                    brojProizvodaUKorpi();
                })
            }else{
                document.getElementById("proizvodi").innerHTML=prazno;
            }
                
                
            },
            error: function(err){
                console.error(err);
            }
        })
        
    }
    else{
        document.getElementById("proizvodi").innerHTML=prazno;
    }
}
function iznos(c, k){
    let cena=c.replace(/(\.)/g, "");
    let kolicina=k;
    let iznos=cena*kolicina;
    iznos=iznos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return iznos;
}
function zbir(c){
    let cena=c.replace(/(\.)/g, "");
    return cena;
}
function brojProizvodaUKorpi(){
    if(localStorage.getItem("kupljenProizvod")){
        let proizvodi=JSON.parse(localStorage.getItem("kupljenProizvod"));
        if(proizvodi.length){
            let broj=0;
        proizvodi.forEach(p=>{
            broj+=p.kolicina;
        });
        $("#header .broj").text(broj).css("display", "flex");
        }else{
            $("#header .broj").hide();
        }
    }else{
        $("#header .broj").hide();
    }
}
if(url.indexOf("index.html")!=-1){
    window.onload=function(){
        prikazMenija();
        prikazSlajdera();
        oNama();
        $.ajax({
            url: "data/proizvodi.json",
            type:"GET",
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
            error:function(err){
                console.error(err);
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
                <a href="#" class="nevidljiv dodajUKorpu" data-id="${noviNiz[0].id}"><i class="fas fa-shopping-cart"></i> Dodaj u korpu</a>
            </div>
            <div class="col-lg-6 col-11 flex3 prviRed">`;

        for(let i=1; i<noviNiz.length; i++){
            ispis+=`
            <div class="col-12 col-sm-5 maliBlok flex2">
                <img src="${noviNiz[i].slika.putanja}" alt="${noviNiz[i].marka} ${noviNiz[i].model}"/>
                <h3>${noviNiz[i].marka} ${noviNiz[i].model}</h3>
                <a href="#" class="nevidljiv dodajUKorpu" data-id="${noviNiz[i].id}"><i class="fas fa-shopping-cart"></i> Dodaj u korpu</a>
            </div>`;
        }
                
        ispis+=`</div>`;
        document.getElementById("sadrzaj").innerHTML=ispis;
        $(".dodajUKorpu").click(dodajUKorpu);
    }
}
if(url.indexOf("telefoni.html")!=-1){
    prikazMenija();
    tip("telefon");
    prikaziFilter();
}
if(url.indexOf("tableti.html")!=-1){
    prikazMenija();
    tip("tablet");
    prikaziFilter();
}
if(url.indexOf("dozTelefon.html")!=-1){
    prikazMenija();
    tip("dozTelefon");
    prikaziFilter();
}
if(url.indexOf("dozTablet.html")!=-1){
    prikazMenija();
    tip("dozTablet");
    prikaziFilter();
}
if(url.indexOf("korpa.html")!=-1){
    prikazMenija();
    korpa();
}

if(url.indexOf("autor.html")!=-1){
    prikazMenija();
}
function upisiULocalStorage(string, vrednost){
    if(localStorage){
        localStorage.setItem(string, JSON.stringify(vrednost));
    }
}
function sviProizvodi(){
    let proizvodi = JSON.parse(localStorage.getItem("proizvodi"));
    return proizvodi;
}
function usteda(s, n){
    let staraCena=s.replace(/(\.)/g, "");
    let novaCena=n.replace(/(\.)/g, "");
    let usteda=staraCena-novaCena;
    usteda=usteda.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return usteda;
}
function inputCheckbox(){
    let data=sviProizvodi();
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
    prikazCheckbox(marke.sort(), "robnaMarka", ".divRobneMarke");
    prikazCheckbox(ramMem.sort(), "ramMemorija", ".divRamMemorije");
    prikazCheckbox(rezolucija.sort(), "rezolucija", ".divRezolucije");
    prikazCheckbox(intMem.sort(), "internaMemorija", ".divInterneMemorije");
}
function prikazCheckbox(niz, name, div){
    let ispis="";
    niz.forEach(naziv=>{
        ispis+=`<span><input type="checkbox" form="filtriranjeProizvoda" name="${name}" id="${name}${naziv}" value="${naziv}">
        <label>${naziv}</label></span>`
    });
    $(div).html(ispis);
}
function sortiraj() {
    let val= this.value;
           let proizvodi=sviProizvodi();
           if(localStorage.getItem("filtriraniProizvodi")){
               proizvodi=JSON.parse(localStorage.getItem("filtriraniProizvodi"));
               console.log(proizvodi)
           }
           console.log(proizvodi)
           proizvodi.sort(function(a,b) {
            if(val=="cenaDesc"){
                let prvi=parseFloat(a.cena.nova);
                let drugi=parseFloat(b.cena.nova)
                if(prvi == drugi)
                    return 0;
                return prvi > drugi ? -1 : 1;
            }
            else if(val=="cenaAsc"){
                let prvi=parseFloat(a.cena.nova);
                let drugi=parseFloat(b.cena.nova)
                if(prvi == drugi)
                    return 0;
                return prvi > drugi ? 1 : -1;
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
        if(url.indexOf("telefoni.html")!=-1 || url.indexOf("tableti.html")!=-1)
        ispisProizvoda(proizvodi);
        if(url.indexOf("dozTelefon.html")!=-1 || url.indexOf("dozTablet.html")!=-1)
        ispisProizvoda2(proizvodi);
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
    var proizvodi= sviProizvodi();
    let proizvodiNovi;
    if(localStorage.getItem("filtriraniProizvodi") && (nizRamMem.length!=0 || nizIntMem.length!=0 || nizRezolucija.length!=0)){
        proizvodi=JSON.parse(localStorage.getItem("filtriraniProizvodi"))
    }
    proizvodiNovi=proizvodi.filter(function(p){
        if(nizMarki.length!=0){
            for(let i=0; i<nizMarki.length; i++){
                if(p.marka==nizMarki[i]){ return true }
            }
        }else{
            return true;
        }
    });
    if(nizMarki.length==0){
        proizvodiNovi=sviProizvodi();
    }
    upisiULocalStorage("filtriraniProizvodiPoMarci", proizvodiNovi);
    upisiULocalStorage("filtriraniProizvodi", proizvodiNovi);
    if(proizvodiNovi.length){
        if(url.indexOf("telefoni.html")!=-1 || url.indexOf("tableti.html")!=-1)
        ispisProizvoda(proizvodiNovi);
        if(url.indexOf("dozTelefon.html")!=-1 || url.indexOf("dozTablet.html")!=-1)
        ispisProizvoda2(proizvodiNovi);
    }else{
        nemaProizvoda();
    }
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
    var proizvodi= sviProizvodi();
    let proizvodiNovi;
    if(localStorage.getItem("filtriraniProizvodiPoMarci")){
        proizvodi=JSON.parse(localStorage.getItem("filtriraniProizvodiPoMarci"));
    }
    if(localStorage.getItem("filtriraniProizvodiPoIntMem")){
        proizvodi=JSON.parse(localStorage.getItem("filtriraniProizvodiPoIntMem"));
    }
    if(localStorage.getItem("filtriraniProizvodiPoRez")){
        proizvodi=JSON.parse(localStorage.getItem("filtriraniProizvodiPoRez"));
    }
    proizvodiNovi=proizvodi.filter(function(p){
        if(nizRamMem.length!=0){
            for(let i=0; i<nizRamMem.length; i++){
                if(p.ramMemorija==nizRamMem[i]){ return true }
            }
        }else{
            return true;
        }
    });
    if(nizRamMem.length==0 && nizIntMem.length==0 && nizRezolucija.length==0){
        proizvodiNovi=JSON.parse(localStorage.getItem("filtriraniProizvodiPoMarci"));
    }
    upisiULocalStorage("filtriraniProizvodi", proizvodiNovi);
    if(nizRamMem.length==0){
        localStorage.removeItem("filtriraniProizvodiPoRamMem");
    }
    else{
        upisiULocalStorage("filtriraniProizvodiPoRamMem", proizvodiNovi);
    }
    if(proizvodiNovi.length){
        if(url.indexOf("telefoni.html")!=-1 || url.indexOf("tableti.html")!=-1)
        ispisProizvoda(proizvodiNovi);
        if(url.indexOf("dozTelefon.html")!=-1 || url.indexOf("dozTablet.html")!=-1)
        ispisProizvoda2(proizvodiNovi);
    }else{
        nemaProizvoda();
    }
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
    var proizvodi= sviProizvodi();
    let proizvodiNovi;
    if(localStorage.getItem("filtriraniProizvodiPoMarci")){
        proizvodi=JSON.parse(localStorage.getItem("filtriraniProizvodiPoMarci"));
    }
    if(localStorage.getItem("filtriraniProizvodiPoRamMem")){
        proizvodi=JSON.parse(localStorage.getItem("filtriraniProizvodiPoRamMem"));
    }
    if(localStorage.getItem("filtriraniProizvodiPoRez")){
        proizvodi=JSON.parse(localStorage.getItem("filtriraniProizvodiPoRez"));
    }
    proizvodiNovi=proizvodi.filter(function(p){
        if(nizIntMem.length!=0){
            for(let i=0; i<nizIntMem.length; i++){
                if(p.internaMemorija==nizIntMem[i]){ return true }
            }
        }else{
            return true;
        }
    });
    if(nizIntMem.length==0 && nizRezolucija.length==0 && nizRamMem.length==0){
        proizvodiNovi=JSON.parse(localStorage.getItem("filtriraniProizvodiPoMarci"));
    }
    upisiULocalStorage("filtriraniProizvodi", proizvodiNovi);
    if(nizIntMem.length==0){
        localStorage.removeItem("filtriraniProizvodiPoIntMem");
    }
    else{
        upisiULocalStorage("filtriraniProizvodiPoIntMem", proizvodiNovi);
    }
    if(proizvodiNovi.length){
        if(url.indexOf("telefoni.html")!=-1 || url.indexOf("tableti.html")!=-1)
        ispisProizvoda(proizvodiNovi);
        if(url.indexOf("dozTelefon.html")!=-1 || url.indexOf("dozTablet.html")!=-1)
        ispisProizvoda2(proizvodiNovi);
    }else{
        nemaProizvoda();
    }
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
    var proizvodi= sviProizvodi();
    let proizvodiNovi;
    if(localStorage.getItem("filtriraniProizvodiPoMarci")){
        proizvodi=JSON.parse(localStorage.getItem("filtriraniProizvodiPoMarci"));
    }
    if(localStorage.getItem("filtriraniProizvodiPoRamMem")){
        proizvodi=JSON.parse(localStorage.getItem("filtriraniProizvodiPoRamMem"));
    }
    if(localStorage.getItem("filtriraniProizvodiPoIntMem")){
        proizvodi=JSON.parse(localStorage.getItem("filtriraniProizvodiPoIntMem"));
    }
    proizvodiNovi=proizvodi.filter(function(p){
        if(nizRezolucija.length!=0){
            for(let i=0; i<nizRezolucija.length; i++){
                if(p.rezolucija.substr(0,14)==nizRezolucija[i].substr(0,14)){ return true }
            }
        }else{
            return true;
        }
    });
    if(nizRezolucija.length==0 && nizIntMem.length==0 && nizRamMem.length==0){
        proizvodiNovi=JSON.parse(localStorage.getItem("filtriraniProizvodiPoMarci"));
    }
    if(nizRezolucija.length==0){
        localStorage.removeItem("filtriraniProizvodiPoRez");
    }
    else{
        upisiULocalStorage("filtriraniProizvodiPoRez", proizvodiNovi);
    }
    upisiULocalStorage("filtriraniProizvodi", proizvodiNovi);
    if(proizvodiNovi.length){
        if(url.indexOf("telefoni.html")!=-1 || url.indexOf("tableti.html")!=-1)
        ispisProizvoda(proizvodiNovi);
        if(url.indexOf("dozTelefon.html")!=-1 || url.indexOf("dozTablet.html")!=-1)
        ispisProizvoda2(proizvodiNovi);
    }else{
        nemaProizvoda();
    }
}
function filtriranjeSearch(){
    $("input[type='checkbox']").prop("checked", false);
    document.getElementById("sortiraj").selectedIndex=0;
    nizIntMem=[];
    nizMarki=[];
    nizRamMem=[];
    nizRezolucija=[];

    let val=this.value.trim().toLowerCase();
    let proizvodi=sviProizvodi();
    proizvodi=proizvodi.filter(t=>{
        if((t.marka + " " + t.model).toLowerCase().indexOf(val)!=-1)
        return true;
    });
    if(val==""){
        proizvodi=sviProizvodi();
    }
    upisiULocalStorage("filtriraniProizvodi", proizvodi);
    if(proizvodi.length){
        if(url.indexOf("telefoni.html")!=-1 || url.indexOf("tableti.html")!=-1)
        ispisProizvoda(proizvodi);
        if(url.indexOf("dozTelefon.html")!=-1 || url.indexOf("dozTablet.html")!=-1)
        ispisProizvoda2(proizvodi);
    }else{
        nemaProizvoda();
    }
}
function tip(tip){
    localStorage.removeItem("filtriraniProizvodiPoRamMem");
    localStorage.removeItem("filtriraniProizvodiPoIntMem");
    localStorage.removeItem("filtriraniProizvodiPoRez");
    localStorage.removeItem("filtriraniProizvodi");
    window.onload=function(){
        $.ajax({
            url: "data/proizvodi.json",
            type:"GET",
            dataType:"json",
            success:function(data){
                var proizvodi=data.filter(p=>p.tip==tip);
                upisiULocalStorage("proizvodi", proizvodi);
                upisiULocalStorage("filtriraniProizvodiPoMarci", proizvodi);
                ispisProizvoda(sviProizvodi());
                if(tip=="telefon" || tip=="tablet")
                    inputCheckbox();
                else
                    inputCheckbox2();
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
}
function ispisProizvoda(proizvodi){
    let ispis="";
    proizvodi.forEach(proizvod => {
        ispis+=`
        <div class="col-lg-3 col-md-5 col-8  flex2 proizvod">
            <img src="${proizvod.slika.putanja}" alt="${proizvod.marka} ${proizvod.model} class="slikaProizvod">
            <h3>${proizvod.marka} ${proizvod.model}</h3>`;
           
            if(proizvod.tip=="telefon" || proizvod.tip=="tablet"){
                ispis+=` 
                <ul>
                    <li>Ekran: ${proizvod.ekran}</li>
                    <li>RAM Memorija: ${proizvod.ramMemorija}</li>
                    <li>Interna Memorija: ${proizvod.internaMemorija}</li>
                    <li>Kamera: ${proizvod.kamera.zadnja}/${proizvod.kamera.prednja}</li>
                </ul> `;
            }
           
            ispis+=`<p class="naStanju"> Na stanju</p>
            <del class="staraCena">${proizvod.cena.stara} RSD</del>
            <p class="usteda">ušteda ${usteda(proizvod.cena.stara,proizvod.cena.nova)} RSD</p>
            <h4 class="cena">${proizvod.cena.nova} RSD</h4>
            <a href="#" class="dodajUKorpu" data-id="${proizvod.id}"><i class="fas fa-shopping-cart"></i> Dodaj u korpu</a>
        </div>`;
    });
    document.getElementById("sadrzajProizvodi").innerHTML=ispis;
    $(".dodajUKorpu").click(dodajUKorpu);
    
}
function inputCheckbox2(){
    let data=sviProizvodi();
    let marke=[];
    data.forEach(el => {
        if(!marke.includes(el.marka)){
            marke.push(el.marka)
        }
    });
    prikazCheckbox(marke.sort(), "robnaMarka", ".divRobneMarke");
}
function prikaziFilter(){
    $(".prikazi").click(function(){
        $(this).find("i").toggleClass("fas fa-angle-down");
        $(this).find("i").toggleClass("fas fa-angle-up");
        $(this).next().stop(true, true).slideToggle("slow");
    })
}
function provera(){
    let imePrezime= document.getElementById("imePrezime").value;
    let email= document.getElementById("email").value;
    let telefon= document.getElementById("telefon").value;
    let poruka= document.getElementById("poruka").value;
    let razlogKontakta= document.getElementById("razlogKontakta").value;

    let regExpImePrezime=/^[A-Z][a-z]{2,19}(\s[A-Z][a-z]{2,19})+$/;
    let regExpEmail=/^[^@]+@[^@]+\.[^@\.]+$/;
    let regExpTelefon=/^06\d{7,8}$/;
    let regExpPoruka=/^[^@]+(\s[^@]+)*$/;
    let greske=0;
    if(!regExpImePrezime.test(imePrezime)){
        $("#greskaImePrezime").show();
        greske++;
    }else{
        $("#greskaImePrezime").hide();
    }
    if(!regExpEmail.test(email)){
        $("#greskaEmail").show();
        greske++;
    }else{
        $("#greskaEmail").hide();
    }
    if(!regExpTelefon.test(telefon)){
        $("#greskaTelefon").show();
        greske++;
    }else{
        $("#greskaTelefon").hide();
    }
    if(!regExpPoruka.test(poruka)){
        $("#greskaPoruka").show();
        greske++;
    }
    else{
        $("#greskaPoruka").hide();
    }
    if(razlogKontakta==0){
        $("#greskaRazlogKontakta").show();
        greske++;
    }
    else{
        $("#greskaRazlogKontakta").hide();
    }
    if(greske)
    return false;
    else
    return true;
}
function oNama(){
    let h2=document.createElement("h2");
    h2.setAttribute("class", "podnaslov");
    h2.append("O nama");
    let div= document.createElement("div");
    div.setAttribute("class", "row flex3");
    $.ajax({
        url : "data/oNama.json",
        method : "GET",
        dataType: "json",
        success : function(data){
            data.forEach(el => {
                let blokONama=document.createElement("div");
                blokONama.setAttribute("class", "col-10 col-md-3 blokONama");

                let slika=document.createElement("img");
                slika.setAttribute("src", el.slika.putanja);
                slika.setAttribute("alt", el.slika.opis);

                let blok=document.createElement("div");

                let h3=document.createElement("h3");
                let sadrzajH3=document.createTextNode(el.naslov);
                h3.appendChild(sadrzajH3);

                let p=document.createElement("p");
                let sadrzajP=document.createTextNode(el.tekst);
                p.appendChild(sadrzajP);

                blok.appendChild(h3);
                blok.appendChild(p);

                blokONama.appendChild(slika);
                blokONama.appendChild(blok);

                div.append(blokONama);
            });
            document.getElementById("oNama").append(h2);
            document.getElementById("oNama").append(div);
        },
        error : function(err){
            console.error(err);
        }
    });
}
function prikazSlajdera(){
$.ajax({
    url : "data/slajder.json",
    method : "GET",
    dataType: "json",
    success : function(data){
        let ispis="";
        let klasa;
        let velicina;
        data.forEach((el, i)=>{
            i==0?klasa="vidljiv":klasa="nevidljiv";
            i==1?velicina="col-12":velicina="col-10 col-md-7 col-lg-5";
            ispis+=`
            <div class="col-12 slajderSlika${i+1} ${klasa}">
            <img src="${el.slika.src}" alt="${el.slika.opis}"/>
            <div class="${velicina} slikaTekst" id="${el.id}">
                <h1>${el.naslov}</h1>
                <p>${el.tekst}</p>
                <a href="${el.link.putanja}">${el.link.tekst}</a>
            </div>
            </div>`;
        });
        document.getElementById("slajder").innerHTML=ispis;
    },
    error : function(err){
        console.error(err);
    }
});

}
function nemaProizvoda(){
    ispis="<div class='prazno flex'> <h1>Vaša pretraga nije dala rezultate. <i class='fas fa-search'></i></h1> </div>";
    document.getElementById("sadrzajProizvodi").innerHTML=ispis;
}
function prikazMenija(){
    $.ajax({
        url : "data/meni.json",
        method : "GET",
        dataType : "json",
        success : function(data){
            let prviNivo=data.filter(p=>p.roditelj_id==0);
            let ispis="<ul>";
            prviNivo.forEach(el => {
                if(el.tekst=="Telefonija"){
                    ispis+=`<li id="${el.tekst.toLowerCase()}"><a href="${el.href}">${el.tekst} <i class="fas fa-angle-down"></i></a></li>`;
                }else{
                    ispis+=`<li><a href="${el.href}">${el.tekst}</a></li>`;
                }
            });
            ispis+="</ul>"
            document.getElementById("meni").innerHTML=ispis;

            let ispisPodMeni="<ul>";

            data.forEach(el => { 
                if(el.roditelj_id==0){
                    if(prikazPodMenija(el.id))
                        var strelica="<i class='fas fa-angle-down'></i>"
                    else
                        strelica="";
                    ispisPodMeni+=`<li><a href="${el.href}">${el.tekst} ${strelica}</a>`;
                    ispisPodMeni+=prikazPodMenija(el.id);
                    ispisPodMeni+="</li>";
                }
            });
            ispisPodMeni+="</ul>";
            document.getElementById("podMeni").innerHTML=ispisPodMeni;
            

            function prikazPodMenija(id){
                let drugiNivo=data.filter(p=>p.roditelj_id==id);
                let ispisDrugiNivo="";
                if(drugiNivo.length){
                    ispisDrugiNivo+=`<ul class="nevidljiv pl-4">`
                    drugiNivo.forEach(el => {
                        if(prikazPodMenija(el.id))
                            var strelica="<i class='fas fa-angle-down'></i>"
                        else
                            strelica="";
                            ispisDrugiNivo+=`<li><a href="${el.href}">${el.tekst} ${strelica}</a>`;
                            ispisDrugiNivo+=prikazPodMenija(el.id);
                            ispisDrugiNivo+="</li>";
                    });
                    
                    ispisDrugiNivo+=`</ul>`;
                    
                }
                return ispisDrugiNivo;
            }
            podMeni();
            brojProizvodaUKorpi();
        },
        error : function(err){
            console.error(err);
        }
    });
    

    
}