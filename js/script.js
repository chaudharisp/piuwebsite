// Portfolio Website JavaScript

// Add YAML parsing support
function parseYAML(yamlText) {
    try {
        // Simple YAML parser for basic key-value pairs and lists
        const lines = yamlText.split('\n');
        const result = {};
        let currentKey = null;
        let currentObject = result;
        let indentLevel = 0;
        let inMultiline = false;
        let multilineKey = null;
        let multilineContent = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();
            
            if (!trimmed || trimmed.startsWith('#')) continue;
            
            const indent = line.length - line.trimStart().length;
            
            // Handle multiline content
            if (inMultiline) {
                if (indent > indentLevel || trimmed.startsWith('-')) {
                    multilineContent.push(line.substring(indentLevel + 2));
                    continue;
                } else {
                    // End of multiline
                    currentObject[multilineKey] = multilineContent.join('\n').trim();
                    inMultiline = false;
                    multilineContent = [];
                }
            }
            
            if (trimmed.includes(':')) {
                const [key, ...valueParts] = trimmed.split(':');
                const value = valueParts.join(':').trim();
                
                if (value === '|') {
                    // Start multiline
                    inMultiline = true;
                    multilineKey = key.trim();
                    indentLevel = indent;
                    multilineContent = [];
                } else if (value === '') {
                    // Object or array
                    currentObject[key.trim()] = {};
                } else {
                    // Simple value
                    let parsedValue = value;
                    if (value.startsWith('"') && value.endsWith('"')) {
                        parsedValue = value.slice(1, -1);
                    } else if (value === 'true') {
                        parsedValue = true;
                    } else if (value === 'false') {
                        parsedValue = false;
                    } else if (!isNaN(value) && value !== '') {
                        parsedValue = Number(value);
                    }
                    currentObject[key.trim()] = parsedValue;
                }
            } else if (trimmed.startsWith('-')) {
                // Array item
                const item = trimmed.substring(1).trim();
                if (!Array.isArray(currentObject[currentKey])) {
                    currentObject[currentKey] = [];
                }
                
                if (item.startsWith('"') && item.endsWith('"')) {
                    currentObject[currentKey].push(item.slice(1, -1));
                } else {
                    currentObject[currentKey].push(item);
                }
            }
        }
        
        // Handle final multiline if exists
        if (inMultiline && multilineContent.length > 0) {
            currentObject[multilineKey] = multilineContent.join('\n').trim();
        }
        
        return result;
    } catch (error) {
        console.error('YAML parsing error:', error);
        return {};
    }
}

// Load data from YAML files
async function loadYAMLData(filename) {
    try {
        const response = await fetch(`/_data/${filename}`);
        if (!response.ok) {
            throw new Error(`Failed to load ${filename}: ${response.status}`);
        }
        const yamlText = await response.text();
        return parseYAML(yamlText);
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return {};
    }
}

// Initialize dynamic content loading
async function initializePage() {
    try {
        // Load all data files
        const [settings, homepage, resume] = await Promise.all([
            loadYAMLData('settings.yml'),
            loadYAMLData('homepage.yml'),
            loadYAMLData('resume.yml')
        ]);
        
        // Store data globally for use in other functions
        window.siteData = { settings, homepage, resume };
        
        // Initialize page-specific content
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        if (currentPage === 'index.html' || currentPage === '') {
            initializeHomepage(homepage, settings);
        } else if (currentPage === 'resume.html') {
            initializeResume(resume, settings);
        }
        
        // Initialize common elements
        initializeCommonElements(settings);
        
    } catch (error) {
        console.error('Failed to initialize page:', error);
    }
}

// Initialize homepage content
function initializeHomepage(homepage, settings) {
    if (!homepage) return;
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroTitle && homepage.hero_title) {
        heroTitle.innerHTML = `Hello, I'm <span class="highlight">${settings.author_name || 'Your Name'}</span>`;
    }
    
    if (heroSubtitle && homepage.hero_subtitle) {
        heroSubtitle.textContent = homepage.hero_subtitle;
    }
    
    if (heroDescription && homepage.hero_description) {
        heroDescription.textContent = homepage.hero_description;
    }
    
    // Update about section
    const aboutContent = document.querySelector('.about-text');
    if (aboutContent && homepage.about_content) {
        aboutContent.innerHTML = markdownToHtml(homepage.about_content);
    }
    
    // Update featured work
    if (homepage.featured_work && Array.isArray(homepage.featured_work)) {
        updateFeaturedWork(homepage.featured_work);
    }
}

