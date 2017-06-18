

$(document).ready(function () {

    $.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
    //Hacemos la comprobacion de si es firefox en android, ya que hace cosas extrañas
    var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    var is_android = navigator.platform.toLowerCase().indexOf("linux") > -1;

    if (!$.browser.chrome && !(is_firefox && is_android)) {
        $("#fechaNacPacienteCorreo,#fechaCitaCorreo").datepicker({ dateFormat: 'dd/mm/yy' });
    }

    $("#btSolicitarCita").click(function () {
        var tipoCita = $("#hfTipoCita").val();

        switch (tipoCita) {
            case 'online':
                mostrarMenuSeleccion();
                ocultarPrimeraFila();
                break;
            case 'correo':
                mostrarMenuCorreo();
                break;
            default:
                abreMensajeModal($("#lbAvisoJs").html(), $("#lbPrimeroUnaAgenda").html());
                break;
        }
    });

    $("#btSolicitarCitaCorreo").click(function () {
        pedirCitaCorreo();
    });
    
    $("#btModificaCita").click(function () {
        mostrarModificarCita();
        $("#filaModificaCitaPanel").show();
        $("#fila2ModificaCitaPanel").show();

        $("#divAnularCitaPanel").hide();
        $("#div2AnularCitaPanel").hide();
    });

    $("#btAnularCita").click(function () {
        mostrarModificarCita();
        //Hay que modificar el formulario para mostrar el boton de Anular y ocultar el de Solicitar Nueva Cita
        $("#filaModificaCitaPanel").hide();
        $("#fila2ModificaCitaPanel").hide();

        $("#divAnularCitaPanel").show();
        $("#div2AnularCitaPanel").show();
    });

    $("#btBuscarDatosCitaModificar").click(function () {
        buscarDatosCita();
    });

    $("#btCancelModifica").click(function () {
        limpiarCamposModifica();
    });

    $("#btVolverDesdeSolicitar").click(function () {
        ocultarMenuSeleccion();
        resetForm();
    });

    $("#btAnterior").click(function () {
        anteriorPaso();
    });

    $("#btSiguiente").click(function () {
        siguientePaso();
    });

    $("#aceptoDatos").click(function () {
        mostrarHorasCitas();
    });

    $("#textoPrimer").click(function () {
        marcarCheckPrimer();
    });

    $("#textoSelecciona").click(function () {
        marcarCheckSelecciona();
    });

    $("#textoAcepta").click(function () {
        marcarAcepta();
    });

    $("#textoAceptaCorreo").click(function () {
        marcarAceptaCorreo();
    });

    $("#textoRecuerda").click(function () {
        marcarRecuerda();
    });

    $("#radioPrimero, #radioSelecciona").click(function () {
        mostrarSeleccionarDiaHora();
    });

    $("#btModificarDatosCita").click(function () {
        cambiarDatosCita();
    });

    $("#btModificaCita").tooltip();

    $("#btAbrirVentana").click(function () {
        abrirVentanaTPV();
    });

    $("#btVolverFinal, #btResolicitaCita").click(function () {
        resetForm();
    });

    comprobarItemsSelectParaSeleccionar();
    rellenarCamposRecibidos();
    recuperarDatosForm();

    $.get("images/cita/fondo_logo_" + $("#hfIdCliente").val() + ".jpg")
    .done(function () {
        $("#imgLogoPpal").attr("src", "images/cita/fondo_logo_" + $("#hfIdCliente").val() + ".jpg")

    }).fail(function () {
        // Image doesn't exist - do something else.
        $("#imgLogoPpal").attr("src", "co_iconos/noLogo.png")
    })

    var tit = $("#hfNombreCentro").val();
    if ((tit.trim() != '') && (tit.trim() != '<br/>')) {
        tit = ' - ' + tit;
    }
    else {

    }
    var _titPag = tit;
    _titPag = tit.replace('<br/>', '');
    document.title = 'Cita Online ' + _titPag;
    if ((tit.trim() != '') && (tit.trim() != '<br/>')) {
        $("#h1TituloPagina").html(document.title);
    }
    else {
        $("#h1TituloPagina").html('');
    }
    
    if ($("#hfMuestraLogo").val() == 'True'){
        $.get("images/cita/fondo_logo_" + $("#hfIdCliente").val() + ".jpg")
        .done(function () {
            $("#imgLogoCitaOnline").attr("src", "images/cita/fondo_logo_" + $("#hfIdCliente").val() + ".jpg")

        }).fail(function () {
            // Image doesn't exist - do something else.
            $("#imgLogoCitaOnline").attr("src", "co_iconos/noLogo.png")
        })

        $.get("images/cita/fondo_logo_" + $("#hfIdCliente").val() + ".jpg")
        .done(function () {
            $("#imgLogoCorreo").attr("src", "images/cita/fondo_logo_" + $("#hfIdCliente").val() + ".jpg")

        }).fail(function () {
            // Image doesn't exist - do something else.
            $("#imgLogoCorreo").attr("src", "co_iconos/noLogo.png")
        })
    }

    comprobarIdiomaCargado();
    cambiaPlaceHolders();

    //try {
    //    $("body select").msDropDown();
    //} catch (e) {
    //    alert(e.message);
    //}

});

$(document).ready(function () {
    (function ($) {
        var $rows = $("#tbAgenda tbody tr");
        $('#search').click(function () {
            var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
            $rows.show().filter(function () {
                var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
                return !~text.indexOf(val);
            }).hide();
        })
        $('.no-data').hide();
        if ($('.searchable tr:visible').length == 0) {
            $('.no-data').show();
        }
    }(jQuery));
});

/**
 * Vertically center Bootstrap 3 modals so they aren't always stuck at the top
 */
$(function () {
    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');

        // Dividing by two centers the modal exactly, but dividing by three 
        // or four works better for larger screens.
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }
    // Reposition when a modal is shown
    $('.modal').on('show.bs.modal', reposition);
    // Reposition when the window is resized
    $(window).on('resize', function () {
        $('.modal:visible').each(reposition);
    });
});

function resetForm() {
    window.location.href = $("#hfUrlPagina").val();
}

function mostrarMenuSeleccion() {
    $("#divPantallaPrincipal").hide();
    $("#divSolicitarCita").show();
}

function ocultarMenuSeleccion() {
    $("#divPantallaPrincipal").show();
    $("#divSolicitarCita").hide();
}

//Se añaden las siguientes 2 funciones para la gestión de las citas por correo que no disponen de Axon.
function mostrarMenuCorreo() {
    $("#divPantallaPrincipal").hide();
    $("#divCitaPorCorreo").show();
    $("#tbBotonVolverFinal").show();
}

function ocultarMenuCorreo() {
    $("#divPantallaPrincipal").show();
    $("#divCitaPorCorreo").hide();
    $("#tbBotonVolverFinal").hide();
}

function marcarCheckPrimer() {
    $('#radioPrimero')[0].checked = true
    $('#radioSelecciona')[0].checked = false
    mostrarSeleccionarDiaHora();
}

function marcarCheckSelecciona() {
    $('#radioPrimero')[0].checked = false
    $('#radioSelecciona')[0].checked = true
    mostrarSeleccionarDiaHora();
}

function marcarAcepta() {
    $('#aceptoDatos').click();
}

function marcarAceptaCorreo() {
    $('#chkAceptoCorreo').click();
}

function marcarRecuerda() {
    $('#chkRecordarDatos').click();
}

