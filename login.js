// Demo user credentials (in a real app, this would be handled by a backend)
const DEMO_USERS = [
    { username: 'demo', password: 'demo123' },
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' }
];

// Get DOM elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');
const errorMessage = document.getElementById('errorMessage');
const togglePasswordBtn = document.getElementById('togglePassword');

// Check if user is already logged in
function checkExistingSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const sessionUser = sessionStorage.getItem('currentUser');
    const rememberedUser = localStorage.getItem('currentUser');
    
    if (isLoggedIn === 'true' && (sessionUser || rememberedUser)) {
        // Redirect to main page
        window.location.href = 'index.html';
    }
}

// Toggle password visibility
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    // Change icon based on visibility
    togglePasswordBtn.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '🙈';
});

// Handle form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Clear previous error message
    errorMessage.textContent = '';
    
    // Get form values
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;
    
    // Validate inputs
    if (!username || !password) {
        showError('Please enter both username and password');
        return;
    }
    
    // Check credentials
    const user = DEMO_USERS.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Successful login
        handleSuccessfulLogin(username, rememberMe);
    } else {
        // Failed login
        showError('Invalid username or password');
        
        // Add shake animation to form
        loginForm.style.animation = 'shake 0.5s';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 500);
    }
});

// Handle successful login
function handleSuccessfulLogin(username, rememberMe) {
    // Set login status
    localStorage.setItem('isLoggedIn', 'true');
    
    // Store user info
    if (rememberMe) {
        localStorage.setItem('currentUser', username);
    } else {
        sessionStorage.setItem('currentUser', username);
    }
    
    // Show success message
    showSuccessMessage('Login successful! Redirecting...');
    
    // Redirect after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.animation = 'fadeIn 0.3s';
}

// Show success message
function showSuccessMessage(message) {
    const messageEl = document.createElement('div');
    messageEl.className = 'success-message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(46, 204, 113, 0.95);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        font-weight: 600;
        z-index: 1000;
        animation: slideDown 0.5s ease-out;
    `;
    
    document.body.appendChild(messageEl);
}

// Add additional animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Check for existing session on page load
checkExistingSession();

// Auto-fill remembered username if exists
const rememberedUser = localStorage.getItem('currentUser');
if (rememberedUser) {
    usernameInput.value = rememberedUser;
    rememberMeCheckbox.checked = true;
    passwordInput.focus();
}

// Log initialization
console.log('Login page initialized! 🔐');
console.log('Use demo credentials: username=demo, password=demo123');