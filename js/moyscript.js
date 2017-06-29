// IIFE - Immediately Invoked Function Expression
//Syuda ya zavozhu funkciyu kotoraya perevedyot vneshniy
//window.jQuery i kotoryj ya zavedu v

(function (moykod) {

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

   }(function ($, window, document) {
     // The $ is now locally scoped

     const togglerUIStateClasses = "fa-angle-down fa-angle-up";
     var sectionTogglers;
     var idsOcultables;
     var transitionSupported;

       $(function() {


         sectionTogglers = getSectionTogglers();
         idsOcultables = getStringIdsOcultables();

           // The DOM is ready!
           //cerrar secciones

           zakroySekcii();
           bindTogglers();

           bindOpenparentsNavLinks();

          // Dlya smooth scroll
          if (transitionSupported) {
          	$("html").on("transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd",
            function(e) {
          	   var $this = $(this),
               scroll = $this.data("transitioning");

          		if (e.target === e.currentTarget && scroll) {
          			$this.removeAttr("style").removeData("transitioning");

          			$("html, body").scrollTop(scroll);
          		}
          	})
          }
      });

       // Tut kod kotoryj budet srabytyvat, do togo kak DOM gotov, naprimer mozhno pokazat krutyashiysya znachok "loading..." .

       /*Cierra secciones identificadas por los ids del string idsOcultables*/
       function zakroySekcii(){
         //check string idsOcultables, empty? undefined?
         $(idsOcultables).hide();
         console.log("---sections : hidden.")
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

        //  $(idsec).slideToggle("slow");
         $(idsec).toggle();

         // pomenyat stil knopki, s odnogo sostoyaniya v drugoy. Strelka vniz/vverh.
         console.log("togglerUIStateClasses: " + togglerUIStateClasses);
         $(this).toggleClass(togglerUIStateClasses);
       }


      // Abrir secciones que contienen la seccion destino de enlace clickado,
      // si están ocultos, antes de realizar la accion de scroll hacia la seccion destino.
      function bindOpenparentsNavLinks(){
        $("nav li a").on("click",function(e){
          $link=$(this);
          let requestedSecId = $link.attr("href");
          console.log("ir a seccion cuyo id es " + requestedSecId);
          // si seccion visible sale, no hay que hacer nada
          if($(requestedSecId).is(':visible')) return true;
          e.preventDefault();
          e.stopPropagation();
          unveilSection(requestedSecId);

          // scroll to unveiled section
          // $link.trigger('click');
          setTimeout(function(){smoothScroll(requestedSecId);},2000);


        })}


          // Scroll to section

          // let $container = $(document) // container = $('div'),
          // let $scrollTo = $(requestedSecId);

          // container.scrollTop(
          //     scrollTo.offset().top - container.offset().top + container.scrollTop()
          //   );

          // Or you can animate the scrolling:
          // $container.animate({
          //   scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
          // });






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


    // GLOBAL FUNCTIONS

    var transitionSupported = typeof document.body.style.transitionProperty === "string"; // detect CSS transition support

    function smoothScroll(targetHashId) {
      var $window = $(window), $document = $(document);
      var target, avail, scroll, deltaScroll;
      scrollTime = 1; // scroll time in seconds


      target = $(this.hash);
      target = $("[id=" + targetHashId.slice(1) + "]");
      // target = $("[d='"+ targetHashId + "']");

      if (target.length) {
        avail = $document.height() - $window.height();

        if (avail > 0) {
          scroll = target.offset().top;

          if (scroll > avail) {
            scroll = avail;
          }
        } else {
          scroll = 0;
        }

        deltaScroll = $window.scrollTop() - scroll;

        // if we don't have to scroll because we're already at the right scrolling level,
        if (!deltaScroll) {
          return; // do nothing
        }

        if (transitionSupported) {
          $("html").css({
            "margin-top": deltaScroll + "px",
            "transition": scrollTime + "s ease-in-out"
          }).data("transitioning", scroll);
        } else {
          $("html, body").stop(true, true) // stop potential other jQuery animation (assuming we're the only one doing it)
          .animate({
            scrollTop: scroll + "px"
          }, scrollTime * 500);

          return;
        }
      }
    }

      /*
      // Ids de los bloques ancestros del bloque cuyo id se especifique en el argumento.
      // Entrada:
      //      "#id" : id seccion en notacion de selector CSS.P.ej.: #id-seccion
      // Salida:
      //      [array] : ids de ancestros, en orden del más próximo al más distante.
      */
      function getParentIds(id){
         let a=[];
         // incluyendo por defecto el id de la seccion objetivo que puede estar ella misma tambien cerrada.
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
