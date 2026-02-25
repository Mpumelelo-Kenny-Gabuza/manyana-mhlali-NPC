// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbarLinks = document.getElementById('navbar-links');
    const dropdownToggle = document.querySelector('.dropdown_toggle');
    const programmesDropdown = document.getElementById('programmes-dropdown');

    // Toggle mobile menu
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function (e) {
            e.stopPropagation();
            navbarLinks.classList.toggle('active');

            // Close dropdown when closing mobile menu
            if (!navbarLinks.classList.contains('active') && programmesDropdown) {
                programmesDropdown.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Handle dropdown toggle for mobile
    if (dropdownToggle && programmesDropdown) {
        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Only handle dropdown on mobile
            if (window.innerWidth <= 768) {
                programmesDropdown.classList.toggle('active');
                const isExpanded = programmesDropdown.classList.contains('active');
                dropdownToggle.setAttribute('aria-expanded', isExpanded);
            } else {
                // On desktop, follow the link or handle differently
                window.location.href = '#'; // or your programmes page
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.navbar_section') && navbarLinks.classList.contains('active')) {
            navbarLinks.classList.remove('active');
            if (programmesDropdown) {
                programmesDropdown.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navbarLinks.classList.contains('active')) {
            navbarLinks.classList.remove('active');
            if (programmesDropdown) {
                programmesDropdown.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            navbarLinks.classList.remove('active');
            if (programmesDropdown) {
                programmesDropdown.classList.remove('active');
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Prevent dropdown from closing when clicking inside it on mobile
    if (programmesDropdown) {
        programmesDropdown.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.stopPropagation();
            }
        });
    }
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



// Add interactivity to programme cards with improved UX
document.addEventListener('DOMContentLoaded', function () {
    // Get all programme cards
    const programCards = document.querySelectorAll('.program_card');

    // Add click event to each card
    programCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Prevent multiple rapid clicks
            if (this.classList.contains('processing')) {
                return;
            }

            this.classList.add('processing');

            // Get programme information
            const programName = this.querySelector('.program_name').textContent;
            const programUrl = this.dataset.url;

            // Show visual feedback
            this.style.transform = 'scale(0.98)';

            // Optional: Show a brief notification
            showNotification(`Loading ${programName}...`);

            // Redirect after a brief delay for visual feedback
            setTimeout(() => {
                window.location.href = programUrl;
            }, 300);
        });

        // Add keyboard accessibility
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make cards focusable for keyboard navigation
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Learn more about ${card.querySelector('.program_name').textContent}`);
    });

    // Optional: Add touch feedback for mobile
    programCards.forEach(card => {
        card.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });

        card.addEventListener('touchend', function () {
            this.style.transform = 'scale(1)';
        });

        card.addEventListener('touchcancel', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // Helper function to show notification
    function showNotification(message) {
        // Check if notification container exists, if not create it
        let notification = document.querySelector('.programme-notification');

        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'programme-notification';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #e74c3c;
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 9999;
                font-weight: 500;
                animation: slideIn 0.3s ease;
                opacity: 0;
                transform: translateX(100%);
            `;
            document.body.appendChild(notification);

            // Add animation keyframes
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Show notification
        notification.textContent = message;
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';

        // Hide after 2 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
        }, 2000);
    }
});

// Survivor 
StylePropertyMap// Add interactive elements
document.addEventListener('DOMContentLoaded', function () {
    // Animate stats on scroll
    const statsSection = document.querySelector('.story-stats');
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    // Animate numbers
                    statNumbers.forEach(stat => {
                        const value = stat.textContent;
                        if (value.includes('+')) {
                            animateNumber(stat, parseInt(value), '+');
                        } else if (value.includes('%')) {
                            animateNumber(stat, parseInt(value), '%');
                        }
                    });
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // Number animation function
    function animateNumber(element, target, suffix = '') {
        if (element.classList.contains('animated')) return;

        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
                element.classList.add('animated');
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    }

    // Add hover effect to image
    const imageWrapper = document.querySelector('.image-wrapper');
    if (imageWrapper) {
        imageWrapper.addEventListener('mousemove', function (e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            const img = this.querySelector('.story-img');
            img.style.transform = `scale(1.05) translate(${x * 10}px, ${y * 10}px)`;
        });

        imageWrapper.addEventListener('mouseleave', function () {
            const img = this.querySelector('.story-img');
            img.style.transform = 'scale(1) translate(0, 0)';
        });
    }
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


document.addEventListener('DOMContentLoaded', function () {
    // Handle option item clicks with improved UX
    const optionItems = document.querySelectorAll('.option_item');

    optionItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Prevent double clicks
            if (this.classList.contains('processing')) {
                return;
            }

            this.classList.add('processing');

            const title = this.querySelector('.option_title').textContent;
            const url = this.dataset.url;
            const type = this.dataset.type;

            // Show loading state
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';

            // Show notification
            showNotification(`Redirecting to ${title}...`, type);

            // Redirect after brief delay
            setTimeout(() => {
                window.location.href = url;
            }, 800);
        });

        // Add keyboard accessibility
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make focusable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Learn more about ${item.querySelector('.option_title').textContent}`);
    });

    // Animate statistics
    const stats = document.querySelectorAll('.stat-number');

    const animateStats = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.dataset.target);
                const duration = 2000;
                const step = targetNumber / (duration / 16);
                let current = 0;

                const updateNumber = () => {
                    current += step;
                    if (current >= targetNumber) {
                        target.textContent = targetNumber + '+';
                    } else {
                        target.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateNumber);
                    }
                };

                updateNumber();
                observer.unobserve(target);
            }
        });
    };

    const observer = new IntersectionObserver(animateStats, { threshold: 0.5 });
    stats.forEach(stat => observer.observe(stat));

    // Video play button interaction
    const videoContainer = document.querySelector('.video-container');
    const playButton = document.querySelector('.play-button');
    const iframe = document.querySelector('iframe');

    if (playButton && iframe) {
        playButton.addEventListener('click', function () {
            // Add autoplay to iframe src
            const src = iframe.src;
            if (!src.includes('autoplay=1')) {
                iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
            }
            this.style.opacity = '0';
        });
    }

    // Helper function for notifications
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${getIcon(type)}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getColor(type)};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 25px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    function getIcon(type) {
        switch (type) {
            case 'donate': return '💰';
            case 'volunteer': return '🤝';
            case 'partner': return '🤲';
            default: return '❤️';
        }
    }

    function getColor(type) {
        switch (type) {
            case 'donate': return '#e74c3c';
            case 'volunteer': return '#3498db';
            case 'partner': return '#27ae60';
            default: return '#2c3e50';
        }
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
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

// Add download tracking and animations
document.addEventListener('DOMContentLoaded', function () {
    const downloadBtns = document.querySelectorAll('.download-btn');
    const valuePills = document.querySelectorAll('.value-pill');

    // Track downloads
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const card = this.closest('.download-card');
            const title = card.querySelector('.card-title').textContent;

            // Show download notification
            showNotification(`Downloading ${title}...`, 'download');

            // You could add Google Analytics tracking here
            console.log(`Download started: ${title}`);
        });
    });

    // Add ripple effect to value pills
    valuePills.forEach(pill => {
        pill.addEventListener('click', function (e) {
            // Just for visual effect, no action needed
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.about-container > *').forEach(el => {
        observer.observe(el);
    });

    // Notification helper
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = 'download-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideUp 0.3s ease;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});


