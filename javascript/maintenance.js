
       //pag show han maintenance log modal
       function showMaintenanceLogModal() {
        var modal = document.getElementById("maintenanceLogModal");
        modal.style.display = "block";
    }
    function closeMaintenanceLogModal() {
        var modal = document.getElementById("maintenanceLogModal");
        modal.style.display = "none";
    }


    function combineDuplicateRFIDValues(allData, targetRFID) {
        // Filter data to include only items with matching RFID
        var combinedRFIDValues = allData.filter(item => item.RFID === targetRFID);
        return combinedRFIDValues;
    }
    
//pag convert into pdf
function generatePDF() {
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();

    console.log("All Data:", allData);

    var data = {
        RFID: document.getElementById('rfid2').value,
        UNIT: document.getElementById('unit').value,
        LOCATION: document.getElementById('location').value,
        TYPOFMAINTENANCE: document.getElementById('typeOfMaintenance').value,
        ACTIVITY: document.getElementById('activity').value,
        CONDUCTEDBY: document.getElementById('conductedBy').value,
        TIME: document.getElementById('time').value,
        DATE: document.getElementById('date').value,
        NEXTDATEOFMAINTENANCE: document.getElementById('nextDateOfMaintenance').value,
        OSEDITION: document.getElementById('os-edition').value,
        INSTALLEDRAM: document.getElementById('installedRAM').value,
        PROCESSOR: document.getElementById('processor').value,
        SYSTEMTYPE: document.getElementById('system-type').value,
        STATUS: document.getElementById('status').value
    };

    var yPos = 10;

    // Load the logo image
    var img = new Image();
    img.src = 'img/itsologo.jpg';

    img.onload = function() {
        // Add the logo image
        doc.addImage(img, 'JPEG', 40, 17, 20, 20); // Adjust the x, y, width, and height as needed

        yPos += 20;

        // Set font for header
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(0, 0, 0); 
        doc.text("Maintenance Log Report", doc.internal.pageSize.getWidth() / 2, yPos, { align: "center" });
        yPos += 18;

        // Set font for content
        doc.setFont('Helvetica', '');
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); //color black

        // Include the input field data
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var label = key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
                var value = data[key];
                doc.setFont('Helvetica', 'bold');
                doc.text(20, yPos, label + ": ");
                doc.setFont('Helvetica', '');
                doc.text(80, yPos, value);
                yPos += 5;
            }
        }

        // Add a separator between input field data and fetched data
        doc.setDrawColor(0);
        doc.setLineWidth(0.1);
        doc.line(20, yPos, doc.internal.pageSize.getWidth() - 20, yPos);
        yPos += 10;

        
      // Set RFID values to include
var scannedRFID = document.getElementById('rfid2').value;
var rfidValues = [908511, 870195, 846433, 838363, 892099];

// Convert RFID values to numbers
var allDataRFIDs = allData.map(item => Number(item.RFID));

