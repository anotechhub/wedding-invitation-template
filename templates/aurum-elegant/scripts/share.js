// Social Media Share functionality
document.addEventListener('DOMContentLoaded', function () {
    const shareButtons = document.querySelectorAll('[data-share]');

    const shareData = {
        title: 'Undangan Pernikahan Andi & Sarah',
        text: 'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk hadir dalam acara pernikahan kami.',
        url: window.location.href
    };

    shareButtons.forEach(button => {
        button.addEventListener('click', function () {
            const platform = this.getAttribute('data-share');
            shareToPlatform(platform);
        });
    });

    function shareToPlatform(platform) {
        let url = '';

        switch (platform) {
            case 'whatsapp':
                url = `https://wa.me/?text=${encodeURIComponent(shareData.text + ' ' + shareData.url)}`;
                break;

            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
                break;

            case 'twitter':
                url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`;
                break;

            case 'telegram':
                url = `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`;
                break;

            case 'copy':
                copyLink();
                return;

            default:
                // Use Web Share API if available
                if (navigator.share) {
                    navigator.share(shareData)
                        .then(() => showShareToast('Terima kasih telah membagikan! 💝'))
                        .catch(() => { });
                } else {
                    copyLink();
                }
                return;
        }

        if (url) {
            window.open(url, '_blank', 'width=600,height=400');
            showShareToast('Membuka jendela berbagi...');
        }
    }

    function copyLink() {
        const url = window.location.href;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
                showShareToast('Link berhasil disalin! ✓');
            }).catch(() => {
                fallbackCopyLink(url);
            });
        } else {
            fallbackCopyLink(url);
        }
    }

    function fallbackCopyLink(url) {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            showShareToast('Link berhasil disalin! ✓');
        } catch (err) {
            showShareToast('Gagal menyalin link', 'error');
        }

        document.body.removeChild(textArea);
    }

    function showShareToast(message, type = 'success') {
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
});
