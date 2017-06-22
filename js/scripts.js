// Smooth scroll for in page links - http://wibblystuff.blogspot.in/2014/04/in-page-smooth-scroll-using-css3.html
// Improvements from - https://codepen.io/kayhadrin/pen/KbalA

$(function() {
	var $window = $(window), $document = $(document),
		transitionSupported = typeof document.body.style.transitionProperty === "string", // detect CSS transition support
		scrollTime = 1; // scroll time in seconds

	$(document).on("click", "a[href*=\\#]:not([href=\\#])", function(e) {
		var target, avail, scroll, deltaScroll;

		if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
			target = $(this.hash);
			target = target.length ? target : $("[id=" + this.hash.slice(1) + "]");

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

				e.preventDefault();

				if (transitionSupported) {
					$("html").css({
						"margin-top": deltaScroll + "px",
						"transition": scrollTime + "s ease-in-out"
					}).data("transitioning", scroll);
				} else {
					$("html, body").stop(true, true) // stop potential other jQuery animation (assuming we're the only one doing it)
					.animate({
						scrollTop: scroll + "px"
					}, scrollTime * 1000);

					return;
				}
			}
		}
	});

	if (transitionSupported) {
		$("html").on("transitionend webkitTransitionEnd msTransitionEnd oTransitionEnd", function(e) {
			var $this = $(this),
				scroll = $this.data("transitioning");

			if (e.target === e.currentTarget && scroll) {
				$this.removeAttr("style").removeData("transitioning");

				$("html, body").scrollTop(scroll);
			}
		});
	}
// forzar que cargeu los eventos necesarios para activar submenus
	readyResize();
// forzar el recálculo para que aparezca el texto lateral centrado verticalmente en la seccion de portada
// probar sin js con css: https://stackoverflow.com/questions/396145/how-to-vertically-center-a-div-for-all-browsers
//Al final consegui centrar el contenido verticalmente con HTML+CSS, sin necesidad de éste script de redimensión.En próximos
// commits quitaré éste comentario y código comentado.
	// calculaTamanio();

});

//Popup vídeo
$(function() {

  $(".popup_cerrar").click(function(e){
      $("#video_bkg").hide();
      $("#video_popup").hide();
      $('.embed-container').remove();
  });
  $('.video_a_modal').click(function(){
      var urlVideo = $(this).attr("data-url-video");
      $("#video_bkg").show();
      $("#video_popup").show();
      $("#video_popup .popup_content").append('<div class="embed-container"><iframe id="isbut_iframe_video" width="100%" height="auto" src="https://www.youtube.com/embed/' + urlVideo + '?autoplay=1&rel=0&version=3&enablejsapi=1" frameborder="0" allowfullscreen></iframe></div>');
      centrarPopup("video_popup");
  });

  $("#video_bkg").click(function(e){
      $("#video_bkg").hide();
      $("#video_popup").hide();
      $('.embed-container').remove();
  });
	$('#myModal').on('show.bs.modal', function (e) {
	  $('#iframe_cita_online').on('load', function(){
})})})


  //Owl Carousel
    /*
    $('.videos .owl-carousel').owlCarousel({
        loop:true,
        margin:30,
        dots:false,
        nav:true,
        navText : ["<i class='pe-7s-angle-left center-center'></i>","<i class='pe-7s-angle-right center-center'></i></i>"],
        responsive:{
            0:{
                items:4
            }
        },
        autoplay:true,
        autoplayTimeout:6000,
        autoplayHoverPause:true,
        smartSpeed: 400
    });
    */



$( window ).resize(function() {

  //Funciones compartidas READY and RESIZE
  readyResize();

  //Quitar menú pequeño en resize
  if( $(window).width() < 767 ) {
    $("header").removeClass("small_menu");
  }

  calculaTamanio();

});

