// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => animateOnScroll.observe(el));

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const navbarBg = document.getElementById('navbar-bg');
  

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Parallax effect for hero section
  const heroSection = document.getElementById('home');
  const heroImage = heroSection?.querySelector('img');
  
  // Performance optimized scroll handler
  const handleScroll = () => {
    const scrolled = window.scrollY;

    // Navbar scroll effect
    if (scrolled > 50) {
      navbarBg.classList.add('bg-slate-900/95', 'shadow-lg', 'backdrop-blur-md');
      navbarBg.classList.remove('backdrop-blur-sm');
      navbar.classList.add('navbar-scrolled');
    } else {
      navbarBg.classList.remove('bg-slate-900/95', 'shadow-lg', 'backdrop-blur-md');
      navbarBg.classList.add('backdrop-blur-sm');
      navbar.classList.remove('navbar-scrolled');
    }

    // Parallax effect for hero section
    if (heroImage) {
      const rate = scrolled * -0.5;
      heroImage.style.transform = `translateY(${rate}px)`;
    }
  };

  const optimizedScrollHandler = debounce(handleScroll, 16); // ~60fps
  window.addEventListener('scroll', optimizedScrollHandler);

  // Typing animation for hero text
  const heroHeading = document.querySelector('#hero-heading');
  if (heroHeading) {
    const text = heroHeading.textContent;
    heroHeading.textContent = '';
    heroHeading.style.borderRight = '2px solid #10b981';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroHeading.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          heroHeading.style.borderRight = 'none';
        }, 1000);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }

  // Floating animation for cards
  const cards = document.querySelectorAll('.floating-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

  // Stagger animation for lists
  const staggerLists = document.querySelectorAll('.stagger-animation');
  staggerLists.forEach(list => {
    const items = list.children;
    Array.from(items).forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  });

  // Progress bar animation for skills
  const progressBars = document.querySelectorAll('.progress-bar');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percentage = bar.dataset.percentage;
        bar.style.width = percentage + '%';
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => progressObserver.observe(bar));

  // Magnetic effect for buttons
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  // Reveal animation for text
  const revealTexts = document.querySelectorAll('.reveal-text');
  revealTexts.forEach(text => {
    const words = text.textContent.split(' ');
    text.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    
    const wordSpans = text.querySelectorAll('.word');
    wordSpans.forEach((word, index) => {
      word.style.animationDelay = `${index * 0.1}s`;
    });
  });

  // Particle effect for background
  createParticles();
});

// Particle system
function createParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particle-container';
  document.body.prepend(particleContainer);

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particleContainer.appendChild(particle);
  }
}

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
