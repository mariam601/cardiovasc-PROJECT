/**My Patients Medical Records****************/

 // Patients Data
    const allPatients = [
        { name: "Ahmed Mansour", email: "ahmed@example.com", result: "CVD Detected", risk: "78%", date: "10 May 2026", isCVD: true },
        { name: "Fatima Al-Zahra", email: "fatima@example.com", result: "Normal", risk: "22%", date: "12 May 2026", isCVD: false },
        { name: "Omar El-Sayed", email: "omar@example.com", result: "CVD Detected", risk: "85%", date: "08 May 2026", isCVD: true },
        { name: "Laila Mahmoud", email: "laila@example.com", result: "Normal", risk: "15%", date: "15 May 2026", isCVD: false },
        { name: "Youssef Ibrahim", email: "youssef@example.com", result: "Normal", risk: "10%", date: "05 May 2026", isCVD: false },
        { name: "Nourhan Ali", email: "nourhan@example.com", result: "CVD Detected", risk: "92%", date: "03 May 2026", isCVD: true }
    ];
    
    let currentPatients = [...allPatients];
    
    function updateStats() {
        const total = currentPatients.length;
        const cvd = currentPatients.filter(p => p.isCVD).length;
        const normal = total - cvd;
        
        document.getElementById('totalPatients').innerText = total;
        document.getElementById('cvdCount').innerText = cvd;
        document.getElementById('normalCount').innerText = normal;
    }
    
    function loadPatients() {
        const tbody = document.getElementById('patientsBody');
        tbody.innerHTML = '';
        
        if (currentPatients.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-state">
                        <div class="empty-icon">👥</div>
                        <p class="empty-text">No patients found</p>
                    </td>
                </tr>
            `;
            updateStats();
            return;
        }
        
        currentPatients.forEach(patient => {
            const row = document.createElement('tr');
            
            const resultBadge = patient.result === "CVD Detected" 
                ? '<span class="badge-cvd"><i class="fas fa-heartbeat"></i> CVD Detected</span>'
                : '<span class="badge-normal"><i class="fas fa-check-circle"></i> Normal</span>';
            
            row.innerHTML = `
                <td>
                    <div class="patient-name">${patient.name}</div>
                    <div class="patient-email">${patient.email}</div>
                </td>
                <td>${resultBadge}</td>
                <td><span class="risk-percent">${patient.risk}</span></td>
                <td>${patient.date}</td>
                <td class="text-center">
                    <button class="btn-add" onclick="addMedicalData('${patient.name}')">
                        <i class="fas fa-plus"></i> Add Data
                    </button>
                    <button class="btn-view" onclick="viewFullHistory('${patient.name}')">
                        <i class="fas fa-eye"></i> View Full History
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
        
        updateStats();
    }
    
    function searchPatients() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        
        if (searchTerm === "") {
            currentPatients = [...allPatients];
        } else {
            currentPatients = allPatients.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.email.toLowerCase().includes(searchTerm)
            );
        }
        
        loadPatients();
    }
    
    function clearSearch() {
        document.getElementById('searchInput').value = '';
        currentPatients = [...allPatients];
        loadPatients();
    }
    
    function addMedicalData(patientName) {
        window.location.href = `../doctor/doctor-edit-patient-data.html?name=${encodeURIComponent(patientName)}`;
    }
    
    function viewFullHistory(patientName) {
        window.location.href = `patient-detail.html?name=${encodeURIComponent(patientName)}`;
    }
    
    // Load patients on page load
    loadPatients();