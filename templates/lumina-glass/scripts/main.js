/**
 * LUMINA GLASS - Main JavaScript
 * Elegant Floral Wedding Template
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initOpenInvitation();
    initScrollReveal();
    initCountdownTimer();
    initRSVPForm();
    initCopyButtons();
    initFloatingPetals();
    initMusicPlayer();
});

/**
 * Preloader Handler
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 2500);
    });
}

/**
 * Open Invitation Handler
 */
function initOpenInvitation() {
    const openBtn = document.getElementById('openInvitation');
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('mainContent');

    if (openBtn && cover && mainContent) {
        openBtn.addEventListener('click', () => {
            // Animate cover out
            cover.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            cover.style.opacity = '0';
            cover.style.transform = 'translateY(-30px)';

            setTimeout(() => {
                cover.style.display = 'none';
                mainContent.classList.remove('hidden');

                // Smooth scroll to first section
                const bismillah = document.getElementById('bismillah');
                if (bismillah) {
                    bismillah.scrollIntoView({ behavior: 'smooth' });
                }

                // Trigger reveal animations
                setTimeout(() => {
                    const reveals = document.querySelectorAll('.reveal');
                    reveals.forEach(el => {
                        if (isElementInViewport(el)) {
                            el.classList.add('active');
                        }
                    });
                }, 300);
            }, 800);
        });
    }
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
    );
}

/**
 * Scroll Reveal Animations
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/**
 * Countdown Timer
 */
function initCountdownTimer() {
    const timerContainer = document.getElementById('countdownTimer');
    if (!timerContainer) return;

    // Set wedding date (February 14, 2025)
    const weddingDate = new Date('2025-02-14T08:00:00').getTime();

    // Create timer elements
    timerContainer.innerHTML = `
        <div class="timer-item">
            <div class="timer-value" id="days">00</div>
            <div class="timer-label">Days</div>
        </div>
        <div class="timer-item">
            <div class="timer-value" id="hours">00</div>
            <div class="timer-label">Hours</div>
        </div>
        <div class="timer-item">
            <div class="timer-value" id="minutes">00</div>
            <div class="timer-label">Minutes</div>
        </div>
        <div class="timer-item">
            <div class="timer-value" id="seconds">00</div>
            <div class="timer-label">Seconds</div>
        </div>
    `;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        } else {
            // Wedding day has arrived!
            timerContainer.innerHTML = `
                <div class="timer-item" style="min-width: 100%;">
                    <div class="timer-value" style="font-size: 2rem;">🎉 Today is the Day! 🎉</div>
                </div>
            `;
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/**
 * RSVP Form Handler
 */
function initRSVPForm() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = '✓ Thank You!';
            submitBtn.style.background = 'var(--color-gold)';
            submitBtn.style.color = 'var(--color-bg-dark)';

            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
            }, 3000);
        }, 1500);
    });
}

/**
 * Copy Button Handler
 */
function initCopyButtons() {
    const copyBtns = document.querySelectorAll('.btn-copy');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.classList.add('copied');

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        });
    });
}

/**
 * Floating Petals Animation
 */
function initFloatingPetals() {
    const container = document.getElementById('floatingPetals');
    if (!container) return;

    const petalCount = 20;

    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';

        // Random positioning
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (10 + Math.random() * 10) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;

        // Random size
        const size = 10 + Math.random() * 15;
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';

        container.appendChild(petal);

        // Remove and recreate after animation
        setTimeout(() => {
            petal.remove();
            createPetal();
        }, 20000);
    }

    // Create initial petals
    for (let i = 0; i < petalCount; i++) {
        setTimeout(() => createPetal(), i * 300);
    }
}

/**
 * Music Player
 */
function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const audio = new Audio('assets/music/wedding-song.mp3');
    audio.loop = true;

    let isPlaying = false;

    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                musicToggle.classList.remove('playing');
                musicToggle.querySelector('.music-icon').textContent = '🎵';
            } else {
                audio.play().catch(err => {
                    console.log('Audio play failed:', err);
                });
                musicToggle.classList.add('playing');
                musicToggle.querySelector('.music-icon').textContent = '🔊';
            }
            isPlaying = !isPlaying;
        });
    }
}

/**
 * Get guest name from URL parameter
 */
function getGuestNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to') || urlParams.get('guest');

    if (guestName) {
        const guestNameElement = document.getElementById('guestName');
        if (guestNameElement) {
            guestNameElement.textContent = decodeURIComponent(guestName);
        }
    }
}

// Initialize guest name on load
document.addEventListener('DOMContentLoaded', getGuestNameFromURL);
