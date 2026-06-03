// Theme Toggle
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
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.style.display = 'none';
    });
});

// Statistics Counter Animation
const statNumbers = document.querySelectorAll('[data-target]');
const observerOptions = {
    threshold: 0.5
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

// Fetch GitHub Projects
async function fetchGitHubProjects() {
    const username = 'k4ishna404';
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`);
        const repos = await response.json();
        
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = '';
        
        repos.forEach(repo => {
            if (!repo.fork) {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.setAttribute('data-category', repo.language ? repo.language.toLowerCase() : 'tools');
                
                const description = repo.description || 'No description available';
                const language = repo.language || 'Other';
                const stars = repo.stargazers_count > 0 ? `⭐ ${repo.stargazers_count}` : '';
                
                projectCard.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${description.substring(0, 100)}${description.length > 100 ? '...' : ''}</p>
                    <div class="project-meta">
                        <span class="project-language">${language}</span>
                        <a href="${repo.html_url}" target="_blank" class="project-link">
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                    ${stars ? `<div style="color: var(--accent-color); font-size: 0.9rem; margin-top: 0.5rem;">${stars}</div>` : ''}
                `;
                
                projectsGrid.appendChild(projectCard);
            }
        });

        // Add filter functionality
        setupProjectFilters();
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

// Project Filter
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
}

// Smooth Scroll with Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent-color)';
        }
    });
});

// Scroll Animation
const scrollElements = document.querySelectorAll('.project-card, .achievement-card, .skill-category, .feature-item, .timeline-content, .stat-card');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
};

const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop > (window.innerHeight || document.documentElement.clientHeight);
};

const displayScrollElement = (element) => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
};

const hideScrollElement = (element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
};

scrollElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
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

// Parallax Effect
window.addEventListener('scroll', () => {
    const stars = document.querySelector('.stars');
    if (stars) {
        stars.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubProjects();
});
