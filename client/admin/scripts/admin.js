document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('adminLoginForm');
    const loginContainer = document.getElementById('login-form');
    const dashboardContainer = document.getElementById('dashboard');
    const logoutBtn = document.getElementById('logoutBtn');
    const contactsList = document.getElementById('contactsList');

    // Check if user is logged in
    checkAuth();

    // Login form handler
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });

            const data = await response.json();

            if (data.success) {
                showDashboard();
                loadContacts();
            } else {
                alert('Login failed: ' + data.message);
            }
        } catch (error) {
            alert('Error logging in');
        }
    });

    // Logout handler
    logoutBtn.addEventListener('click', async () => {
        try {
            await fetch('/api/auth/logout');
            showLogin();
        } catch (error) {
            alert('Error logging out');
        }
    });

    // Check authentication status
    async function checkAuth() {
        try {
            const response = await fetch('/api/auth/me');
            const data = await response.json();

            if (data.success) {
                showDashboard();
                loadContacts();
            } else {
                showLogin();
            }
        } catch (error) {
            showLogin();
        }
    }

    // Load contacts
    async function loadContacts() {
        try {
            const response = await fetch('/api/contact');
            const data = await response.json();

            if (data.success) {
                displayContacts(data.data);
            }
        } catch (error) {
            alert('Error loading contacts');
        }
    }

    // Display contacts
    function displayContacts(contacts) {
        contactsList.innerHTML = contacts.map(contact => `
            <div class="contact-item">
                <h3>${contact.name}</h3>
                <p>${contact.email}</p>
                <p>${contact.message}</p>
                <small>${new Date(contact.date).toLocaleString()}</small>
            </div>
        `).join('');
    }

    // Helper functions
    function showDashboard() {
        loginContainer.style.display = 'none';
        dashboardContainer.style.display = 'block';
    }

    function showLogin() {
        loginContainer.style.display = 'block';
        dashboardContainer.style.display = 'none';
    }
});