 // Sample appointments data
    let appointments = [
        { id: 1, patientName: "Ahmed Mansour", patientEmail: "ahmed@example.com", date: "20 May 2026", time: "10:30 AM", status: "pending", requestedOn: "15 May 2026" },
        { id: 2, patientName: "Fatima Al-Zahra", patientEmail: "fatima@example.com", date: "22 May 2026", time: "02:00 PM", status: "pending", requestedOn: "16 May 2026" },
        { id: 3, patientName: "Omar El-Sayed", patientEmail: "omar@example.com", date: "18 May 2026", time: "11:00 AM", status: "confirmed", requestedOn: "10 May 2026", confirmedOn: "12 May 2026" },
        { id: 4, patientName: "Laila Mahmoud", patientEmail: "laila@example.com", date: "25 May 2026", time: "09:00 AM", status: "confirmed", requestedOn: "14 May 2026", confirmedOn: "15 May 2026" }
    ];
    
    function updateStats() {
        const total = appointments.length;
        const pending = appointments.filter(a => a.status === 'pending').length;
        const confirmed = appointments.filter(a => a.status === 'confirmed').length;
        
        document.getElementById('totalCount').innerText = total;
        document.getElementById('pendingCount').innerText = pending;
        document.getElementById('confirmedCount').innerText = confirmed;
    }
    
    function loadPendingTable() {
        const tbody = document.getElementById('pendingTableBody');
        const pending = appointments.filter(a => a.status === 'pending');
        
        if (pending.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No pending requests</td></tr>';
            return;
        }
        
        tbody.innerHTML = '';
        pending.forEach(app => {
            tbody.innerHTML += `
                <tr>
                    <td><div class="patient-name">${app.patientName}</div><small>${app.patientEmail}</small></td>
                    <td>${app.date}<br><small>${app.time}</small></td>
                    <td>${app.requestedOn}</td>
                    <td>
                        <button class="btn-accept" onclick="confirmAppointment(${app.id})"><i class="fas fa-check"></i> Accept</button>
                        <button class="btn-reject" onclick="rejectAppointment(${app.id})"><i class="fas fa-times"></i> Reject</button>
                        <button class="btn-view" onclick="viewPatientDetails(${app.id})"><i class="fas fa-eye"></i> View</button>
                    </td>
                </tr>
            `;
        });
    }
    
    function loadConfirmedTable() {
        const tbody = document.getElementById('confirmedTableBody');
        const confirmed = appointments.filter(a => a.status === 'confirmed');
        
        if (confirmed.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No confirmed appointments</td></tr>';
            return;
        }
        
        tbody.innerHTML = '';
        confirmed.forEach(app => {
            tbody.innerHTML += `
                <tr>
                    <td><div class="patient-name">${app.patientName}</div><small>${app.patientEmail}</small></td>
                    <td>${app.date}<br><small>${app.time}</small></td>
                    <td>${app.confirmedOn || app.requestedOn}</td>
                    <td><button class="btn-view" onclick="viewPatientDetails(${app.id})"><i class="fas fa-eye"></i> View Patient</button></td>
                </tr>
            `;
        });
    }
    
    function loadAllTable() {
        const tbody = document.getElementById('allTableBody');
        
        if (appointments.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No appointments found</td></tr>';
            return;
        }
        
        tbody.innerHTML = '';
        appointments.forEach(app => {
            let statusBadge = '';
            if (app.status === 'pending') statusBadge = '<span class="badge-pending">Pending</span>';
            else if (app.status === 'confirmed') statusBadge = '<span class="badge-confirmed">Confirmed</span>';
            else statusBadge = '<span class="badge-cancelled">Cancelled</span>';
            
            tbody.innerHTML += `
                <tr>
                    <td><div class="patient-name">${app.patientName}</div><small>${app.patientEmail}</small></td>
                    <td>${app.date}<br><small>${app.time}</small></td>
                    <td>${statusBadge}</td>
                    <td>${app.requestedOn}</td>
                    <td>
                        <button class="btn-view" onclick="viewPatientDetails(${app.id})"><i class="fas fa-eye"></i> View</button>
                        ${app.status === 'pending' ? `<button class="btn-accept" onclick="confirmAppointment(${app.id})"><i class="fas fa-check"></i> Accept</button>` : ''}
                    </td>
                </tr>
            `;
        });
    }
    
    function confirmAppointment(id) {
        const appointment = appointments.find(a => a.id === id);
        if (appointment && appointment.status === 'pending') {
            appointment.status = 'confirmed';
            appointment.confirmedOn = new Date().toLocaleDateString();
            loadPendingTable();
            loadConfirmedTable();
            loadAllTable();
            updateStats();
        }
    }
    
    function rejectAppointment(id) {
         {
            appointments = appointments.filter(a => a.id !== id);
            loadPendingTable();
            loadConfirmedTable();
            loadAllTable();
            updateStats();
            
        }
    }
    
    function viewPatientDetails(patientId) {
    const patient = appointments.find(a => a.id === patientId);
    if (patient) {
        // إضافة from=doctor عشان نعرف إن الدكتور هو اللي فتح الصفحة
        window.location.href = `../patient/prediction_detail.html?id=${patientId}&from=doctor`;
    } else {
        alert('Patient not found');
    }
}
    
    function showTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        document.getElementById('pendingTab').classList.remove('active');
        document.getElementById('confirmedTab').classList.remove('active');
        document.getElementById('allTab').classList.remove('active');
        
        if (tab === 'pending') document.getElementById('pendingTab').classList.add('active');
        else if (tab === 'confirmed') document.getElementById('confirmedTab').classList.add('active');
        else if (tab === 'all') document.getElementById('allTab').classList.add('active');
    }
    
    // Load all data
    loadPendingTable();
    loadConfirmedTable();
    loadAllTable();
    updateStats();