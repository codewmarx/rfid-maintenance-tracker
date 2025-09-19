# 🔐 RFID Laboratory Maintenance System  

<p align="center">
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
  <img src="https://img.shields.io/badge/Google%20Sheets-34A853?style=for-the-badge&logo=googlesheets&logoColor=white"/>
  <img src="https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"/>
</p>

This project was developed as part of my **2nd Year Information Technology** course requirement.  
It is a web-based system for managing **Computer Equipment Calibration, Maintenance, and Repair Logs** using **RFID cards**, integrated with **Google Sheets & Google Apps Script** as the backend database.  


## 🚀 Features  
- 📡 RFID-based data fetching from Google Sheets  
- 🛠️ **Maintenance Log** (working demo)  
- ⚡ Auto-populates form fields when scanning or manually entering RFID  
- 📝 Options: **Generate Report**, **Clear Values**, **Update Values**  
- 📱 Simple & responsive UI with navigation  

## 🛠️ Setup Instructions  

### Requirements  
- Google Account (for Google Sheets + Apps Script)  
- [XAMPP](https://www.apachefriends.org/) *(if you run it locally)* / Firebase Hosting

### Google Sheets Setup  
1. Create a new **Google Sheet** (e.g., `Equipment Calibration/Maintenance/Repair Log`).  
2. Add a worksheet named **Maintenance** with columns such as:  
   - RFID  
   - TIME  
   - CONDUCTED BY  
   - TYPE OF MAINTENANCE  
   - DATE
   - NEXT DATE OF MAINTENANCE  
   - ACTIVITY
   - UNIT
   - OS EDITION
   - INSTALLED RAM
   - PROCESSOR
   - SYSTEM TYPE
   - LOCATION
   - STATUS

3. Go to **Extensions → App Script**.  
4. Copy the contents of `code.gs` and `test.gs` from this repo into your project.  
5. Deploy as a **Web App** → set access to *“Anyone with the link”*.  

## 🖥️ Demo Walkthrough  

1. Open the **[Live Demo](https://marko-738c2.firebaseapp.com/)**.  
2. On the homepage, you’ll see:  
   - **PC Details**  
   - **Equipment Logs ✅** (choose this one)  
   - **About**  
3. Inside Equipment Logs:  
   - ❌ Calibration Log 
   - ✅ **Maintenance Log (choose this option)**  
   - ❌ Repair Log
   - 🏠 Home  
4. Select **Maintenance Log** → the form will appear.  
5. Enter one of the sample RFID numbers:  
   - 870195
   - 908511
   - 846433
   - 838363
   - 892099

6. Click outside the input field → the system fetches data from Google Sheets.  
7. Available actions:  
   - **Generate Report**  
   - **Clear Values**  
   - **Update Values**  


## 📸 Preview  

- Homepage (3 buttons)  
- Equipment Logs (4 options)  
- Maintenance Log form (before & after RFID fetch)  


## 👨‍💻 Author  

**Developed by:** Mark Anthony Garado  
📌 *For academic purposes only – 2nd Year IT project*  
