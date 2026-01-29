/* ==========================================================
   1. SYSTEM CLOCK & DATE LOGIC
   ========================================================== */
function updateClock() {
    const clock = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    if (!clock || !dateElement) return;

    const now = new Date();
    // 24-hour format for that clean tech look
    clock.innerText = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
    });
    
    // Full date display
    dateElement.innerText = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Update every second to keep the lock screen accurate
setInterval(updateClock, 1000);
updateClock();

/* ==========================================================
   2. PIN AUTHENTICATION LOGIC
   ========================================================== */
let enteredPin = "";
const correctPin = "1111"; 

function inputPin(num) {
    if (enteredPin.length < 4) {
        enteredPin += num;
        updateDots();
        if (enteredPin.length === 4) {
            // Short delay so she sees the 4th dot fill before validating
            setTimeout(validatePin, 200);
        }
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('filled', idx < enteredPin.length);
    });
}

function deletePin() {
    enteredPin = enteredPin.slice(0, -1);
    updateDots();
}

function validatePin() {
    if (enteredPin === correctPin) {
        unlockSequence();
    } else {
        // Visual shake feedback for incorrect PIN
        const drawer = document.getElementById('login-drawer');
        if (drawer) {
            drawer.classList.add('shake');
            setTimeout(() => {
                drawer.classList.remove('shake');
                enteredPin = "";
                updateDots();
            }, 400);
        }
    }
}

function unlockSequence() {
    const drawer = document.getElementById('login-drawer');
    const lock = document.getElementById('lock-screen');
    
    if (drawer && lock) {
        // 1. Play slide animations
        drawer.style.bottom = "-100%";
        lock.style.transform = "translateY(-100%)";
        
        // 2. Smoothly transition to the home screen file
        setTimeout(() => {
            document.body.style.opacity = "0";
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 300);
        }, 600);
    }
}

/* ==========================================================
   3. DRAWER & NAVIGATION CONTROLS
   ========================================================== */
function openDrawer() { 
    const drawer = document.getElementById('login-drawer');
    if (drawer) drawer.classList.add('active'); 
}

function closeDrawer() { 
    const drawer = document.getElementById('login-drawer');
    if (drawer) {
        drawer.classList.remove('active'); 
        enteredPin = ""; 
        updateDots();
    }
}

// Trigger drawer on click/tap of the swipe area
const swipeTrigger = document.getElementById('swipe-trigger');
if (swipeTrigger) {
    swipeTrigger.addEventListener('click', openDrawer);
}

function launchApp(url) {
    // 1. Start the fade out
    document.body.style.transition = "opacity 0.5s ease-in-out";
    document.body.style.opacity = "0";

    // 2. Wait for the fade before changing the page
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}

/* ==========================================================
   REFINED NO-BUTTON LOGIC (7-Spot Jitter Edition)
   ========================================================== */
// Use a function to initialize so we can call it when the question shows
function initNoButton() {
    const noBtn = document.getElementById('noButton');
    const sandbox = document.getElementById('no-button-sandbox');
    const yesBtn = document.getElementById('yesButton');
    // New way - specifically looks for the GIF inside the question section
    const questionSection = document.getElementById('question-section');
    const mainGif = questionSection ? questionSection.querySelector('img') : null;

    // Store the original GIF source at the start
    const originalGif = "https://media.tenor.com/ivKWdfdbV3EAAAAi/goma-goma-cat.gif";
    const sadGif = "sad.png";

    if (!noBtn || !sandbox) return;

    let isDetached = false;
    let sadGifTimer = null;

    noBtn.addEventListener('mouseover', () => {
        // 1. Swap to Sad GIF
        if (mainGif) {
            mainGif.src = sadGif;

            // Clear any existing timer
            if (sadGifTimer) {
                clearTimeout(sadGifTimer);
            }

            // 2. Schedule revert back to original after 350ms
            sadGifTimer = setTimeout(() => {
                mainGif.src = originalGif;
                sadGifTimer = null;
            }, 350);
        }

        // 3. Detach logic (keeping it beside Yes initially)
        if (!isDetached) {
            const currentRect = noBtn.getBoundingClientRect();
            const sandboxRect = sandbox.getBoundingClientRect();

            sandbox.appendChild(noBtn);
            noBtn.style.position = 'absolute';
            
            // Lock initial absolute position to current relative coordinates
            noBtn.style.left = `${currentRect.left - sandboxRect.left}px`;
            noBtn.style.top = `${currentRect.top - sandboxRect.top}px`;
            
            isDetached = true;
        }

        // 4. Random Jump Logic
        const rect = sandbox.getBoundingClientRect();
        const maxX = rect.width - noBtn.offsetWidth;
        const maxY = rect.height - noBtn.offsetHeight;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        // 5. Grow the Yes button
        if (yesBtn) {
            const currentScale = parseFloat(yesBtn.style.transform.replace('scale(', '')) || 1;
            yesBtn.style.transform = `scale(${currentScale + 0.15})`;
        }
    });
}