function gestionBotones(e) {
    $(document).ready(function () {
        try {
            switch (e) {
                case 'tabCentro':
                    $("#btAnterior").attr('disabled', 'true');
                    $("#btSiguiente").removeAttr("disabled");
                    if ($("#divDatosConfirmaCita").css('display') == 'block') {
                        $("#btModificarDatosCita").click();
                    }
                    $("#celdaBuscaCita").hide();
                    $("#celdaPasoSiguiente").show();

                    $("#tabCentro").css("background-color", "#c4bebe");
                    $("#tabProf").css("background-color", "#ffffff");
                    $("#tabCita").css("background-color", "#ffffff");

                    $("#tabCentro").css("color", "#ffffff");
                    $("#tabProf").css("color", "#3385C5");
                    $("#tabCita").css("color", "#3385C5");

                    break;
                case 'tabProf':
                    $("#btAnterior").removeAttr("disabled");
                    $("#btSiguiente").removeAttr("disabled");
                    var idAgenda = 0;
                    idAgenda = $("#hfIdAgenda").val();
                    if (idAgenda == '0') {
                        $("#btSiguiente").attr('disabled', 'true');
                    }
                    else {
                        $("#btSiguiente").removeAttr("disabled");
                    }
                    if ($("#divDatosConfirmaCita").css('display') == 'block') {
                        $("#btModificarDatosCita").click();
                    }

                    $("#search").val($("#fltEspe").val() + ' ' + $("#fltCentro").val() + ' ' + $("#fltAsegu").val());
                    $("#search").click();
                    ocultarPrimeraFila();
                    $("#celdaBuscaCita").hide();
                    $("#celdaPasoSiguiente").show();

                    $("#tabCentro").css("background-color", "#ffffff");
                    $("#tabProf").css("background-color", "#c4bebe");
                    $("#tabCita").css("background-color", "#ffffff");

                    $("#tabCentro").css("color", "#3385C5");
                    $("#tabProf").css("color", "#ffffff");
                    $("#tabCita").css("color", "#3385C5");
                    muestraAgendas();
                    break;
                case 'tabCita':
                    $("#btAnterior").removeAttr("disabled");
                    $("#btSiguiente").attr('disabled', 'true');
                    
                    $("#celdaBuscaCita").show();
                    $("#celdaPasoSiguiente").hide();

                    $("#tabCentro").css("background-color", "#ffffff");
                    $("#tabProf").css("background-color", "#ffffff");
                    $("#tabCita").css("background-color", "#c4bebe");

                    $("#tabCentro").css("color", "#3385C5");
                    $("#tabProf").css("color", "#3385C5");
                    $("#tabCita").css("color", "#ffffff");

                    break;
                default:
                   // console.log(link);
            }
        }
        catch (ex) {
            console.log('Error en **gestionBotones** (Parametros: ' + e + '. Error: ' + ex.message);
        }
    });
}

function mostrarModificarCita() {
    $("#divPantallaPrincipal").hide();
    $("#divModificarCita").show();
    $("#txtIdUnicoModificar").focus();
}

function limpiarCamposModifica() {
    $("#txtIdUnicoModificar").val('');
    $("#divMostrarDatosAntesModificar").hide();
    $("#divPantallaPrincipal").show();
    $("#divModificarCita").hide();
}

function controlarBtDatosCita(btId) {
    setTimeout(function () {
        var idAgenda = 0;
        idAgenda = $("#hfIdAgenda").val();
        if (idAgenda == '0') {
            $("#tabProf").attr("aria-expanded", "true");
            $("#tabCita").attr("aria-expanded", "false");
            $("#tabProf").parent().addClass("active");
            $("#tabCita").parent().removeClass("active");
            anteriorPaso();
        }
        else {
            $("#" + btId.id).attr("href", "#datoCita");
            gestionBotones('tabCita');
        }
    }, 1);

    $(document).ready(function () {
        var idAgenda = 0;
        idAgenda = $("#hfIdAgenda").val();
        if (idAgenda == '0') {
        }
        else {
            $("#" + btId.id).attr("href", "#datoCita");
            gestionBotones('tabCita');
        }
    });   
}

function anteriorPaso() {
    var link = $(".active :first-child").attr('href');
    switch (link) {
        case '#selCentro':
            break;
        case '#selProf':
            $("#tabCentro").click();
            break;
        case '#datoCita':
            $("#tabProf").click();
            break;
        default:
    }
}

function siguientePaso() {
    ocultarPrimeraFila();
    var link = $(".active :first-child").attr('href');
    switch (link) {
        case '#selCentro':
            $("#tabProf").click();
            ocultarPrimeraFila();
            break;
        case '#selProf':
            $("#tabCita").click();
            muestraAgendas();
            break;
        case '#datoCita':
            break;
        default:
    }
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function mostrarHorasCitas() {
    var acepta = $('#aceptoDatos').is(':checked');
    if (acepta == true) {
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    }
}

var nombreProfe = '';
function mostrarSeleccionarCita(idAgenda, nombreProf) {
    buscarMotivosConsulta(idAgenda);
    $("#hfIdAgenda").val(idAgenda);
    nombreProfe = nombreProf;
    return false;
}

function buscarMotivosConsulta(idAgenda) {
    $("#btShowModal").click();
    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var idCentro = $("#hfIdCentroRs").val();

    $.ajax({
        type: "POST",
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        url: "cita_online.aspx/dameMotivosConsulta",
        data: '{usuario: "' + usu + ' ", contrasena: "' + pw + '", idCentro: "' + idCentro + '", idAgenda: "' + idAgenda + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: resulOkMotivosCon,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#btCloseModal").click();
            console.log("ERROR EN buscarMotivosConsulta;\n\n\nXMLHttpRequest=" + XMLHttpRequest.responseText + "\n\ntextStatus=" + textStatus + "\n\nerrorThrown=" + errorThrown);
            abreMensajeModal($("#lbAvisoJs").html(), $("#lbErrorRecuperaMotivoCon").html());
        }
    });
}

var arrayMotivos = "";
function resulOkMotivosCon(response) {
    var datos = response.d;

    //Separamos las dos partes de la respuesta. La primera es el desplegable, y la segunda el array con todos los motivos de la agenda
    var motivoSplit = datos.split('&');
    var desple = motivoSplit[0];
    var arrayMot = motivoSplit[1];
    arrayMotivos = arrayMot;

    $("#ddlForMotivos").html(desple);
    $("#hTitDatos").html($("#lbTbAgendaOnline").html() + ' ' + nombreProfe)
    $("#btSiguiente").click();
    $("#txtNombre").focus();
    $("#btCloseModal").click();

    var itemsMotivo = $('#ddlMotivosCon option').size();
    if (itemsMotivo == "1") {
        $("#hfMotivoConsulta").val('*')
    }
}

function cambiaMotivos(idMot) {
    var cadaMotivo = arrayMotivos.split("=");
    var motLen = cadaMotivo.length;

    for (i = 0; i < motLen; i++) {
        var elMotivoIn = cadaMotivo[i].split('/');
        var _id = elMotivoIn[0];
        var _dura = elMotivoIn[1];
        var _com = elMotivoIn[2];
        var _impo = elMotivoIn[3];
        if (idMot == _id) {
            if (_com.trim() != '') {
                abreMensajeModal($("#lbAvisoJs").html(), $("#lbMotivoConComentario").html() + ':\n\n' + _com);
            }
        }
    }
    $("#hfMotivoConsulta").val(idMot)
}

function changeRowColor(fila) {
    $('#tbAgenda > tbody  > tr').each(function () {
        jQuery("tr:odd", 'table').css("background-color", "#f9f9f9");
        jQuery("tr:even", 'table').css("background-color", "#ffffff");
    });
    $(fila).css("background-color", "#ccf2ff");
}

function muestraAgendas() {
    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var url = $("#hfUrl").val();
    var prov = $("#ddlProv").val();
    var centro = $("#ddlCentro").val();
    var espe = $("#ddlEspe").val();
    var txt1 = $("#ddlAsegu").val();
    var txtSplit = txt1.split('=');
    var idAgenda = txtSplit[0];
    var idEnAxon = txtSplit[1];

    if (idEnAxon == '*') {
        idEnAxon = '0';
    }

    $.ajax({
        type: "POST",
        url: "cita_online.aspx/dameLasAgendas",
        data: '{usuario: "' + usu + '" , pdw: "' + pw + '" , url: "' + url + '" , provincia: "' + prov + '", centro: "' + centro + '" , espe: "' + espe + '" , asegu: "' + idEnAxon + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: okMuestraAgendaNew,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("ERROR EN muestraAgendas;\n\n\nXMLHttpRequest=" + XMLHttpRequest.responseText + "\n\n\ntextStatus=" + textStatus + "\n\n\nerrorThrown=" + errorThrown);
        }
    });
}

function setFiltroCentro(valor) {
    var txt = $("#ddlCentro option:selected").text();
    if (txt == 'Cualquiera') {
        txt = '';
    }
    $("#fltCentro").val(txt);
    $("#hfIdProvincia").val($("#ddlProv").val());
    $("#hfIdCentro").val(valor);

    var txt1 = $("#ddlAsegu").val();
    var txtSplit = txt1.split('=');
    var idAgenda = txtSplit[0];
    var idEnAxon = txtSplit[1];

    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var url = $("#hfUrl").val();
    var prov = $("#ddlProv").val();
    var centro = $("#ddlCentro").val();
    var espe = $("#ddlEspe").val();

    if (idEnAxon == '*') {
        idEnAxon = '0';
    }
    
    resetAsegu();
    ajaxEspecialidades();
}

