/* ==========================================================================
   Queen Makeup Artistry - Gallery Portfolio & Lightbox
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('portfolioGrid')) {
    initGalleryPortfolio();
  }
});

function initGalleryPortfolio() {
  const portfolioGrid = document.getElementById('portfolioGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');
  
  // ==========================================================================
  // Category Filter Logic (GSAP Animated Transitions)
  // ==========================================================================
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states on buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterCategory = btn.getAttribute('data-filter');
      
      if (typeof gsap !== 'undefined') {
        // High-end GSAP filter transition
        const tl = gsap.timeline();
        
        // Phase 1: Animate all elements out
        tl.to(portfolioItems, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          stagger: 0.05,
          onComplete: () => {
            // Show/Hide DOM nodes based on category selection
            portfolioItems.forEach(item => {
              const itemCategory = item.getAttribute('data-category');
              if (filterCategory === 'all' || itemCategory === filterCategory) {
                item.style.display = 'block';
              } else {
                item.style.display = 'none';
              }
            });
          }
        });
        
        // Phase 2: Animate filtered items back in with staggering
        tl.to(portfolioItems, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.05,
          // Only animate elements that are visible now
          modifiers: {
            display: (val, target) => {
              return target.style.display;
            }
          }
        });
      } else {
        // Basic CSS fallback if GSAP is unavailable
        portfolioItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          if (filterCategory === 'all' || itemCategory === filterCategory) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      }
    });
  });

  // ==========================================================================
  // Lightbox Modal Functionality
  // ==========================================================================
  if (lightboxModal && lightboxImg) {
    // Open Lightbox
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const src = item.getAttribute('data-src');
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');
        
        lightboxImg.src = src;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
      });
    });
    
    // Close Lightbox button click
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on click outside image
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
    
    // Close on ESC key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
  
  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scroll
    
    // Clear elements source after transition to prevent flashes next open
    setTimeout(() => {
      lightboxImg.src = '';
    }, 400);
  }
}