// Ensure the listener is ready
document.addEventListener('DOMContentLoaded', initNoButton);

function showQuestion() {
    const letter = document.getElementById('letter-section'); // Changed from intro
    const question = document.getElementById('question-section');
    
    if (letter && question) {
        letter.style.opacity = '0';
        setTimeout(() => {
            letter.style.display = 'none';
            question.style.display = 'block';
            question.style.opacity = '0';
            setTimeout(() => {
                question.style.opacity = '1';
                question.classList.add('section-enter');
                initNoButton(); 
            }, 10);
        }, 500);
    }
}

// Ensure the listener is ready
document.addEventListener('DOMContentLoaded', initNoButton);

function showQuestion() {
    const letter = document.getElementById('letter-section'); // Changed from intro
    const question = document.getElementById('question-section');
    
    if (letter && question) {
        letter.style.opacity = '0';
        setTimeout(() => {
            letter.style.display = 'none';
            question.style.display = 'block';
            question.style.opacity = '0';
            setTimeout(() => {
                question.style.opacity = '1';
                question.classList.add('section-enter');
                initNoButton(); 
            }, 10);
        }, 500);
    }
}

function celebrate() {
    const question = document.getElementById('question-section');
    const celebration = document.getElementById('celebration-section');
    const noBtn = document.getElementById('noButton');
    
    // Hide the No button immediately
    if (noBtn) {
        noBtn.style.display = 'none';
    }
    
    if (question && celebration) {
        // 1. Fade out question
        question.style.opacity = '0';
        question.style.pointerEvents = 'none';

        setTimeout(() => {
            question.style.display = 'none';
            
            // 2. Prepare and fade in celebration
            celebration.style.display = 'block';
            celebration.style.opacity = '0';
            
            // Trigger reflow for animation
            setTimeout(() => {
                celebration.style.opacity = '1';
                celebration.classList.add('section-enter');
            }, 10);
        }, 500);
    }
}

/* ==========================================================
   5. FLOATING EMOJI BACKGROUND
   ========================================================== */
const emojis = ['❤️', '💖', '✨', '🌸', '💕', '🦖', '🐶', '🧸', '😘', '♾️'];

function createEmoji() {
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');
    
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + "vw";
    
    const duration = Math.random() * 7 + 7; 
    emoji.style.animationDuration = duration + "s";
    emoji.style.fontSize = Math.random() * 20 + 10 + "px";

    document.body.appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    }, duration * 1000);
}

// Start the loop only on letter.html (check if valentine-card exists)
if (document.getElementById('valentine-card')) {
    setInterval(createEmoji, 500);
}

/* ==========================================================
   6. GLOBAL FADE-IN LOGIC
   ========================================================== */
window.addEventListener('DOMContentLoaded', () => {
    // Small timeout ensures the browser has rendered the initial 0 opacity
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 50);
});

function showLetter() {
    playMusic();
    const intro = document.getElementById('intro-section');
    const letter = document.getElementById('letter-section');
    
    if (intro && letter) {
        intro.style.opacity = '0';
        setTimeout(() => {
            intro.style.display = 'none';
            letter.style.display = 'block';
            letter.style.opacity = '0';
            setTimeout(() => {
                letter.style.opacity = '1';
                letter.classList.add('section-enter');
            }, 10);
        }, 500);
    }
}

let score = 0;
let gameInterval;

