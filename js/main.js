/* ==========================================================================
   Queen Makeup Artistry - Main Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCustomCursor();
  initFAQAccordion();
  initGSAPAnimations();
});

/* ==========================================================================
   Navigation Menu (Mobile Toggle & Header Scroll Effects)
   ========================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const mainHeader = document.getElementById('mainHeader');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  // Header scroll appearance shift
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   Custom Cursor Tracking
   ========================================================================== */
function initCustomCursor() {
  const cursorCircle = document.getElementById('customCursor');
  const cursorDot = document.getElementById('customCursorDot');
  
  if (!cursorCircle || !cursorDot) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let circleX = 0;
  let circleY = 0;
  
  // Cursor coordinate tracking
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate dot update
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });
  
  // Smooth circular outline tracking using simple interpolation (LERP)
  function lerpCursor() {
    // Lerp rate (0.15 is smooth and laggy enough to create floating/antigravity feel)
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    
    cursorCircle.style.left = `${circleX}px`;
    cursorCircle.style.top = `${circleY}px`;
    
    requestAnimationFrame(lerpCursor);
  }
  lerpCursor();
  
  // Hover elements events listeners
  const interactives = document.querySelectorAll('a, button, .service-select-card, .portfolio-item, .timeslot-btn, .faq-trigger, .filter-btn');
  
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('hovering-interactive');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('hovering-interactive');
    });
  });
}

/* ==========================================================================
   FAQ Accordion Panels
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    
    if (trigger && panel) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close all other panels first
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-panel').style.maxHeight = null;
          }
        });
        
        // Toggle current panel
        if (isOpen) {
          item.classList.remove('active');
          panel.style.maxHeight = null;
        } else {
          item.classList.add('active');
          panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
      });
    }
  });
}

/* ==========================================================================
   GSAP & ScrollTrigger Animations (Spatial/Antigravity Vibe)
   ========================================================================== */
function initGSAPAnimations() {
  // If GSAP library is not loaded, exit silently to avoid console errors
  if (typeof gsap === 'undefined') return;
  
  // Register ScrollTrigger if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // 1. Page Entrance - Hero Animations
  const heroContent = document.getElementById('heroContent');
  const heroBg = document.getElementById('heroBg');
  
  if (heroContent && heroBg) {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    
    tl.fromTo(heroBg, 
      { scale: 1.15, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.8 }
    );
    
    tl.fromTo(heroContent.querySelectorAll('.hero-subtitle, .hero-title, .hero-desc, .hero-btn-group'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15 },
      '-=1.2'
    );
  }

  // 2. ScrollTrigger - Specialties Section Fade-In Grid
  const specialtiesGrid = document.getElementById('specialtiesGrid');
  const specialtiesHeader = document.getElementById('specialtiesHeader');
  
  if (specialtiesGrid && specialtiesHeader && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(specialtiesHeader,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: specialtiesHeader,
          start: 'top 85%'
        }
      }
    );

    gsap.fromTo(specialtiesGrid.querySelectorAll('.specialty-card'),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        scrollTrigger: {
          trigger: specialtiesGrid,
          start: 'top 80%'
        }
      }
    );
  }

  // 3. ScrollTrigger - Lookbook Horizontal slide entrance
  const lookbookCarousel = document.getElementById('lookbookCarousel');
  if (lookbookCarousel && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(lookbookCarousel.querySelectorAll('.lookbook-item'),
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1.2,
        scrollTrigger: {
          trigger: lookbookCarousel,
          start: 'top 80%'
        }
      }
    );
  }

  // 4. ScrollTrigger - About Page content
  const aboutImgFrame = document.getElementById('aboutImgFrame');
  const aboutTextContent = document.getElementById('aboutTextContent');
  
  if (aboutImgFrame && aboutTextContent && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(aboutImgFrame,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: aboutImgFrame,
          start: 'top 80%'
        }
      }
    );
    
    gsap.fromTo(aboutTextContent,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: aboutTextContent,
          start: 'top 80%'
        }
      }
    );
  }

  // 5. ScrollTrigger - Philosophy section pop
  const philosophyBlock = document.getElementById('philosophyBlock');
  if (philosophyBlock && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(philosophyBlock,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        scrollTrigger: {
          trigger: philosophyBlock,
          start: 'top 85%'
        }
      }
    );
  }

  // 6. ScrollTrigger - Travel Map visual graphics
  const mapGraphic = document.getElementById('mapGraphic');
  if (mapGraphic && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo(mapGraphic.querySelectorAll('.map-node'),
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.3,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: mapGraphic,
          start: 'top 80%'
        }
      }
    );
  }
}