function resetAsegu() {
    var cadena = '<select class="form-control" id="ddlAsegu" onchange="setFiltroSociedades(this.value)">';
    cadena += '<option value="*=*">' + $("#lbPrivado").html() + '</option>';
    cadena += '</select>'

    $("#ddlForAseguradora").html(cadena);
}

function setFiltroProvincia(valor) {
    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var url = $("#hfUrl").val();
    var centro = $("#ddlCentro").val();
    var prov = valor;

    ajaxCentros();
}

function recargaItemCentros(response) {
    var res = response.d;
    $("#ddlForCentros").html(res);

    var idEspeSel = $("#ddlEspe option:selected").val();
    var idCli = $("#hfIdCliente").val();
    var centro = $("#ddlCentro").val();
    var provincia = $("#ddlProv").val();
    
    ajaxEspecialidades();
}

function recargaItemEspe(response) {
    var res = response.d;
    $("#ddlForEspecialidades").html(res);

    var idEspeSel = $("#ddlEspe option:selected").val();
    var idCli = $("#hfIdCliente").val();
    var centro = $("#ddlCentro").val();
    var provincia = $("#ddlProv").val();

    ajaxCompanias();
}

function setFiltroEspecialidad(valor) {
    var txt = $("#ddlEspe option:selected").text();
    if (txt == 'Cualquiera') {
        txt = '';
    }

    if (txt == $("#lbCualquiera").html()) {
        txt = '';
    }
    $("#fltEspe").val(txt);
    $("#hfIdEspecialidad").val(valor);

    var idEspeSel = $("#ddlEspe option:selected").val();
    var idCli = $("#hfIdCliente").val();
    var centro = $("#ddlCentro").val();

    ajaxCompanias();
   
    var txt1 = $("#ddlAsegu").val();
    var txtSplit = txt1.split('=');
    var idAgenda = txtSplit[0];
    var idEnAxon = txtSplit[1];

    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var url = $("#hfUrl").val();
    var prov = $("#ddlProv").val();
   
    var espe = $("#ddlEspe").val();

    if (idEnAxon == '*') {
        idEnAxon = '0';
    }
}

function recargaItemCompani(response) {
    var res = response.d;
    $("#ddlForAseguradora").html(res);
}

function setFiltroSociedades(valor) {
    var txt = $("#ddlAsegu").val();
    var txtSplit = txt.split('=');
    var idAgenda = txtSplit[0];
    var idEnAxon = txtSplit[1];

    if (idAgenda == '*') {
        idAgenda = '';
    }
    $("#hfIdSociedad").val(idEnAxon);

    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var url = $("#hfUrl").val();
    var prov = $("#ddlProv").val();
    var centro = $("#ddlCentro").val();
    var espe = $("#ddlEspe").val();

    if (idEnAxon == '*') {
        idEnAxon = '0';
    }
}

function okMuestraAgendaNew(response){
    var res = response.d;
    if (res != '') {
        $("#tbForMedicos").html('');
        $("#tbForMedicos").html(res);
        ocultarPrimeraFila();
    }
}

function mostrarSeleccionarDiaHora() {
    if ($('#radioSelecciona')[0].checked == true) {
        $("#divDiaHora").show();
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    }
    else {
        $("#divDiaHora").hide();
        limpiarCamposHoraFecha();
    }
}

function rellenarCamposModificarCita() {
    var nombreSpl = $("#spModPac").text().trim().split(' ');
    if (nombreSpl.length == 3) {
        $("#txtNombre").val(nombreSpl[0]);
        $("#txtApellido1").val(nombreSpl[1]);
        $("#txtApellido2").val(nombreSpl[2]);
    }
    else {
        if (nombreSpl.length == 2) {
            $("#txtNombre").val(nombreSpl[0]);
            $("#txtApellido1").val(nombreSpl[1]);
        }
        else {
            $("#txtNombre").val($("#spModPac").text());
            $("#txtApellido1").val('');
        }
    }
    $("#txtTelefono").val($("#spModTel").text().trim());
    $("#txtEmail").val($("#spModMail").text());
}

function buscarHueco() {

    $("#hfHoraIni").val($("#horaDesde").val());
    if ($("#hfHoraIni").val() == '') {
        $("#hfHoraIni").val('08:00');
    }

    $("#hfHoraFin").val($("#horaHasta").val());
    if ($("#hfHoraFin").val() == '') {
        $("#hfHoraFin").val('22:00');
    }

    $("#hfFechaIni").val($("#fechaDesde").val());
    $("#hfFechaFin").val($("#fechaHasta").val());

    $("#hfNombre").val($("#txtNombre").val());
    $("#hfApe1").val($("#txtApellido1").val());
    $("#hfApe2").val($("#txtApellido2").val());
    $("#hfTlf").val($("#txtTelefono").val());
    $("#hfMail").val($("#txtEmail").val());
    $("#hfNotas").val($("#txtObservaciones").val());

    llamarBuscaHueco();

    //bootbox.confirm({
    //    title: $("#lbAvisoJs").html(),
    //    message: $("#lbMensajeConfirmaBuscaCita").html(),
    //    buttons: {
    //        confirm: {
    //            label: $("#lbContinuar").html(),
    //            className: 'btn-success'
    //        },
    //        cancel: {
    //            label: $("#lbRevisar").html(),
    //            className: 'btn-danger'
    //        }
    //    },
    //    onEscape: false,
    //    closeButton: false,
    //    callback: function (result) {
    //        if (result == true) {
    //            //$("#hfHoraIni").val($("#horaDesde").val());
    //            //if ($("#hfHoraIni").val() == '') {
    //            //    $("#hfHoraIni").val('08:00');
    //            //}

    //            //$("#hfHoraFin").val($("#horaHasta").val());
    //            //if ($("#hfHoraFin").val() == '') {
    //            //    $("#hfHoraFin").val('22:00');
    //            //}

    //            //$("#hfFechaIni").val($("#fechaDesde").val());
    //            //$("#hfFechaFin").val($("#fechaHasta").val());

    //            //$("#hfNombre").val($("#txtNombre").val());
    //            //$("#hfApe1").val($("#txtApellido1").val());
    //            //$("#hfApe2").val($("#txtApellido2").val());
    //            //$("#hfTlf").val($("#txtTelefono").val());
    //            //$("#hfMail").val($("#txtEmail").val());
    //            //$("#hfNotas").val($("#txtObservaciones").val());

    //            llamarBuscaHueco();
    //        }
    //    }
    //});
}

function okBuscaHueco(response) {
    $("#btBuscarCita").button('reset');
    var redIdCita = response.d
    // Si numeric && > 0 ---> OK
    // Si no numeric ---> KO + ERROR

    var n = redIdCita.indexOf("%");
    if (n > 0) {
        //Contiene %, es una cita correcta
        mostrarDatosConfirmaCita(redIdCita);
    }
    else {
        //No contiene %, no es correcta la cita
        abreMensajeModal($("#lbAvisoJs").html(), redIdCita)
    }

    $("#btCloseModal").click();
}

function limpiarCamposHoraFecha() {
    $("#fechaDesde").val('');
    $("#fechaHasta").val('');
    $("#horaDesde").val('');
    $("#horaHasta").val('');
}

function cambiarDatosCita() {
    $("#btConfirmaCita").unbind('click');
    $("#divFormCita").show();
    $("#divDatosConfirmaCita").hide();
    //Moviles
    $("#contTablaDatosCita").hide();

    $("#filaBotonesConfirmaModifica").hide();

    $("#tablaBotonesNextPrev").show();
    $("#divPrecio").remove();
    $("#divKoConfirmaCita").hide();
}

