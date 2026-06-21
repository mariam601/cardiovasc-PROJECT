 // Load profile data from localStorage
    function loadProfile() {
        const profile = JSON.parse(localStorage.getItem('patientProfile'));
        
        if (profile) {
            document.getElementById('fullName').value = profile.fullName || 'Ahmed Mansour';
            document.getElementById('dob').value = profile.dob || '1978-05-15';
            document.getElementById('gender').value = profile.gender || 'male';
            document.getElementById('bloodType').value = profile.bloodType || 'O+';
            document.getElementById('email').value = profile.email || 'ahmed@example.com';
            document.getElementById('phone').value = profile.phone || '+20 123 456 7890';
            document.getElementById('address').value = profile.address || '123 Street, Cairo, Egypt';
            document.getElementById('allergies').value = profile.allergies || 'None';
            document.getElementById('medications').value = profile.medications || 'None';
            document.getElementById('conditions').value = profile.conditions || 'Hypertension';
            document.getElementById('primaryDoctor').value = profile.primaryDoctor || 'Dr. Sarah Ahmed';
            
            // Update sidebar
            document.getElementById('sidebarName').innerText = profile.fullName || 'Ahmed Mansour';
            document.getElementById('sidebarEmail').innerText = profile.email || 'ahmed@example.com';
            document.getElementById('sidebarPhone').innerText = profile.phone || '+20 123 456 7890';
        }
    }
    
    function enableEdit() {
        // Enable all form fields
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.disabled = false;
        });
        
        // Show save/cancel buttons, hide edit button
        document.getElementById('editBtn').style.display = 'none';
        document.getElementById('saveBtn').style.display = 'inline-flex';
        document.getElementById('cancelBtn').style.display = 'inline-flex';
    }
    
    function saveProfile() {
        const profile = {
            fullName: document.getElementById('fullName').value,
            dob: document.getElementById('dob').value,
            gender: document.getElementById('gender').value,
            bloodType: document.getElementById('bloodType').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            allergies: document.getElementById('allergies').value,
            medications: document.getElementById('medications').value,
            conditions: document.getElementById('conditions').value,
            primaryDoctor: document.getElementById('primaryDoctor').value
        };
        
        // Save to localStorage
        localStorage.setItem('patientProfile', JSON.stringify(profile));
        
        // Update sidebar
        document.getElementById('sidebarName').innerText = profile.fullName;
        document.getElementById('sidebarEmail').innerText = profile.email;
        document.getElementById('sidebarPhone').innerText = profile.phone;
        
        // Disable all form fields
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.disabled = true;
        });
        
        // Show/hide buttons
        document.getElementById('editBtn').style.display = 'inline-flex';
        document.getElementById('saveBtn').style.display = 'none';
        document.getElementById('cancelBtn').style.display = 'none';
        
        // Show success message
        const successMsg = document.getElementById('successMsg');
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 3000);
    }
    
    function cancelEdit() {
        // Reload original data
        loadProfile();
        
        // Disable all form fields
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.disabled = true;
        });
        
        // Show/hide buttons
        document.getElementById('editBtn').style.display = 'inline-flex';
        document.getElementById('saveBtn').style.display = 'none';
        document.getElementById('cancelBtn').style.display = 'none';
    }
    
    function changePhoto() {
        alert('📸 Photo upload feature coming soon!');
    }
    
    // Load profile on page load
    loadProfile();