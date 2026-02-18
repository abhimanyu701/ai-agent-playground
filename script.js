// Initialize click counter
let clickCount = 0;

// Get DOM elements
const clickButton = document.getElementById('clickButton');
const clickCounter = document.getElementById('clickCounter');
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Form submission handler
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Basic validation
    if (!email || !password) {
        showMessage('Please fill in all fields! ⚠️', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address! 📧', 'error');
        return;
    }
    
    // Password length validation
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters! 🔒', 'error');
        return;
    }
    
    // Success message
    showMessage('Welcome, ' + email + '! Login successful! 🎉', 'success');
    
    // Log the submission (in a real app, this would send to a server)
    console.log('Login attempt:', { email: email, timestamp: new Date().toISOString() });
    
    // Optional: Clear form after successful submission
    setTimeout(function() {
        loginForm.reset();
    }, 2000);
});

// Button click event handler
clickButton.addEventListener('click', function() {
    // Increment counter
    clickCount++;
    
    // Update counter display
    clickCounter.textContent = 'Clicks: ' + clickCount;
    
    // Add animation class
    clickButton.classList.add('clicked');
    
    // Remove animation class after animation completes
    setTimeout(function() {
        clickButton.classList.remove('clicked');
    }, 600);
    
    // Add fun messages based on click count
    if (clickCount === 1) {
        showMessage('Great! You clicked the button! 🎉', 'info');
    } else if (clickCount === 5) {
        showMessage('Wow! 5 clicks already! 🌟', 'info');
    } else if (clickCount === 10) {
        showMessage('Double digits! Keep going! 🚀', 'info');
    } else if (clickCount === 25) {
        showMessage('You are on fire! 🔥', 'info');
    } else if (clickCount === 50) {
        showMessage('Half century! Amazing! 🎊', 'info');
    } else if (clickCount === 100) {
        showMessage('100 clicks! You are a champion! 🏆', 'info');
    }
});

// Function to show temporary messages
function showMessage(message, type) {
    type = type || 'info';
    
    // Determine background color based on type
    var backgroundColor;
    var textColor;
    
    switch(type) {
        case 'success':
            backgroundColor = 'rgba(46, 204, 113, 0.95)';
            textColor = '#ffffff';
            break;
        case 'error':
            backgroundColor = 'rgba(231, 76, 60, 0.95)';
            textColor = '#ffffff';
            break;
        case 'info':
        default:
            backgroundColor = 'rgba(255, 255, 255, 0.95)';
            textColor = '#667eea';
            break;
    }
    
    // Create message element
    var messageEl = document.createElement('p');
    messageEl.className = 'message';
    messageEl.textContent = message;
    messageEl.style.cssText = '
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ' + backgroundColor + ';
        color: ' + textColor + ';
        padding: 1rem 2rem;
        border-radius: 25px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        font-weight: 600;
        font-size: 1.1rem;
        z-index: 1000;
        animation: slideDown 0.5s ease-out;
        max-width: 90%;
        text-align: center;
    ';
    
    // Add to body
    document.body.appendChild(messageEl);
    
    // Remove after 3 seconds
    setTimeout(function() {
        messageEl.style.animation = 'slideUp 0.5s ease-out';
        setTimeout(function() {
            document.body.removeChild(messageEl);
        }, 500);
    }, 3000);
}

// Add additional animations to CSS dynamically
var style = document.createElement('style');
style.textContent = '
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
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
';
document.head.appendChild(style);

// Log initialization
console.log('AI Agent Playground initialized! 🤖');
console.log('Fill in the login form to get started! ✨');