var idTpvSelecc = 0;
function mostrarDatosConfirmaCita(datos) {
    $("#divFormCita").hide();
    $("#divDatosConfirmaCita").show();
    //Moviles
    $("#contTablaDatosCita").show();
    $("#filaBotonesConfirmaModifica").show();
    $("#tablaBotonesNextPrev").hide();

    var array = datos.split('%');

    var agenda = array[0];
    var espe = array[1];
    var nCentro = array[2];
    var dCentro = array[3];
    var diaHora = array[4];
    var arrayFecha = diaHora.split(' ');
    var dia = arrayFecha[0];
    var hora = arrayFecha[1];
    var nPac = array[5];
    var tlfPac = array[6];
    var mailPac = array[7];
    var compa = array[8];
    var idCita = array[9];
    var id = array[10];
    var importe = array[11] + ' &#8364;';
    var motivo = array[12];
    var duracion = array[13];
    var comentarioMotivo = array[14];
    var idTpv = array[15];
    var observa = $("#txtObservaciones").val();

    $("#spAgendaConfirma").html(agenda);
    $("#spEspeConfirma").html(espe);
    $("#spCentroConfirma").html(nCentro);
    $("#spDireccionConfirma").html(dCentro);
    $("#spFechaConfirma").html($("#lbEl").html() + ' '  + dia + ' ' + $("#lbALas").html() + ' ' + hora);
    $("#spNombreConfirma").html(nPac);
    $("#spTelefConfirma").html(tlfPac);
    $("#spMailConfirma").html(mailPac);
    $//("#spSociedadConfirma").html(compa);
    if (compa.toLowerCase().trim() == 'privado') {
        $("#spSociedadConfirma").html($("#lbPrivado").html());
    }
    else {
        $("#spSociedadConfirma").html(compa);
    }
    $("#spObservaConfirma").html(observa);

    $("#spMotivoConfirma").html(motivo);
    $("#spComentarioConfirma").html(comentarioMotivo);

    $("#hfIdCitaParaConfirmar").val(idCita);
    $("#hfIdCitaInterna").val(id);

    //Para dispositivos móviles
    $("#spTbDatosCita_Agenda").html(agenda);
    $("#spTbDatosCita_Espe").html(espe);
    $("#spTbDatosCita_Centro").html(nCentro);
    $("#spTbDatosCita_Direccion").html(dCentro);
    $("#spTbDatosCita_DiaHora").html($("#lbEl").html() + ' ' + dia + ' ' + $("#lbALas").html() + ' ' + hora);
    $("#spTbDatosCita_NombrePac").html(nPac);
    $("#spTbDatosCita_Telef").html(tlfPac);
    $("#spTbDatosCita_Mail").html(mailPac);
    //$("#spTbDatosCita_Sociedad").html(compa);
    if (compa.toLowerCase().trim() == 'privado') {
        $("#spTbDatosCita_Sociedad").html($("#lbPrivado").html());
    }
    else {
        $("#spTbDatosCita_Sociedad").html(compa);
    }

    $("#spTbDatosCita_Motivo").html(motivo);
    $("#spTbDatosCita_Comentario").html(comentarioMotivo);
    $("#spTbDatosCita_Observa").html(observa);

    var precioVar = parseInt(importe)

    if (precioVar == '0') {
        $('<div class="row hidden-xs" id="divPrecio"><br/></div>').insertBefore("#filaBotonesConfirmaModifica");
        $("#hfTieneTpv").val('0');
        $("#filaImporteTablaDatos").css('display', 'none');
    }
    else {
        if (idTpv != '0') {
            idTpvSelecc = idTpv;
            $("#hfTieneTpv").val('1');
            importe = importe + ' <b>(' + $("#lbPagoTpvSeguro").html() + ')</b>'
        }
        $('<div class="row hidden-xs" id="divPrecio"><div class="col-md-1 col-xs-1"></div><div class="col-md-5 col-xs-5 prenombre">' + $("#lbTbImporteOnline").html() + '<span class="visible-lg-inline visible-md-inline" > ' + $("#lbDeLaCita").html() + '</span></div><div class="col-md-5 col-xs-5 text-left"><span id="spValorImporte" style="vertical-align: -webkit-baseline-middle;">' + importe + ' </span></div><div class="col-md-1 col-xs-1"></div><br/><br/><br/></div>').insertBefore("#filaBotonesConfirmaModifica");
        $("#filaImporteTablaDatos").css('display', 'block');
        $("#spTbDatosCita_Importe").html(importe + ' &#8364;');
    }

    setPasarelaTpv();
}

function okConfirmaCita(response) {
    var respuesta = response.d;
    if ((respuesta) == "0") {
        //OK
        dameDatosCitaConfirmada()
    }
    else {
        //Ko
        var strError = '';
        switch (respuesta) {
            case "-21":
                strError = '(' + $("#lbCitaReservadaNoDisponible").html() + ')';
                break;
            default:
                strError = '';
                break;
        }
        $("#codigoErrorConfirmaCita").html($("#lbCodError").html() + ': ' + respuesta + ' ' + strError);
        $("#btCloseModal").click();
        $("#divKoConfirmaCita").show();
        $("#divOkConfirmaCita").hide();
        $('html, body').animate({
            scrollTop: $("#codigoErrorConfirmaCita").offset().top
        }, 2000);
    }
}

function setConfirmaCita() {
    $("#btConfirmaCita").click(function () {
        confirmarCita();
    });
}

function setPasarelaTpv() {
    var tpv = $("#hfTieneTpv").val();
    $("#btConfirmaCita").unbind('click');
    if (tpv == "0") {
        //No tiene TPV
        $("#btConfirmaCita").click(confirmarCita);
    }
    else {
        //Tiene TPV
        $("#btConfirmaCita").click(asignarParamsTpv);
    }
}

function asignarParamsTpv() {
    var tpv = $("#hfUrlTpv").val();
    var id = $("#hfIdCitaInterna").val();
    tpv = tpv + '&i=' + id + '&t=' + idTpvSelecc;
    $("#hfUrlTpv").val(tpv);

    $("#divDatosPagoTpv").show();
    $("#divSolicitarCita").hide();

    $("#frameTpv").attr("src", tpv);
    $("#tbBotonVolverFinal").show();
    
    $("#h1TituloPagina").hide();

    var multip = 1.10;
    var h = window.innerHeight;
    var alturaMinFinal = h / multip;
    $("#frameTpv").css("min-height", alturaMinFinal);

    return false;
}

function bloquearPagina() {
    $(document).ready(function () {
        $("#btSolicitarCita").attr('disabled', 'true');
        $("#btModificaCita").attr('disabled', 'true');

        $("#myModalLabel").html($("#lbErrorComunicaServidor").html());
        $("#textoModalBloqueo").html($("#lbErrorRecuperaDatosClinica").html() + '.<br/><br/>' + $("#lbSiProblemaPersiste").html() + '.');

        $("#spanLoading").removeClass("glyphicon");
        $("#spanLoading").removeClass("glyphicon-refresh");
        $("#spanLoading").removeClass("glyphicon-refresh-animate");

        $("#btShowModal").click();
    });
}

