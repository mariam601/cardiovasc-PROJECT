// جلب اسم الدكتور من الرابط
    const urlParams = new URLSearchParams(window.location.search);
    let doctorName = urlParams.get('name');
    
    if (doctorName) {
        doctorName = decodeURIComponent(doctorName);
    } else {
        doctorName = "Dr. Amit Trivedi";
    }
    
    // دالة حجز الموعد مع التحقق من تسجيل الدخول
    function bookAppointment(doctorName) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (!currentUser) {
            localStorage.setItem('pendingBookingDoctor', doctorName);
            window.location.href = 'login.html';
            return;
        }
        
         // لو مسجل دخول → يروح على طول لصفحة الحجز
    window.location.href = `patient/book-appointment.html?doctor=${encodeURIComponent(doctorName)}`;
}
    
    // بيانات الدكاترة
    const doctorsData = {
        "Dr. Amit Trivedi": {
            name: "Dr. Amit Trivedi",
            specialty: "Interventional Cardiology",
            fee: "₹500",
            phone: "+91 98765 43210",
            email: "amit.trivedi@cardiovasc.com",
            experience: "15+ years",
            education: "MBBS, MD (Cardiology), FACC",
            languages: ["English", "हिन्दी", "தமிழ்"],
            availableDays: "Monday to Saturday",
            availableTime: "10:00 AM - 5:00 PM",
            rating: 4.8,
            about: "Leading interventional cardiologist with over 15 years of experience. Specializes in complex coronary interventions, angioplasty, and stent placement. Has performed over 5000 successful cardiac procedures."
        },
        "Dr. Neha Sharma": {
            name: "Dr. Neha Sharma",
            specialty: "Cardiac Electrophysiology",
            fee: "₹600",
            phone: "+91 91234 56789",
            email: "neha.sharma@cardiovasc.com",
            experience: "12+ years",
            education: "MBBS, DM (Cardiology), Fellowship in Electrophysiology",
            languages: ["English", "हिन्दी"],
            availableDays: "Monday to Friday",
            availableTime: "9:00 AM - 4:00 PM",
            rating: 4.9,
            about: "Expert in cardiac electrophysiology with 12+ years of experience. Specializes in arrhythmia management, pacemaker implantation, and catheter ablation."
        },
        "Dr. Rajesh Kumar": {
            name: "Dr. Rajesh Kumar",
            specialty: "Cardiothoracic Surgery",
            fee: "₹800",
            phone: "+91 99887 76655",
            email: "rajesh.kumar@cardiovasc.com",
            experience: "20+ years",
            education: "MBBS, MS (Cardiothoracic Surgery), MCh",
            languages: ["English", "हिन्दी", "தமிழ்", "తెలుగు"],
            availableDays: "Tuesday to Saturday",
            availableTime: "11:00 AM - 6:00 PM",
            rating: 4.7,
            about: "Renowned cardiothoracic surgeon with 20+ years of experience. Specializes in heart bypass surgery, valve replacement, and minimally invasive cardiac surgery."
        },
        "Dr. Priya Singh": {
            name: "Dr. Priya Singh",
            specialty: "Preventive Cardiology",
            fee: "₹450",
            phone: "+91 98765 43211",
            email: "priya.singh@cardiovasc.com",
            experience: "8+ years",
            education: "MBBS, MD (Internal Medicine), Fellowship in Preventive Cardiology",
            languages: ["English", "हिन्दी", "தமிழ்"],
            availableDays: "Monday to Saturday",
            availableTime: "9:00 AM - 3:00 PM",
            rating: 4.6,
            about: "Focuses on preventive cardiology, helping patients manage risk factors like hypertension, diabetes, and high cholesterol to prevent heart disease."
        },
        "Dr. Sanjay Verma": {
            name: "Dr. Sanjay Verma",
            specialty: "Pediatric Cardiology",
            fee: "₹550",
            phone: "+91 98765 43212",
            email: "sanjay.verma@cardiovasc.com",
            experience: "10+ years",
            education: "MBBS, MD (Pediatrics), DM (Pediatric Cardiology)",
            languages: ["English", "हिन्दी"],
            availableDays: "Monday, Wednesday, Friday",
            availableTime: "10:00 AM - 2:00 PM",
            rating: 4.9,
            about: "Specializes in diagnosing and treating heart conditions in children, from newborns to adolescents, including congenital heart defects."
        },
        "Dr. Meera Reddy": {
            name: "Dr. Meera Reddy",
            specialty: "Cardiac Radiology",
            fee: "₹500",
            phone: "+91 98765 43213",
            email: "meera.reddy@cardiovasc.com",
            experience: "9+ years",
            education: "MBBS, MD, Fellowship",
            languages: ["English", "தமிழ்"],
            availableDays: "Monday to Friday",
            availableTime: "9:00 AM - 5:00 PM",
            rating: 4.7,
            about: "Expert in cardiac imaging including CT angiography and MRI for accurate diagnosis."
        },
        "Dr. Vikram Seth": {
            name: "Dr. Vikram Seth",
            specialty: "Heart Failure Specialist",
            fee: "₹700",
            phone: "+91 98765 43214",
            email: "vikram.seth@cardiovasc.com",
            experience: "14+ years",
            education: "MBBS, MD, FACC",
            languages: ["English", "हिन्दी"],
            availableDays: "Monday to Thursday",
            availableTime: "1:00 PM - 6:00 PM",
            rating: 4.8,
            about: "Specializes in managing heart failure patients, including advanced therapies and heart transplant coordination."
        },
        "Dr. Anjali Nair": {
            name: "Dr. Anjali Nair",
            specialty: "Cardiac Rehabilitation",
            fee: "₹400",
            phone: "+91 98765 43215",
            email: "anjali.nair@cardiovasc.com",
            experience: "7+ years",
            education: "MBBS, MD",
            languages: ["English", "മലയാളം", "தமிழ்"],
            availableDays: "Monday to Saturday",
            availableTime: "8:00 AM - 2:00 PM",
            rating: 4.5,
            about: "Leads cardiac rehabilitation programs, helping patients recover after heart attacks, surgery, or heart failure."
        },
        "Dr. Rohan Gupta": {
            name: "Dr. Rohan Gupta",
            specialty: "Vascular Surgery",
            fee: "₹750",
            phone: "+91 98765 43216",
            email: "rohan.gupta@cardiovasc.com",
            experience: "11+ years",
            education: "MBBS, MS, MCh",
            languages: ["English", "हिन्दी", "தமிழ்"],
            availableDays: "Tuesday to Saturday",
            availableTime: "10:00 AM - 4:00 PM",
            rating: 4.7,
            about: "Specializes in vascular surgery including treatment for varicose veins, peripheral artery disease, and aortic aneurysms."
        }
    };
    
    // دالة البحث عن الدكتور
    function findDoctor(name) {
        if (doctorsData[name]) return doctorsData[name];
        const nameWithoutDr = name.replace("Dr.", "").trim();
        if (doctorsData[nameWithoutDr]) return doctorsData[nameWithoutDr];
        for (const key in doctorsData) {
            if (key.toLowerCase().includes(nameWithoutDr.toLowerCase())) {
                return doctorsData[key];
            }
        }
        return null;
    }
    
    // عرض البروفايل
    function loadProfile() {
        const doctor = findDoctor(doctorName);
        const container = document.getElementById('profileContainer');
        
        if (!doctor) {
            container.innerHTML = `
                <div class="not-found">
                    <i class="fas fa-user-md" style="font-size: 60px; color: #c0392b; opacity: 0.5;"></i>
                    <h2 style="color: #c0392b;">Doctor Not Found</h2>
                    <p>We couldn't find the doctor you're looking for.</p>
                    <button class="btn-back-doctors" onclick="window.location.href='doctors.html'">← Back to Doctors</button>
                </div>
            `;
            return;
        }
        
        let stars = '';
        for (let i = 0; i < Math.floor(doctor.rating); i++) stars += '★';
        for (let i = stars.length; i < 5; i++) stars += '☆';
        
        container.innerHTML = `
            <div class="profile-header-page">
                <h1>👨‍⚕️ ${doctor.name}</h1>
                <div class="specialty">${doctor.specialty}</div>
                <div class="rating">${stars} ${doctor.rating}</div>
            </div>
            <div class="profile-content">
                <div class="profile-section">
                    <h3><i class="fas fa-user-md"></i> About Doctor</h3>
                    <div class="info-row"><div class="info-label">Experience</div><div class="info-value">${doctor.experience}</div></div>
                    <div class="info-row"><div class="info-label">Education</div><div class="info-value">${doctor.education}</div></div>
                    <div class="info-row"><div class="info-label">Languages</div><div class="info-value">${doctor.languages.join(' • ')}</div></div>
                    <div class="info-row"><div class="info-label">About</div><div class="info-value">${doctor.about}</div></div>
                </div>
                
                <div class="profile-section">
                    <h3><i class="fas fa-calendar-alt"></i> Consultation Info</h3>
                    <div class="info-row"><div class="info-label">Consultation Fee</div><div class="info-value">💰 ${doctor.fee}</div></div>
                    <div class="info-row"><div class="info-label">Available Days</div><div class="info-value">${doctor.availableDays}</div></div>
                    <div class="info-row"><div class="info-label">Available Time</div><div class="info-value">${doctor.availableTime}</div></div>
                    <div class="info-row"><div class="info-label">Phone</div><div class="info-value">📞 ${doctor.phone}</div></div>
                    <div class="info-row"><div class="info-label">Email</div><div class="info-value">📧 ${doctor.email}</div></div>
                </div>
                
                <div class="appointment-box">
                    <h3>📅 Book an Appointment</h3>
                    <p>Ready to consult with ${doctor.name.split(' ')[0]} ${doctor.name.split(' ')[1]}?</p>
                    <button class="btn-book-now" onclick="bookAppointment('${doctor.name}')">📅 Book Now</button>
                    <button class="btn-back-doctors" onclick="window.location.href='doctors.html'">← Back to Doctors</button>
                </div>
            </div>
        `;
    }
    
    loadProfile();