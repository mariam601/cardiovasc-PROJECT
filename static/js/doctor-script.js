function bookAppointment(doctorName) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        localStorage.setItem('pendingBookingDoctor', doctorName);
        window.location.href = 'login.html';  // لأن login.html في نفس مستوى doctors.html
        return;
    }
    
    let patientName = prompt(`Enter your name to book appointment with ${doctorName}:`);
    if (patientName) {
        let appointments = JSON.parse(localStorage.getItem('doctorAppointments')) || [];
        appointments.push({ patient: patientName, doctor: doctorName, date: new Date().toLocaleString() });
        localStorage.setItem('doctorAppointments', JSON.stringify(appointments));
        alert(`✅ Appointment confirmed for ${patientName} with ${doctorName}.`);
    }
}

// ========== DOCTOR DASHBOARD SCRIPT ==========

// All patients data
const allPatients = [
    { id: 1, name: "Ahmed Mansour", date: "15 May 2026", time: "10:30 AM" },
    { id: 2, name: "Fatima Al-Zahra", date: "16 May 2026", time: "11:00 AM" },
    { id: 3, name: "Omar El-Sayed", date: "18 May 2026", time: "09:00 AM" },
    { id: 4, name: "Laila Mahmoud", date: "20 May 2026", time: "02:00 PM" }
];

function loadPatients() {
    const tbody = document.getElementById('appointmentsBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    allPatients.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="patient-name">${patient.name}</div>
                <a href="#" class="patient-link" onclick="viewPatientHistory('${patient.name}')">
                    <i class="fas fa-file-medical-alt"></i> View Full History
                </a>
            </td>
            <td>
                <div class="appointment-date">${patient.date}</div>
                <div class="appointment-time"><i class="far fa-clock"></i> ${patient.time}</div>
            </td>
            <td class="text-center">
                <button class="btn-add-data" onclick="addMedicalData('${patient.name}')">
                    <i class="fas fa-plus-circle"></i> Add Data
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function searchPatients() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const tbody = document.getElementById('appointmentsBody');
    const filtered = allPatients.filter(p => p.name.toLowerCase().includes(searchTerm));
    
    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <p class="empty-text">No patients found matching "${searchTerm}"</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = '';
    filtered.forEach(patient => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="patient-name">${patient.name}</div>
                <a href="#" class="patient-link" onclick="viewPatientHistory('${patient.name}')">
                    <i class="fas fa-file-medical-alt"></i> View Full History
                </a>
            </td>
            <td>
                <div class="appointment-date">${patient.date}</div>
                <div class="appointment-time"><i class="far fa-clock"></i> ${patient.time}</div>
            </td>
            <td class="text-center">
                <button class="btn-add-data" onclick="addMedicalData('${patient.name}')">
                    <i class="fas fa-plus-circle"></i> Add Data
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    loadPatients();
}

function viewPatientHistory(patientName) {
    window.location.href = `/doctor/patient-detail.html?name=${encodeURIComponent(patientName)}`;
}

function addMedicalData(patientName) {
    window.location.href = `/doctor/doctor-edit-patient-data.html?name=${encodeURIComponent(patientName)}`;
}

// التحقق من حالة تسجيل الدخول
function checkDoctorAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'doctor') {
        window.location.href = '../login.html';
    }
}

// تشغيل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    checkDoctorAuth();
    loadPatients();
});