function doPost(e) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Maintenance');

  // Check if e.postData is undefined
  if (!e || !e.postData) {
    Logger.log('No data received');
    return ContentService.createTextOutput('No data received');
  }

  var params = JSON.parse(e.postData.contents);
  Logger.log('Received params: ' + JSON.stringify(params));
  // Find the last row with content in column A
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange('A' + lastRow);

  // Append the data to the next available row
  range.offset(1, 0, 1, 14).setValues([[params.rfid, params.time, params.conductedBy, params.typeOfMaintenance, params.date, params.nextDateOfMaintenance, params.activity, params.unit, params.osEdition, params.installedRAM, params.processor, params.systemType, params.location, params.status]]);

  // Enable CORS
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  return ContentService.createTextOutput('Data saved successfully!')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
}
