
//Form handling

document.addEventListener('DOMContentLoaded',()=>{
    //smooth scrolling

    document.querySelectorAll('nav a').forEach(link=>{
        link.addEventListener('click',(e)=>{
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({behavior:'smooth'});
        });
    });

    //form submission handling

    const contactForm = document.getElementById('contact-form');
    // Update the form submission handler
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
        
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        const formData = new FormData(contactForm);
        const response = await fetch('/api/contact/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        const data = await response.json();
        
        if (data.success) {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
});
});

//Notification System

function showNotification(message,type){
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    //trigger animation
    setTimeout(()=>notification.classList.add('show'),100);

    //Remove notif aft 3 sec
    setTimeout(()=>{
        notification.classList.remove('show');
        setTimeout(()=>notification.remove(),300);
    },3000);
}


// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or default to user's system preference
const savedTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});