function comprobarItemsSelectParaSeleccionar() {
    var itemsProv = $('#ddlProv option').size();
    if (itemsProv == "2") {
        $('#ddlProv option').eq(1).prop('selected', true);
    }

    var itemsCentro = $('#ddlCentro option').size();
    if (itemsCentro == "2") {
        $('#ddlCentro option').eq(1).prop('selected', true);
    }

    var itemsEspe = $('#ddlEspe option').size();
    if (itemsEspe == "2") {
        $('#ddlEspe option').eq(1).prop('selected', true);
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function guardarDatosForm() {
    setCookie('cNombre', $("#txtNombre").val(), 7);
    setCookie('cApe1', $("#txtApellido1").val(), 7);
    setCookie('cApe2', $("#txtApellido2").val(), 7);
    setCookie('cTelef', $("#txtTelefono").val(), 7);
    setCookie('cMail', $("#txtEmail").val(), 7);
}

function recuperarDatosForm(){
    $("#txtNombre").val(getCookie('cNombre'));
    $("#txtApellido1").val(getCookie('cApe1'));
    $("#txtApellido2").val(getCookie('cApe2'));
    $("#txtTelefono").val(getCookie('cTelef'));
    $("#txtEmail").val(getCookie('cMail'));
}

function isValidDate(date) {
    var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);
    if (matches == null) return false;
    var d = matches[2];
    var m = matches[1] - 1;
    var y = matches[3];
    var composedDate = new Date(y, m, d);
    return composedDate.getDate() == d &&
            composedDate.getMonth() == m &&
            composedDate.getFullYear() == y;
}

function ocultarPrimeraFila() {
    setTimeout(function () {
        $('.no-data').hide();
        if ($('.searchable tr:visible').length == 0) {
            $('.no-data').show();
        }
        else {
            $('.no-data').hide();
        }
    }, 1);
}

function rellenarCamposRecibidos() {
    $("#txtNombre").val($("#hfNombreEnviado").val());
    $("#txtApellido1").val($("#hfApe1Enviado").val());
    $("#txtApellido2").val($("#hfApe2Enviado").val());
    $("#txtTelefono").val($("#hfTelefEnviado").val());
    $("#txtEmail").val($("#hfMailEnviado").val());
}

function abrirVentanaTPV() {
    var tpv = $("#hfUrlTpv").val();
    window.open(tpv, 'tpv', 'menubar=1,resizable=1,width=750,height=550');
    return false;
}

function okMuestraDatosCitaFinal(response) {
    var datos = response.d;

    var array = datos.split('%');

    var agenda = array[0];
    var espe = array[1];
    var nCentro = array[2];
    var dCentro = array[3];
    var diaHora = array[4];
    var arrayFecha = diaHora.split(' ');
    var dia = arrayFecha[0];
    var hora = arrayFecha[1];
    var nPac = array[5];
    var tlfPac = array[6];
    var mailPac = array[7];
    var compa = array[8];
    var idCita = array[9];
    var id = array[10];
    var idUnico = array[11];
    var observa = array[15];
    var motivo = array[12];
    var comenta = array[13];
    var importe = array[14];

    $("#spFinalAgenda").html(agenda);
    $("#spFinalEspe").html(espe);
    $("#spFinalCentro").html(nCentro);
    $("#spFinalDireccion").html(dCentro);
    $("#spFinalDiaHora").html($("#lbEl").html() + ' ' + dia + ' ' + $("#lbALas").html() + ' ' + hora);
    $("#spFinalNomprePac").html(nPac);
    $("#spFinalTelefPac").html(tlfPac);
    $("#spFinalEmailPac").html(mailPac);
    if (compa.toLowerCase().trim() == 'privado') {
        $("#spFinalSociedad").html($("#lbPrivado").html());
    }
    else {
        $("#spFinalSociedad").html(compa);
    }
   // $("#spFinalSociedad").html(compa);
    $("#spFinalId").html(idUnico);
    $("#spFinalObserva").html(observa);
    $("#spFinalMotivo").html(motivo);
    $("#spFinalComenta").html(comenta);
    $("#spFinalImporte").html(importe + ' &#8364;');

    //Dispositivos móviles
    $("#spTablaConfirma_Agenda").html(agenda);
    $("#spTablaConfirma_Espe").html(espe);
    $("#spTablaConfirma_Centro").html(nCentro);
    $("#spTablaConfirma_Direcc").html(dCentro);
    $("#spTablaConfirma_DiaHora").html($("#lbEl").html() + ' ' + dia + ' ' + $("#lbALas").html() + ' ' + hora);
    $("#spTablaConfirma_NombrePac").html(nPac);
    $("#spTablaConfirma_Telef").html(tlfPac);
    $("#spTablaConfirma_Mail").html(mailPac);
    //$("#spTablaConfirma_Soci").html(compa);
    if (compa.toLowerCase().trim() == 'privado') {
        $("#spTablaConfirma_Soci").html($("#lbPrivado").html());
    }
    else {
        $("#spTablaConfirma_Soci").html(compa);
    }
    $("#spTablaConfirma_idUnico").html(idUnico);
    $("#spTablaConfirma_Observa").html(observa);
    $("#spTablaConfirma_Motivo").html(motivo);
    $("#spTablaConfirma_Comenta").html(comenta);
    $("#spTablaConfirma_Importe").html(importe + ' &#8364;');

    var precioVar = parseInt(importe)
    if (precioVar == '0' || compa.trim().toLowerCase() != 'privado') {
        //No tiene precio, ocultamos ambos divs
        $("#div_spFinalImporte").hide();
        $("#div_spTablaConfirma_Importe").hide();
    }
    else {
        //Tiene precio, mostramos los divs
        $("#div_spFinalImporte").show();
        $("#div_spTablaConfirma_Importe").show();
    }
    
    $("#divKoConfirmaCita").hide();
    $("#divOkConfirmaCita").show();
    $("#divSolicitarCita").hide();

    var citaEliminar = $("#hfIdCitaParaEliminar").val();
    $("#hfIdCitaParaEliminar").val('0');
    if (citaEliminar != '0') {
        borrarCita(citaEliminar);
    }
    $("#btCloseModal").click();
}

function okBorraCita(response) {
    var datos = response.d;
}

function okCitaCorreo(response) {
    $("#btCloseModal").click();
    var respuesta = response.d;
    $("#divCitaPorCorreo").hide();
    if (respuesta == '1') {
        $("#divOkCitaCorreo").show();
        $("#divKoCitaCorreo").hide();
    }
    else {
        $("#errorCorreo").html(respuesta);
        $("#divKoCitaCorreo").show();
        $("#divOkCitaCorreo").hide();
    }
}

//Funciones AJAX
function borrarCita(id) {
    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var url = $("#hfUrl").val();
    var idCita = $("#hfCitaAxonEliminar").val();
    var rutaAxon = ''; 

    $.ajax({
        type: "POST",
        url: "cita_online.aspx/borraCita",
        data: '{id: "' + id + '" , idCita: "' + idCita + '" , usuario: "' + usu + '" , password: "' + pw + '" , rutaAxon: "' + rutaAxon + '" , url: "' + url + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: okBorraCita,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("ERROR EN borrarCita;\n\n\nXMLHttpRequest=" + XMLHttpRequest.responseText + "\n\n\ntextStatus=" + textStatus + "\n\n\nerrorThrown=" + errorThrown);
        }
    });
}

function pedirCitaCorreo() {    
    var acepta = $('#chkAceptoCorreo').is(':checked');
    if (acepta == true) {
        var mensaje = '';

        var laEspe = '';
        laEspe = $("#ddlEspeCorreo option:selected").text();
        if ((laEspe == $("#lbDivSeleccioneUnoCorreo").html())) {
            mensaje = mensaje + '-' + $("#lbSeleccionaEspeci").html() + '.\n';
        }

        if ($("#txtMedicoCorreo").val() == '') {
            mensaje = mensaje + '-' + $("#lbNombreMedicoObliga").html() + '.\n';
        }

        if ($("#txtNombrePacienteCorreo").val() == '') {
            mensaje = mensaje + '-' + $("#lbNombrePaciObliga").html() + '.\n';
        }

        if ($("#txtApe1PacienteCorreo").val() == '') {
            mensaje = mensaje + '-' + $("#lbPrimerApeObliga").html() + '.\n';
        }

        if ($("#fechaNacPacienteCorreo").val() == '') {
            mensaje = mensaje + '-' + $("#lbFechaNaciObliga").html() + '.\n';
        }
        else {
        }

        if ($("#telefonoPacienteCorreo").val() == '') {
            mensaje = mensaje + '-' + $("#lbTelefonoObliga").html() + '.\n';
        }
        else {
            if ($("#telefonoPacienteCorreo").val().length != 9) {
                mensaje = mensaje + '-' + $("#lbTelefonoIncorrecto").html() +'.\n';
            }
        }

        if ($("#txtEmailPacienteCorreo").val() == '') {
            mensaje = mensaje + '-' + $("#lbEmailPaciObliga").html() +'.\n';
        }
        else {
            if (isEmail($("#txtEmailPacienteCorreo").val()) == false) {
                mensaje = mensaje + '-' + $("#lbEmailIncorrecto").html() + '.\n';
            }
            else {
                //22/09/2016 --> Añadimos la validacion para el nuevo campo de confirmacion del email
                if ($("#txtEmailPacienteCorreo").val() != $("#txtConfirmaEmailPacienteCorreo").val()) {
                    mensaje = mensaje + '-' + $("#lbEmailNoCoincide").html() + '.\n';
                }
            }
        }

        var laPrimera = '';
        laPrimera = $("#ddlPrimeraConsulta option:selected").text();
        if (laPrimera == $("#lbDivSeleccioneUnoCorreo").html()) {
            mensaje = mensaje + '-' + $("#lbEsPrimeraCons").html() +'.\n';
        }

        if ($("#fechaCitaCorreo").val() == '') {
            mensaje = mensaje + '-' + $("#lbFechaCitaObliga").html() + '.\n';
        }
        else {
        }

        var elHorario = '';
        elHorario = $("#ddlHorarioCitaCorreo option:selected").text();
        if (elHorario == $("#lbDivSeleccioneUnoCorreo").html()) {
            mensaje = mensaje + '-' + $("#lbSeleccionaHorario").html() + '.\n';
        }

        var laAsegu = '';
        laAsegu = $("#ddlAseguCorreo option:selected").text();
        if (laAsegu == $("#lbDivSeleccioneUnoCorreo").html()) {
            mensaje = mensaje + '-' + $("#lbSeleccionaAsegu").html() + '.\n';
        }

        if (mensaje == "") {
            $("#btShowModal").click();
            $.ajax({
                type: "POST",
                url: "cita_online.aspx/solicitaCitaCorreo",
                data: '{nombreProfesional: "' + $("#txtMedicoCorreo").val() + ' ", nombreEspecialidad: "' + laEspe + ' ", fecha: "' + $("#fechaCitaCorreo").val() + ' ", nombre: "' + $("#txtNombrePacienteCorreo").val() + ' ", apellido1: "' + $("#txtApe1PacienteCorreo").val() + ' ", apellido2: "' + $("#txtApe2PacienteCorreo").val() + ' ", telefono: "' + $("#telefonoPacienteCorreo").val() + ' ", email: "' + $("#txtEmailPacienteCorreo").val() + ' ", compania: "' + laAsegu + ' ", idCentro: "' + $("#hfIdCliente").val() + ' ", url: "' + $("#hfUrl").val() + ' ", usuario: "' + $("#hfUsu").val() + ' ", clave: "' + $("#hfPw").val() + ' ", idCita: "' + '0' + ' ", correoClinica: "' + '' + ' ", fechaNacimiento: "' + $("#fechaNacPacienteCorreo").val() + ' ", primeraCita: "' + laPrimera + ' ", horario: "' + elHorario + ' " }',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: okCitaCorreo,
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $("#btCloseModal").click();
                    console.log("ERROR EN pedirCitaCorreo;\n\n\nXMLHttpRequest=" + XMLHttpRequest.responseText + "\n\n\ntextStatus=" + textStatus + "\n\n\nerrorThrown=" + errorThrown);
                    abreMensajeModal($("#lbAvisoJs").html(), $("#lbErrorSolicitandoCita").html())
                }
            });
        }
        else {
            $("#btCloseModal").click();
            $('#chkAceptoCorreo')[0].checked = false;
            mensaje = $("#lbCorregirParaSeguir").html + ':\n\n' + mensaje;
            abreMensajeModal($("#lbAvisoJs").html(), mensaje)
        }

    }
    else {
        $("#btCloseModal").click();
        abreMensajeModal($("#lbAvisoJs").html(), $("#lbAceptaCondiciones").html())
        return false;
    }
}

