// ========== CONTACT PAGE SCRIPT ==========

function sendMessage() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (!fullName || !email || !message) {
        alert("❌ Please fill all required fields (Name, Email, Message)");
        return;
    }
    
    const contactMessage = {
        id: Date.now(),
        name: fullName,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        date: new Date().toLocaleString(),
        status: "unread"
    };
    
    let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    const successMsg = document.getElementById('successMsg');
    if (successMsg) successMsg.style.display = 'block';
    
    document.getElementById('contactForm')?.reset();
    
    setTimeout(() => {
        if (successMsg) successMsg.style.display = 'none';
    }, 3000);
}