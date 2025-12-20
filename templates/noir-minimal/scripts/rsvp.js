// RSVP Form Handler with localStorage
document.addEventListener('DOMContentLoaded', function () {
    const rsvpForm = document.getElementById('rsvpForm');
    const guestCounter = document.getElementById('guestCounter');

    // Initialize guest count from localStorage
    updateGuestCount();

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('rsvpName').value.trim(),
                guests: parseInt(document.getElementById('rsvpGuests').value),
                attendance: document.querySelector('input[name="attendance"]:checked')?.value,
                message: document.getElementById('rsvpMessage').value.trim(),
                timestamp: new Date().toISOString()
            };

            // Validate
            if (!formData.name || !formData.attendance) {
                showNotification('Mohon lengkapi semua field yang wajib diisi', 'error');
                return;
            }

            // Save to localStorage
            saveRSVP(formData);

            // Show success message with confetti
            showSuccessAnimation();

            // Reset form
            rsvpForm.reset();

            // Update counter
            updateGuestCount();
        });
    }

    function saveRSVP(data) {
        // Get existing RSVPs
        let rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');

        // Add new RSVP
        rsvps.push(data);

        // Save back to localStorage
        localStorage.setItem('weddingRSVPs', JSON.stringify(rsvps));
    }

    function updateGuestCount() {
        const rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
        const attendingRsvps = rsvps.filter(r => r.attendance === 'hadir');
        const totalGuests = attendingRsvps.reduce((sum, r) => sum + (r.guests || 1), 0);

        if (guestCounter) {
            guestCounter.textContent = totalGuests;

            // Animate counter
            guestCounter.style.transform = 'scale(1.2)';
            setTimeout(() => {
                guestCounter.style.transform = 'scale(1)';
            }, 300);
        }
    }

    function showSuccessAnimation() {
        const successMsg = document.getElementById('rsvpSuccess');

        if (successMsg) {
            successMsg.classList.add('show');

            // Create confetti
            createConfetti();

            // Hide after 4 seconds
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 4000);
        }
    }

    function createConfetti() {
        const colors = ['#0b1220', '#1c2b44', '#415a77', '#cfd6e4'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            document.body.appendChild(confetti);

            // Remove after animation
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Export RSVP data (for admin/couple to view)
    window.exportRSVPs = function () {
        const rsvps = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
        const dataStr = JSON.stringify(rsvps, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'rsvp-data.json';
        link.click();
    };
});