// Initialize resume content
function initializeResume(resume, settings) {
    if (!resume) return;
    
    // Update professional summary
    const summaryElement = document.querySelector('.professional-summary');
    if (summaryElement && resume.summary) {
        summaryElement.innerHTML = markdownToHtml(resume.summary);
    }
    
    // Update work experience
    if (resume.experience) {
        updateWorkExperience(resume.experience);
    }
    
    // Update skills
    if (resume.skills) {
        updateSkills(resume.skills);
    }
}

// Initialize common elements across all pages
function initializeCommonElements(settings) {
    if (!settings) return;
    
    // Update navigation logo
    const navLogo = document.querySelector('.nav-logo a');
    if (navLogo && settings.author_name) {
        navLogo.textContent = settings.author_name;
    }
    
    // Update page title
    if (settings.site_title) {
        document.title = settings.site_title;
    }
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && settings.site_description) {
        metaDescription.setAttribute('content', settings.site_description);
    }
}

// Helper function to convert basic markdown to HTML
function markdownToHtml(markdown) {
    if (!markdown) return '';
    
    return markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\n\n/gim, '</p><p>')
        .replace(/^(.*)$/gm, '<p>$1</p>')
        .replace(/<p><h([1-6])>/gim, '<h$1>')
        .replace(/<\/h([1-6])><\/p>/gim, '</h$1>')
        .replace(/- (.*)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
}

// Update featured work section
function updateFeaturedWork(featuredWork) {
    const workGrid = document.querySelector('.work-grid');
    if (!workGrid) return;
    
    workGrid.innerHTML = featuredWork.map(work => `
        <div class="work-item">
            ${work.image ? `<img src="${work.image}" alt="${work.title}" class="work-image">` : ''}
            <div class="work-content">
                <h3 class="work-title">${work.title}</h3>
                <p class="work-description">${work.description}</p>
                ${work.prd_link ? `<a href="${work.prd_link}" class="work-link">View PRD</a>` : ''}
            </div>
        </div>
    `).join('');
}

