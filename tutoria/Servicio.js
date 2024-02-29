var rutaWeb = ScriptApp.getService().getUrl();;

var email;

function doGet(e) {
  var page;
  email = getUserEmail(); 
  var estadoAcceso = obtenerEstadoAcceso(email);

  if (estadoAcceso.estado === "Activo") {

    page = e.parameter.p || "main";
  } else {
    page = "access/denegado";
  }
  
  var output = HtmlService.createTemplateFromFile(page);
  output.email = email;
  return output.evaluate();
}




function includeHTML(pageName) {
  var htmlContent = HtmlService.createTemplateFromFile(pageName).evaluate().getContent();
  return htmlContent;
}

function includeDenegado() {
  return HtmlService.createTemplateFromFile("access/denegado").evaluate().getContent();
}

function includeHeader() {
  return HtmlService.createTemplateFromFile("share/header").evaluate().getContent();
}
function includeSidebar() {
  return HtmlService.createTemplateFromFile("share/sidebar").evaluate().getContent();
}
function includeCDNHeader() {
  return HtmlService.createTemplateFromFile("js/CDN_Header").evaluate().getContent();
}


function includeCSS(){
  return HtmlService.createTemplateFromFile("css/page").evaluate().getContent();
}
function includeJS(){
  return HtmlService.createTemplateFromFile("js/page").evaluate().getContent();
}
function getUserEmail() {
  return Session.getActiveUser().getEmail();
}

function obtenerEstadoAcceso(correo) {
  var datosAcceso = SHEET_ACCESO.getDataRange().getValues();

  for (var i = 1; i < datosAcceso.length; i++) {
    if (datosAcceso[i][0] === correo && datosAcceso[i][3] === "Activo") {
      var monitor = datosAcceso[i][1];
      var carrera = datosAcceso[i][2];
      return { estado: "Activo", monitor: monitor, carrera: carrera, indice: i };
    }
  }

  return { estado: "No encontrado", monitor: "", carrera: "", indice: -1 };
}



function getSemestresPorMonitor(monitor) {
  var data = SHEET_OPCIONES.getDataRange().getValues();
  var semestres = [];

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === monitor) {
      semestres.push(data[i][1]);
    }
  }

  console.log("Semestres encontrados para " + monitor + ": " + semestres.join(", "));
  return semestres.filter((value, index, self) => self.indexOf(value) === index);
}

function getEstudiantesPorSemestreYMonitor(semestre, monitor) {
  var data = SHEET_OPCIONES.getDataRange().getValues();
  var estudiantes = [];

  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === monitor && data[i][1] === semestre) {
      estudiantes.push(data[i][2]);
    }
  }

  console.log("Parámetros recibidos - Semestre: " + semestre + ", Monitor: " + monitor);
  console.log("Estudiantes encontrados para " + monitor + " en el semestre " + semestre + ": " + estudiantes.join(", "));

  return estudiantes;
}

function enviarDatosModal2(datos) {
  SHEET_ASISTENCIA.appendRow(datos);

}

function enviarDatosModal3(datos) {
  SHEET_REPROGRAMACION.appendRow(datos);
}

function getUserDetails() {
  var email = Session.getActiveUser().getEmail();
  var estadoAcceso = obtenerEstadoAcceso(email);

  if (estadoAcceso.estado === "Activo") {
    return { 
      nombreCompleto: estadoAcceso.monitor, 
      carrera: estadoAcceso.carrera,
    };
  } else {
    return null;
  }
}




