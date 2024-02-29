function PlantillaReprogramacion(nombreEstudiante, fechaRealizacionEspañol, fechaReprogramacionEspañol, motivo , manera, conferenceLink, lugar, monitor) {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Plantilla de Aviso para Estudiantes</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f8f9fa; margin: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8f9fa;">
      <tr>
        <td align="center" style="padding: 10px;">
          <table width="90%" cellpadding="0" cellspacing="0" border="0" style="max-width: 800px; background-color: #fff;  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="background-color: #007bff; color: #fff; text-align: left; padding: 10px 20px; ">
                  <h1 style="margin-bottom: 5px;">SERVICIO DE TUTORÍA <img src="https://lh3.google.com/u/0/d/1TDNUp1vroNhhpWDRqvaa0o2oCgyW8nX-=w1896-h923-iv2" alt="Logo VALLE GRANDE" style="width: 60px; float: right; margin-top: -10px;"></h1>
                  <h4 style="margin-top: 5px;">VALLE GRANDE</h4>
              </td>
            </tr>
            <tr>
              <td style="background-color: #fff; padding: 30px 20px; height: 400px;">
                <p>Estimado/a estudiante <strong>${nombreEstudiante}</strong>,</p>
                <p>Detalles actualizados:</p>
                <ul style="margin: 0; padding: 0;">
                  <li>Fecha de realización inicial: <strong>${fechaRealizacionEspañol}</strong></li>
                  <li>Fecha de reprogramación: <strong>${fechaReprogramacionEspañol}</strong></li>
                   <li>Motivo: <strong>${motivo}</strong></li>
                  <li>Modalidad de la sesión: <strong>${manera}</strong></li>                   
                  <li>
                    ${manera.toString() === "virtual" ?
      `<p>Enlace de la Reunión: </p>
                       <a href="${conferenceLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Ingresar</a>` :
      `Lugar: <strong>${lugar}</strong>`
    }
                  </li>
                </ul>
                <p style="margin-top: 20px; font-style: italic;">Atentamente,<br>${monitor}</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #fff; padding: 0;">
                <img src="https://lh3.google.com/u/0/d/1l68kVwWxOrWpcDLMoiqST67IUfysPCEH=w1896-h923-iv1" id="wave" style="width: 100%; ">
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;
}



function PlantillaAsistencia(nombreMonitor, estudiante) {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Plantilla de Aviso para Asistencia</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f8f9fa; margin: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8f9fa;">
      <tr>
        <td align="center" style="padding: 10px;">
          <table width="90%" cellpadding="0" cellspacing="0" border="0" style="max-width: 800px; background-color: #fff;  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <tr>
              <td style="background-color: #007bff; color: #fff; text-align: left; padding: 10px 20px; ">
                  <h1 style="margin-bottom: 5px;">SERVICIO DE TUTORÍA  <img src="https://lh3.google.com/u/0/d/1TDNUp1vroNhhpWDRqvaa0o2oCgyW8nX-=w1896-h923-iv2" alt="Logo VALLE GRANDE" style="width: 60px; float: right; margin-top: -10px;"></h1>
                  <h4 style="margin-top: 5px;">VALLE GRANDE</h4>
              </td>
            </tr>
            <tr>
              <td style="background-color: #fff; padding: 30px 20px; height: 300px;">
              <p>Estimado/a estudiante ${estudiante},</p>
              <p>Tu asistencia a la sesión de tutoría ha sido registrada con éxito.</p>
              <p>Gracias por tu compromiso y participación en el proceso de tutoría.</p>
              <p>Atentamente,</p>
              <p>${nombreMonitor}</p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #fff; padding: 0;">
                <img src="https://lh3.google.com/u/0/d/1l68kVwWxOrWpcDLMoiqST67IUfysPCEH=w1896-h923-iv1" id="wave" style="width: 100%; ">
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;
}

