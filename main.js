document.addEventListener('DOMContentLoaded', () => {
  const revealables = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealables.forEach(el => observer.observe(el));

  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = document.querySelector(btn.getAttribute('data-scroll'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
    answer.addEventListener('transitionend', () => {
      if (!item.classList.contains('open')) answer.scrollTop = 0;
    });
  });

  const reviews = Array.from(document.querySelectorAll('.review-card'));
  let reviewIndex = 0;
  const activateReview = (index) => {
    reviews.forEach((card, i) => card.classList.toggle('active', i === index));
  };
  const cycle = () => {
    reviewIndex = (reviewIndex + 1) % reviews.length;
    activateReview(reviewIndex);
  };
  let interval = setInterval(cycle, 4200);
  reviews.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => {
      clearInterval(interval);
      activateReview(idx);
    });
    card.addEventListener('mouseleave', () => {
      reviewIndex = idx;
      interval = setInterval(cycle, 4200);
    });
  });
});
