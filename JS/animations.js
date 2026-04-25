// --- Typewriter Animation ---
export function initTypewriter(element, text, speed = 60, delay = 0) {
    if (!element) return;
    element.innerHTML = '';
    let i = 0;
    
    setTimeout(() => {
        function typeWriter() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    }, delay);
}

// --- Counting Number Animation ---
export function initCountingNumbers(duration = 1500) {
    const elements = document.querySelectorAll('.counting-number');
    
    elements.forEach(el => {
        const targetValueStr = el.innerText.trim();
        const isPercentage = targetValueStr.includes('%');
        const isHash = targetValueStr.includes('#');
        const target = parseFloat(targetValueStr.replace(/[^0-9.]/g, ''));
        
        if (isNaN(target)) return;
        
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutQuart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            
            const current = Math.floor(easeProgress * target);
            
            let displayValue = current.toString();
            if (isPercentage) displayValue += '%';
            if (isHash) displayValue = '#' + displayValue;
            
            el.innerText = displayValue;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.innerText = targetValueStr; // ensure exact final value
            }
        };
        
        window.requestAnimationFrame(step);
    });
}

// --- Tilt Card Animation ---
export function initTiltCard() {
    const cards = document.querySelectorAll('.tilt-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate tilt (max 8 degrees)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = ((y - centerY) / centerY) * -8;
            const tiltY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            
            // Update custom properties for shine effect
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });
}

// --- Spotlight Animation ---
export function initSpotlight() {
    const containers = document.querySelectorAll('.spotlight-btn');
    
    containers.forEach(container => {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            container.style.setProperty('--mouse-x', `${x}px`);
            container.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// --- Glare Card Animation ---
export function initGlare() {
    const cards = document.querySelectorAll('.glare-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // For glare translation relative to mouse position
            const moveX = (x / rect.width) * 200 - 100; // -100 to 100%
            const moveY = (y / rect.height) * 200 - 100;
            
            card.style.setProperty('--mouse-x', `${moveX}%`);
            card.style.setProperty('--mouse-y', `${moveY}%`);
        });
    });
}

// --- Confetti Animation ---
export function triggerConfetti() {
    const container = document.createElement('div');
    container.classList.add('confetti-container');
    document.body.appendChild(container);
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Randomize position and animation properties
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(confetti);
    }
    
    // Remove container after animations complete
    setTimeout(() => {
        container.remove();
    }, 6000);
}

// --- Offline Detection ---
export function setupOfflineDetection() {
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'offline-overlay';
    overlay.innerHTML = `
        <i class="fa-solid fa-wifi fa-slash offline-icon" style="font-size: 64px; color: white;"></i>
        <h2>No Internet Connection</h2>
        <p>Please check your network and try again.</p>
    `;
    
    // Ensure we don't duplicate
    if (!document.querySelector('.offline-overlay')) {
        document.body.appendChild(overlay);
    }

    const updateStatus = () => {
        const el = document.querySelector('.offline-overlay');
        if (el) {
            if (!navigator.onLine) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        }
    };

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    
    // Initial check
    updateStatus();
}
