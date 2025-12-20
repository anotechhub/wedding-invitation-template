/**
 * Premium Wedding Invitation - Main JavaScript
 * Handles all interactive features: transitions, music, gallery, animations
 */

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    // Wedding Date (Year, Month (0-indexed), Day, Hour, Minute)
    weddingDate: new Date(2025, 1, 14, 8, 0, 0),

    // Gallery Images
    galleryImages: [
        'assets/images/gallery-1.jpg',
        'assets/images/gallery-2.jpg',
        'assets/images/gallery-3.jpg',
        'assets/images/gallery-4.jpg',
        'assets/images/gallery-5.jpg',
        'assets/images/gallery-6.jpg'
    ],

    // Music
    musicAutoPlay: true,

    // Animation
    revealThreshold: 0.15,
    revealRootMargin: '0px 0px -50px 0px'
};

// ============================================
// DOM ELEMENTS
// ============================================
const DOM = {
    // Preloader
    preloader: document.getElementById('preloader'),

    // Cover
    cover: document.getElementById('cover'),
    btnOpenInvitation: document.getElementById('btnOpenInvitation'),

    // Main Content
    mainContent: document.getElementById('mainContent'),

    // Countdown
    countDays: document.getElementById('countDays'),
    countHours: document.getElementById('countHours'),
    countMinutes: document.getElementById('countMinutes'),
    countSeconds: document.getElementById('countSeconds'),

    // Music
    musicPlayer: document.getElementById('musicPlayer'),
    musicToggle: document.getElementById('musicToggle'),
    bgMusic: document.getElementById('bgMusic'),

    // Gallery
    galleryItems: document.querySelectorAll('.gallery-item'),
    lightbox: document.getElementById('lightbox'),
    lightboxImage: document.getElementById('lightboxImage'),
    lightboxClose: document.getElementById('lightboxClose'),
    lightboxPrev: document.getElementById('lightboxPrev'),
    lightboxNext: document.getElementById('lightboxNext'),
    lightboxCounter: document.getElementById('lightboxCounter'),

    // RSVP
    rsvpForm: document.getElementById('rsvpForm'),

    // Gift
    btnCopy: document.querySelectorAll('.btn-copy'),

    // Toast
    toast: document.getElementById('toast'),

    // Reveal Elements
    revealElements: document.querySelectorAll('.reveal'),

    // Back to Home
    btnBackToHome: document.getElementById('btnBackToHome')
};

// ============================================
// STATE
// ============================================
let state = {
    isInvitationOpened: false,
    isMusicPlaying: false,
    currentGalleryIndex: 0,
    countdownInterval: null,
    isLightboxOpen: false
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
function padZero(num) {
    return num.toString().padStart(2, '0');
}

function showToast(message) {
    const toastMessage = DOM.toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    DOM.toast.classList.add('active');

    setTimeout(() => {
        DOM.toast.classList.remove('active');
    }, 3000);
}

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Nomor rekening berhasil disalin!');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        showToast('Nomor rekening berhasil disalin!');
    } catch (err) {
        showToast('Gagal menyalin nomor rekening');
    }

    document.body.removeChild(textarea);
}

// ============================================
// PRELOADER
// ============================================
function initPreloader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            DOM.preloader.classList.add('hidden');
        }, 1500);
    });
}

// ============================================
// OPEN INVITATION TRANSITION
// ============================================
function initOpenInvitation() {
    const handleOpen = (e) => {
        // Allow click on button or within button (icon/text)
        if (e.target.closest('#btnOpenInvitation')) {
            if (state.isInvitationOpened) return;
            state.isInvitationOpened = true;

            console.log('Invitation opened');

            // IMMEDIATE ACTION: Enable scrolling
            document.body.classList.remove('no-scroll');

            // Hide cover with smooth transition
            DOM.cover.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s ease';
            DOM.cover.style.transform = 'translateY(-100%)';
            DOM.cover.style.opacity = '0';

            // Show main content
            setTimeout(() => {
                DOM.mainContent.classList.add('visible');
                DOM.cover.style.display = 'none';

                // Start music
                if (CONFIG.musicAutoPlay) {
                    playMusic();
                }

                // Initialize reveal animations
                initRevealAnimations();
            }, 500);
        }
    };

    // Direct listener
    DOM.btnOpenInvitation.addEventListener('click', handleOpen);

    // Fallback document listener to catch bubbled events if z-index is still tricky
    document.addEventListener('click', handleOpen);

    // Prevent scrolling before invitation is opened
    document.body.classList.add('no-scroll');

    // Touch event handling for mobile to be super responsive
    DOM.btnOpenInvitation.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent double firing
        handleOpen({ target: DOM.btnOpenInvitation });
    }, { passive: false });
}