function llamarBuscaHueco() {
    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var url = $("#hfUrl").val();
    var tarjeta = '';
    var horaIni = $("#hfHoraIni").val();
    var horaFin = $("#hfHoraFin").val();
    var fIni = $("#hfFechaIni").val();
    var fFin = $("#hfFechaFin").val();
    var nom = $("#hfNombre").val();
    var ape1 = $("#hfApe1").val();
    var ape2 = $("#hfApe2").val();
    var tlf = $("#hfTlf").val();
    var mail = $("#hfMail").val();
    var notas = $("#txtObservaciones").val();
    var agenda = $("#hfIdAgenda").val();
    var compania = $("#hfIdSociedad").val();
    var motivoConsulta = $("#hfMotivoConsulta").val();

    var acepta = $('#aceptoDatos').is(':checked');
    if (acepta == true) {
        var idAgenda = 0;
        idAgenda = $("#hfIdAgenda").val();
        if (idAgenda == '0') {
            $('#aceptoDatos')[0].checked = false;
            abreMensajeModal($("#lbAvisoJs").html(), $("#lbPrimeroUnaAgenda").html())
            return false;
        }
        else {
            var mensaje = '';

            if (motivoConsulta == '0') {
                mensaje = mensaje + '-' + $("#lbMotivoObliga").html() + '.\n';
            }

            if ($("#txtNombre").val() == '') {
                mensaje = mensaje + '-' + $("#lbNombreObliga").html() + '.\n';
            }

            if ($("#txtApellido1").val() == '') {
                mensaje = mensaje + '-' + $("#lbPrimerApelliObliga").html() + '.\n';
            }

            if ($("#txtTelefono").val() == '') {
                mensaje = mensaje + '-' + $("#lbTelefObliga").html() + '.\n';
            }
            else {
                if ($("#txtTelefono").val().length != 9) {
                    mensaje = mensaje + '-' + $("#lbTelefonoIncorrecto").html() + '.\n';
                }
            }

            if ($("#txtEmail").val() == '') {
                mensaje = mensaje + '-' + $("#lbMailObliga").html() + '.\n';
            }
            else {
                if (isEmail($("#txtEmail").val()) == false) {
                    mensaje = mensaje + '-' + $("#lbEmailIncorrecto").html() + '.\n';
                }
                else {
                    //22/09/2016 --> Añadimos la validacion para el nuevo campo de confirmacion del email
                    if ($("#txtEmail").val() != $("#txtEmailConfirma").val()) {
                        mensaje = mensaje + '-' + $("#lbEmailNoCoincide").html() + '.\n';
                    }
                }
            }

            var hoy = new Date();
            var fechaIni = $("#hfFechaIni").val();
            var fechaFin = $("#hfFechaFin").val();

            if ($('#radioSelecciona')[0].checked) {
                if (fechaIni.trim() == '') {
                    if (fechaFin.trim() == '') {
                        mensaje = mensaje + '-' + $("#lbSelUnaFecha").html() + '.\n';
                    }
                    else {
                        var _d = new Date(fechaFin.trim());
                        if (_d < hoy) {
                            mensaje = mensaje + '-' + $("#lbFechaFinMinorHoy").html() + '.\n';
                        }
                    }
                }
                else {
                    if (fechaFin.trim() == '') {

                    }
                    else {
                        var dIni = new Date(fechaIni);
                        var dFin = new Date(fechaFin);
                        if (dIni < hoy) {
                            mensaje = mensaje + '-' + $("#lbFechaIniInferiorHoy").html() + '.\n';
                        }
                        else {
                            if (dIni > dFin) {
                                mensaje = mensaje + '-' + $("#lbFechaIniMayorFin").html() + '.\n';
                            }
                        }
                    }
                }
                //if ($("#hfFechaIni").val() > $("#hfFechaFin").val()) {
                //    mensaje = mensaje + '-La fecha inicial no puede ser mayor que la fecha final.\n';
                //}

                if ($("#hfHoraIni").val() > $("#hfHoraFin").val()) {
                    mensaje = mensaje + '-' + $("#lbHoraInicialMayorFinal").html() + '.\n';
                }
                if ($("#hfHoraFin").val() < $("#hfHoraIni").val()) {
                    mensaje = mensaje + '-' + $("#lbHoraFinMayorInicio").html() + '.\n';
                }
            }

            //if ($("#hfFechaFin").val() < $("#hfFechaIni").val()) {
            //    mensaje = mensaje + '-La fecha final no puede ser mayor que la fecha inicial.\n';
            //}

            //if (($("#hfFechaIni").val() == $("#hfFechaFin").val()) && (($("#hfFechaIni").val() != '') || ($("#hfFechaFin").val() != ''))) {
            //    mensaje = mensaje + '-La fecha inicial no puede ser igual que la fecha final.\n';
            //}

            if (mensaje == '') {}
            else {
                $('#aceptoDatos')[0].checked = false;
                mensaje = $("#lbCorregirParaSeguir").html() + ':\n\n' + mensaje;
                abreMensajeModal($("#lbAvisoJs").html(), mensaje);
                return false;
            }
        }
    }
    else {
        abreMensajeModal($("#lbAvisoJs").html(), $("#lbAceptaCondiciones").html());
        return false;
    }

    var recuerda = $('#chkRecordarDatos').is(':checked');
    if (recuerda == true) {
        guardarDatosForm();
    }

    bootbox.confirm({
        title: $("#lbAvisoJs").html(),
        message: $("#lbMensajeConfirmaBuscaCita").html(),
        buttons: {
            confirm: {
                label: $("#lbContinuar").html(),
                className: 'btn-success'
            },
            cancel: {
                label: $("#lbRevisar").html(),
                className: 'btn-danger'
            }
        },
        onEscape: false,
        closeButton: false,
        callback: function (result) {
            if (result == true) {
                $("#btShowModal").click();

                $.ajax({
                    type: "POST",
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                    url: "cita_online.aspx/buscaHueco",
                    data: '{usuario: "' + usu + ' ", pdw: "' + pw + '", url: "' + url + '", tarjetaRs: "' + tarjeta + ' ", horaInicio: "' + horaIni + ' ", horaFin: "' + horaFin + ' ", fechaInicio: "' + fIni + ' ", fechaFin: "' + fFin + ' ", nombre: "' + nom + ' ", apellido1: "' + ape1 + ' ", apellido2: "' + ape2 + ' ", telefono: "' + tlf + ' ", email: "' + mail + ' ", notas: "' + notas + ' ", idAgenda: "' + agenda + ' ", compania: "' + compania + ' ", motivoConsulta: "' + motivoConsulta + '"}',
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: okBuscaHueco,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $("#btCloseModal").click();
                        console.log("ERROR EN llamarBuscaHueco;\n\n\nXMLHttpRequest=" + XMLHttpRequest.responseText + "\n\ntextStatus=" + textStatus + "\n\nerrorThrown=" + errorThrown);
                        abreMensajeModal($("#lbAvisoJs").html(), $("#lbErrorSoliCita").html());
                    }
                });
            }
        }
    });
}

