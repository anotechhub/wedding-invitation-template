// Add to Calendar functionality
document.addEventListener('DOMContentLoaded', function () {
    const calendarBtn = document.getElementById('addToCalendarBtn');
    const calendarDropdown = document.getElementById('calendarDropdown');

    // Event details
    const eventDetails = {
        title: 'Pernikahan Andi & Sarah',
        description: 'Acara Pernikahan Andi Pratama & Sarah Kusuma',
        location: 'Masjid Agung Al-Azhar, Jakarta Selatan',
        startDate: '2025-02-14T08:00:00',
        endDate: '2025-02-14T14:00:00'
    };

    if (calendarBtn && calendarDropdown) {
        // Toggle dropdown
        calendarBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            calendarDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function () {
            calendarDropdown.classList.remove('show');
        });

        calendarDropdown.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // Google Calendar
    const googleCalBtn = document.getElementById('googleCalendar');
    if (googleCalBtn) {
        googleCalBtn.addEventListener('click', function () {
            const url = generateGoogleCalendarUrl(eventDetails);
            window.open(url, '_blank');
        });
    }

    // Download ICS file
    const icsBtn = document.getElementById('downloadICS');
    if (icsBtn) {
        icsBtn.addEventListener('click', function () {
            downloadICSFile(eventDetails);
        });
    }

    function generateGoogleCalendarUrl(event) {
        const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
        const start = formatDateForGoogle(event.startDate);
        const end = formatDateForGoogle(event.endDate);

        const params = new URLSearchParams({
            text: event.title,
            details: event.description,
            location: event.location,
            dates: `${start}/${end}`
        });

        return `${baseUrl}&${params.toString()}`;
    }

    function formatDateForGoogle(dateString) {
        const date = new Date(dateString);
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    function downloadICSFile(event) {
        const icsContent = generateICS(event);
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Wedding-Andi-Sarah.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showCalendarToast('File kalender berhasil diunduh! ✓');
    }

    function generateICS(event) {
        const start = formatDateForICS(event.startDate);
        const end = formatDateForICS(event.endDate);
        const timestamp = formatDateForICS(new Date().toISOString());

        return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//Andi & Sarah//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${start}
DTEND:${end}
DTSTAMP:${timestamp}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Reminder: ${event.title}
END:VALARM
END:VEVENT
END:VCALENDAR`;
    }

    function formatDateForICS(dateString) {
        const date = new Date(dateString);
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    function showCalendarToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-success';
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">📅</span>
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