//Cambiar el menú al hacer scroll
$(window).scroll(function() {

  var windowWidth = window.innerWidth;

  //Ocultar botón mostrar botón fijo llamada en móvil
  if((windowWidth <= 991 ) ){
    $(".butons_container").addClass("close");
    $(".butons_arrows").addClass("abrir");
    $(".butons_arrows").removeClass("cerrar");
  }
  //Resize menú
  if (window.innerWidth > 767) {
    if ($(window).scrollTop() > 50) {
      $("header").addClass("small_menu");
      $("header.small_menu").stop().animate({
        top: 0
      }, 400);
    } else {
       $("header.small_menu").css("top","-66px").stop().animate({
        top: 0
      }, 0,function(){
          if( $("body").hasClass('chrome') ) {
              setTimeout(function(){
                $("header").removeClass("small_menu");
                $("header").css("margin-top","-126px").stop().animate({
                  "margin-top": 0
                }, 280);
              }, 50);
          } else {
              $("header").removeClass("small_menu");
              $("header").css("margin-top","-126px").stop().animate({
                "margin-top": 0
              }, 280);
          }

      });
    }
  }

  /*
  if ($(window).scrollTop() > 50) {
    if ($(window).width() > 767) {
      $("header").addClass("small_menu");
      $(".extra_header").css("height","121px");
      $("header").css({"height":"auto","padding-bottom":"25px","padding-top":"20px"});
      $("header.small_menu").stop().animate({
        top: 0
      }, 200);
    }else {
       $(".extra_header").css("height","");
    }
  } else {
    $("header.small_menu").stop().animate({
      top: "-66px"
    }, 0, function() {
      $("header").removeClass("small_menu");
      $(".extra_header").stop().animate({
        "height": 0
      }, 280);
      $("header").css({"height":"0px","padding-bottom":"0px","padding-top":"0px"}).stop().animate({
        "height": "121px",
        "padding-bottom":"20px",
        "padding-top":"30px"
      }, 1000);
    });
  }*/

});


function calculaTamanio() {

    var windowWidth = window.innerWidth;
    if((windowWidth >= 768 ) ){
       $(".vertical-center").each(function() {
            var myHeight = $(this).height();
            var imgHeight = $(this).parent().parent().find("img").height();
            var marginTop = (imgHeight - myHeight) / 2;
            $(this).css("margin-top", marginTop);
        });
        $("main section:first-child .vertical-center").animate({
          opacity:1
        }, 600);
    } else {
          $(".vertical-center").each(function() {
            $(this).css("margin-top", "");
        });
        $("main section:first-child .vertical-center").animate({
          opacity:1
        }, 600);
    }
  }
//Funciones compartidas READY and RESIZE
function readyResize() {
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;


  //1. Igualar alturas cuando las imágenes estén cargadas


    /*
    //Centrar verticalmente módulo full-img
    if((windowWidth >= 768 ) ){
       $(".vertical-center").each(function() {
            var myHeight = $(this).height();
            var imgHeight = $(this).parent().parent().find("img").height();
            var marginTop = (imgHeight - myHeight) / 2;
            $(this).css("margin-top", marginTop);
        });
    } else {
          $(".vertical-center").each(function() {
            $(this).css("margin-top", "");
        });
    }*/

    if((windowWidth >= 768 ) ){


      /*var fixedButtonsHeight = $("#fixed_buttons").height();
      var TopFixedButtons = (windowHeight - fixedButtonsHeight) / 2;

      $("#fixed_buttons").css("top", TopFixedButtons);*/

      //Añadir línea despues de X tratamientos en tratamientos.php si no existe
      if( $("#tratamientos #listado_tratamientos .tratamiento:nth-child(even)").next(".line").length == 0) {
        $("#tratamientos #listado_tratamientos .tratamiento:nth-child(even)").after("<div class='col-xs-12 line'></div>");
      }
    } else {
      //Eliminar la línea en móvil (para el resize)
      $("#tratamientos #listado_tratamientos .line").each(function(index, el) {
        $(this).remove();
      });
    }

    if((windowWidth <= 767 ) ){
      $("#breadcrumbs li.visible-xs").click(function() {
          window.history.back();
      });
    }

    //Click botón mostrar botón fijo llamada en móvil
    showFixedBtnMobile ();


    //LLamar funciones
    centrarPopup("video_popup");

    //menú
    menuHover();

};


