 // التحقق من تسجيل الدخول وصلاحية المريض
// التحقق من تسجيل الدخول


// عرض اسم المريض في الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const nameElement = document.getElementById('patientName');
    if (nameElement) {
        nameElement.innerText = currentUser.name || currentUser.username;
    }
});
 
 
 
 
 
 // Load patient data from localStorage
    function loadPatientStats() {
        const predictions = JSON.parse(localStorage.getItem('patientPredictions')) || [];
        const appointments = JSON.parse(localStorage.getItem('patientAppointments')) || [];
        
        const total = predictions.length;
        const cvd = predictions.filter(p => p.result === 1 || p.riskScore > 50).length;
        const normal = total - cvd;
        const upcoming = appointments.filter(a => a.status === 'pending').length;
        
        document.getElementById('totalRecords').innerText = total;
        document.getElementById('cvdRecords').innerText = cvd;
        document.getElementById('normalRecords').innerText = normal;
        document.getElementById('upcomingAppointments').innerText = upcoming;
    }
    
    function loadRecentActivity() {
        const activityList = document.getElementById('activityList');
        const predictions = JSON.parse(localStorage.getItem('patientPredictions')) || [];
        const appointments = JSON.parse(localStorage.getItem('patientAppointments')) || [];
        
        let activities = [];
        
        // Add predictions to activities
        predictions.slice(0, 3).forEach(p => {
            activities.push({
                type: 'prediction',
                title: p.result === 1 || p.riskScore > 50 ? '⚠️ CVD Risk Assessment' : '✅ Health Assessment',
                detail: `Risk Score: ${p.riskScore}%`,
                date: p.date || new Date().toLocaleString()
            });
        });
        
        // Add appointments to activities
        appointments.slice(0, 3).forEach(a => {
            activities.push({
                type: 'appointment',
                title: `📅 Appointment with ${a.doctorName}`,
                detail: a.status === 'pending' ? 'Pending confirmation' : 'Confirmed',
                date: a.bookedAt || new Date().toLocaleString()
            });
        });
        
        // Sort by date (newest first)
        activities.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (activities.length === 0) {
            activityList.innerHTML = '<div class="empty-activity"><i class="fas fa-calendar-alt" style="font-size: 40px; opacity: 0.3;"></i><p>No recent activity</p></div>';
            return;
        }
        
        activityList.innerHTML = '';
        activities.slice(0, 5).forEach(activity => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="activity-icon">
                    <i class="fas ${activity.type === 'prediction' ? 'fa-heartbeat' : 'fa-calendar-check'}"></i>
                </div>
                <div class="activity-details">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-detail" style="font-size: 12px; color: #666;">${activity.detail}</div>
                    <div class="activity-date"><i class="far fa-clock"></i> ${activity.date}</div>
                </div>
            `;
            activityList.appendChild(li);
        });
    }
    
    // Load all data
    loadPatientStats();
    loadRecentActivity();