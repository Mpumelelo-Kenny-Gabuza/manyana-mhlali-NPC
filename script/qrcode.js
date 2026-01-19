// QR Code Popup Functions
document.addEventListener('DOMContentLoaded', function() {
    // Close popup when clicking outside
    document.addEventListener('click', function(event) {
        const qrPopup = document.getElementById('qrPopup');
        const popupContent = document.querySelector('.qr-popup-content');
        
        if (qrPopup && qrPopup.style.display === 'flex' && 
            !popupContent.contains(event.target) && 
            !event.target.classList.contains('view-qr-btn')) {
            closeQRPopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(event) {
        const qrPopup = document.getElementById('qrPopup');
        if (event.key === 'Escape' && qrPopup && qrPopup.style.display === 'flex') {
            closeQRPopup();
        }
    });
});

// Open QR Popup
function openQRPopup() {
    const qrPopup = document.getElementById('qrPopup');
    if (qrPopup) {
        qrPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close QR Popup
function closeQRPopup() {
    const qrPopup = document.getElementById('qrPopup');
    if (qrPopup) {
        qrPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}