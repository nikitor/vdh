/* Cookies Directive - The rewrite. Now a jQuery plugin
 * Version: 2.0.1
 * Author: Ollie Phillips
 * 24 October 2013
 */



$(document).ready(function () {	 

		     	$.cookiesDirective({
					privacyPolicyUri: 'politica_de_cookies.html',
					duration: 0,
					explicitConsent: false
				});  
				
		    })
;(function($) {
	$.cookiesDirective = function(options) {
			
		// Default Cookies Directive Settings
		var settings = $.extend({
			//Options
			explicitConsent: true,
			position: 'bottom',
			duration: 10,
			limit: 0,
			message: null,				
			cookieScripts: null,
			privacyPolicyUri: 'privacy.html',
			scriptWrapper: function(){},	
			// Styling
			fontFamily: "'Open Sans', sans-serif",
			fontColor: '#FFFFFF',
			fontSize: '13px',
			backgroundColor: '#333',
			linkColor: '#337ab7'
		}, options);
		
		// Perform consent checks
		if(!getCookie('cookiesDirective')) {
			if(settings.limit > 0) {
				// Display limit in force, record the view
				if(!getCookie('cookiesDisclosureCount')) {
					setCookie('cookiesDisclosureCount',1,365);		
				} else {
					var disclosureCount = getCookie('cookiesDisclosureCount');
					disclosureCount ++;
					setCookie('cookiesDisclosureCount',disclosureCount,365);
				}
				
				// Have we reached the display limit, if not make disclosure
				if(settings.limit >= getCookie('cookiesDisclosureCount')) {
					disclosure(settings);		
				}
			} else {
				// No display limit
				disclosure(settings);
			}		
			
			// If we don't require explicit consent, load up our script wrapping function
			if(!settings.explicitConsent) {
				settings.scriptWrapper.call();
			}	
		} else {
			// Cookies accepted, load script wrapping function
			settings.scriptWrapper.call();
		}		
	};
	
	// Used to load external javascript files into the DOM
	$.cookiesDirective.loadScript = function(options) {
		var settings = $.extend({
			uri: 		'', 
			appendTo: 	'body'
		}, options);	
		
		var elementId = String(settings.appendTo);
		var sA = document.createElement("script");
		sA.src = settings.uri;
		sA.type = "text/javascript";
		sA.onload = sA.onreadystatechange = function() {
			if ((!sA.readyState || sA.readyState == "loaded" || sA.readyState == "complete")) {
				return;
			} 	
		};
		switch(settings.appendTo) {
			case 'head':			
				$('head').append(sA);
			  	break;
			case 'body':
				$('body').append(sA);
			  	break;
			default: 
				$('#' + elementId).append(sA);
		}
	};
	
	// Helper scripts
	// Get cookie
	var getCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	};
	
	// Set cookie
	var setCookie = function(name,value,days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires="+date.toGMTString();
		}
		document.cookie = name+"="+value+expires+"; path=/";
	};
	
	// Detect IE < 9
	var checkIE = function(){
		var version;
		if (navigator.appName == 'Microsoft Internet Explorer') {
	        var ua = navigator.userAgent;
	        var re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
	        if (re.exec(ua) !== null) {
	            version = parseFloat(RegExp.$1);
			}	
			if (version <= 8.0) {
				return true;
			} else {
				if(version == 9.0) {
					if(document.compatMode == "BackCompat") {
						// IE9 in quirks mode won't run the script properly, set to emulate IE8	
						var mA = document.createElement("meta");
						mA.content = "IE=EmulateIE8";				
						document.getElementsByTagName('head')[0].appendChild(mA);
						return true;
					} else {
						return false;
					}
				}	
				return false;
			}		
	    } else {
			return false;
		}
	};

	// Disclosure routines
	var disclosure = function(options) {
		var settings = options;
		settings.css = 'fixed';
		
		// IE 9 and lower has issues with position:fixed, either out the box or in compatibility mode - fix that
		if(checkIE()) {
			settings.position = 'top';
			settings.css = 'absolute';
		}
		
		// Any cookie setting scripts to disclose
		var scriptsDisclosure = '';
		if (settings.cookieScripts) {
			var scripts = settings.cookieScripts.split(',');
			var scriptsCount = scripts.length;
			var scriptDisclosureTxt = '';
			if(scriptsCount>1) {
				for(var t=0; t < scriptsCount - 1; t++) {
					 scriptDisclosureTxt += scripts[t] + ', ';	
				}	
				scriptsDisclosure = ' We use ' +  scriptDisclosureTxt.substring(0,  scriptDisclosureTxt.length - 2) + ' and ' + scripts[scriptsCount - 1] + ' scripts, which all set cookies. ';
			} else {
				scriptsDisclosure = ' We use a ' + scripts[0] + ' script which sets cookies.';		
			}
		} 
		
		// Create overlay, vary the disclosure based on explicit/implied consent
		// Set our disclosure/message if one not supplied
		var html = ''; 
		html += '<div id="epd">';
		html += '<div id="cookiesdirective" style="position:'+ settings.css +';'+ settings.position + ':-300px;left:0px;width:100%;';
		html += 'height:auto;';
		html += 'text-align:center;z-index:1000;">';
		/*html += 'height:auto;background:'+settings.backgroundColor+';opacity:.' + settings.backgroundOpacity + ';';
		html += '-ms-filter: “alpha(opacity=' + settings.backgroundOpacity + ')”; filter: alpha(opacity=' + settings.backgroundOpacity + ');';
		html += '-khtml-opacity: .' + settings.backgroundOpacity + '; -moz-opacity: .' + settings.backgroundOpacity + ';';
		html += 'color:' + settings.fontColor + ';font-family:' + settings.fontFamily + ';font-size:' + settings.fontSize + ';';
		html += 'text-align:center;z-index:1000;">';*/
		html += '<div class=" mainWrapper">';
			
		if(!settings.message) {
			// Implied consent message 			
			if(idioma_actual == 'es'){
				settings.message = '<p>Utilizamos cookies para mejorar nuestros servicios. Si continúas navegando, entendemos que aceptas su uso. <a href="es/politica-de-cookies">Más información aquí</a>.</p>';
			}
			else{
				settings.message = "<p>Per offrirti un'esperienza di navigazione ottimizzata ed in linea con le tue preferenze, Vitaldent utilizza cookies propri e di terze parti. Chiudendo questo banner, scorrendo questa pagina o cliccando qualsiasi suo elemento acconsenti al loro impiego in conformità alla nostra Politica di cookies<a href='it/politica-di-cookies'> qui.</a></p>";	

			}	
		}	

		html += settings.message;
		
		// Build the rest of the disclosure for implied and explicit consent
		if(settings.explicitConsent) {
			// Explicit consent disclosure
			html += scriptsDisclosure;
			html += '<div id="impliedsubmit"><span class="pe-7s-close"></span></div>';	
		
		} else {
			// Implied consent disclosure
			html += scriptsDisclosure;
			html += '<div id="impliedsubmit"><span class="pe-7s-close"></span></div>';	
		}		
		html += '</div></div>';
		$('body').append(html);
		
		// Serve the disclosure, and be smarter about branching
		var dp = settings.position.toLowerCase();
		if(dp != 'top' && dp!= 'bottom') {
			dp = 'top';
		}	
		var opts = { in: null, out: null};
		if(dp == 'top') {
			opts.in = {'top':'0'};
			opts.out = {'top':'-300'};
		} else {
			opts.in = {'bottom':'0'};
			opts.out = {'bottom':'-300'};
		}		

		// Start animation
		$('#cookiesdirective').animate(opts.in, 1000, function() {
			// Set event handlers depending on type of disclosure
			if(settings.explicitConsent) {
				// Explicit, need to check a box and click a button
				$('#explicitsubmit').click(function() {
					if($('#epdagree').is(':checked')) {	
						// Set a cookie to prevent this being displayed again
						setCookie('cookiesDirective',1,365);	
						// Close the overlay
						$('#cookiesdirective').animate(opts.out,1000,function() { 
							// Remove the elements from the DOM and reload page
							$('#cookiesdirective').remove();
							location.reload(true);
						});
					} else {
						// We need the box checked we want "explicit consent", display message
						$('#epdnotick').css('display', 'block'); 
					}	
				});
			} else {
				// Implied consent, just a button to close it
				$('#impliedsubmit').click(function() {
					// Set a cookie to prevent this being displayed again
					setCookie('cookiesDirective',1,365);	
					// Close the overlay
					$('#cookiesdirective').animate(opts.out,1000,function() { 
						// Remove the elements from the DOM and reload page
						$('#cookiesdirective').remove();
					});
				});
			}	
			
			if(settings.duration > 0)
			{
				// Set a timer to remove the warning after 'settings.duration' seconds
				setTimeout(function(){
					$('#cookiesdirective').animate({
						opacity:'0'
					},2000, function(){
						$('#cookiesdirective').css(dp,'-300px');
					});
				}, settings.duration * 1000);
			}
		});	
	};
})(jQuery);
