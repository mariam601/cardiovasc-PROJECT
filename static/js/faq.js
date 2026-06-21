// Accordion functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });
    
    // Category filter
    function filterCategory(category) {
        // Hide all sections
        document.querySelectorAll('.faq-section').forEach(section => {
            section.classList.remove('active-section');
        });
        
        // Show selected section or all
        if (category === 'all') {
            document.querySelectorAll('.faq-section').forEach(section => {
                section.classList.add('active-section');
            });
        } else {
            document.getElementById(category).classList.add('active-section');
        }
        
        // Update active button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Clear search when changing category
        document.getElementById('searchInput').value = '';
        document.getElementById('noResults').style.display = 'none';
        
        // Reset all FAQ items to closed
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    // Search functionality
    function searchFAQ() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        
        if (searchTerm === "") {
            // Show all sections
            filterCategory('all');
            document.querySelectorAll('.faq-item').forEach(item => {
                item.style.display = '';
            });
            document.getElementById('noResults').style.display = 'none';
            return;
        }
        
        // Show all sections for search
        document.querySelectorAll('.faq-section').forEach(section => {
            section.classList.add('active-section');
        });
        
        // Remove active category highlight
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        let hasResults = false;
        
        document.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question').innerText.toLowerCase();
            const answer = item.querySelector('.faq-answer').innerText.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = '';
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        document.getElementById('noResults').style.display = hasResults ? 'none' : 'block';
    }
    
    // Set default active section (Appointments)
    filterCategory('all');