// Medical History Data**************************
    


    function bookAppointment(doctorName) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        localStorage.setItem('pendingBookingDoctor', doctorName);
        window.location.href = '/prediction/login/';
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


    
    
    
    // Load history on page load