function confirmarCita() {
    $("#btShowModal").click();
    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var url = $("#hfUrl").val();
    var idCita = $("#hfIdCitaParaConfirmar").val();
    var idAgen = $("#hfIdAgenda").val();

    $.ajax({
        type: "POST",
        url: "cita_online.aspx/confirmaCita",
        data: '{usuario: "' + usu + ' ", pdw: "' + pw + '", url: "' + url + '", idCita: "' + idCita + '", idAgenda: "' + idAgen + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: okConfirmaCita,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#btCloseModal").click();
            console.log("ERROR EN confirmarCita;\n\n\nXMLHttpRequest=" + XMLHttpRequest.responseText + "\n\n\ntextStatus=" + textStatus + "\n\n\nerrorThrown=" + errorThrown);
            abreMensajeModal($("#lbAvisoJs").html(), $("#lbErrorConfiCita").html());
        }
    });
}

function dameDatosCitaConfirmada() {
    $("#btShowModal").click();
    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var url = $("#hfUrl").val();
    var idCita = $("#hfIdCitaInterna").val();
    var idAgen = $("#hfIdAgenda").val();

    $.ajax({
        type: "POST",
        headers: {'X-Requested-With': 'XMLHttpRequest'},
        url: "cita_online.aspx/getDatosCitaConfirmada",
        data: '{usuario: "' + usu + ' ", pdw: "' + pw + '", url: "' + url + '", idCitaSql: "' + idCita + '", idAgenda: "' + idAgen + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: okMuestraDatosCitaFinal,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#btCloseModal").click();
            $("#divKoConfirmaCita").show();
            $("#divOkConfirmaCita").hide();
            $("#divSolicitarCita").hide();
            console.log("ERROR EN dameDatosCitaConfirmada;\n\n\nXMLHttpRequest=" + XMLHttpRequest.responseText + "\n\ntextStatus=" + textStatus + "\n\nerrorThrown=" + errorThrown);
            abreMensajeModal($("#lbAvisoJs").html(), $("#lbErrorRecupeCita").html());
        }
    });
}

function rellenarDatosModificaCita(idCita) {
    var url = window.location.href;
    var a = url.indexOf("&");
    var b = url.substring(a);
    var c = url.replace(b, "");
    url = c;
    $(document).ready(function () {
        $("#btModificaCita").click();
        $("#txtIdUnicoModificar").val(idCita);
        buscarDatosCita();
   });
}

function rellenarDatosAnulaCita(idCita) {
    $(document).ready(function () {
        $("#btAnularCita").click();
        $("#txtIdUnicoModificar").val(idCita);
        buscarDatosCita();
    });
}

function anularCita() {
    $("#btShowModal").click();
    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var url = $("#hfUrl").val();
    var centroRs = $("#hfIdCentroRs").val();
    var idCita = $("#txtIdUnicoModificar").val();
    if (idCita == '') {
        abreMensajeModal($("#lbAvisoJs").html(), $("#lbIdentiObliga").html());
        $("#btCloseModal").click();
        return false;
    }

    $.ajax({
        type: "POST",
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        url: "cita_online.aspx/anulaLaCita",
        data: '{usuario: "' + usu + '", password: "' + pw + '", url: "' + url + '", centroRs: "' + centroRs + '", idCita: "' + idCita + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: confirmaAnulaCita,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#btCloseModal").click();
            console.log("ERROR EN anularCita;\n\n\nXMLHttpRequest=" + XMLHttpRequest.responseText + "\n\ntextStatus=" + textStatus + "\n\nerrorThrown=" + errorThrown);
            abreMensajeModal($("#lbAvisoJs").html(), $("#lbErrorAnuCita").html());
        }
    });
}

function confirmaAnulaCita(response) {
    var datos = response.d;
    if (datos == 'ok') {
        $("#divModificarCita").hide();
        $("#divOkAnulaCita").show();
        $("#tbBotonVolverFinal").show();
    }
    else {
        //abreMensajeModal($("#lbAvisoJs").html(), 'Ha ocurrido un error al intentar anular su cita.\n\nSi el problema persiste, por favor póngase en contacto con su clínica.\n\nDisculpe las molestias');
        var codi = '-99';
        var codiArray;
        try {
            console.log(datos);
            codiArray = datos.split(":");
            console.log(codiArray);
            codi = codiArray[1];
            console.log(codi);
        } catch (e) {

        }
        abreMensajeModal($("#lbAvisoJs").html(), $("#lbErrorGenericoAnulaCita").html() + '.\n\n' + $("#lbPongaContacto").html() + '.\n\n' + $("#lbErrorConfirma4").html() + ' (Cód: ' + codi + ')');
    }
    $("#btCloseModal").click();
}

function buscarDatosCita() {
    $("#btShowModal").click();
    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var url = $("#hfUrl").val();
    var idCita = $("#txtIdUnicoModificar").val();
    $("#divMostrarDatosAntesModificar").hide();
    if (idCita == '') {
        abreMensajeModal($("#lbAvisoJs").html(), $("#lbIdentiObliga").html());
        $("#btCloseModal").click();
        return false;
    }

    $.ajax({
        type: "POST",
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        url: "cita_online.aspx/buscaDatosCita",
        data: '{usuario: "' + usu + ' ", pdw: "' + pw + '", url: "' + url + '", idCita: "' + idCita + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: mostrarDatosCitaPorId,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#btCloseModal").click();
            console.log("ERROR EN buscarDatosCita;\n\n\nXMLHttpRequest=" + XMLHttpRequest.responseText + "\n\ntextStatus=" + textStatus + "\n\nerrorThrown=" + errorThrown);
            abreMensajeModal($("#lbAvisoJs").html(), $("#lbErrorRecupeCita").html());
        }
    });
}

function mostrarDatosCitaPorId(response) {
    var datos = response.d;
    var array = datos.split('%');

    var agenda = array[0];
    var espe = array[1];

    if (agenda == 'NULO'){
        $("#btCloseModal").click();
        abreMensajeModal($("#lbAvisoJs").html(), $("#lbNoExisteCita").html());
        return false;
    }
    
    if (agenda == 'KO') {
        $("#btCloseModal").click();
        abreMensajeModal($("#lbAvisoJs").html(), $("#lbNoPuedeModiCita").html() + ': ' + espe);
        return false;
    }

    var nCentro = array[2];
    var dCentro = array[3];
    var diaHora = array[4];
    var arrayFecha = diaHora.split(' ');
    var dia = arrayFecha[0];
    var hora = arrayFecha[1];
    var nPac = array[5];
    var tlfPac = array[6];
    var mailPac = array[7];
    var compa = array[8];
    var idCita = array[9];
    var id = array[10];
    var observa = array[14];
    var motivo = array[12];
    var comenta = array[13];
    var importe = array[11];

    $("#spModAgenda").html(agenda);
    $("#spModEspe").html(espe);
    $("#spModCentro").html(nCentro);
    $("#spFinalDireccion").html(dCentro);
    $("#spModDiaHora").html($("#lbEl").html() + ' ' + dia + ' ' + $("#lbALas").html() + ' ' + hora);
    $("#spModPac").html(nPac);
    $("#spModTel").html(tlfPac);
    $("#spModMail").html(mailPac);
    if (compa.toLowerCase().trim() == 'privado') {
        $("#spModSoc").html($("#lbPrivado").html());
    }
    else {
        $("#spModSoc").html(compa);
    }

    $("#spModObserva").html(observa);
    $("#spModMotivo").html(motivo);
    $("#spModComenta").html(comenta);
    
    $("#spModImporte").html(importe + ' &#8364;');

    var precioVar = parseInt(importe)
    if (precioVar == '0' || compa.trim().toLowerCase() != 'privado') {
        //No tiene precio, ocultamos ambos divs
        $("#filaImporteMod").hide();
    }
    else {
        //Tiene precio, mostramos los divs
        $("#filaImporteMod").show();
    }

    $("#hfIdCitaParaEliminar").val(id);
    $("#hfCitaAxonEliminar").val(idCita);

    $("#btCloseModal").click();
    $("#divMostrarDatosAntesModificar").show();
}

