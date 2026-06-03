// ============================================================================
// BEAST LEVEL PORTFOLIO - ADVANCED JAVASCRIPT WITH COMPLETE ANIMATIONS
// ============================================================================

// Theme Toggle with Smooth Transition
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon();

function updateThemeIcon() {
    const currentTheme = html.getAttribute('data-theme');
    themeToggle.innerHTML = currentTheme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Statistics Counter Animation with Intersection Observer
const statNumbers = document.querySelectorAll('[data-target]');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

statNumbers.forEach(num => observer.observe(num));

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 30);
}

// Fetch GitHub Projects with Advanced Filtering
async function fetchGitHubProjects() {
    const username = 'k4ishna404';
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`);
        const repos = await response.json();
        
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = '';
        
        repos.forEach((repo, index) => {
            if (!repo.fork) {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.setAttribute('data-category', repo.language ? repo.language.toLowerCase() : 'tools');
                projectCard.style.animationDelay = `${index * 0.1}s`;
                
                const description = repo.description || 'No description available';
                const language = repo.language || 'Other';
                const stars = repo.stargazers_count > 0 ? `⭐ ${repo.stargazers_count}` : '';
                const url = repo.html_url;
                
                projectCard.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${description.substring(0, 100)}${description.length > 100 ? '...' : ''}</p>
                    <div class="project-meta">
                        <span class="project-language">${language}</span>
                        <a href="${url}" target="_blank" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                    ${stars ? `<div style="color: var(--accent-color); font-size: 0.9rem; margin-top: 0.5rem;">${stars}</div>` : ''}
                `;
                
                projectsGrid.appendChild(projectCard);
            }
        });

        setupProjectFilters();
    } catch (error) {
        console.error('Error fetching projects:', error);
        document.getElementById('projects-grid').innerHTML = '<p>Unable to load projects</p>';
    }
}

// Project Filter with Smooth Transitions
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = '';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Smooth Scroll with Navbar Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Based on Scroll Position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent-light)';
        }
    });
});

// Advanced Scroll Animation with Stagger Effect
const scrollElements = document.querySelectorAll('.project-card, .achievement-card, .skill-category, .feature-item, .timeline-content, .stat-card');

function elementInView(el, dividend = 1) {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
}

function elementOutofView(el) {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop > (window.innerHeight || document.documentElement.clientHeight);
}

function displayScrollElement(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
}

function hideScrollElement(element) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
}

scrollElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
});

window.addEventListener('scroll', () => {
    scrollElements.forEach(element => {
        if (elementInView(element, 1.25)) {
            displayScrollElement(element);
        } else if (elementOutofView(element)) {
            hideScrollElement(element);
        }
    });
});

// Parallax Effect for Background
window.addEventListener('scroll', () => {
    const blobs = document.querySelectorAll('.blob');
    const scrollY = window.scrollY;
    
    blobs.forEach((blob, index) => {
        const speed = 0.5 + (index * 0.1);
        blob.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(22, 27, 34, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(31, 111, 235, 0.2)';
    } else {
        navbar.style.background = 'rgba(22, 27, 34, 0.8)';
        navbar.style.boxShadow = '0 4px 30px rgba(31, 111, 235, 0.1)';
    }
});

// Mouse Move Gradient Effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Add Ripple Effect to Buttons
document.querySelectorAll('.btn, .filter-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Hover Tilt Effect for Cards
document.querySelectorAll('.project-card, .achievement-card, .skill-category').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
});

// Preload Images
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProjects();
    preloadImages();
    
    // Add fade-in animation to elements
    const elementsToAnimate = document.querySelectorAll('.about-text p, .description');
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.8s ease-out ${0.1 * index}s forwards`;
    });
});

// Intersection Observer for Advanced Animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    revealObserver.observe(el);
});

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth color transitions
const updateGradientOnScroll = debounce(() => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    
    const hue = Math.floor(scrollPercent * 360);
    document.documentElement.style.setProperty('--scroll-hue', hue);
}, 10);

window.addEventListener('scroll', updateGradientOnScroll);

// Add accessibility: Focus visible styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Console Message
console.log('%c🚀 Welcome to Krishna\'s BEAST LEVEL Portfolio! 🚀', 'color: #1f6feb; font-size: 20px; font-weight: bold;');
console.log('%cEmail: k4ishna404xpro@gmail.com', 'color: #58a6ff; font-size: 14px;');
console.log('%cBuilt with ❤️ using HTML, CSS & JavaScript', 'color: #f85149; font-size: 14px;');
