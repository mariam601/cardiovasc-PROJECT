// ========== HOMEPAGE SCRIPT ==========

// Doctors Data
const allDoctors = [
    { name: "Dr. Amit Trivedi", specialty: "Interventional Cardiology", fee: "₹500", phone: "9876543210" },
    { name: "Dr. Neha Sharma", specialty: "Cardiac Electrophysiology", fee: "₹600", phone: "9123456789" },
    { name: "Dr. Rajesh Kumar", specialty: "Cardiothoracic Surgery", fee: "₹800", phone: "9988776655" },
    { name: "Dr. Priya Singh", specialty: "Preventive Cardiology", fee: "₹450", phone: "9876543211" },
    { name: "Dr. Sanjay Verma", specialty: "Pediatric Cardiology", fee: "₹550", phone: "9876543212" },
    { name: "Dr. Meera Reddy", specialty: "Cardiac Radiology", fee: "₹500", phone: "9876543213" },
    { name: "Dr. Vikram Seth", specialty: "Heart Failure Specialist", fee: "₹700", phone: "9876543214" },
    { name: "Dr. Anjali Nair", specialty: "Cardiac Rehabilitation", fee: "₹400", phone: "9876543215" },
    { name: "Dr. Rohan Gupta", specialty: "Vascular Surgery", fee: "₹750", phone: "9876543216" }
];

// Get registered doctors from localStorage
let registeredDoctors = JSON.parse(localStorage.getItem('registeredDoctors')) || [];

// Map registered doctors
const registeredDoctorsList = registeredDoctors.map(doc => ({
    name: doc.name,
    specialty: doc.specialty,
    fee: doc.fee,
    phone: doc.phone
}));

// Combine all doctors
const allDoctorsCombined = [...allDoctors, ...registeredDoctorsList];

// Settings
const doctorsPerPage = 8;
let currentPage = 1;
let totalPages = Math.ceil(allDoctorsCombined.length / doctorsPerPage);
let filteredDoctors = [];
let isSearchActive = false;

// Load Doctors
function loadDoctors() {
    const container = document.getElementById('doctorsGrid');
    if (!container) return;
    
    let doctorsToShow = isSearchActive ? filteredDoctors : allDoctorsCombined;
    totalPages = Math.ceil(doctorsToShow.length / doctorsPerPage);
    const start = (currentPage - 1) * doctorsPerPage;
    const end = start + doctorsPerPage;
    const doctorsForPage = doctorsToShow.slice(start, end);
    
    container.innerHTML = '';
    
    if (doctorsForPage.length === 0 && isSearchActive) {
        container.innerHTML = `<div style="text-align: center; width: 100%; padding: 50px; color: #c0392b;">🔍 No doctors found</div>`;
        document.getElementById('paginationButtons').innerHTML = '';
        return;
    }
    
    doctorsForPage.forEach(d => {
        const card = document.createElement('div');
        card.className = 'doctor-card';
        card.innerHTML = `
            <h4>${d.name}</h4>
            <div class="doctor-specialty">${d.specialty}</div>
            <div class="doctor-fee">💰 ${d.fee}</div>
            <div class="doctor-phone">📞 ${d.phone}</div>
            <button class="visit-profile" onclick="viewDoctorProfile('${d.name.replace(/'/g, "\\'")}')">View Profile</button>
            <button class="book-now-btn" onclick="bookDoctorAppointment('${d.name.replace(/'/g, "\\'")}')">📅 Book Now</button>
        `;
        container.appendChild(card);
    });
    
    updatePaginationButtons();
}

function updatePaginationButtons() {
    const paginationDiv = document.getElementById('paginationButtons');
    if (!paginationDiv) return;
    
    paginationDiv.innerHTML = '';
    if ((isSearchActive && filteredDoctors.length === 0)) return;
    
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Previous';
    prevBtn.className = 'page-btn';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => changePage(currentPage - 1);
    paginationDiv.appendChild(prevBtn);
    
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.onclick = () => changePage(i);
        paginationDiv.appendChild(pageBtn);
    }
    
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.className = 'page-btn';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => changePage(currentPage + 1);
    paginationDiv.appendChild(nextBtn);
}

function changePage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    loadDoctors();
}

function searchDoctors() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    if (searchTerm === "") { clearSearch(); return; }
    filteredDoctors = allDoctorsCombined.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm) || doctor.specialty.toLowerCase().includes(searchTerm)
    );
    isSearchActive = true;
    currentPage = 1;
    loadDoctors();
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    isSearchActive = false;
    filteredDoctors = [];
    currentPage = 1;
    loadDoctors();
}

function viewDoctorProfile(docName) {
    window.location.href = `../profile.html?name=${encodeURIComponent(docName)}`;
}

