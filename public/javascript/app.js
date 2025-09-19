function submitForm() {
    var rfid = document.getElementById("rfid").value;
    var labNumber = document.getElementById("labNumber").value;
    var pcCode = document.getElementById("pcCode").value;
    var dateAcquired = document.getElementById("dateAcquired").value;

    const data = {
        rfid,
        labNumber,
        pcCode,
        dateAcquired
    };

    fetch('https://script.google.com/macros/s/AKfycbxeC_g2N812lC1tbf7RHZav4Ffo60-GkeNzyXstCF0nWfD3B5KQeDz_Hfu8yxUOWdFr/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        console.log('Success:', response);
        
        // Show confirmation message
        var confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.style.display = 'block';

        // Reset the form fields
        document.getElementById("rfid").value = "";
        document.getElementById("labNumber").value = "";
        document.getElementById("pcCode").value = "";
        document.getElementById("dateAcquired").value = "";

        // Hide the confirmation message after 2 seconds
        setTimeout(function() {
            confirmationMessage.style.display = 'none';
        }, 3000);

        // Hide the modal for RFID details
        var modal = document.getElementById("rfidModal");
        modal.style.display = "none";
        
        // Hide the main container and show the equipment log container
        var mainContainer = document.querySelector('.main-container');
        var equipmentLogContainer = document.getElementById('equipmentLogContainer');
        mainContainer.style.display = 'none';
        equipmentLogContainer.style.display = 'block';

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

    //pag show han maintenance log modal
    function showMaintenanceLogModal() {
        var modal = document.getElementById("maintenanceLogModal");
        modal.style.display = "block";
    }


//pag validate han input fields
function validateAndSubmit() {
    var rfid = document.getElementById("rfid").value;
    var labNumber = document.getElementById("labNumber").value;
    var pcCode = document.getElementById("pcCode").value;
    var dateAcquired = document.getElementById("dateAcquired").value;

    if (rfid === '' || labNumber === '' || pcCode === '' || dateAcquired === '') {
        alert('Please fill out all required fields.');
        return;
    }

    submitForm();
}

function closeModal() {
    var modal = document.getElementById("rfidModal");
    modal.style.display = "none";
}

function showRFIDModal() {
    var modal = document.getElementById("rfidModal");
    modal.style.display = "block";
}

document.getElementById("calibration").addEventListener("click", function() {
    showModal("Calibration Log");
});

document.getElementById("maintenance").addEventListener("click", function() {
    showMaintenanceLogModal();
});

document.getElementById("repair").addEventListener("click", function() {
    showModal("Repair Log");
});


    //para han date (flatpickr)
    flatpickr('#dateAcquired', {
        dateFormat: "m/d/Y",
    
    });



    
    flatpickr('#date', {
        dateFormat: "m/d/Y",
    
    });

    flatpickr('#nextDateOfMaintenance', {
        dateFormat: "m/d/Y",
    
    });
  
    
    // pag get han input fields
    var rfidInput = document.getElementById("rfid");
    var labNumberInput = document.getElementById('labNumber');
    var pcCodeInput = document.getElementById('pcCode');
    var dateAcquiredInput = document.getElementById('dateAcquired');
    
    rfidInput.addEventListener("change", function() {
        var rfidValue = rfidInput.value;
        console.log("RFID value:", rfidValue);
    
        fetch('https://script.google.com/macros/s/AKfycbzIQMmPTe9wjMXUom_8sIAAKqcA-KJZuL4S98c9g8--v0WXJEiZeyMipwKXhuvpcD-v/exec?rfid=' + rfidValue)
            .then(response => response.json())
            .then(data => {
                console.log("Response data:", data); // pag log han response data
                var rowData = null; // Initialize rowData to null
    
                // Find the matching RFID in the data array
                for (var i = 0; i < data.length; i++) {
                    if (data[i]['RFID ID'] === parseInt(rfidValue)) {
                        rowData = data[i]; // Set rowData to the matching data object
                        break; 
                    }
                }
                if (rowData) {
                    labNumberInput.value = rowData['LAB_NUM'];
                    pcCodeInput.value = rowData['PC CODE'];
                    //pag format han date
                    var dateAcquired = new Date(rowData['DATE ACQUIRED']);
                    dateAcquiredInput.value = dateAcquired.getFullYear() + '-' + (dateAcquired.getMonth() + 1).toString().padStart(2, '0') + '-' + dateAcquired.getDate().toString().padStart(2, '0');

                } else {
                    console.error('No data found for RFID:', rfidValue);
                    alert('Error: No RFID Number was found! Please try again.');
                    rfidInput.value = '';
                    labNumberInput.value = '';
                    pcCodeInput.value = '';
                    dateAcquiredInput.value = '';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                labNumberInput.value = '';
                pcCodeInput.value = '';
                dateAcquiredInput.value = '';
            });
    });

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-PH', options);
        return formattedDate;
    }

    






    
