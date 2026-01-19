// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navbarLinks = document.getElementById('navbar-links');

mobileMenu.addEventListener('click', function () {
    navbarLinks.classList.toggle('active');
    mobileMenu.classList.toggle('open');
});

// Dropdown toggles
const dropdowns = document.querySelectorAll('.dropdown_toggle');

dropdowns.forEach(function (drop) {
    drop.addEventListener('click', function (e) {
        e.preventDefault();
        const parent = drop.parentElement;
        parent.classList.toggle('active');
    });
});


// Get modal and buttons
const donationModal = document.getElementById('donationModal');
const donateButtons = document.querySelectorAll('[href*="donate"], .donate-button'); // Adjust selector to match your donate button
const closeButton = document.querySelector('.close-button');
const cancelBtn = document.getElementById('cancelBtn');
const proceedBtn = document.getElementById('proceedBtn');

// Function to open modal
function openDonationModal(event) {
    event.preventDefault(); // Prevent immediate redirect
    donationModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close modal
function closeDonationModal() {
    donationModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Function to proceed to donation page
function proceedToDonation() {
    // Replace with your actual donation page URL
    window.location.href = 'donate.html';
}

// Event listeners
donateButtons.forEach(button => {
    button.addEventListener('click', openDonationModal);
});

closeButton.addEventListener('click', closeDonationModal);
cancelBtn.addEventListener('click', closeDonationModal);
proceedBtn.addEventListener('click', proceedToDonation);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === donationModal) {
        closeDonationModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && donationModal.style.display === 'block') {
        closeDonationModal();
    }
});



// Add interactivity to programme cards
document.querySelectorAll('.gbv_programme').forEach(card => {
    card.addEventListener('click', function () {
        const programmeName = this.querySelector('.program_name').textContent;
        alert(`You selected: ${programmeName}. You will be redirected to learn more about this programme.`);
        window.location.href = 'programmes/Gender_Based_Violence.html';
    });
});

document.querySelectorAll('.mental_health_programme').forEach(card => {
    card.addEventListener('click', function () {
        const programmeName = this.querySelector('.program_name').textContent;
        alert(`You selected: ${programmeName}. You will be redirected to learn more about this programme.`);
        window.location.href = 'programmes/Mental_Health.html';
    });
});

document.querySelectorAll('.circumcision_programme').forEach(card => {
    card.addEventListener('click', function () {
        const programmeName = this.querySelector('.program_name').textContent;
        alert(`You selected: ${programmeName}. You will be redirected to learn more about this programme.`);
        window.location.href = 'programmes/Male_Circumsition.html';
    });
});

document.querySelectorAll('.livelihoods_programme').forEach(card => {
    card.addEventListener('click', function () {
        const programmeName = this.querySelector('.program_name').textContent;
        alert(`You selected: ${programmeName}. You will be redirected to learn more about this programme.`);
        window.location.href = 'programmes/Sustainable_Livelyhoods.html';
    });
});


// Carousel functionality
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.article-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    // Initialize carousel
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show current slide
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto-advance slides (optional)
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    const container = document.querySelector('.article-container');
    container.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    container.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // View All button functionality
    document.querySelector('.view-all-btn').addEventListener('click', function () {
        alert('You will be redirected to our full News & Blogs archive.');
        // In real implementation: 
        window.location.href = '/insights/Blog_and_News.html';
        // window.location.href = 'donate.html';
    });

    // Article button functionality
    document.querySelectorAll('.article-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const articleTitle = this.closest('.article-content').querySelector('.article-heading').textContent;
            alert(`Loading article: ${articleTitle}`);
            // In real implementation: window.location.href = this.querySelector('a').href;
        });
    });
});


// Add interactivity to option items
document.querySelectorAll('.op-itemmm').forEach(item => {
    item.addEventListener('click', function () {
        const title = this.querySelector('.option_title').textContent;
        alert(`Thank you for your interest in "${title}"! You will be redirected to more information.`);
        // In a real implementation, this would redirect to the appropriate page
        window.location.href = 'prospective_partner.html';
    });
});

document.querySelectorAll('.op_itemm').forEach(item => {
    item.addEventListener('click', function () {
        const title = this.querySelector('.option_title').textContent;
        alert(`Thank you for your interest in "${title}"! You will be redirected to more information.`);
        // In a real implementation, this would redirect to the appropriate page
        window.location.href = 'volunteer.html';
    });
});

document.querySelectorAll('.op_item').forEach(item => {
    item.addEventListener('click', function () {
        const title = this.querySelector('.option_title').textContent;
        alert(`Thank you for your interest in "${title}"! You will be redirected to more information.`);
        // In a real implementation, this would redirect to the appropriate page
        window.location.href = 'donate.html';
    });
});


// Newsletter form submission
document.querySelector('.newsletter_form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.querySelector('.newsletter_input').value;

    // In a real implementation, you would send this to your backend
    alert(`Thank you for subscribing with ${email}! You'll receive updates about MMD's work.`);
    this.reset();
});

// Smooth scroll for footer links
document.querySelectorAll('.footer_links a').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

function togglePopup() {
    const popup = document.getElementById("helplinePopup");
    popup.classList.toggle("show");
}




