// Button click functionality
let clickCount = 0;

const button = document.getElementById('clickButton');
const counter = document.getElementById('clickCounter');

button.addEventListener('click', function() {
    // Increment counter
    clickCount++;
    
    // Add animation class
    button.classList.add('clicked');
    
    // Update counter text
    counter.textContent = `Button clicked ${clickCount} ${clickCount === 1 ? 'time' : 'times'}!`;
    counter.classList.add('show');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 500);
    
    // Optional: Log to console
    console.log(`Button clicked! Total clicks: ${clickCount}`);
});