function showGame() {
    const letter = document.getElementById('letter-section');
    const game = document.getElementById('game-section');
    
    if (letter && game) {
        // 1. Exit Animation for Letter
        letter.classList.add('section-exit');
        
        setTimeout(() => {
            letter.style.display = 'none';
            
            // 2. Prepare Game Section
            game.style.display = 'block';
            game.style.opacity = '0';
            
            setTimeout(() => {
                // 3. Enter Animation for Game
                game.classList.remove('section-exit');
                game.classList.add('section-enter');
                startGame();
            }, 10);
        }, 500);
    }
}

function startGame() {
    score = 0;
    document.getElementById('score').innerText = score;
    gameInterval = setInterval(spawnHeart, 400);
}

/* ==========================================================
   UPDATED GAME LOGIC: CATS, DOGS, AND HEARTS
   ========================================================== */
function spawnHeart() {
    const canvas = document.getElementById('game-canvas');
    if (!canvas) return;

    const item = document.createElement('div');
    item.className = 'falling-heart';
    
    // 1. Randomly decide what type of item spawns
    // 30% chance for heart, 70% chance for cat/dog
    const randomType = Math.random();
    let type = 'distraction';
    
    if (randomType < 0.3) {
        item.innerHTML = '❤️';
        type = 'heart';
    } else {
        const distractions = ['🐱', '🐶', '🐈', '🐕', '🐩', '🐾'];
        item.innerHTML = distractions[Math.floor(Math.random() * distractions.length)];
    }

    item.style.left = Math.random() * (canvas.clientWidth - 40) + 'px';
    item.style.top = '-50px';
    canvas.appendChild(item);

    item.style.animation = `spin ${Math.random() * 3 + 2}s linear infinite`;
    // 2. Animate falling
    let pos = -50;
    const fallSpeed = 2 + Math.random() * 4;
    
    const fallInterval = setInterval(() => {
        pos += fallSpeed;
        item.style.top = pos + 'px';

        if (pos > canvas.clientHeight) {
            clearInterval(fallInterval);
            item.remove();
        }
    }, 20);

    // 3. Click Logic
    item.onclick = () => {
        if (type === 'heart') {
            score++;
            document.getElementById('score').innerText = score;
            item.style.transform = 'scale(2)'; // Visual feedback for catch
            item.style.opacity = '0';
            
            if (score >= 11) {
                clearInterval(gameInterval);
                document.querySelectorAll('.falling-heart').forEach(el => el.remove());
                finishGame();
            }
        } else {
            // Shake effect for clicking a distraction
            item.style.animation = 'shake 0.3s ease-in-out';
            setTimeout(() => item.style.animation = '', 300);
        }
        
        // Remove item after click
        setTimeout(() => {
            clearInterval(fallInterval);
            item.remove();
        }, 100);
    };
}

function finishGame() {
    const game = document.getElementById('game-section');
    const question = document.getElementById('question-section');
    
    if (game && question) {
        // 1. Apply the exit animation to the game section
        game.classList.add('section-exit');
        
        // 2. Wait for the exit animation (500ms) to finish
        setTimeout(() => {
            game.style.display = 'none';
            
            // 3. Prepare the question section but keep it invisible
            question.style.display = 'block';
            question.style.opacity = '0';
            
            // 4. Trigger the entry animation
            setTimeout(() => {
                question.classList.remove('section-exit');
                question.classList.add('section-enter');
                initNoButton(); // Initialize the moving "No" button logic
            }, 10);
        }, 500);
    }
}

/* ==========================================================
   FINAL STABLE MUSIC LOGIC
   ========================================================== */
const bgMusic = new Audio('passenger-seat.mp3'); 
bgMusic.loop = true;
bgMusic.volume = 0.15; 

let isMuted = false;

// Global function for the HTML buttons to call
window.playMusic = function() {
    bgMusic.play().then(() => {
        console.log("Audio started successfully");
    }).catch(err => {
        console.log("Audio blocked by browser. Need a user click first.");
    });
};

window.toggleMute = function() {
    // This targets the emoji inside the span for your specific HTML structure
    const muteIconSpan = document.querySelector('.mute-toggle .nav-icon span');
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    
    if (muteIconSpan) {
        muteIconSpan.innerText = isMuted ? '🔈' : '🔊';
    }
};

// CRITICAL: This ensures any click on the page (PIN, swipe, buttons) starts the music
document.addEventListener('click', () => {
    window.playMusic();

}, { once: true });
