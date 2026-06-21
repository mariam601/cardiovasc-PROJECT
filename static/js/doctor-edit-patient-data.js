 // Get patient ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('id');
    let patientData = null;
    
    // Load patient data
    function loadPatientData() {
        const predictions = JSON.parse(localStorage.getItem('patientPredictions')) || [];
        
        if (patientId) {
            patientData = predictions.find(p => p.id == patientId);
        }
        
        if (!patientData && predictions.length > 0) {
            patientData = predictions[0];
        }
        
        if (!patientData) {
            document.getElementById('patientInfo').innerHTML = '<div style="text-align:center;padding:20px;color:red;">Patient not found</div>';
            return;
        }
        
        // Display patient info
        document.getElementById('patientInfo').innerHTML = `
            <div class="patient-info-item">
                <div class="patient-info-label"><i class="fas fa-user"></i> Patient Name</div>
                <div class="patient-info-value">${patientData.patientName || 'Ahmed Mansour'}</div>
            </div>
            <div class="patient-info-item">
                <div class="patient-info-label"><i class="fas fa-calendar"></i> Examination Date</div>
                <div class="patient-info-value">${patientData.date}</div>
            </div>
            <div class="patient-info-item">
                <div class="patient-info-label"><i class="fas fa-chart-line"></i> Current Risk Score</div>
                <div class="patient-info-value" style="color: ${patientData.riskScore > 50 ? '#c0392b' : '#27ae60'}">${patientData.riskScore}%</div>
            </div>
        `;
        
        // Fill form with existing data
        document.getElementById('age').value = patientData.age || '';
        document.getElementById('gender').value = patientData.gender || 'male';
        document.getElementById('height').value = patientData.height || '';
        document.getElementById('weight').value = patientData.weight || '';
        document.getElementById('apHi').value = patientData.apHi || '';
        document.getElementById('apLo').value = patientData.apLo || '';
        document.getElementById('cholesterol').value = patientData.cholesterol || '1';
        document.getElementById('glucose').value = patientData.glucose || '1';
        document.getElementById('smoke').value = patientData.smoke || '0';
        document.getElementById('alco').value = patientData.alco || '0';
        document.getElementById('active').value = patientData.active || '0';
        document.getElementById('doctorAdvice').value = patientData.doctorAdvice || '';
    }
    
    // Recalculate risk score
    function calculateRiskScore(data) {
        let riskScore = 0;
        
        if (data.age > 60) riskScore += 25;
        else if (data.age > 50) riskScore += 15;
        else if (data.age > 40) riskScore += 8;
        
        if (data.apHi > 140 || data.apLo > 90) riskScore += 25;
        else if (data.apHi > 130 || data.apLo > 85) riskScore += 15;
        
        if (data.cholesterol == 3) riskScore += 25;
        else if (data.cholesterol == 2) riskScore += 12;
        
        if (data.glucose == 3) riskScore += 20;
        else if (data.glucose == 2) riskScore += 10;
        
        if (data.smoke == 1) riskScore += 15;
        if (data.alco == 1) riskScore += 5;
        if (data.active == 0) riskScore += 10;
        
        const heightM = data.height / 100;
        const bmi = (data.weight / (heightM * heightM)).toFixed(1);
        if (bmi > 30) riskScore += 10;
        else if (bmi > 25) riskScore += 5;
        
        return Math.min(riskScore, 100);
    }
    
    // Save patient data
    function savePatientData() {
        // Get form values
        const updatedData = {
            ...patientData,
            age: parseInt(document.getElementById('age').value),
            gender: document.getElementById('gender').value,
            height: parseInt(document.getElementById('height').value),
            weight: parseInt(document.getElementById('weight').value),
            apHi: parseInt(document.getElementById('apHi').value),
            apLo: parseInt(document.getElementById('apLo').value),
            cholesterol: parseInt(document.getElementById('cholesterol').value),
            glucose: parseInt(document.getElementById('glucose').value),
            smoke: parseInt(document.getElementById('smoke').value),
            alco: parseInt(document.getElementById('alco').value),
            active: parseInt(document.getElementById('active').value),
            doctorAdvice: document.getElementById('doctorAdvice').value,
            lastEditedBy: 'Dr. Sarah Ahmed',
            lastEditedOn: new Date().toLocaleString()
        };
        
        // Validate
        if (!updatedData.age || !updatedData.height || !updatedData.weight || !updatedData.apHi || !updatedData.apLo) {
            alert('⚠️ Please fill all required fields');
            return;
        }
        
        // Recalculate risk score
        const newRiskScore = calculateRiskScore(updatedData);
        updatedData.riskScore = newRiskScore;
        updatedData.result = newRiskScore > 50 ? 1 : 0;
        
        // Update in localStorage
        let predictions = JSON.parse(localStorage.getItem('patientPredictions')) || [];
        const index = predictions.findIndex(p => p.id == patientId);
        
        if (index !== -1) {
            predictions[index] = updatedData;
            localStorage.setItem('patientPredictions', JSON.stringify(predictions));
        }
        
        // Show success message
        const successMsg = document.getElementById('successMsg');
        successMsg.style.display = 'block';
        
        // Update displayed risk score
        document.getElementById('patientInfo').innerHTML = `
            <div class="patient-info-item">
                <div class="patient-info-label"><i class="fas fa-user"></i> Patient Name</div>
                <div class="patient-info-value">${updatedData.patientName || 'Ahmed Mansour'}</div>
            </div>
            <div class="patient-info-item">
                <div class="patient-info-label"><i class="fas fa-calendar"></i> Examination Date</div>
                <div class="patient-info-value">${updatedData.date}</div>
            </div>
            <div class="patient-info-item">
                <div class="patient-info-label"><i class="fas fa-chart-line"></i> Current Risk Score</div>
                <div class="patient-info-value" style="color: ${newRiskScore > 50 ? '#c0392b' : '#27ae60'}">${newRiskScore}%</div>
            </div>
        `;
        
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
    }
    
    // Load data
    loadPatientData();