// ============================================
// COUNTDOWN TIMER
// ============================================
function startCountdown() {
    function updateCountdown() {
        const now = new Date().getTime();
        const target = CONFIG.weddingDate.getTime();
        const difference = target - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            DOM.countDays.textContent = padZero(days);
            DOM.countHours.textContent = padZero(hours);
            DOM.countMinutes.textContent = padZero(minutes);
            DOM.countSeconds.textContent = padZero(seconds);
        } else {
            // Wedding day has arrived
            DOM.countDays.textContent = '00';
            DOM.countHours.textContent = '00';
            DOM.countMinutes.textContent = '00';
            DOM.countSeconds.textContent = '00';

            if (state.countdownInterval) {
                clearInterval(state.countdownInterval);
            }
        }
    }

    // Initial update
    updateCountdown();

    // Update every second
    state.countdownInterval = setInterval(updateCountdown, 1000);
}

// ============================================
// MUSIC PLAYER
// ============================================
function playMusic() {
    const playPromise = DOM.bgMusic.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            state.isMusicPlaying = true;
            DOM.musicPlayer.classList.add('playing');
            DOM.musicToggle.classList.add('playing');
        }).catch((error) => {
            console.log('Auto-play prevented:', error);
            state.isMusicPlaying = false;
            DOM.musicPlayer.classList.remove('playing');
            DOM.musicToggle.classList.remove('playing');
        });
    }
}

function toggleMusic() {
    if (state.isMusicPlaying) {
        DOM.bgMusic.pause();
        state.isMusicPlaying = false;
        DOM.musicPlayer.classList.remove('playing');
        DOM.musicToggle.classList.remove('playing');
    } else {
        playMusic();
    }
}

function initMusicPlayer() {
    DOM.musicToggle.addEventListener('click', toggleMusic);

    // Handle music end
    DOM.bgMusic.addEventListener('ended', () => {
        state.isMusicPlaying = false;
        DOM.musicPlayer.classList.remove('playing');
        DOM.musicToggle.classList.remove('playing');
    });
}

// ============================================
// GALLERY LIGHTBOX
// ============================================
function openLightbox(index) {
    state.currentGalleryIndex = index;
    state.isLightboxOpen = true;

    updateLightboxImage();
    DOM.lightbox.classList.add('active');
    document.body.classList.add('no-scroll');
}

function closeLightbox() {
    state.isLightboxOpen = false;
    DOM.lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

function updateLightboxImage() {
    const imageSrc = CONFIG.galleryImages[state.currentGalleryIndex];
    DOM.lightboxImage.src = imageSrc;
    DOM.lightboxCounter.textContent = `${state.currentGalleryIndex + 1} / ${CONFIG.galleryImages.length}`;
}

function prevImage() {
    state.currentGalleryIndex = (state.currentGalleryIndex - 1 + CONFIG.galleryImages.length) % CONFIG.galleryImages.length;
    updateLightboxImage();
}

function nextImage() {
    state.currentGalleryIndex = (state.currentGalleryIndex + 1) % CONFIG.galleryImages.length;
    updateLightboxImage();
}

function initGallery() {
    // Click on gallery items
    DOM.galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    // Close lightbox
    DOM.lightboxClose.addEventListener('click', closeLightbox);

    // Navigation
    DOM.lightboxPrev.addEventListener('click', prevImage);
    DOM.lightboxNext.addEventListener('click', nextImage);

    // Close on background click
    DOM.lightbox.addEventListener('click', (e) => {
        if (e.target === DOM.lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!state.isLightboxOpen) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    DOM.lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    DOM.lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
    }
}

// ============================================
// REVEAL ANIMATIONS
// ============================================
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: CONFIG.revealThreshold,
        rootMargin: CONFIG.revealRootMargin
    });

    DOM.revealElements.forEach((el) => {
        observer.observe(el);
    });
}

