/* filepath: /C:/Users/hazab/Desktop/VSCode Projects/PortfolioWebsiteRender/src/scripts/main.js */
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const settingsButton = document.getElementById('settings-button');
    const modal = document.getElementById('settings-modal');
    const closeButton = document.querySelector('.close-button');
    const themeSelect = document.getElementById('theme-select');
    const colorSelect = document.getElementById('color-select');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageTransition = document.querySelector('.page-transition');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const menuOverlay = document.querySelector('.menu-overlay');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        menuOverlay.classList.remove('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    });

    // Theme Management
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedColor = localStorage.getItem('headerColor') || '#333';

    // Apply saved settings
    document.body.className = savedTheme;
    document.documentElement.style.setProperty('--header-bg-color', savedColor);
    themeSelect.value = savedTheme;
    colorSelect.value = savedColor;

    // Modal Controls
    settingsButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Theme Changes
    themeSelect.addEventListener('change', (e) => {
        const theme = e.target.value;
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    });

    // Color Changes
    colorSelect.addEventListener('input', (e) => {
        const color = e.target.value;
        document.documentElement.style.setProperty('--header-bg-color', color);
        localStorage.setItem('headerColor', color);
    });

    // Page Transitions
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) return;
            
            e.preventDefault();
            const target = this.getAttribute('href');

            pageTransition.classList.add('active');

            setTimeout(() => {
                window.location.href = target;
            }, 300);
        });
    });

    // Remove transition on page load
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            pageTransition.classList.remove('active');
        }
    });

    // Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const formData = new FormData(contactForm);

            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';

                // Replace with your actual form submission endpoint
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                alert('Message sent successfully!');
                contactForm.reset();
            } catch (error) {
                console.error('Error sending message:', error);
                alert('Failed to send message. Please try again.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }

    // Projects Filter (if on projects page)
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                const projectLink = this.querySelector('.project-link');
                if (projectLink) {
                    projectLink.click();
                }
            });
        });
    }

    document.querySelectorAll('.nav-link, .section-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href')?.startsWith('#')) return;
            
            e.preventDefault();
            const target = this.getAttribute('href') || this.dataset.href;
            if (!target) return;
    
            pageTransition.classList.add('active');
    
            setTimeout(() => {
                window.location.href = target;
            }, 300); // Match this with the CSS transition duration
        });
    });
    
    // Add this to handle initial page load transition
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});