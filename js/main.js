// Navigation Menu Toggle Logic
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll Section Active Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            let activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        };
    });

    // Remove menu toggle when scrolling
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Interactive API Fetching Logic (Internship Requirement)
const quoteBtn = document.getElementById('fetch-quote-btn');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const loader = document.getElementById('quote-loader');
const contentBox = document.getElementById('quote-content');

async function fetchQuote() {
    // Show Loader, Hide Content
    loader.style.display = 'block';
    contentBox.style.display = 'none';

    try {
        // Fetching from a free public API for quotes
        const response = await fetch('https://dummyjson.com/quotes/random');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        // Display Quote
        quoteText.textContent = data.quote;
        quoteAuthor.textContent = "- " + data.author;

    } catch (error) {
        console.error('Error fetching API:', error);
        quoteText.textContent = "Oops! Something went wrong while fetching the data.";
        quoteAuthor.textContent = "- Try again later";
    } finally {
        // Hide Loader, Show Content
        loader.style.display = 'none';
        contentBox.style.display = 'block';
    }
}

// Fetch on button click
if (quoteBtn) {
    quoteBtn.addEventListener('click', fetchQuote);
}

/* ================== Contact Form ================== */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nameField    = document.getElementById('name');
        const emailField   = document.getElementById('email');
        const messageField = document.getElementById('message');
        const feedback     = document.getElementById('form-feedback');
        const submitBtn    = document.getElementById('submit-btn');
        const btnText      = document.getElementById('btn-text');
        const btnIcon      = document.getElementById('btn-icon');

        // Clear previous errors
        ['name', 'email', 'message'].forEach(id => {
            document.getElementById(id + '-error').textContent = '';
            document.getElementById(id).classList.remove('input-error');
        });
        feedback.className = 'form-feedback';
        feedback.textContent = '';

        // Validate fields
        let valid = true;

        if (!nameField.value.trim()) {
            document.getElementById('name-error').textContent = 'Full name is required.';
            nameField.classList.add('input-error');
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailField.value.trim()) {
            document.getElementById('email-error').textContent = 'Email address is required.';
            emailField.classList.add('input-error');
            valid = false;
        } else if (!emailPattern.test(emailField.value.trim())) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            emailField.classList.add('input-error');
            valid = false;
        }

        if (!messageField.value.trim()) {
            document.getElementById('message-error').textContent = 'A message is required.';
            messageField.classList.add('input-error');
            valid = false;
        }

        if (!valid) return;

        // Disable button during submission
        submitBtn.disabled = true;
        btnText.textContent = 'Sending…';
        btnIcon.className = 'bx bx-loader-alt bx-spin';

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(new FormData(contactForm)).toString(),
            });

            if (response.ok) {
                feedback.className = 'form-feedback success';
                feedback.textContent = '✓ Message sent! I\'ll get back to you soon.';
                contactForm.reset();
            } else {
                throw new Error('Server responded with ' + response.status);
            }
        } catch (err) {
            feedback.className = 'form-feedback error';
            feedback.textContent = 'Something went wrong. Please try again or email directly.';
            console.error('Form submission error:', err);
        } finally {
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
            btnIcon.className = 'bx bx-send';
        }
    });
}

/* ================== Scroll Reveal ================== */
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .projects-container, .certs-container, .contact-info, .api-card, .project-gallery', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img, .project-content-block h3', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content, .project-content-block p', { origin: 'right' });
