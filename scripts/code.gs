function doPost(e) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Main');

  // Check if e.postData is undefined
  if (!e || !e.postData) {
    return ContentService.createTextOutput('No data received');
  }

  var params = JSON.parse(e.postData.contents);

  // Find the last row with content in column A
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange('A' + lastRow);

  // Append the data to the next available row
  range.offset(1, 0, 1, 4).setValues([[params.rfid, params.labNumber, params.pcCode, params.dateAcquired]]);

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

function getDataEndpoint() {
  var data = getData();
  
  // Enable CORS
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
}


function getData(rfid) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Main');
  console.log('dateAcquired');
  // Find the row matching the scanned RFID in column A
  var dataRange = sheet.getRange('A2:D'); // Include header row (A2:D)
  var values = dataRange.getValues();

  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    if (row[0] === rfid) { // Check if RFID matches in the first column (A)
      // Format the date to match the original format in the sheet
      var dateAcquired = Utilities.formatDate(new Date(row[3]), Session.getScriptTimeZone(), 'MM/dd/yyyy');
      
      return {
        rfid: row[0],
        labNumber: row[1],
        pcCode: row[2],
        dateAcquired: dateAcquired
      };
    }
  }

  return null; // Return null if no matching RFID found
}




  //para han 4 input fields
  /**
 * @return {Object}
 */
function doGet(e) {
    var sheetName = "Main"; // Replace with the name of your sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

    // Ensure that the sheet exists
    if (!sheet) {
        console.log("Sheet not found.");
        return ContentService.createTextOutput(JSON.stringify({ error: "Sheet not found." }))
            .setMimeType(ContentService.MimeType.JSON);
    }

    var data = sheet.getDataRange().getValues(); // Fetch all values from the sheet
    var headers = data[0]; // Assume the first row contains headers
    var jsonData = []; // Array to hold the final JSON data

    // Convert each row of data (excluding headers) into a JSON object
    for (var i = 1; i < data.length; i++) {
        var row = data[i];
        var rowObject = {};

        for (var j = 0; j < headers.length; j++) {
            rowObject[headers[j]] = row[j];
        }

        jsonData.push(rowObject);
    }

    console.log("Fetched data:", jsonData); // Debug statement

    // Output the JSON data
    return ContentService.createTextOutput(JSON.stringify(jsonData))
        .setMimeType(ContentService.MimeType.JSON);
}


function doOptions() {
    var headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };
    return ContentService.createTextOutput()
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(headers);
}


//para han maintenance log interface
/**
 * @return {Object}
 */
function doGet(e) {
  console.log("fetchMaintenanceLogData function called."); // Debug statement
  var sheetName = "Maintenance"; // Replace with the name of your sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  // Ensure that the sheet exists
  if (!sheet) {
    console.log("Sheet not found.");
    return ContentService.createTextOutput(JSON.stringify({ error: "Sheet not found." }))
        .setMimeType(ContentService.MimeType.JSON);
  }

  var data = sheet.getDataRange().getValues(); // Fetch all values from the sheet
  var headers = data[0]; // Assume the first row contains headers
  var jsonData = []; // Array to hold the final JSON data

  // Convert each row of data (excluding headers) into a JSON object
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rowObject = {};

    for (var j = 0; j < headers.length; j++) {
      rowObject[headers[j]] = row[j];
    }

    jsonData.push(rowObject);
  }

  console.log("Fetched data for Maintenance Log:", jsonData); // Debug statement

  // Output the JSON data
  return ContentService.createTextOutput(JSON.stringify(jsonData))
      .setMimeType(ContentService.MimeType.JSON);
}




//para han pag send han data to google sheets
function doPost(e) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Maintenance');

  // Check if e.postData is undefined
  if (!e || !e.postData) {
    return ContentService.createTextOutput('No data received');
  }

  var params = JSON.parse(e.postData.contents);

  // Find the last row with content in column A
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange('A' + lastRow);

  // Append the data to the next available row
  range.offset(1, 0, 1, 14).setValues([[params.rfid, params.time, params.date, params.typeOfMaintenance, params.activity, params.conductedBy, params.nextDateOfMaintenance, params.unit, params.osEdition, params.installedRAM, params.processor, params.systemType, params.location, params.status]]);

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