// Check if the scanned RFID is in the list of RFID values
if (rfidValues.includes(Number(scannedRFID))) {
    console.log("Scanned RFID found in list:", scannedRFID);

    // Iterate over allData starting from index 6
    for (var i = 6; i < allData.length; i++) {
        var item = allData[i];
        // Include the data in the PDF if RFID value matches
        if (Number(item.RFID) === Number(scannedRFID)) {
            console.log("Matching RFID found:", item.RFID);
            for (var key in item) {
                if (item.hasOwnProperty(key)) {
                    var label = key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2');
                    var value = item[key];

                    // Check if the value is a valid string
                    if (typeof value === 'string') {
                        if (key === 'TIME') {
                                // Format the time to match the original format
                                value = new Date(value).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });
                        } else if (key === 'DATE' || key === 'NEXT DATE OF MAINTENANCE') {
                            var date = new Date(value);
                            value = date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
                        }

                        if (i === 6 && key === 'RFID') {
                            doc.setFont('Helvetica', 'bold');
                            doc.text(20, yPos, 'RFID: ');
                            doc.setFont('Helvetica', '');
                        } else {
                            doc.setFont('Helvetica', 'bold');
                            doc.text(20, yPos, label + ": ");
                            doc.setFont('Helvetica', '');
                        }
                        doc.text(80, yPos, value);
                        yPos += 5;
                    }
                }
            }
            // Add a separator between items
            doc.setDrawColor(0);
            doc.setLineWidth(0.3);
            doc.line(20, yPos, doc.internal.pageSize.getWidth() - 20, yPos);
            yPos += 10;

            
        }
    }
} else {
    console.log("Scanned RFID not found in list:", scannedRFID);
    // Handle case where scanned RFID is not in the list
}




    
        // Check if any input fields are empty
        var isEmpty = Object.values(data).some(value => value === '');
        if (isEmpty) {
            alert("Please input the necessary information!");
            return false;
        } else {
            doc.save('maintenance-report.pdf');
        }
    };
}




    //pag clear han maintenance input fields
    function clearField() {
        rfidInput2.value = '';
        timeInput.value = '';
        dateInput.value = '';
        typeOfMaintenanceInput.value = '';
        conductedByInput.value = '';
        nextDateOfMaintenanceInput.value = '';
        activityInput.value = '';
        unitInput.value = '';
        osEditionInput.value = '';
        installedRAMInput.value = '';
        processorInput.value = '';
        systemTypeInput.value = '';
        locationInput.value = '';
        statusInput.value = '';

        rfidInput2.focus();
    }


    //para han maintenance log interface        POST DATA
    function updateMaintenanceLog() {
        var rfid = document.getElementById("rfid2").value;
        var unit = document.getElementById("unit").value;
        var location = document.getElementById("location").value;
        var typeOfMaintenance = document.getElementById("typeOfMaintenance").value;
        var activity = document.getElementById("activity").value;
        var conductedBy = document.getElementById("conductedBy").value;
        var time = document.getElementById("time").value;
        var date = document.getElementById("date").value;
        var nextDateOfMaintenance = document.getElementById("nextDateOfMaintenance").value;
        var osEdition = document.getElementById("os-edition").value;
        var installedRAM = document.getElementById("installedRAM").value;
        var processor = document.getElementById("processor").value;
        var systemType = document.getElementById("system-type").value;
        var status = document.getElementById("status").value;

    
        const data = {
            rfid,
            unit,
            location,
            typeOfMaintenance,
            activity,
            conductedBy,
            time,
            date,
            nextDateOfMaintenance,
            osEdition,
            installedRAM,
            processor,
            systemType,
            location,
            status
        };
    
        fetch('https://script.google.com/macros/s/AKfycbwReRKDKqZrLPTd2Ccj0jN2BLPP71QlyORLWYkAFK71YA6fE-WUs-eKgu7Q4vSetjsT/exec/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            console.log('Success:', response);          
    
            // Reset the form fields
            document.getElementById("rfid2").value = "";
            document.getElementById("time").value = "";
            document.getElementById("date").value = "";
            document.getElementById("typeOfMaintenance").value = "";
            document.getElementById("conductedBy").value = "";
            document.getElementById("nextDateOfMaintenance").value = "";
            document.getElementById("activity").value = "";
            document.getElementById("unit").value = "";
            document.getElementById("os-edition").value = "";
            document.getElementById("installedRAM").value = "";
            document.getElementById("processor").value = "";
            document.getElementById("system-type").value = "";
            document.getElementById("location").value = "";
            document.getElementById("status").value = "";
    
    
            // Fetch and display the data
            fetchDataAndDisplay();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    

    function fetchDataAndDisplay() {
        // Your code to fetch and display data here
    }



    


     
//para han maintenance log interface        GET DATA
var allData;
var rfidInput2 = document.getElementById("rfid2");
var timeInput = document.getElementById('time');
var dateInput = document.getElementById('date');
var typeOfMaintenanceInput = document.getElementById('typeOfMaintenance');
var conductedByInput = document.getElementById('conductedBy');
var nextDateOfMaintenanceInput = document.getElementById('nextDateOfMaintenance');
var activityInput = document.getElementById('activity');
var unitInput = document.getElementById('unit');
var osEditionInput = document.getElementById('os-edition');
var installedRAMInput = document.getElementById('installedRAM');
var processorInput = document.getElementById('processor');
var systemTypeInput = document.getElementById('system-type');
var locationInput = document.getElementById('location');
var statusInput = document.getElementById('status');

rfidInput2.addEventListener("change", function() {
    var rfidValue = rfidInput2.value;
    console.log("Maintenance RFID value:", rfidValue);

    fetch('https://script.google.com/macros/s/AKfycbxu3A8qI0B4C50UrviOPUBphvL7HvGgaInrvTdq4Viny__beG1fV1yKyL_4gOSf6eEg/exec?rfid=' + rfidValue)
        .then(response => response.json())
        .then(data => {
            console.log("Maintenance Response data:", data);
            allData = data;
            var rowData = null;

            for (var i = 0; i < data.length; i++) {
                if (data[i]['RFID'] === parseInt(rfidValue)) {
                    rowData = data[i];
                    break;
                }
            }

            if (rowData) {
                rfidInput2.value = rowData['RFID'];
                unitInput.value = rowData['UNIT'];
                locationInput.value = rowData['LOCATION'];
                typeOfMaintenanceInput.value = rowData['TYPE OF MAINTENANCE'];
                conductedByInput.value = rowData['CONDUCTED BY'];

                var timeString = new Date(rowData['TIME']).toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });
                timeInput.value = timeString;

                var date = new Date(rowData['DATE']);
                dateInput.value = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, 0);

                var nextDateOfMaintenance = new Date(rowData['NEXT DATE OF MAINTENANCE']);
                nextDateOfMaintenanceInput.value = nextDateOfMaintenance.getFullYear() + '-' + (nextDateOfMaintenance.getMonth() + 1).toString().padStart(2, '0') + '-' + nextDateOfMaintenance.getDate().toString().padStart(2, 0);

activityInput.value = rowData['ACTIVITY'];
osEditionInput.value = rowData['OS EDITION'];
installedRAMInput.value = rowData['INSTALLED RAM'];
processorInput.value = rowData['PROCESSOR'];
systemTypeInput.value = rowData['SYSTEM TYPE'];
locationInput.value = rowData['LOCATION'];
statusInput.value = rowData['STATUS'];


            } else {
                console.error('No data found for RFID Maintenance', rfidValue);
                alert("Error: Invalid RFID Input. Please try again.");
                rfidInput2.value = '';
                timeInput.value = '';
                dateInput.value = '';
                typeOfMaintenanceInput.value = '';
                conductedByInput.value = '';
                nextDateOfMaintenanceInput.value = '';
                activityInput.value = '';
                unitInput.value = '';
                osEditionInput.value = '';
                installedRAMInput.value = '';
                processorInput.value = '';
                systemTypeInput.value = '';
                locationInput.value = '';
                statusInput.value = '';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            timeInput.value = '';
            dateInput.value = '';
            typeOfMaintenanceInput.value = '';
            conductedByInput.value = '';
            nextDateOfMaintenanceInput.value = '';
            activityInput.value = '';
            unitInput.value = '';
            osEditionInput.value = '';
            installedRAMInput.value = '';
            processorInput.value = '';
            systemTypeInput.value = '';
            locationInput.value = '';
            statusInput.value = '';
        });
});

    //function para pag format han date
    function formatDate(dateString) {
        const date = new(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    }

    flatpickr('#date', {
        dateFormat: "Y/m/d", 
        });

    flatpickr('#nextDateOfMaintenance', {
        dateFormat: "Y/m/d",
        });

  

    