// Fetch GitHub repositories and display them
async function fetchGitHubProjects() {
    const username = 'k4ishna404';
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const repos = await response.json();
        
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = '';
        
        repos.forEach(repo => {
            if (!repo.fork) { // Only display original repositories
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                const description = repo.description || 'No description available';
                const language = repo.language || 'Unknown';
                
                projectCard.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${description}</p>
                    <div class="project-meta">
                        <span class="project-language">${language}</span>
                        <a href="${repo.html_url}" target="_blank" class="project-link">View on GitHub →</a>
                    </div>
                `;
                
                projectsGrid.appendChild(projectCard);
            }
        });
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        document.getElementById('projects-grid').innerHTML = '<p>Unable to load projects. Please visit my GitHub profile.</p>';
    }
}

// Smooth scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and skill cards
document.addEventListener('DOMContentLoaded', function() {
    fetchGitHubProjects();
    
    // Add initial styles for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 60) {
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
