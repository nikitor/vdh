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
     }));