function showFixedBtnMobile () {
  var windowWidth = window.innerWidth;

  if((windowWidth <= 991 ) ){
    $(".butons_container").addClass("close");
    $(".butons_arrows").show();
    $(".butons_arrows").addClass("abrir");
    $(".butons_arrows").removeClass("cerrar");
  }else{
    $(".butons_container").removeClass("close");
    $(".butons_arrows").hide();
  }

  $(".butons_arrows").unbind('click');
  $(".butons_arrows").click(function() {
    $(".butons_container").toggleClass("close");
    $(".butons_arrows").toggleClass("cerrar");
    $(".butons_arrows").toggleClass("abrir");
  });

}

//Centar popup vídeo
function centrarPopup(id) {
    var ancho_screen = $(window).width();
    var alto_screen = $(window).height();
    var ancho_popup = $("#"+id).width();
    var alto_popup = $("#"+id).height();

    $("#"+id).css("left",(ancho_screen-ancho_popup)/2);
    $("#"+id).css("top",(alto_screen-alto_popup)/2);
};


//FUNCIÓN MENÚ
function menu() {
  //Botón menú
  $("#bt-menu-mobile").click(function(event) {
    //Close
    if( $(this).hasClass('close-bt-hamburguer') ) {
      resetElemntsMenu ();
    }

    $("header nav").toggleClass('active');
    $("body").toggleClass('overflow');
    $(this).toggleClass('close-bt-hamburguer');
  });



}

function resetElemntsMenu () {
  $("header nav > ul > li").show();
    $("header nav > ul > li").find("span").show();
    $("header nav li >ul").hide();
    $("header nav").removeClass('show-submenu');
}

//FUNCIÓN MENÚ HOVER
function menuHover() {
  $("header nav li").off('hover');
  $("header nav li").unbind('mouseenter mouseleave');

  resetElemntsMenu ();
  //ESCRITORIO
  if( window.innerWidth > 600 ) {
    $("header nav li").mouseenter(function(event) {
        $(this).find("ul").show();
    });
    $("header nav li").mouseleave(function(event) {
       if( $("header nav ul li ul:hover").length == 0) {
           $("header nav ul li ul").hide();
        }
    });

    $("header nav ul li ul").mouseleave(function(event) {
      $("header nav ul li ul").hide();
    });

  //MÓVIL
  } else {
    $("header nav li").off('hover');
    $("header nav li").unbind('mouseenter mouseleave');
    $("header nav ul li ul").unbind('mouseenter mouseleave');

    //Remove onclick si tiene submenu
    $('header nav li.submenu').each(function(){
      $(this).data('onclick', this.onclick);

      this.onclick = function(event) {
          return false;
        $(this).data('onclick').call(this, event || window.event);
      };
    });

    //Mostrar submenú
    $(".submenu").click(function(event) {
      $("header nav > ul > li").not($(this)).hide();
      $(this).find("span").hide();
      $("header nav li >ul").show();
      $("header nav").addClass('show-submenu');
    });

  }
}

