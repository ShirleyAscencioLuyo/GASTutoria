function onAsistencia() {

  var correlativo = SHEET_ASISTENCIA.getRange('M2').getValue();
  var datos = SHEET_ASISTENCIA.getDataRange().getValues();
  datos.shift();

  datos.forEach(columna => {
    try {
      var correoEnviado = columna[11];

      if (correoEnviado !== "Enviado") {
       
        correlativo++;

        var fechaRealizacion = Utilities.formatDate(columna[0], 'GMT', 'dd-MM-yyyy');
        var fechaArray = fechaRealizacion.split('-');
        var dia = fechaArray[0];
        var mes = fechaArray[1];
        var year = fechaArray[2];

        var carrera = columna[1];
        var correoMonitor = columna[2];
        var nombreMonitor = columna[3];
        var semestre = columna[4];
        var estudiante = columna[5];
        var manera = columna[6];
        var lugar = columna[7];
        var aspectos = columna[8];
        var acuerdo = columna[9];

        var archivoPlantilla = DriveApp.getFileById(DOCS_ID);
        var archivoCopia = archivoPlantilla.makeCopy(DriveApp.getFolderById(FOLDER_DOCS_ID)).setName("ServicioTutoría_" + Utilities.formatString("%04d", correlativo) + '-' + year);
        var idCopia = archivoCopia.getId();
        var docCopia = DocumentApp.openById(idCopia);
        var body = docCopia.getBody();

        body.replaceText('<<dia>>', dia);
        body.replaceText('<<mes>>', mes);
        body.replaceText('<<year>>', year);
        body.replaceText('<<correlativo>>', Utilities.formatString("%04d", correlativo));
        body.replaceText('<<carrera>>', carrera);
        body.replaceText('<<semestre>>', semestre);
        body.replaceText('<<monitor>>', nombreMonitor);
        body.replaceText('<<enlace_lugar>>', lugar);
        body.replaceText('<<estudiante>>', estudiante);
        body.replaceText('<<aspectos>>', aspectos);
        body.replaceText('<<acuerdos>>', acuerdo);
        body.replaceText('<<manera>>', manera);

        docCopia.saveAndClose();

        var archivo = DriveApp.getFileById(idCopia);
        var pdfBlob = archivo.getAs("application/pdf");
        var pdf = pdfBlob.setName("ServicioTutoría_" + Utilities.formatString("%04d", correlativo) + '-' + year);

        var carpetaPDF = DriveApp.getFolderById(FOLDER_PDF_ID);
        carpetaPDF.createFile(pdf);


        var filaActual = datos.indexOf(columna) + 2; 
        SHEET_ASISTENCIA.getRange(filaActual, 12).setValue("Enviado");


        SHEET_ASISTENCIA.getRange(2, 13).setValue(correlativo);

        var asunto = carrera + " - Sesión de Tutorías Nº " + Utilities.formatString("%04d", correlativo) + '-' + year;

        var mensaje = PlantillaAsistencia(nombreMonitor, estudiante);

        var destinatarios = correoMonitor + "," + buscarCorreoEstudiante(estudiante);

 GmailApp.sendEmail(destinatarios, asunto, '', { htmlBody: mensaje, attachments: [pdf] });


        Logger.log("Correo enviado a " + nombreMonitor + " y " + estudiante);
      } else {
        console.log("El correo ya fue enviado para la fila " + (datos.indexOf(columna) + 2) + ".");
      }
    } catch (error) {
      console.error("Error al procesar datos para el estudiante " + estudiante + ": " + error.message);
    }
  });
}
