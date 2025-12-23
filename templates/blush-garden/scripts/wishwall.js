// Wish Wall / Guest Book functionality
document.addEventListener('DOMContentLoaded', function () {
    const wishForm = document.getElementById('wishForm');
    const wishWall = document.getElementById('wishWall');
    const wishMessage = document.getElementById('wishMessage');
    const charCount = document.querySelector('.char-count');

    // Character counter for wish message
    if (wishMessage && charCount) {
        wishMessage.addEventListener('input', function () {
            const length = this.value.length;
            charCount.textContent = `${length}/500`;

            if (length > 450) {
                charCount.style.color = '#dc3545';
            } else {
                charCount.style.color = '#6c757d';
            }
        });
    }

    // Load and display existing wishes
    displayWishes();

    if (wishForm) {
        wishForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const wishData = {
                name: document.getElementById('wishName').value.trim(),
                message: document.getElementById('wishMessage').value.trim(),
                timestamp: new Date().toISOString(),
                likes: 0,
                id: Date.now().toString()
            };

            // Validate
            if (!wishData.name || !wishData.message) {
                showWishToast('Mohon isi nama dan ucapan', 'error');
                return;
            }

            if (wishData.message.length < 10) {
                showWishToast('Ucapan minimal 10 karakter', 'error');
                return;
            }

            // Save wish
            saveWish(wishData);

            // Show success
            showWishToast('Terima kasih atas ucapan dan doa nya! 💝');

            // Reset form
            wishForm.reset();

            // Refresh display
            displayWishes();
        });
    }

    function saveWish(wish) {
        const wishes = JSON.parse(localStorage.getItem('weddingWishes') || '[]');
        wishes.unshift(wish); // Add to beginning
        localStorage.setItem('weddingWishes', JSON.stringify(wishes));
    }

    function displayWishes() {
        if (!wishWall) return;

        const wishes = JSON.parse(localStorage.getItem('weddingWishes') || '[]');

        if (wishes.length === 0) {
            wishWall.innerHTML = `
                <div class="no-wishes">
                    <p>Belum ada ucapan. Jadilah yang pertama! 💌</p>
                </div>
            `;
            return;
        }

        wishWall.innerHTML = wishes.map(wish => createWishCard(wish)).join('');

        // Add like button listeners
        document.querySelectorAll('.wish-like-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const wishId = this.getAttribute('data-wish-id');
                likeWish(wishId);
            });
        });
    }

    function createWishCard(wish) {
        const date = new Date(wish.timestamp);
        const timeAgo = getTimeAgo(date);
        const initial = wish.name.charAt(0).toUpperCase();

        return `
            <div class="wish-card reveal">
                <div class="wish-header">
                    <div class="wish-avatar">${initial}</div>
                    <div class="wish-meta">
                        <h4 class="wish-name">${escapeHtml(wish.name)}</h4>
                        <p class="wish-time">${timeAgo}</p>
                    </div>
                </div>
                <p class="wish-message">${escapeHtml(wish.message)}</p>
                <button class="wish-like-btn ${wish.liked ? 'liked' : ''}" data-wish-id="${wish.id}">
                    <svg viewBox="0 0 24 24" fill="${wish.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>${wish.likes || 0}</span>
                </button>
            </div>
        `;
    }

    function likeWish(wishId) {
        const wishes = JSON.parse(localStorage.getItem('weddingWishes') || '[]');
        const wish = wishes.find(w => w.id === wishId);

        if (wish) {
            const likedWishes = JSON.parse(localStorage.getItem('likedWishes') || '[]');

            if (likedWishes.includes(wishId)) {
                // Unlike
                wish.likes = Math.max(0, (wish.likes || 0) - 1);
                wish.liked = false;
                const index = likedWishes.indexOf(wishId);
                likedWishes.splice(index, 1);
            } else {
                // Like
                wish.likes = (wish.likes || 0) + 1;
                wish.liked = true;
                likedWishes.push(wishId);
            }

            localStorage.setItem('weddingWishes', JSON.stringify(wishes));
            localStorage.setItem('likedWishes', JSON.stringify(likedWishes));

            displayWishes();
        }
    }

    function getTimeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);

        const intervals = {
            tahun: 31536000,
            bulan: 2592000,
            minggu: 604800,
            hari: 86400,
            jam: 3600,
            menit: 60
        };

        for (const [unit, secondsInUnit] of Object.entries(intervals)) {
            const interval = Math.floor(seconds / secondsInUnit);
            if (interval >= 1) {
                return `${interval} ${unit} yang lalu`;
            }
        }

        return 'Baru saja';
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function showWishToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${type === 'success' ? '✓' : '⚠'}</span>
                <span class="toast-message">${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Initialize reveal animations for wish cards
    const observeWishes = () => {
        const wishCards = document.querySelectorAll('.wish-card.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        wishCards.forEach(card => observer.observe(card));
    };

    // Call after displaying wishes
    setTimeout(observeWishes, 100);
});