function multilanguage() {
  var array_url_es = [];
  array_url_es[""] = "it/";
  array_url_es["tratamientos/antirronquido/"] = "it/";
  array_url_es["tratamientos/estetica-dental/blanqueamiento-dental/"] = "it/trattamenti/estetica-dentale/sbiancamento-dentale/";
  array_url_es["tratamientos/caries/"] = "it/trattamenti/contro-la-carie/";
  array_url_es["tratamientos/estetica-dental/carillas-dentales/"] = "it/";
  array_url_es["clinicas-dentales/espana/"] = "it/centri-vitaldent/italia/";
  array_url_es["tratamientos/implantes-dentales/falta-de-dientes/"] = "it/trattamenti/implantologia-dentale/conseguenze-della-perdita-di-denti/";
  array_url_es["tratamientos/estetica-dental/contorneado-dental/"] = "it/trattamenti/estetica-dentale/sagomatura-estetica/";
  array_url_es["tratamientos/endodoncia/"] = "it/trattamenti/endodonzia/";
  array_url_es["tratamientos/estetica-dental/"] = "it/trattamenti/estetica-dentale/";
  array_url_es["tratamientos/halitosis/"] = "it/trattamenti/alitosi/";
  array_url_es["tratamientos/implantes-dentales/implante-unitario/"] = "it/trattamenti/implantologia-dentale/impianto-unitario/";
  array_url_es["tratamientos/implantes-dentales/"] = "it/trattamenti/implantologia-dentale/";
  array_url_es["tratamientos/implantes-dentales/carga-inmediata/"] = "it/trattamenti/implantologia-dentale/implantologia-a-carico-immediato/";
  array_url_es["tratamientos/limpieza-dental-avanzada/"] = "it/trattamenti/pulizia-orale-avanzata/";
  array_url_es["tratamientos/protesis-dentales/limpieza-de-protesis-dentales/"] = "it/";
  array_url_es["tratamientos/ortodoncia/"] = "it/trattamenti/ortodonzia";
  array_url_es["tratamientos/ortodoncia-infantil/"] = "it/trattamenti/ortodonzia-infantile/";
  array_url_es["landing-ortodoncia-invisible-cuota-mensual/"] = "it/";
  array_url_es["tratamientos/ortodoncia-infantil/ortopedia-dentofacial/"] = "";
  array_url_es["tratamientos/ortodoncia/orto-perio-en-adultos/"] = "it/trattamenti/ortodonzia/orto-perio-negli-adulti/";
  array_url_es["tratamientos/periodoncia/"] = "it/trattamenti/parodontologia/";
  array_url_es["politica-de-cookies/"] = "it/politica-di-cookies";
  array_url_es["politica-de-privacidad/"] = "it/politica-privacy";
  array_url_es["tratamientos/protesis-dentales/"] = "it/trattamenti/protesi-dentali/";
  array_url_es["tratamientos/protesis-dentales/protesis-dental-fija/"] = "it/trattamenti/protesi-dentali/protesi-dentale-fissa/";
  array_url_es["tratamientos/protesis-dentales/protesis-sobre-implantes/"] = "it/trattamenti/protesi-dentali/protesi-dentali-sugli-impianti/";
  array_url_es["tratamientos/implantes-dentales/puente-sobre-implantes/"] = "it/trattamenti/implantologia-dentale/ponte-sugli-impianti/";
  array_url_es["tratamientos/ortodoncia/sindrome-ocluso-postural/"] = "it/trattamenti/ortodonzia/sindrome-occluso-posturale/";
  array_url_es["terminos-legales/"] = "it/";
  array_url_es["tratamientos/ortodoncia/tipos-de-ortodoncia/"] = "it/trattamenti/ortodonzia/tipi-di-ortodonzia/";
  array_url_es["tratamientos/ortodoncia-infantil/tipos-de-ortodoncia-infantil/"] = "it/trattamenti/ortodonzia-infantile/tipi-di-ortodonzia-infantile/";
  array_url_es["tratamientos/implantes-dentales/tratamiento-de-enfermedades-periimplantarias/"] = "it/trattamenti/implantologia-dentale/trattamento-di-malattie-perimplantari/";
  array_url_es["tratamientos/"] = "it/trattamenti/";
  array_url_es["unete-a-nosotros/"] = "it/lavora-con-noi/";
  array_url_es["clinicas-dentales/"] = "it/centri-vitaldent/";
  var array_url_it = [];
  array_url_it ["it/"] = "";
  array_url_it [""] = "tratamientos/antirronquido";
  array_url_it ["it/trattamenti/estetica-dentale/sbiancamento-dentale/"] = "tratamientos/estetica-dental/blanqueamiento-dental/";
  array_url_it ["it/trattamenti/contro-la-carie/"] = "tratamientos/caries/";
  array_url_it [""] = "tratamientos/estetica-dental/carillas-dentales/";
  array_url_it ["it/centri-vitaldent/italia/"] = "clinicas-dentales/espana/";
  array_url_it ["it/trattamenti/implantologia-dentale/conseguenze-della-perdita-di-denti/"] = "tratamientos/implantes-dentales/falta-de-dientes/";
  array_url_it ["it/trattamenti/estetica-dentale/sagomatura-estetica/"] = "tratamientos/estetica-dental/contorneado-dental/";
  array_url_it ["it/trattamenti/endodonzia/"] = "tratamientos/endodoncia/";
  array_url_it ["it/trattamenti/estetica-dentale/"] = "tratamientos/estetica-dental/";
  array_url_it ["it/trattamenti/alitosi/"] = "tratamientos/halitosis/";
  array_url_it ["it/trattamenti/implantologia-dentale/impianto-unitario/"] = "tratamientos/implantes-dentales/implante-unitario/";
  array_url_it ["it/trattamenti/implantologia-dentale/"] = "tratamientos/implantes-dentales/";
  array_url_it ["it/trattamenti/implantologia-dentale/implantologia-a-carico-immediato/"] = "tratamientos/implantes-dentales/carga-inmediata/";
  array_url_it ["it/trattamenti/pulizia-orale-avanzata/"] = "tratamientos/limpieza-dental-avanzada/";
  array_url_it [""] = "tratamientos/protesis-dentales/limpieza-de-protesis-dentales/";
  array_url_it ["it/trattamenti/ortodonzia/"] = "tratamientos/ortodoncia/";
  array_url_it ["it/trattamenti/ortodonzia-infantile/"] = "tratamientos/ortodoncia-infantil/";
  array_url_it [""] = "landing-ortodoncia-invisible-cuota-mensual/";
  array_url_it [""] = "tratamientos/ortodoncia-infantil/ortopedia-dentofacial/";
  array_url_it ["it/trattamenti/ortodonzia/orto-perio-negli-adulti/"] = "tratamientos/ortodoncia/orto-perio-en-adultos/";
  array_url_it ["it/trattamenti/parodontologia/"] = "tratamientos/periodoncia/";
  array_url_it ["it/politica-di-cookies/"] = "politica-de-cookies/";
  array_url_it ["it/politica-privacy/"] = "politica-de-privacidad/";
  array_url_it ["it/trattamenti/protesi-dentali/"] = "tratamientos/protesis-dentales/";
  array_url_it ["it/trattamenti/protesi-dentali/protesi-dentale-fissa/"] = "tratamientos/protesis-dentales/protesis-dental-fija/";
  array_url_it ["it/trattamenti/protesi-dentali/protesi-dentali-sugli-impianti/"] = "tratamientos/protesis-dentales/protesis-sobre-implantes/";
  array_url_it ["it/trattamenti/implantologia-dentale/ponte-sugli-impianti/"] = "tratamientos/implantes-dentales/puente-sobre-implantes/";
  array_url_it ["it/trattamenti/ortodonzia/sindrome-occluso-posturale/"] = "tratamientos/ortodoncia/sindrome-ocluso-postural/";
  array_url_it [""] = "terminos-legales/";
  array_url_it ["it/trattamenti/ortodonzia/tipi-di-ortodonzia/"] = "tratamientos/ortodoncia/tipos-de-ortodoncia/";
  array_url_it ["it/trattamenti/ortodonzia-infantile/tipi-di-ortodonzia-infantile/"] = "tratamientos/ortodoncia-infantil/tipos-de-ortodoncia-infantil/";
  array_url_it ["it/trattamenti/implantologia-dentale/trattamento-di-malattie-perimplantari/"] = "tratamientos/implantes-dentales/tratamiento-de-enfermedades-periimplantarias/";
  array_url_it ["it/trattamenti/"] = "tratamientos/";
  array_url_it ["it/lavora-con-noi/"] = "unete-a-nosotros/";
  array_url_it ["it/centri-vitaldent/"] = "clinicas-dentales/";



  var url = window.location.href;
  /*var regex = /((es\/|it\/)(([a-zA-Z0-9]*[-\/]*[a-zA-Z0-9])*))/;
  var regex = /((es\/|it\/)(([a-zA-Z0-9]*[-\/]*[a-zA-Z0-9])*))/;
  url = regex.exec(url);*/


  $(".lang-select").change(function(event) {
    var url_new = "";
    var key = "";
    //Si es italiano
    if (url.indexOf("/it/") > -1) {
      key = url.split("/it/");
      key = key[1];
      url_new = array_url_it["it/" + key];
    } else {
      if( url.indexOf(".net") > -1 ) {
        key = url.split(".net/");
        console.log(key);
      } else if ( url.indexOf(".com") > -1 ) {
        key = url.split(".com/");
      } else if ( url.indexOf(".es") > -1 ) {
        key = url.split(".es/");
      }

      key = key[1];
      url_new = array_url_es[key];
    }


    window.location.href = url_base + "/"+ url_new;



    /*
    if(url == null && $('#lang-select option:selected').val() == 'it'){
      window.location.href = "it/";
    } else if(url == null && $('#lang-select option:selected').val() == 'it'){
      window.location.href = "";
    } else if(url['3'] == '' && $('#lang-select option:selected').val() == 'it'){
      window.location.href = "it/";
    } else if(url['3'] == '' && $('#lang-select option:selected').val() == 'es'){
      window.location.href = "";
    } else if(url['2'] ==  'es/' && $('#lang-select option:selected').val() == 'it'){
      for (var key in array_url_es) {
        if(key == url['3']){
          window.location.href = "it/"+array_url_es[key];
        };
      }
    }
    else if(url['2'] ==  'it/' && $('#lang-select option:selected').val() == 'es'){
      for (var key in array_url_it) {
        if(key == url['1']+'/'){
          window.location.href = array_url_it[key];
        };
      }
    }*/
  });
}