// ============================================
// RSVP FORM
// ============================================
function initRSVPForm() {
    if (!DOM.rsvpForm) return;

    DOM.rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(DOM.rsvpForm);
        const data = {
            name: formData.get('name'),
            attendance: formData.get('attendance'),
            guests: formData.get('guests'),
            message: formData.get('message')
        };

        // Here you would typically send this data to a backend
        console.log('RSVP Data:', data);

        // Show success message
        showToast('Terima kasih! Konfirmasi Anda telah diterima.');

        // Reset form
        DOM.rsvpForm.reset();
    });
}

// ============================================
// COPY TO CLIPBOARD
// ============================================
function initCopyButtons() {
    DOM.btnCopy.forEach((btn) => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.dataset.copy;
            copyToClipboard(textToCopy);
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// BACK TO HOME / TOP BUTTON
// ============================================
function initBackToHome() {
    if (!DOM.btnBackToHome) return;

    DOM.btnBackToHome.addEventListener('click', () => {
        // Smooth scroll to top of main content (bismillah section)
        const bismillahSection = document.getElementById('bismillah');
        if (bismillahSection) {
            bismillahSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            // Fallback: scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    const floatingElements = document.querySelectorAll('.floating-leaf, .floating-petal');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        floatingElements.forEach((el, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrollY * speed;
            el.style.transform = `translateY(${yPos}px) rotate(${yPos * 0.1}deg)`;
        });
    }, { passive: true });
}

// ============================================
// IMAGE LAZY LOADING WITH PLACEHOLDER
// ============================================
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach((img) => {
        // Add loading class
        img.classList.add('lazy-loading');

        img.addEventListener('load', () => {
            img.classList.remove('lazy-loading');
            img.classList.add('lazy-loaded');
        });

        img.addEventListener('error', () => {
            // Set placeholder on error
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNGN0U3Q0UiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNjAiIHI9IjYwIiBmaWxsPSIjRDRBRjM3IiBmaWxsLW9wYWNpdHk9IjAuMyIvPjxwYXRoIGQ9Ik0xMjAgMjgwSDI4MEwyNDAgMjIwTDIwMCAyNjBMMTYwIDIyMEwxMjAgMjgwWiIgZmlsbD0iI0Q0QUYzNyIgZmlsbC1vcGFjaXR5PSIwLjMiLz48L3N2Zz4=';
            img.classList.remove('lazy-loading');
        });
    });
}

// ============================================
// PREVENT RIGHT CLICK ON IMAGES
// ============================================
function initImageProtection() {
    document.querySelectorAll('img').forEach((img) => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });
}

// ============================================
// INITIALIZE ALL MODULES
// ============================================
function init() {
    initPreloader();
    initOpenInvitation();
    initMusicPlayer();
    initGallery();
    initRSVPForm();
    initCopyButtons();
    initSmoothScroll();
    initBackToHome();
    initParallax();
    initStoryTimeline(); // Initialize Story Timeline
    initImageLazyLoading();
    initImageProtection();

    // Start countdown immediately
    startCountdown();
}

// ============================================
// STORY TIMELINE ANIMATION
// ============================================
function initStoryTimeline() {
    const timelineContainer = document.querySelector('.story-timeline-container');
    const progressBar = document.querySelector('.timeline-progress');

    if (!timelineContainer || !progressBar) return;

    window.addEventListener('scroll', () => {
        const containerRect = timelineContainer.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const windowHeight = window.innerHeight;

        // Calculate progress based on how much of the container has been scrolled past proper visual point
        // Start filling when container enters middle of screen

        let progress = 0;
        const startOffset = windowHeight / 2;

        // Distance from top of container to the "trigger point" (center of screen)
        // If container top is at center screen, progress starts.
        // Screen Center = windowHeight / 2
        // Container Top relative to viewport = containerTop
        // Scrolled amount relative to container = (windowHeight / 2) - containerTop

        const scrolled = (windowHeight / 2) - containerTop;

        if (scrolled > 0) {
            progress = (scrolled / containerHeight) * 100;
        }

        // Clamp between 0 and 100
        progress = Math.max(0, Math.min(100, progress));

        progressBar.style.height = `${progress}%`;
    }, { passive: true });
}

// Start the application
document.addEventListener('DOMContentLoaded', init);

// ============================================
// SERVICE WORKER REGISTRATION (Optional for PWA)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}