function abreMensajeModal(titulo, mensaje) {
    $('#titModal').html(titulo);
    var _men = mensaje.replace(/\n/gi, "<br/>");
    $('#cuerpoModal').html(_men);
    $('#btOpenModal').click();
}

function ajaxCentros() {
    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var url = $("#hfUrl").val();
    var centro = $("#ddlCentro").val();
    var prov = $("#ddlProv").val();

    if (centro == '0') {
        centro = '';
    }

    $.ajax({
        type: "POST",
        url: "cita_online.aspx/dameCentros",
        data: '{usuario: "' + usu + '" , contrasena: "' + pw + '" , url: "' + url + '" , provincia: "' + prov + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: recargaItemCentros,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("ERROR EN ajaxCentros;\n\n\nXMLHttpRequest=" + XMLHttpRequest.responseText + "\n\n\ntextStatus=" + textStatus + "\n\n\nerrorThrown=" + errorThrown);
        }
    });
}

function ajaxEspecialidades() {
    var usu = $("#hfUsu").val();
    var pw = $("#hfPw").val();
    var url = $("#hfUrl").val();
    var centro = $("#ddlCentro").val();
    var prov = $("#ddlProv").val();

    if (centro == '0') {
        centro = '';
    }
    if (prov == '00') {
        prov = '0';
    }

    $.ajax({
        type: "POST",
        url: "cita_online.aspx/dameEspecialidades",
        data: '{usuario: "' + usu + '" , contrasena: "' + pw + '" , url: "' + url + '" , idCentro: "' + centro + '" , provincia: "' + prov + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: recargaItemEspe,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("ERROR EN ajaxEspecialidades;\n\n\nXMLHttpRequest=" + XMLHttpRequest.responseText + "\n\n\ntextStatus=" + textStatus + "\n\n\nerrorThrown=" + errorThrown);
        }
    });
}

function ajaxCompanias() {
    var idEspeSel = $("#ddlEspe").val();
    var idCli = $("#hfIdCliente").val();
    var centro = $("#ddlCentro").val();
    var provincia = $("#ddlProv").val();

    if (provincia == '00') {
        provincia = '0';
    }

    $.ajax({
        type: "POST",
        url: "cita_online.aspx/dameCompanias",
        data: '{idCliente: "' + idCli + '" , idEspe: "' + idEspeSel + '" , idCentro: "' + centro + '", provincia: "' + provincia + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: recargaItemCompani,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("ERROR EN ajaxCompanias;\n\n\nXMLHttpRequest=" + XMLHttpRequest.responseText + "\n\n\ntextStatus=" + textStatus + "\n\n\nerrorThrown=" + errorThrown);
        }
    });
}

function confirmaNuevaCita() {
    bootbox.confirm({
        title: $("#lbAvisoJs").html(),
        message: $("#lbQuiereBuscarNuevaCita").html(),
        buttons: {
            confirm: {
                label: $("#lbConfirma").html(),
                className: 'btn-success'
            },
            cancel: {
                label: $("#lbCancela").html(),
                className: 'btn-danger'
            }
        },
        onEscape: false,
        closeButton: false,
        callback: function (result) {
            if (result == true) {
                $("#btCancelModifica").click();
                $("#divModificarCita").hide();
                mostrarMenuSeleccion();
                ocultarPrimeraFila();
                $("#divSolicitarCita").show();
                rellenarCamposModificarCita();
            }
        }
    });
}

function anularLaCita() {
    bootbox.confirm({
        title: $("#lbAvisoJs").html(),
        message:  $("#lbPreguntaAnulaCita").html() ,
        buttons: {
            confirm: {
                label: $("#lbAnular").html(),
                className: 'btn-success'
            },
            cancel: {
                label: $("#lbCancela").html(),
                className: 'btn-danger'
            }
        },
        onEscape: false,
        closeButton: false,
        callback: function (result) {
            if (result == true) {
                anularCita();
            }
        }
    });
}

function cambiaIdioma(obj, idioma) {
    $("#btShowModal").click();
    setCookie('idioma', idioma, 365);
    var laUrl = 'http://localhost:30548/createCookie.aspx?idioma=' + idioma;
    window.location.href = $("#hfUrlPagina").val();
}

var firstTimeSession = 0;
function submitSessionForm() {
    if (firstTimeSession == 0) {
        firstTimeSession = 1;
        $("#sessionform").submit();
    }
}

function comprobarIdiomaCargado() {
    var lang = getCookie('idioma');
    var strLan = lang.toUpperCase();

    //$("#btParaIdiomas").html('<img src="/idiomas/' + lang + '.png" style="width:40px" class="img-circle"> <b>' + strLan + '</b>&nbsp;<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>');
    $("#btParaIdiomas").html('<span> <b>' + strLan + '</b></span>&nbsp;<span class="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>');
    if ($("#lbBand2").html() == "") { //Hay que usar el .html() para que funcione correctamente.
        $("#btParaIdiomas").html('');
        $(".dropdownIdioma").css("display", "none");
    }

    //En este apartado cambiamos los textos de los objetos HTML que no se pueden cambiar desde el server-side
    $("#chkRecordaCorreo").attr('title', $("#lbDivRecuerdaDatosCorreo").html());
    $("#chkAceptoCorreo").attr('title', $("#lbDivAceptoGuardoCorreo").html());

    $("#chkRecordarDatos").attr('title', $("#lbDivRecuerdaFormOnline").html());
    $("#aceptoDatos").attr('title', $("#lbDivAceptoFormOnline").html());
    $("#banderaEsInicio").css("display", "block");
}

function cambiaPlaceHolders() {
    var phTextos = $("#lbPlaceHolderObligatorio").html();

    //Cambiamos los textos de los placeholder de las cajas de texto para que estén en el idioma que el usuario haya seleccionado
    $(document).ready(function () {
        $('form').find("input[type=textarea], input[type=text], input[type=email], input[type=number], input[type=password], textarea").each(function (ev) {
            if (!$(this).val()) {
                var sd = $(this).attr('placeholder');
                if (!sd.trim() == "") {
                    $(this).attr("placeholder", phTextos);  
                }
            }
        });
    });
}

function PrintElem() {
    Popup($("#divParaPrint"));
}

function Popup(data) 
{
    var mywindow = window.open('', 'mydiv', 'height=700,width=1200');
    mywindow.document.write('<html><head><title>Confirmación reserva Cita Online</title>');
    mywindow.document.write('<link href="/css/citaOnline.css?ver=2.3.3" rel="stylesheet" type="text/css" media="print"/>');
    mywindow.document.write('<script type="text/javascript" src="/js/jquery-2.2.2.min.js" ></script>');
    mywindow.document.write('<link href="/css/bootstrap.min.css" rel="stylesheet" media="print"/>');
    mywindow.document.write('<script src="/js/bootstrap.min.js" type="text/javascript"></script>');
    mywindow.document.write('<script src="/js/jquery-ui.min.js" type="text/javascript"></script>');
    mywindow.document.write('<script src="/js/jquery-migrate-1.0.0.js"></script>');
    mywindow.document.write('<link href="/css/jquery-ui.css" rel="stylesheet" type="text/css" media="print"/>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<br/><h1>Confirmación reserva Cita Online</h1><br/>');
    
    mywindow.document.write(data.html());
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10

    setTimeout(function () {
        mywindow.print();
        mywindow.close();
    }, 1200)

    return true;
}

window.onload = function () {
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        var cookies = document.cookie;
        if (top.location != document.location) {
            if (!cookies) {
                href = document.location.href;
                href = (href.indexOf('?') == -1) ? href + '?' : href + '&';
                top.location.href = href + 'reref=' + encodeURIComponent(document.referrer);
            }
        } else {
            ts = new Date().getTime(); document.cookie = 'ts=' + ts;
            rerefidx = document.location.href.indexOf('reref=');
            if (rerefidx != -1) {
                href = decodeURIComponent(document.location.href.substr(rerefidx + 6));
                window.location.replace(href);
            }
        }
    }
}