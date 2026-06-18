/* ============================================
   GOSHI FOODS - Main Script
   Author: Shan Zafar
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // MENU DATA
  // ==========================================
  const menuData = {
    pizza: [
      { title: 'Margherita', desc: 'San Marzano tomatoes, fresh mozzarella, basil, extra virgin olive oil', price: '$12.99', icon: '🍕' },
      { title: 'Pepperoni', desc: 'Classic pepperoni, mozzarella, house-made tomato sauce, oregano', price: '$14.99', icon: '🍕' },
      { title: 'BBQ Chicken', desc: 'Grilled chicken, caramelized onions, smoky BBQ sauce, cilantro', price: '$16.99', icon: '🍗' },
      { title: 'Quattro Formaggi', desc: 'Mozzarella, gorgonzola, parmesan, fontina, honey drizzle', price: '$15.99', icon: '🧀' },
      { title: 'Truffle Mushroom', desc: 'Wild mushrooms, truffle oil, arugula, parmesan shavings', price: '$18.99', icon: '🍄' },
      { title: 'Spicy Diavola', desc: 'Spicy salami, chili flakes, bell peppers, mozzarella', price: '$14.99', icon: '🌶️' },
    ],
    burger: [
      { title: 'Classic Beef', desc: 'Angus beef patty, cheddar, lettuce, tomato, secret sauce', price: '$11.99', icon: '🍔' },
      { title: 'Chicken Supreme', desc: 'Crispy chicken fillet, coleslaw, pickles, spicy mayo', price: '$13.99', icon: '🍔' },
      { title: 'Double Cheese', desc: 'Two beef patties, double cheddar, bacon jam, caramelized onions', price: '$15.99', icon: '🧀' },
      { title: 'Veggie Delight', desc: 'Black bean patty, avocado, sprouts, chipotle sauce', price: '$10.99', icon: '🥬' },
      { title: 'BBQ Bacon', desc: 'Beef patty, smoked bacon, onion rings, BBQ ranch', price: '$14.99', icon: '🥓' },
      { title: 'Mushroom Swiss', desc: 'Beef patty, sautéed mushrooms, Swiss cheese, garlic aioli', price: '$13.99', icon: '🍄' },
    ],
    shawarma: [
      { title: 'Chicken Shawarma', desc: 'Marinated chicken, garlic sauce, pickles, fries wrapped in pita', price: '$9.99', icon: '🌯' },
      { title: 'Beef Shawarma', desc: 'Tender beef strips, tahini sauce, grilled veggies, herbs', price: '$11.99', icon: '🌯' },
      { title: 'Mixed Shawarma', desc: 'Chicken & beef combo, special sauce, fresh greens', price: '$12.99', icon: '🥩' },
      { title: 'Shawarma Wrap', desc: 'Classic wrap with your choice of meat, veggies & sauce', price: '$8.99', icon: '🫓' },
      { title: 'Shawarma Plate', desc: 'Served with rice, grilled veggies, salad & garlic sauce', price: '$13.99', icon: '🍽️' },
      { title: 'Spicy Shawarma', desc: 'Extra spicy chicken, jalapeños, hot sauce, crunchy slaw', price: '$10.99', icon: '🌶️' },
    ],
  };

  // ==========================================
  // RENDER MENU
  // ==========================================
  const menuGrid = document.getElementById('menuGrid');
  const menuTabs = document.querySelectorAll('.menu-tab');

  function renderMenu(category) {
    const items = menuData[category];
    menuGrid.innerHTML = '';
    items.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.style.animationDelay = `${index * 0.1}s`;
      card.innerHTML = `
        <div class="menu-card-image">${item.icon}</div>
        <div class="menu-card-category">${category}</div>
        <h3 class="menu-card-title">${item.title}</h3>
        <p class="menu-card-desc">${item.desc}</p>
        <div class="menu-card-footer">
          <span class="menu-card-price">${item.price}</span>
          <button class="menu-card-order" data-item="${item.title}">
            <span>Order</span>
            <i class="fas fa-plus"></i>
          </button>
        </div>
      `;
      menuGrid.appendChild(card);
    });
  }

  function switchTab(category) {
    menuTabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.menu-tab[data-category="${category}"]`).classList.add('active');
    renderMenu(category);
    // Stagger animation
    document.querySelectorAll('.menu-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 80);
    });
  }

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;
      switchTab(category);
    });
  });

  // Initial render
  renderMenu('pizza');

  // ==========================================
  // STICKY NAVBAR
  // ==========================================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ==========================================
  // MOBILE MENU TOGGLE
  // ==========================================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // ==========================================
  // ACTIVE NAV LINK ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // SCROLL REVEAL (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // COUNTER ANIMATION
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.dataset.count);
        animateCounter(target, countTo);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = current;
    }, 25);
  }

  // ==========================================
  // TESTIMONIAL CAROUSEL
  // ==========================================
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  const prevBtn = document.querySelector('.testimonial-btn.prev');
  const nextBtn = document.querySelector('.testimonial-btn.next');
  const cards = document.querySelectorAll('.testimonial-card');
  let currentSlide = 0;
  const totalSlides = cards.length;

  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot';
    dot.setAttribute('aria-label', `Testimonial ${index + 1}`);
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.testimonial-dot');

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  }

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Auto-play
  let autoplay = setInterval(nextSlide, 5000);

  track.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.addEventListener('mouseleave', () => {
    autoplay = setInterval(nextSlide, 5000);
  });

  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoplay);
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    autoplay = setInterval(nextSlide, 5000);
  }, { passive: true });

  // ==========================================
  // CONTACT FORM
  // ==========================================
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
      btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
      contactForm.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });

  // ==========================================
  // FOOTER MENU LINKS
  // ==========================================
  document.querySelectorAll('.footer-links a[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.dataset.category;
      document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => switchTab(category), 600);
    });
  });

  // ==========================================
  // PARALLAX SCROLL HERO
  // ==========================================
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-container');
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
      heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  });

});
