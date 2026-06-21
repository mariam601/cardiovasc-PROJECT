// ========== DOCTOR REGISTER SCRIPT ==========

function registerDoctor() {
    const name = document.getElementById('docName').value;
    const specialty = document.getElementById('docSpecialty').value;
    const email = document.getElementById('docEmail').value;
    const password = document.getElementById('docPassword').value;
    const phone = document.getElementById('docPhone').value;
    const fee = document.getElementById('docFee').value;
    const experience = document.getElementById('docExperience').value;
    const education = document.getElementById('docEducation').value;
    const about = document.getElementById('docAbout').value;
    const availableDays = document.getElementById('docDays').value;
    const availableTime = document.getElementById('docTime').value;
    
    if (!name || !specialty || !email || !password) {
        alert("❌ Please fill all required fields (Name, Specialty, Email, Password)");
        return;
    }
    
    let registeredDoctors = JSON.parse(localStorage.getItem('registeredDoctors')) || [];
    
    if (registeredDoctors.find(d => d.email === email)) {
        alert("❌ This email is already registered.");
        return;
    }
    
    const newDoctor = {
        name, specialty, email, password,
        phone: phone || "Not provided",
        fee: fee || "₹500",
        experience: experience || "Not specified",
        education: education || "Not specified",
        about: about || "Experienced cardiologist dedicated to patient care.",
        availableDays: availableDays || "Monday to Saturday",
        availableTime: availableTime || "10:00 AM - 5:00 PM",
        rating: 5.0,
        languages: ["English"],
        registeredAt: new Date().toISOString()
    };
    
    registeredDoctors.push(newDoctor);
    localStorage.setItem('registeredDoctors', JSON.stringify(registeredDoctors));
    
    const successMsg = document.getElementById('successMsg');
    if (successMsg) successMsg.style.display = 'block';
    
    setTimeout(() => {
        window.location.href = 'homepage.html';
    }, 2000);
}