// Update work experience section
function updateWorkExperience(experience) {
    const experienceContainer = document.querySelector('.experience-timeline');
    if (!experienceContainer) return;
    
    experienceContainer.innerHTML = experience.map(job => `
        <div class="timeline-item">
            <div class="timeline-content">
                <h3 class="job-title">${job.title}</h3>
                <h4 class="company">${job.company}</h4>
                <p class="job-location">${job.location}</p>
                <p class="job-duration">${job.start_date} - ${job.end_date}</p>
                <ul class="responsibilities">
                    ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

// Update skills section
function updateSkills(skills) {
    const skillsContainer = document.querySelector('.skills-container');
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = Object.entries(skills).map(([category, skillList]) => `
        <div class="skill-category">
            <h3 class="skill-category-title">${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div class="skill-tags">
                ${skillList.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dynamic content
    initializePage();
    
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Animate elements on scroll
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
    
    // Elements to animate
    const animateElements = document.querySelectorAll('.work-item, .blog-post, .resume-section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Here you would typically send the email to your backend
                alert('Thank you for subscribing! We\'ll keep you updated with the latest design insights.');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
    
    // Blog category filtering (for blog page)
    const categoryLinks = document.querySelectorAll('[data-category]');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-category');
                
                // Remove active class from all category links
                categoryLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                // Filter blog posts
                blogPosts.forEach(post => {
                    if (category === 'all') {
                        post.style.display = 'grid';
                    } else {
                        const postCategory = post.querySelector('.post-category');
                        if (postCategory && postCategory.textContent.toLowerCase().includes(category.replace('-', ' '))) {
                            post.style.display = 'grid';
                        } else {
                            post.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Contact form handling (if you add a contact form later)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would send the form data to your backend
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
        });
    }
    
    // Typing animation for hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        const words = originalText.split(' ');
        let currentWordIndex = 0;
        
        function typeWord() {
            if (currentWordIndex < words.length) {
                const word = words[currentWordIndex];
                let currentText = words.slice(0, currentWordIndex).join(' ');
                if (currentText) currentText += ' ';
                
                let charIndex = 0;
                const typeInterval = setInterval(() => {
                    currentText += word[charIndex];
                    heroTitle.innerHTML = currentText;
                    charIndex++;
                    
                    if (charIndex >= word.length) {
                        clearInterval(typeInterval);
                        currentWordIndex++;
                        setTimeout(typeWord, 300);
                    }
                }, 100);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(() => {
            heroTitle.innerHTML = '';
            typeWord();
        }, 1000);
    }
    
    // Copy email to clipboard functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    // Create temporary tooltip
                    const tooltip = document.createElement('div');
                    tooltip.textContent = 'Email copied to clipboard!';
                    tooltip.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: var(--primary-color);
                        color: white;
                        padding: 12px 20px;
                        border-radius: 6px;
                        z-index: 9999;
                        font-size: 14px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    `;
                    
                    document.body.appendChild(tooltip);
                    
                    setTimeout(() => {
                        document.body.removeChild(tooltip);
                    }, 2000);
                });
            } else {
                // Fallback for older browsers
                window.location.href = this.getAttribute('href');
            }
        });
    });
    
    // Add loading states for better UX
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.closest('form')) {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    // Initialize AOS (Animate On Scroll) library if included
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 50
        });
    }
    
    // Performance: Add lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Portfolio Analytics
    function initializeAnalytics() {
        // Simulate real analytics data (replace with actual API calls)
        const analyticsData = {
            totalVisitors: Math.floor(Math.random() * 50000) + 10000,
            countries: Math.floor(Math.random() * 95) + 30,
            prdDownloads: Math.floor(Math.random() * 5000) + 1200,
            engagementRate: (Math.random() * 20 + 75).toFixed(1) + '%'
        };
        
        // Animate counters
        function animateCounter(element, finalValue) {
            const startValue = 0;
            const duration = 2000;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentValue = Math.floor(startValue + (finalValue - startValue) * progress);
                element.textContent = currentValue.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        }
        
        // Update analytics display
        const visitorCount = document.getElementById('visitor-count');
        const countriesCount = document.getElementById('countries-count');
        const prdViews = document.getElementById('prd-views');
        const engagementRate = document.getElementById('engagement-rate');
        
        if (visitorCount) {
            animateCounter(visitorCount, analyticsData.totalVisitors);
        }
        if (countriesCount) {
            animateCounter(countriesCount, analyticsData.countries);
        }
        if (prdViews) {
            animateCounter(prdViews, analyticsData.prdDownloads);
        }
        if (engagementRate) {
            setTimeout(() => {
                engagementRate.textContent = analyticsData.engagementRate;
            }, 1500);
        }
        
        // Initialize visitor map (placeholder for real implementation)
        initializeVisitorMap();
    }
    
    function initializeVisitorMap() {
        const mapContainer = document.getElementById('world-map');
        if (!mapContainer) return;
        
        // Simulate loading delay
        setTimeout(() => {
            mapContainer.innerHTML = `
                <div class="map-stats">
                    <div class="country-stat">
                        <span class="country">🇺🇸 United States</span>
                        <span class="percentage">35%</span>
                    </div>
                    <div class="country-stat">
                        <span class="country">🇬🇧 United Kingdom</span>
                        <span class="percentage">18%</span>
                    </div>
                    <div class="country-stat">
                        <span class="country">🇨🇦 Canada</span>
                        <span class="percentage">12%</span>
                    </div>
                    <div class="country-stat">
                        <span class="country">🇩🇪 Germany</span>
                        <span class="percentage">10%</span>
                    </div>
                    <div class="country-stat">
                        <span class="country">🇦🇺 Australia</span>
                        <span class="percentage">8%</span>
                    </div>
                    <div class="country-stat">
                        <span class="country">🌍 Others</span>
                        <span class="percentage">17%</span>
                    </div>
                </div>
                <p style="text-align: center; margin-top: 20px; color: var(--text-secondary); font-size: 14px;">
                    <i class="fas fa-info-circle"></i> Real-time visitor analytics powered by custom tracking
                </p>
            `;
        }, 1000);
    }
    
    // Initialize analytics when page loads
    if (document.getElementById('visitor-count')) {
        initializeAnalytics();
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
                </span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    }

    // Add custom cursor effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .work-item, .blog-post');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'pointer';
        });
        
        element.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'default';
        });
    });
    
    // Dark mode toggle (if you want to add this feature later)
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
        });
        
        // Check for saved dark mode preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
    
    console.log('Portfolio website loaded successfully! 🚀');
});

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add scroll performance optimization
const optimizedScroll = throttle(() => {
    // Scroll-based animations and effects go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);