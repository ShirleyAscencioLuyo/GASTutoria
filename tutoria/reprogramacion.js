function enviarCorreo(destinatarios, asunto, cuerpoHTML) {
  var correoRemitente = Session.getActiveUser().getEmail(); 
  GmailApp.sendEmail(destinatarios.join(','), asunto, "", { from: correoRemitente, htmlBody: cuerpoHTML });
}

function onReprogramacion() {
  var correlativo = SHEET_REPROGRAMACION.getRange('M2').getValue();
  SHEET_REPROGRAMACION.getDataRange().getValues().forEach(function (row, index) {
    var fila = index + 1; 
    var estadoEnviado = row[11];
    if (estadoEnviado === "Enviado") {
      Logger.log("El correo ya fue enviado para la fila " + fila);
      return; 
    }

    var fechaRealizacion = new Date(row[0]);
    var carrera = row[1];
    var correoMonitor = row[2];
    var monitor = row[3];
    var semestre = row[4];
    var nombreEstudiante = row[5];
    var fechaReprogramacion = new Date(row[6]);
    var motivo = row[7];
    var manera = row[8];
    var lugar = row[9];
    var comentario = row[10];
    var añoActual = fechaReprogramacion.getFullYear(); 

  
    var calendarId;
    if (carrera === "Producción Agraria") {
      calendarId = CALENDAR_ID_PA;
    } else if (carrera === "Análisis de Sistemas") {
      calendarId = CALENDAR_ID_AS;
    }


    if (manera.toString() === "virtual" || manera.toString() === "presencial") {

      correlativo++;


      var correoEstudiante = buscarCorreoEstudiante(nombreEstudiante);
      if (correoEstudiante) {
        var descripcionEvento = `Nombre del estudiante: ${nombreEstudiante}\nNombre del monitor: ${monitor}`;
        var asuntoCorreo = 'Reprogramación de Tutoría - ' + carrera + ' Nº ' + correlativo.toString().padStart(3, '0') + ' - ' + añoActual;

        var event = {
          "summary": asuntoCorreo,
          "start": {
            "dateTime": fechaReprogramacion.toISOString(),
          },
          "end": {
            "dateTime": fechaReprogramacion.toISOString(),
          },
          "description": descripcionEvento, 
          "attendees": [
            { "email": correoEstudiante },
            { "email": correoMonitor }
          ]
        };

        if (manera.toString() === "virtual") {
          event.conferenceData = {
            "createRequest": {
              "conferenceSolutionKey": {
                "type": "hangoutsMeet"
              },
              "requestId": "meet-request-" + carrera + "-" + fechaReprogramacion.getTime() 
            }
          };
        }

        var createdEvent = Calendar.Events.insert(event, calendarId, {
          "conferenceDataVersion": 1,
          "sendUpdates": "all"
        });

        var conferenceLink = createdEvent.conferenceData ? createdEvent.conferenceData.entryPoints[0].uri : '';
        var destinatarios = [correoEstudiante, correoMonitor];
        var opcionesFormato = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        var fechaRealizacionEspañol = fechaRealizacion.toLocaleString('es-ES', opcionesFormato);
        var fechaReprogramacionEspañol = fechaReprogramacion.toLocaleString('es-ES', opcionesFormato);
        var cuerpoHTML = PlantillaReprogramacion(nombreEstudiante, fechaRealizacionEspañol, fechaReprogramacionEspañol, motivo , manera, conferenceLink, lugar, monitor);

        enviarCorreo(destinatarios, asuntoCorreo, cuerpoHTML);
        SHEET_REPROGRAMACION.getRange(fila, 12).setValue('Enviado');
      } else {
        Logger.log("No se encontró el correo del estudiante.");
      }
    }
  });

  SHEET_REPROGRAMACION.getRange('M2').setValue(correlativo);
}




function buscarCorreoEstudiante(nombreEstudiante) {
  var correoEstudiante = null;

  var contactos = ContactsApp.getContacts();

  for (var i = 0; i < contactos.length; i++) {
    var contacto = contactos[i];
    var nombres = contacto.getGivenName();
    var apellidos = contacto.getFamilyName();
    var nombreCompleto = nombres + ' ' + apellidos;

    if (nombreCompleto.toLowerCase() === nombreEstudiante.toLowerCase()) {
      var emails = contacto.getEmails();
      if (emails.length > 0) {
        correoEstudiante = emails[0].getAddress();
      }
      Logger.log("Correo del estudiante encontrado: " + correoEstudiante);
      break;
    }
  }

  return correoEstudiante;
}