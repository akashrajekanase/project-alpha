
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
    contactForm.addEventListener('submit',async(e)=>{
        e.preventDefault();

        const submitBtn=contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending....';
        submitBtn.disabled = true;

        //gather form data

        const formData = new FormData(contactForm);
        const formDataObject = Object.fromEntries(formData.entries());

        try{
            //simulate API call (replace with actual api endpoint)

            await new Promise(resolve=>setTimeout(resolve,1500));

            //show success messg
            showNotification('Message sent successfully!','success');
            contactForm.reset();
        }catch(error){
            showNotification('Failed to send message. Please Try again','error');

        }finally{
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled=false;
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
