// ==========================================
// 0. LOADER / BUFFERING LOGIC
// ==========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        // Efek transisi memudar
        loader.style.opacity = '0';
        // Menghilangkan elemen dari DOM setelah memudar
        setTimeout(() => {
            loader.style.visibility = 'hidden';
            loader.style.display = 'none';
        }, 500);
    }
});

// ==========================================
// 1. MOBILE NAVIGATION TOGGLE
// ==========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ==========================================
// 2. NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 5%';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.padding = '1rem 5%';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ==========================================
// 3. SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// 4. CONTACT FORM SUBMISSION EVENT
// ==========================================
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.');
        contactForm.reset();
    });
}

// ==========================================
// 5. INTERSECTION OBSERVER (KOREOGRAFI ANIMASI)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Untuk elemen koreografi index.html
            if (entry.target.classList.contains('animate-fade-up')) {
                entry.target.classList.add('is-visible');
            } else {
                // Untuk elemen lama di main.html
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        }
    });
}, observerOptions);

// Mengamati elemen dari main.html dan kelas koreografi baru dari index.html
const animatedElements = document.querySelectorAll('.course-card, .tutor-card, .testimonial-card, .stat-item, .animate-fade-up');
if (animatedElements.length > 0) {
    animatedElements.forEach(card => {
        // Jika bukan bagian dari kelas koreografi, set state awalnya secara manual di JS
        if (!card.classList.contains('animate-fade-up')) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(card);
    });
}