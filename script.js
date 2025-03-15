// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Theme switcher functionality
    const toggleSwitch = document.querySelector('#checkbox');
    const html = document.documentElement;
    
    // Check for saved theme preference or use system preference
    function getCurrentTheme() {
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            return savedTheme;
        }
        
        // Check for system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Apply theme based on current preference
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        toggleSwitch.checked = theme === 'dark';
        
        // Update local storage
        localStorage.setItem('theme', theme);
    }
    
    // Initial theme setup
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme);
    
    // Handle theme switch toggle
    toggleSwitch.addEventListener('change', function() {
        const theme = this.checked ? 'dark' : 'light';
        applyTheme(theme);
        
        // Add animation for smooth transition
        const elements = document.querySelectorAll('body, header, section, .project-card, footer');
        
        elements.forEach(el => {
            gsap.fromTo(el, 
                { opacity: 0.8 }, 
                { opacity: 1, duration: 0.5, ease: 'power1.out' }
            );
        });
    });
    
    // Simplified cursor implementation (without cursor-follower)
    const cursor = document.querySelector('.cursor');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isMouseOnPage = true;
    
    // Use requestAnimationFrame for smoother performance
    function updateCursor() {
        if (!isMouseOnPage) {
            requestAnimationFrame(updateCursor);
            return;
        }
        
        // Interpolation for smooth movement
        cursorX += (mouseX - cursorX) * 0.6;
        cursorY += (mouseY - cursorY) * 0.6;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        
        requestAnimationFrame(updateCursor);
    }
    
    // Start the animation loop
    requestAnimationFrame(updateCursor);
    
    // Throttled mouse move event handler
    let lastMoveTime = 0;
    const throttleAmount = 5; // ms
    
    document.addEventListener('mousemove', function(e) {
        const currentTime = Date.now();
        if (currentTime - lastMoveTime < throttleAmount) return;
        
        lastMoveTime = currentTime;
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Hide cursor when leaving the window
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            isMouseOnPage = false;
            gsap.to(cursor, { opacity: 0, duration: 0.2 });
        }
    });
    
    // Show cursor when entering the window
    document.addEventListener('mouseover', function(e) {
        isMouseOnPage = true;
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .slider, .hamburger, .project-card, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.classList.remove('cursor-hover');
        });
    });
    
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;
    
    hamburger.addEventListener('click', function() {
        body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a menu link
    const menuLinks = document.querySelectorAll('.menu-link');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            body.classList.remove('menu-open');
        });
    });
    
    // Animate skill bars when in view
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        const width = skill.style.width;
        skill.style.width = 0;
        
        ScrollTrigger.create({
            trigger: skill,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(skill, {
                    width: width,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            },
            once: true
        });
    });
    
    // Animate section headers when in view
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate project cards when in view
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Animate about content
    gsap.from('.about-image', {
        opacity: 0,
        x: -100,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    gsap.from('.about-text', {
        opacity: 0,
        x: 100,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    // Animate contact section
    gsap.from('.contact-info', {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    gsap.from('.contact-form', {
        opacity: 0,
        x: 50,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission (replace with your actual form handling)
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                alert('Your message has been sent successfully!');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            const currentTheme = html.getAttribute('data-theme');
            const headerBgColor = currentTheme === 'dark' ? 'rgba(18, 18, 18, 0.9)' : 'rgba(255, 255, 255, 0.9)';
            
            header.style.background = headerBgColor;
            header.style.padding = '15px 30px';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'transparent';
            header.style.padding = '30px';
            header.style.boxShadow = 'none';
        }
    });
    
    // Magnetic effect for buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const btnRect = this.getBoundingClientRect();
            const x = e.clientX - btnRect.left;
            const y = e.clientY - btnRect.top;
            
            const centerX = btnRect.width / 2;
            const centerY = btnRect.height / 2;
            
            const moveX = (x - centerX) / 10;
            const moveY = (y - centerY) / 10;
            
            gsap.to(this, {
                x: moveX,
                y: moveY,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
    
    // Initialize animations that should run on page load
    gsap.fromTo('.logo', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2 }
    );
    
    gsap.fromTo('.hamburger', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3 }
    );

    gsap.fromTo('.theme-switch-wrapper', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.25 }
    );
}); 