/***AÑADIR CLASE NAVEGADOR************/
$(document).ready(function($) {
  /*CLASES NAVEGADORES*****************************/
  //IOS
  if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
          $('body').addClass('ios');
  }
  //FIREFOX
  else if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && navigator.userAgent.toLowerCase().indexOf('edge') == -1 ){
    $('body').addClass('firefox');
  }

  //CHROME
  else if( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 && navigator.userAgent.toLowerCase().indexOf('edge') == -1  ){
    $('body').addClass('chrome');

  }
  //SAFARI
  else if( navigator.userAgent.toLowerCase().indexOf('safari') > -1 && navigator.userAgent.toLowerCase().indexOf('edge') == -1  ){
    $('body').addClass('safari');

  }
  //EXPLORER
  else if(GetIEVersion() > 0 || navigator.userAgent.toLowerCase().indexOf('edge') > -1 ){
    $('body').addClass('ie');
    $('body').addClass('ie' + GetIEVersion());
  }
  //MÓVIL PARA MOSTRAR COMPARTIR WHATSAPP
  if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android|BlackBerry|IEMobile|Opera Mini)/)) {
    $('body').addClass('mobile');
    $('.compartir').css('display','block');
  }
});

//EXPLORER
function GetIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");

  // If IE, return version number.
  if (Idx > 0)
    return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));

  // If IE 11 then look for Updated user agent string.
  else if (!!navigator.userAgent.match(/Trident\/7\./))
    return 11;

  else
    return 0; //It is not IE
}
