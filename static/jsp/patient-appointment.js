    // Appointments Data with Doctor Names
    const appointmentsData = [
        { 
            id: 1, 
            date: "20 May 2026", 
            time: "10:30 AM", 
            doctor: "Dr. Sarah Ahmed",
            doctorSpecialty: "Cardiologist",
            status: "confirmed", 
            statusText: "Confirmed", 
            statusClass: "confirmed" 
        },
        { 
            id: 2, 
            date: "15 May 2026", 
            time: "02:00 PM", 
            doctor: "Dr. Michael Lee",
            doctorSpecialty: "Cardiothoracic Surgeon",
            status: "confirmed", 
            statusText: "Confirmed", 
            statusClass: "confirmed" 
        },
        { 
            id: 3, 
            date: "25 May 2026", 
            time: "11:00 AM", 
            doctor: "Dr. Sarah Ahmed",
            doctorSpecialty: "Cardiologist",
            status: "pending", 
            statusText: "Pending", 
            statusClass: "pending" 
        }
    ];
    
    function updateStats() {
        const total = appointmentsData.length;
        const pending = appointmentsData.filter(a => a.status === "pending").length;
        const confirmed = appointmentsData.filter(a => a.status === "confirmed").length;
        
        document.getElementById('totalAppointments').innerText = total;
        document.getElementById('pendingCount').innerText = pending;
        document.getElementById('confirmedCount').innerText = confirmed;
    }
    
    function loadAppointments() {
        const tbody = document.getElementById('appointmentsBody');
        tbody.innerHTML = '';
        
        if (appointmentsData.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="empty-state">
                        <div class="empty-icon"><i class="fas fa-calendar-times"></i></div>
                        <p class="empty-text">You have no appointments booked yet.</p>
                        <a href="book-appointment.html" class="btn-book">
                            <i class="fas fa-plus-circle"></i> Book an Appointment Now
                        </a>
                    </td>
                </tr>
            `;
            updateStats();
            return;
        }
        
        appointmentsData.forEach(appointment => {
            const row = document.createElement('tr');
            
            let statusBadge = '';
            if (appointment.status === 'confirmed') {
                statusBadge = '<span class="badge-confirmed"><i class="fas fa-check-circle"></i> Confirmed</span>';
            } else if (appointment.status === 'pending') {
                statusBadge = '<span class="badge-pending"><i class="fas fa-clock"></i> Pending</span>';
            } else {
                statusBadge = '<span class="badge-cancelled"><i class="fas fa-times-circle"></i> Cancelled</span>';
            }
            
            row.innerHTML = `
                <td><span class="appointment-date">${appointment.date}</span></td>
                <td>${appointment.time}</td>
                <td>
                    <div class="doctor-name">${appointment.doctor}</div>
                    <small style="font-size: 11px; color: #888;">${appointment.doctorSpecialty}</small>
                </td>
                <td class="text-center">${statusBadge}</td>
            `;
            tbody.appendChild(row);
        });
        
        updateStats();
    }
    
    // Load appointments on page load
    loadAppointments();