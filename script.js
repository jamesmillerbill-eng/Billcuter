document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');

  // Smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Header background transition on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(12, 30, 42, 0.95)';
      header.style.backdropFilter = 'blur(10px)';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      header.style.padding = '16px 60px';
    } else {
      header.style.background = 'transparent';
      header.style.backdropFilter = 'none';
      header.style.boxShadow = 'none';
      header.style.padding = '24px 60px';
    }
  });

  // Chat widget interaction
  const chatWidget = document.getElementById('chatWidget');
  if (chatWidget) {
    chatWidget.addEventListener('click', () => {
      alert('Thank you for reaching out to BillCuter! Chat support is opening shortly.');
    });
  }
  // Video Play Interaction
  const playButton = document.querySelector('.play-button');
  const videoWrapper = document.querySelector('.video-thumbnail-wrapper');
  if (playButton && videoWrapper) {
    playButton.addEventListener('click', (e) => {
      e.stopPropagation();
      videoWrapper.innerHTML = `
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/_qY0f_H3qgs?autoplay=1" 
                title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen style="position: absolute; top:0; left:0; width:100%; height:100%; border:none;">
        </iframe>
      `;
    });
  }

  // Testimonial Carousel Interaction
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const viewport = document.querySelector('.carousel-viewport');

  if (track && cards.length > 0 && dots.length > 0 && viewport) {
    let currentIndex = 1; // Start with Shannon (second card, index 1) active

    function updateCarousel() {
      const viewportWidth = viewport.offsetWidth;
      const card = cards[currentIndex];
      const cardWidth = card.offsetWidth;
      const gap = 32; // Gap in pixels

      // Calculate the center of the active card relative to the track's start
      const cardLeft = currentIndex * (cardWidth + gap);
      const cardCenter = cardLeft + cardWidth / 2;

      // Calculate shift to center the card in the viewport
      const shift = viewportWidth / 2 - cardCenter;

      // Apply translation to track
      track.style.transform = `translateX(${shift}px)`;

      // Update active states on cards
      cards.forEach((c, idx) => {
        if (idx === currentIndex) {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });

      // Update active states on dots
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    // Attach click events to dots
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        currentIndex = idx;
        updateCarousel();
      });
    });

    // Handle window resize to keep active card centered
    window.addEventListener('resize', updateCarousel);

    // Initial position setup
    setTimeout(updateCarousel, 150);
  }

  // Registration & Success Modal Handling
  const registerModal = document.getElementById('registerModal');
  const successModal = document.getElementById('successModal');
  const registerForm = document.getElementById('registerForm');
  const closeRegisterModal = document.getElementById('closeRegisterModal');
  const closeSuccessModal = document.getElementById('closeSuccessModal');

  // Intercept signup/login/CTA links to display registration modal
  const ctaSelectors = [
    'a[href="#signup"]',
    'a[href="#login"]',
    'a[href="#request-call"]',
    'a[href="#partner-login"]',
    '.btn-signup',
    '.btn-login',
    '.btn-cta',
    '.btn-request-call',
    '.btn-signup-footer',
    '.btn-login-footer',
    '.btn-partner-footer'
  ];
  document.querySelectorAll(ctaSelectors.join(', ')).forEach(link => {
    // Exclude close buttons and links inside modals
    if (link.closest('#registerModal') || link.closest('#successModal')) {
      return;
    }

    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (registerModal) {
        registerModal.style.display = 'flex';
        setTimeout(() => {
          registerModal.classList.add('active');
        }, 10);
      }
    });
  });

  // Close Register Modal function
  function hideRegisterModal() {
    if (registerModal) {
      registerModal.classList.remove('active');
      setTimeout(() => {
        registerModal.style.display = 'none';
      }, 300);
    }
  }

  // Close Success Modal function
  function hideSuccessModal() {
    if (successModal) {
      successModal.classList.remove('active');
      setTimeout(() => {
        successModal.style.display = 'none';
      }, 300);
    }
  }

  // Register Close Buttons & Overlay clicks
  if (closeRegisterModal) {
    closeRegisterModal.addEventListener('click', hideRegisterModal);
  }
  if (registerModal) {
    registerModal.addEventListener('click', (e) => {
      if (e.target === registerModal) {
        hideRegisterModal();
      }
    });
  }

  if (closeSuccessModal) {
    closeSuccessModal.addEventListener('click', hideSuccessModal);
  }
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        hideSuccessModal();
      }
    });
  }

  // Keypress event (Escape key to close modals)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hideRegisterModal();
      hideSuccessModal();
    }
  });

  // Handle Form Submission with success popup
  if (registerForm && registerModal && successModal) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const fullName = document.getElementById('regFullName').value;
      const email = document.getElementById('regEmail').value;
      const phone = document.getElementById('regPhone').value;
      const password = document.getElementById('regPassword').value;

      // Google Apps Script Web App URL (User to replace this placeholder)
      const GOOGLE_SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyJd5WeWnWXu4sLD5GHGZEjV3828K-fZ2-6jsfyJ2T7FDp7u0qpAwHxKTKDUspkc_8p/exec';

      // Submit data to Google Sheet
      if (GOOGLE_SHEET_SCRIPT_URL && GOOGLE_SHEET_SCRIPT_URL.startsWith('https://')) {
        fetch(GOOGLE_SHEET_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Prevents CORS redirect blocking issues 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fullName: fullName,
            email: email,
            phone: phone,
            password: password
          })
        })
          .then(() => {
            console.log('Registration data submitted to Google Sheets.');
          })
          .catch((error) => {
            console.error('Error submitting data to Google Sheets:', error);
          });
      } else {
        console.warn('Google Sheets Apps Script URL is not set. Data was not saved.');
      }

      // Close the registration modal
      registerModal.classList.remove('active');
      setTimeout(() => {
        registerModal.style.display = 'none';

        // Reset inputs
        registerForm.reset();

        // Show success modal
        successModal.style.display = 'flex';
        setTimeout(() => {
          successModal.classList.add('active');
        }, 10);

        // Auto-close success modal after 4 seconds
        setTimeout(() => {
          hideSuccessModal();
        }, 4000);
      }, 300);
    });
  }

  // FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-answer').style.maxHeight = null;
          }
        });
        
        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });
});

