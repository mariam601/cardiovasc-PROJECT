    // Get ID and user type from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('id');
    const patientName = urlParams.get('name');
    const fromDoctor = urlParams.get('from') === 'doctor';
    
    // Check if user is doctor
    const isDoctor = localStorage.getItem('userRole') === 'doctor' || fromDoctor;
    
    // Get all predictions from localStorage
    const predictions = JSON.parse(localStorage.getItem('patientPredictions')) || [];
    let examData = null;
    
    // Find by ID first, then by name
    if (patientId) {
        examData = predictions.find(p => p.id == patientId);
    }
    
    if (!examData && patientName) {
        examData = predictions.find(p => p.patientName === patientName);
    }
    
    if (!examData && predictions.length > 0) {
        examData = predictions[0];
    }
    
    function displayData() {
        if (!examData) {
            document.getElementById('examBody').innerHTML = `
                <div class="no-data">
                    <i class="fas fa-folder-open" style="font-size: 50px; opacity: 0.3;"></i>
                    <p>No examination data found.</p>
                    <div class="buttons">
                        ${isDoctor ? 
                            `<a href="../doctor/doctor-appointments.html" class="btn btn-secondary"><i class="fas fa-arrow-left"></i> Back to Appointments</a>` : 
                            `<a href="../patient/patient-history.html" class="btn btn-secondary"><i class="fas fa-arrow-left"></i> Back to History</a>`
                        }
                    </div>
                </div>
            `;
            return;
        }
        
        // Set date
        document.getElementById('examDate').innerHTML = `<i class="far fa-calendar-alt"></i> ${examData.date}`;
        
        // Format values
        const isCVD = examData.riskScore > 50;
        
        let cholesterolText = '';
        switch(parseInt(examData.cholesterol)) {
            case 1: cholesterolText = 'Normal'; break;
            case 2: cholesterolText = 'Above Normal'; break;
            case 3: cholesterolText = 'Well Above Normal'; break;
            default: cholesterolText = 'Normal';
        }
        
        let glucoseText = '';
        switch(parseInt(examData.glucose)) {
            case 1: glucoseText = 'Normal'; break;
            case 2: glucoseText = 'Above Normal'; break;
            case 3: glucoseText = 'Well Above Normal'; break;
            default: glucoseText = 'Normal';
        }
        
        // Build files HTML
        let filesHtml = '<div class="files-section"><div class="files-title"><i class="fas fa-paperclip"></i> Medical Reports</div><div class="files-grid">';
        
        const medicalScans = examData.medicalScans || [];
        const labResults = examData.labResults || [];
        const allFiles = [...medicalScans, ...labResults];
        
        if (allFiles.length === 0) {
            filesHtml += '<div style="text-align:center; padding:15px; color:#999;">No medical reports attached</div>';
        } else {
            allFiles.forEach(file => {
                if (file.type && file.type.startsWith('image/')) {
                    filesHtml += `
                        <div class="file-card" onclick="window.open('${file.data}', '_blank')">
                            <img src="${file.data}" alt="${file.name}">
                            <div class="file-name">${file.name.substring(0, 12)}${file.name.length > 12 ? '...' : ''}</div>
                        </div>
                    `;
                } else {
                    filesHtml += `
                        <div class="file-card" onclick="window.open('${file.data}', '_blank')">
                            <div class="pdf-icon"><i class="fas fa-file-pdf"></i></div>
                            <div class="file-name">${file.name.substring(0, 12)}${file.name.length > 12 ? '...' : ''}</div>
                        </div>
                    `;
                }
            });
        }
        
        filesHtml += '</div></div>';
        
        // Build buttons based on user type
        let buttonsHtml = '';
        
        if (isDoctor) {
            buttonsHtml = `
                <div class="buttons">
                    <a href="../doctor/doctor-appointments.html" class="btn btn-secondary">
                        <i class="fas fa-arrow-left"></i> Back to Appointments
                    </a>
                </div>
            `;
        } else {
            buttonsHtml = `
                <div class="buttons">
                    <a href="../patient/patient-history.html" class="btn btn-secondary">
                        <i class="fas fa-arrow-left"></i> Back to History
                    </a>
                    <a href="book-appointment.html" class="btn btn-primary">
                        <i class="fas fa-calendar-plus"></i> Book Appointment
                    </a>
                    <a href="../homepage.html" class="btn btn-gray">
                        <i class="fas fa-home"></i> Go to Homepage
                    </a>
                </div>
            `;
        }
        
        // Build full HTML
        document.getElementById('examBody').innerHTML = `
            <div class="info-grid">
                <div class="info-card">
                    <p><strong><i class="fas fa-user"></i> Age:</strong> ${examData.age} years</p>
                    <p><strong><i class="fas fa-venus-mars"></i> Gender:</strong> ${examData.gender === 'male' ? 'Male' : 'Female'}</p>
                    <p><strong><i class="fas fa-ruler"></i> Height:</strong> ${examData.height} cm</p>
                    <p><strong><i class="fas fa-weight-scale"></i> Weight:</strong> ${examData.weight} kg</p>
                </div>
                <div class="info-card">
                    <p><strong><i class="fas fa-heart"></i> Systolic BP:</strong> ${examData.apHi} mmHg</p>
                    <p><strong><i class="fas fa-heartbeat"></i> Diastolic BP:</strong> ${examData.apLo} mmHg</p>
                    <p><strong><i class="fas fa-chart-line"></i> Cholesterol:</strong> ${cholesterolText}</p>
                    <p><strong><i class="fas fa-tint"></i> Glucose:</strong> ${glucoseText}</p>
                </div>
            </div>
            
            <div class="result-box ${isCVD ? 'cvd' : 'normal'}">
                <h3><i class="fas ${isCVD ? 'fa-heartbeat' : 'fa-check-circle'}"></i> Diagnosis: ${isCVD ? 'CVD Detected' : 'Normal'}</h3>
                <div class="risk">Risk Score: <strong>${examData.riskScore}%</strong></div>
                ${isCVD ? '<p style="font-size:13px; margin-top:10px;">⚠️ Please consult with a doctor</p>' : ''}
            </div>
            
            ${filesHtml}
            
            <div class="feedback-box">
                <div class="files-title" style="border-bottom: none; margin-bottom: 8px; padding-bottom: 0;">
                    <i class="fas fa-user-md"></i> Doctor's Feedback
                </div>
                <p>${examData.doctorAdvice || "Awaiting doctor's review..."}</p>
            </div>
            
            ${buttonsHtml}
        `;
    }
    
    displayData();