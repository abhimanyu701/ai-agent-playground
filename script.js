// Check authentication status
function checkAuthentication() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const sessionUser = sessionStorage.getItem('currentUser');
    const rememberedUser = localStorage.getItem('currentUser');
    
    if (isLoggedIn !== 'true' || (!sessionUser && !rememberedUser)) {
        // Redirect to login page
        window.location.href = 'login.html';
        return false;
    }
    
    // Show logout button and display username
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.style.display = 'block';
        const username = sessionUser || rememberedUser;
        console.log(`Welcome back, ${username}! 👋`);
    }
    
    return true;
}

// Handle logout
function handleLogout() {
    // Clear authentication data
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('currentUser');
    // Keep remembered username if "Remember me" was checked
    // localStorage.removeItem('currentUser'); // Uncomment to clear remembered username
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Initialize authentication check
if (!checkAuthentication()) {
    // Stop script execution if not authenticated
    throw new Error('Authentication required');
}

// Initialize click counter
let clickCount = 0;

// Get DOM elements
const clickButton = document.getElementById('clickButton');
const clickCounter = document.getElementById('clickCounter');
const logoutButton = document.getElementById('logoutButton');

// Logout button event listener
if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
}

// Button click event handler
clickButton.addEventListener('click', function() {
    // Increment counter
    clickCount++;
    
    // Update counter display
    clickCounter.textContent = `Clicks: ${clickCount}`;
    
    // Add animation class
    clickButton.classList.add('clicked');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        clickButton.classList.remove('clicked');
    }, 600);
    
    // Add fun messages based on click count
    if (clickCount === 1) {
        showMessage('Great! You clicked the button! 🎉');
    } else if (clickCount === 5) {
        showMessage('Wow! 5 clicks already! 🌟');
    } else if (clickCount === 10) {
        showMessage('Double digits! Keep going! 🚀');
    } else if (clickCount === 25) {
        showMessage('You\'re on fire! 🔥');
    } else if (clickCount === 50) {
        showMessage('Half century! Amazing! 🎊');
    } else if (clickCount === 100) {
        showMessage('100 clicks! You\'re a champion! 🏆');
    }
});

// Function to show temporary messages
function showMessage(message) {
    // Create message element
    const messageEl = document.createElement('p');
    messageEl.className = 'message';
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.95);
        color: #667eea;
        padding: 1rem 2rem;
        border-radius: 25px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        font-weight: 600;
        font-size: 1.1rem;
        z-index: 1000;
        animation: slideDown 0.5s ease-out;
    `;
    
    // Add to body
    document.body.appendChild(messageEl);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideUp 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 500);
    }, 3000);
}

// Add additional animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);

// Log initialization
console.log('AI Agent Playground initialized! 🤖');
console.log('Click the button to see the magic happen! ✨');