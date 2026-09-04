/**
 * CBC Website - Mobile Navigation, Dropdowns, Hero Slider, Testimonials & Interactions
 * Enhanced for luxury aesthetics, touch devices, and responsive layout.
 */
(function() {
  'use strict';

  function initMobileNav() {
    var hamburger = document.querySelector('.Nav-module__gOObGW__hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    var nav = document.querySelector('.Nav-module__gOObGW__nav');

    if (!hamburger || !mobileMenu) return;

    // Toggle menu open/close
    function toggleMenu(forceOpen) {
      var isOpen = mobileMenu.classList.contains('Nav-module__gOObGW__open');
      var shouldOpen = forceOpen !== undefined ? forceOpen : !isOpen;

      if (shouldOpen) {
        hamburger.classList.add('Nav-module__gOObGW__active');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('Nav-module__gOObGW__open');
        document.body.style.overflow = 'hidden';
      } else {
        hamburger.classList.remove('Nav-module__gOObGW__active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('Nav-module__gOObGW__open');
        document.body.style.overflow = '';
      }
    }

    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking outside menu or clicking any standard link
    mobileMenu.addEventListener('click', function(e) {
      var link = e.target.closest('a');
      if (link) {
        // Let link navigate or scroll, and close menu
        toggleMenu(false);
      }
    });

    // ESC key closes menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('Nav-module__gOObGW__open')) {
        toggleMenu(false);
      }
    });

    // Handle Mobile Accordion Dropdowns for Events and Roadmap
    var dropdownContainers = mobileMenu.querySelectorAll('div[style*="flex-direction:column"], .cbc-mobile-dropdown');
    dropdownContainers.forEach(function(container) {
      var titleSpan = container.querySelector('span.Nav-module__gOObGW__mobileLink, .cbc-dropdown-trigger');
      var subMenu = container.querySelector('.Nav-module__gOObGW__mobileSubMenu, .cbc-dropdown-submenu');

      if (titleSpan && subMenu) {
        container.classList.add('cbc-mobile-dropdown');
        titleSpan.classList.add('cbc-dropdown-trigger');
        subMenu.classList.add('cbc-dropdown-submenu');

        // Add chevron if not already present
        if (!titleSpan.querySelector('.cbc-chevron')) {
          var chevron = document.createElement('span');
          chevron.className = 'cbc-chevron';
          chevron.innerHTML = ' ▾';
          titleSpan.appendChild(chevron);
        }

        // Make trigger look and act clickable
        titleSpan.style.cursor = 'pointer';
        titleSpan.setAttribute('role', 'button');
        titleSpan.setAttribute('tabindex', '0');
        titleSpan.setAttribute('aria-expanded', 'false');

        function toggleSubMenu(e) {
          e.preventDefault();
          e.stopPropagation();
          var isExpanded = subMenu.classList.contains('cbc-submenu-open');
          if (isExpanded) {
            subMenu.classList.remove('cbc-submenu-open');
            titleSpan.classList.remove('cbc-trigger-active');
            titleSpan.setAttribute('aria-expanded', 'false');
          } else {
            subMenu.classList.add('cbc-submenu-open');
            titleSpan.classList.add('cbc-trigger-active');
            titleSpan.setAttribute('aria-expanded', 'true');
          }
        }

        titleSpan.addEventListener('click', toggleSubMenu);
        titleSpan.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleSubMenu(e);
          }
        });
      }
    });

    // Desktop/Tablet Navbar dropdown touch support
    var desktopDropdowns = document.querySelectorAll('.Nav-module__gOObGW__dropdown');
    desktopDropdowns.forEach(function(dd) {
      var trigger = dd.querySelector('.Nav-module__gOObGW__navLink');
      var menu = dd.querySelector('.Nav-module__gOObGW__dropdownMenu');
      if (trigger && menu) {
        trigger.addEventListener('click', function(e) {
          // On mobile or touch devices, toggle dropdown
          if (window.innerWidth <= 1024 || ('ontouchstart' in window)) {
            var href = trigger.getAttribute('href');
            // If it has subitems, toggle menu on touch
            if (menu.style.display === 'flex' || dd.classList.contains('cbc-dd-open')) {
              dd.classList.remove('cbc-dd-open');
            } else {
              e.preventDefault();
              dd.classList.add('cbc-dd-open');
            }
          }
        });
      }
    });

    // Close desktop dropdown when clicking elsewhere
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.Nav-module__gOObGW__dropdown')) {
        desktopDropdowns.forEach(function(dd) {
          dd.classList.remove('cbc-dd-open');
        });
      }
    });
  }

  // Hero Slider Auto-rotation & Touch Swipe
  function initHeroSlider() {
    var hero = document.getElementById('hero');
    if (!hero) return;

    var slides = hero.querySelectorAll('.HeroSlider-module__AAVTfG__slide');
    var dots = hero.querySelectorAll('.HeroSlider-module__AAVTfG__dot');
    var arrows = hero.querySelectorAll('.HeroSlider-module__AAVTfG__arrow');
    var prevBtn = arrows[0];
    var nextBtn = arrows[1];

    if (slides.length <= 1) return;

    var currentIdx = 0;
    // Find active slide index if set in HTML
    slides.forEach(function(s, idx) {
      if (s.classList.contains('HeroSlider-module__AAVTfG__active')) {
        currentIdx = idx;
      }
    });

    function showSlide(newIdx) {
      if (newIdx < 0) newIdx = slides.length - 1;
      if (newIdx >= slides.length) newIdx = 0;

      slides.forEach(function(slide, idx) {
        if (idx === newIdx) {
          slide.classList.add('HeroSlider-module__AAVTfG__active');
          slide.classList.remove('HeroSlider-module__AAVTfG__exit');
          slide.setAttribute('aria-hidden', 'false');
        } else if (idx === currentIdx) {
          slide.classList.remove('HeroSlider-module__AAVTfG__active');
          slide.classList.add('HeroSlider-module__AAVTfG__exit');
          slide.setAttribute('aria-hidden', 'true');
        } else {
          slide.classList.remove('HeroSlider-module__AAVTfG__active');
          slide.classList.remove('HeroSlider-module__AAVTfG__exit');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      dots.forEach(function(dot, idx) {
        if (idx === newIdx) {
          dot.classList.add('HeroSlider-module__AAVTfG__dotActive');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('HeroSlider-module__AAVTfG__dotActive');
          dot.setAttribute('aria-selected', 'false');
        }
      });

      currentIdx = newIdx;
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        showSlide(currentIdx + 1);
        resetTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        showSlide(currentIdx - 1);
        resetTimer();
      });
    }

    dots.forEach(function(dot, idx) {
      dot.addEventListener('click', function() {
        showSlide(idx);
        resetTimer();
      });
    });

    // Touch Swipe Gestures for Mobile
    var touchStartX = 0;
    var touchStartY = 0;
    var touchEndX = 0;
    var touchEndY = 0;

    hero.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    hero.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      var diffX = touchEndX - touchStartX;
      var diffY = touchEndY - touchStartY;
      // Ensure horizontal swipe is dominant and > 40px
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          // Swiped left -> next slide
          showSlide(currentIdx + 1);
          resetTimer();
        } else {
          // Swiped right -> prev slide
          showSlide(currentIdx - 1);
          resetTimer();
        }
      }
    }

    // Auto-advance every 6 seconds
    var timer = null;
    function startTimer() {
      timer = setInterval(function() {
        showSlide(currentIdx + 1);
      }, 6000);
    }

    function resetTimer() {
      if (timer) clearInterval(timer);
      startTimer();
    }

    startTimer();
  }

  // Testimonials Slider Initialization & Touch Swipe
  function initTestimonialsSlider() {
    var track = document.getElementById('test-track');
    var prevBtn = document.getElementById('test-prev-btn');
    var nextBtn = document.getElementById('test-next-btn');
    var wrap = document.getElementById('test-track-wrap');

    if (!track) return;

    var idx = 0;
    function getCards() {
      return track.querySelectorAll('blockquote');
    }

    function getVisibleCards() {
      return window.innerWidth < 768 ? 1 : 2;
    }

    function updateSlider() {
      var cards = getCards();
      if (!cards.length) return;
      var cardWidth = cards[0].getBoundingClientRect().width + 20;
      var maxIdx = Math.max(0, cards.length - getVisibleCards());
      idx = Math.max(0, Math.min(idx, maxIdx));
      track.style.transform = 'translateX(-' + (idx * cardWidth) + 'px)';

      if (prevBtn) prevBtn.disabled = (idx <= 0);
      if (nextBtn) nextBtn.disabled = (idx >= maxIdx);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        var maxIdx = Math.max(0, getCards().length - getVisibleCards());
        idx = (idx >= maxIdx) ? 0 : idx + 1;
        updateSlider();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        var maxIdx = Math.max(0, getCards().length - getVisibleCards());
        idx = (idx <= 0) ? maxIdx : idx - 1;
        updateSlider();
      });
    }

    // Touch Swipe Gestures
    var tStartX = 0;
    var tEndX = 0;
    track.addEventListener('touchstart', function(e) {
      tStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', function(e) {
      tEndX = e.changedTouches[0].screenX;
      var diff = tEndX - tStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0 && nextBtn) nextBtn.click();
        else if (diff > 0 && prevBtn) prevBtn.click();
      }
    }, { passive: true });

    window.addEventListener('resize', updateSlider, { passive: true });
    updateSlider();
  }

  // Gallery Lightbox Controller
  function initGalleryLightbox() {
    var gallery = document.getElementById('gallery');
    if (!gallery) return;

    var lightbox = gallery.querySelector('.GallerySection-module__a5c5NG__lightbox');
    var closeBtn = gallery.querySelector('.GallerySection-module__a5c5NG__closeBtn');
    var content = gallery.querySelector('.GallerySection-module__a5c5NG__lightboxContent');
    var items = gallery.querySelectorAll('.GallerySection-module__a5c5NG__item img');

    if (!lightbox || !content) return;

    items.forEach(function(img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function() {
        var existingImg = content.querySelector('img');
        if (existingImg) existingImg.remove();

        var bigImg = document.createElement('img');
        bigImg.src = img.src;
        bigImg.alt = img.alt || 'CBC Moment';
        bigImg.style.maxWidth = '90vw';
        bigImg.style.maxHeight = '80vh';
        bigImg.style.objectFit = 'contain';
        bigImg.style.borderRadius = '8px';
        bigImg.style.border = '1px solid rgba(201,149,76,0.4)';
        bigImg.style.boxShadow = '0 20px 50px rgba(0,0,0,0.9)';
        content.appendChild(bigImg);

        lightbox.classList.add('GallerySection-module__a5c5NG__open');
        lightbox.style.display = 'flex';
        lightbox.style.visibility = 'visible';
        lightbox.style.opacity = '1';
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('GallerySection-module__a5c5NG__open');
      lightbox.style.display = 'none';
      lightbox.style.visibility = 'hidden';
      lightbox.style.opacity = '0';
      document.body.style.overflow = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('GallerySection-module__a5c5NG__open')) {
        closeLightbox();
      }
    });
  }

  // Smooth in-page anchor scrolling offset for fixed header
  function initSmoothAnchors() {
    document.addEventListener('click', function(e) {
      var a = e.target.closest('a[href*="#"]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href) return;

      var hash = href.substring(href.indexOf('#'));
      if (hash.length > 1) {
        var target = document.querySelector(hash);
        if (target) {
          // If we're on the same page
          var pagePath = window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
          var linkPath = href.substring(0, href.indexOf('#')).replace(/index\.html$/, '').replace(/\/$/, '');

          if (linkPath === '' || linkPath === pagePath || linkPath === '/') {
            e.preventDefault();
            var topPos = target.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({
              top: topPos,
              behavior: 'smooth'
            });
          }
        }
      }
    });
  }

  // Execute on DOMContentLoaded or immediately if already loaded
  function initAll() {
    initMobileNav();
    initHeroSlider();
    initTestimonialsSlider();
    initGalleryLightbox();
    initSmoothAnchors();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
