// Available Slots Data
    const timeSlots = [
        { 
            id: 1,
            doctorName: "Dr. Sarah Ahmed", 
            specialty: "Interventional Cardiology",
            day: "Monday, 20 May 2026", 
            startTime: "10:00 AM", 
            endTime: "11:00 AM",
            isBooked: false
        },
        { 
            id: 2,
            doctorName: "Dr. Sarah Ahmed", 
            specialty: "Interventional Cardiology",
            day: "Monday, 20 May 2026", 
            startTime: "11:00 AM", 
            endTime: "12:00 PM",
            isBooked: true
        },
        { 
            id: 3,
            doctorName: "Dr. Michael Lee", 
            specialty: "Cardiothoracic Surgery",
            day: "Tuesday, 21 May 2026", 
            startTime: "09:00 AM", 
            endTime: "10:00 AM",
            isBooked: false
        },
        { 
            id: 4,
            doctorName: "Dr. Michael Lee", 
            specialty: "Cardiothoracic Surgery",
            day: "Tuesday, 21 May 2026", 
            startTime: "10:00 AM", 
            endTime: "11:00 AM",
            isBooked: false
        },
        { 
            id: 5,
            doctorName: "Dr. Neha Sharma", 
            specialty: "Cardiac Electrophysiology",
            day: "Wednesday, 22 May 2026", 
            startTime: "02:00 PM", 
            endTime: "03:00 PM",
            isBooked: false
        },
        { 
            id: 6,
            doctorName: "Dr. Neha Sharma", 
            specialty: "Cardiac Electrophysiology",
            day: "Wednesday, 22 May 2026", 
            startTime: "03:00 PM", 
            endTime: "04:00 PM",
            isBooked: true
        },
        { 
            id: 7,
            doctorName: "Dr. Rajesh Kumar", 
            specialty: "Cardiothoracic Surgery",
            day: "Thursday, 23 May 2026", 
            startTime: "11:00 AM", 
            endTime: "12:00 PM",
            isBooked: false
        },
        { 
            id: 8,
            doctorName: "Dr. Priya Singh", 
            specialty: "Preventive Cardiology",
            day: "Friday, 24 May 2026", 
            startTime: "09:00 AM", 
            endTime: "10:00 AM",
            isBooked: false
        }
    ];
    
    function loadSlots() {
        const tbody = document.getElementById('slotsBody');
        tbody.innerHTML = '';
        
        if (timeSlots.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center py-5">
                        <p class="text-muted">No appointments available at the moment.</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        timeSlots.forEach(slot => {
            const row = document.createElement('tr');
            row.className = 'text-center';
            
            let statusHtml = '';
            if (slot.isBooked) {
                statusHtml = '<span class="status-booked"><i class="fas fa-check-circle"></i> Already Booked</span>';
            } else {
                statusHtml = `<button class="btn btn-book" onclick="bookAppointment(${slot.id})">
                                <i class="fas fa-calendar-plus"></i> Book Now
                              </button>`;
            }
            
            row.innerHTML = `
                <td class="text-start">
                    <div class="doctor-name">${slot.doctorName}</div>
                </td>
                <td class="text-start">
                    <div class="doctor-specialty">${slot.specialty}</div>
                </td>
                <td><span class="badge-time">${slot.day}</span></td>
                <td>${slot.startTime} – ${slot.endTime}</td>
                <td>${statusHtml}</td>
            `;
            tbody.appendChild(row);
        });
    }
    
    function bookAppointment(slotId) {
        const slot = timeSlots.find(s => s.id === slotId);
        
        if (!slot || slot.isBooked) {
            alert('❌ This slot is no longer available!');
            return;
        }
        
        const patientName = localStorage.getItem('patientName') || 'Ahmed Mansour';
        
        // Create appointment object
        const newAppointment = {
            id: Date.now(),
            patientName: patientName,
            doctorName: slot.doctorName,
            doctorSpecialty: slot.specialty,
            date: slot.day,
            time: `${slot.startTime} - ${slot.endTime}`,
            status: 'pending',
            bookedAt: new Date().toLocaleString()
        };
        
        // Save to localStorage
        let appointments = JSON.parse(localStorage.getItem('patientAppointments')) || [];
        appointments.push(newAppointment);
        localStorage.setItem('patientAppointments', JSON.stringify(appointments));
        
        // Mark slot as booked
        slot.isBooked = true;
        
        // Reload the table to show updated status
        loadSlots();
        
        // Show success message
        alert(`✅ Appointment Booked Successfully!\n\n📋 Doctor: ${slot.doctorName}\n📅 Date: ${slot.day}\n⏰ Time: ${slot.startTime} - ${slot.endTime}\n\nYou can view your appointments in "My Appointments" page.`);
    }
    
    // Load slots on page load
    loadSlots();