function bookDoctorAppointment(doctorName) {
    // التحقق من تسجيل الدخول
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // حفظ اسم الدكتور للرجوع إليه بعد تسجيل الدخول
        localStorage.setItem('pendingBookingDoctor', doctorName);
        window.location.href = 'login.html';
        return;
    }
    
       // لو مسجل دخول → يروح على طول لصفحة الحجز
    window.location.href = `patient/book-appointment.html?doctor=${encodeURIComponent(doctorName)}`;

    }


function subscribeNewsletter() {
    let email = document.getElementById('newsEmail')?.value;
    if (email) {
        alert(`✅ Subscribed with ${email}!`);
        document.getElementById('newsEmail').value = '';
    } else {
        alert('Please enter a valid email address.');
    }
}

// Testimonials
const testimonials = [
    { name: "Urvi Rashod", role: "Product Designer", text: "Excellent care! The team at CardioVasc is amazing.", avatar: "U" },
    { name: "Parash Thakral", role: "Product Designer", text: "Highly recommended for heart care.", avatar: "P" },
    { name: "Rahul Mehta", role: "Software Engineer", text: "The AI prediction was accurate and helpful.", avatar: "R" },
    { name: "Priya Sharma", role: "Teacher", text: "Professional and caring doctors.", avatar: "P" },
    { name: "Amit Patel", role: "Businessman", text: "State-of-the-art facilities!", avatar: "A" }
];

let currentSlide = 0;
let autoSlideInterval;
const itemsPerSlide = 2;
let totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

function loadTestimonials() {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;
    
    const slides = [];
    for (let i = 0; i < testimonials.length; i += itemsPerSlide) {
        slides.push(testimonials.slice(i, i + itemsPerSlide));
    }
    totalSlides = slides.length;
    
    slider.innerHTML = '';
    slides.forEach(slide => {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'testimonials-slide';
        slideDiv.style.display = 'flex';
        slideDiv.style.gap = '30px';
        slideDiv.style.minWidth = '100%';
        slide.forEach(t => {
            const card = document.createElement('div');
            card.className = 'testimonial-card';
            card.innerHTML = `
                <div class="testimonial-header">
                    <div class="testimonial-avatar">${t.avatar}</div>
                    <div class="testimonial-info"><h4>${t.name}</h4><p>${t.role}</p></div>
                </div>
                <div class="testimonial-text">"${t.text}"</div>
            `;
            slideDiv.appendChild(card);
        });
        slider.appendChild(slideDiv);
    });
    
    updateSliderPosition();
    createDots();
    startAutoSlide();
}

function updateSliderPosition() {
    const slider = document.getElementById('testimonialsSlider');
    if (slider) slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateDots();
}

function createDots() {
    const dotsContainer = document.getElementById('carouselDots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
}

function goToSlide(index) { currentSlide = index; updateSliderPosition(); resetAutoSlide(); }
function nextSlide() { currentSlide = (currentSlide + 1) % totalSlides; updateSliderPosition(); resetAutoSlide(); }
function prevSlide() { currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; updateSliderPosition(); resetAutoSlide(); }
function startAutoSlide() { autoSlideInterval = setInterval(() => nextSlide(), 4000); }
function resetAutoSlide() { clearInterval(autoSlideInterval); startAutoSlide(); }

function checkBeforeModel() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        // لو مسجل دخول → يروح للمودل
        window.location.href = 'patient/patient-data-input.html';
    } else {
        // لو مش مسجل → يروح لصفحة تسجيل الدخول
        window.location.href = 'login.html';
    }
}


// ========== AUTHENTICATION & DASHBOARD ==========

// التحقق من حالة تسجيل الدخول عند تحميل الصفحة
function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authButtons = document.getElementById('authButtons');
    const dashboardBtn = document.getElementById('dashboardBtnContainer');
    
    if (currentUser) {
        // المستخدم مسجل دخول → إخفاء أزرار Login/Register وظهور My Dashboard
        if (authButtons) authButtons.style.display = 'none';
        if (dashboardBtn) dashboardBtn.style.display = 'block';
    } else {
        // المستخدم غير مسجل → إظهار أزرار Login/Register وإخفاء My Dashboard
        if (authButtons) authButtons.style.display = 'flex';
        if (dashboardBtn) dashboardBtn.style.display = 'none';
    }
}

// التوجه إلى الـ Dashboard المناسب حسب role
function goToDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    if (currentUser.role === 'doctor') {
        window.location.href = 'doctor/doctor-dashboard.html';
    } else {
        window.location.href = 'patient/patient-dashboard.html';
    }
}

// تحديث حالة auth عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    loadDoctors();
    loadTestimonials();
});