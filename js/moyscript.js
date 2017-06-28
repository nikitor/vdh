// IIFE - Immediately Invoked Function Expression
//Syuda ya zavozhu funkciyu kotoraya perevedyot vneshniy
//window.jQuery i kotoryj ya zavedu v

(function(moykod) {

  // Las variables declaradas aqui serán unicamente visible desde funciones que tambien, declararé dentro de éste scope (bloque de la IIFE).
  var idsOcultables;

  /* Elementos capacitados para ocultar elementos que tienen identificador con
  el selector CSS en su atributo "data-togg".
  P.ej. <elemento data-togg="#id-ab"> podrá mostrar/ocultar el elemento
  identificado por el selector CSS "#id-ab" */
  var sectionTogglers;


   // The global jQuery object is passed as a parameter, takim obrazom
   // ya zahvatil i perevozhu vneshniy window.jQuery, i vyzvav sleduyushuyu
   //funcciyu [function($, window, document)], v kotoryj etot argument pereimenovan v $,
   // smogu ispolzavat' "$"" kak alias dlya zahvachennogo "window.jQuery", no ""$"" ne budet
   // nikak putatsya s "$"" vne toj funkcii.
   moykod(window.jQuery, window, document);

   }(function($, window, document) {
     // The $ is now locally scoped

     const togglerUIStateClasses = "fa-angle-down fa-angle-up";
     var sectionTogglers;
     var idsOcultables;

       $(function() {


         sectionTogglers = getSectionTogglers();
         idsOcultables = getStringIdsOcultables();

           // The DOM is ready!
           //cerrar secciones

           zakroySekcii();
           bindTogglers();

           bindOpenparentsNavLinks();

          //  $($("[data-togg]").map(function() {
          //      return $(this).data("togg");
          //    }).get().join(',')).hide();
           //
          //  });

       });

       // Tut kod kotoryj budet srabytyvat, do togo kak DOM gotov, naprimer mozhno pokazat krutyashiysya znachok "loading..." .

       /*Cierra secciones identificadas por los ids del string idsOcultables*/
       function zakroySekcii(){
         //check string idsOcultables, empty? undefined?
         $(idsOcultables).hide();
         console.log("---secciones ocultas.")
       }

       // Devuelve string de ids de secciones ocultables separados por comas
       function getStringIdsOcultables(){
        //  return $("[data-togg]").map(function() {
         return sectionTogglers.map(function() {
              return $(this).data("togg");
            }).get().join(',');
       }

      /* Los togglers tienen un atributo donde identifican con un selector CSS qué elementos pueden mostrar/ocultar  */
       function getSectionTogglers(){
        //  var togglers = new Object();
        //  return $("[data-togg]").each(function(index){togglers[$(this)]=$(this).data("data-togg")});
        return $("[data-togg]");
       }

       function bindTogglers (){
         sectionTogglers.click(toggSec);
       }

       function toggSec(){
         console.log("this is - " + this );
         console.log("$this is - " + $(this) );
         console.log('...+this is - ' + this);
         let idsec = $(this).data("togg");
         console.log("data-togg: " + idsec);
         // pokazat/spryatat element ukazannyj v data-togg
         $(idsec).slideToggle("slow");
         // pomenyat stil knopki, s odnogo sostoyaniya v drugoy. Strelka vniz/vverh.
         console.log("togglerUIStateClasses: " + togglerUIStateClasses);
         $(this).toggleClass(togglerUIStateClasses);
       }


      // bind open parents of section on click on nav anchors, before scrolling to section
      function bindOpenparentsNavLinks(){
        $("nav li a").on("click",function(e){
          let requestedSecId = $(this).attr("href");
          console.log("ir a seccion cuyo id es " + requestedSecId);
          unveilSection(requestedSecId);
        })
      }



    //    // id : id seccion en notacion de selector CSS.P.ej.: #id-seccion
    //    function getParentIds(id){
     //
    //     a=[];
    //     a.push[id];
    //     // a=new Array.push(id);
    //     let parentsIds = $(+id).parents("section").map(function(){return this.id});
    //     // vse id vklyuchaya pervyj celevoj
    //     a.push(parentsIds);
    //    }
     //
    //    function printTogglerIds(aIds){
    //      $.each(aIds,function(i,v){console.log($("[data-togg='"+v+"']"))})
    //    }


     }));


    //  function getParentIds(id){
      //  var id="esp-uro";
      // a=[];
      // a.push(id);
      // console.log("id seccion -->" + a)
      // a=new Array.push(id);
      // let parentsIds = $(id).parents("section").map(function(){return "#"+this.id}).get();
      // a.merge(parentsIds);
      // console.dir(a);
      // parentsIds.each(function(i,v){console.log("-->"+v)});
      // vse id vklyuchaya pervyj celevoj
      // return a;


      // id : id seccion en notacion de selector CSS.P.ej.: #id-seccion
      function getParentIds(id){
         let a=[];
         a.push(id);
         //console.log("id seccion -->" + a)
         let parentsIds = $(id).parents("section").map(function(){return "#"+this.id}).get();
         c = a.concat(parentsIds);
         a = parentsIds = null; // `a` and `parentsIds` can go away now. unset a and b so they are garbage collected

         // FIXME remove debug prints:
         // print parent sections ids
         $(c).each(function(i,v){console.debug("section -> "+v)})
         return c;
     }



     function unveilSections(aIds){

       $.each(aIds.reverse(),function(i,v){
         let targetSecId = v;
         let $sec = $(targetSecId);
         if($sec.length<1){console.log("no se ha encontrado ningun elemento para id = " + v); return -1;}
         console.log("unveilSection_section id = " + v);
         if($sec.is(":hidden")){
           console.log("section id= "+v+" hidden");
           let knopka = $("[data-togg='" + targetSecId + "']");
           if (knopka.length > 0){
             console.debug("clicking button" + knopka);
             knopka.click()
             console.log("section id " + v + "now visible? " + $sec.is(":visible"));
           }
         }else{
           console.log("section id= "+v+" visible");
         }
       });
     }

    //  Gets section id parents, then unveils them in reverse order, from top to down until reaching target id
     function unveilSection(secId){
       unveilSections(getParentIds(secId));
     }
