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
