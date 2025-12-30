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
<<<<<<< ours
=======

  // Animated background (particles + hex drift)
  const canvas = document.querySelector('.hero-canvas');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext('2d');
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    let raf;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 0.3 + 0.05,
      alpha: Math.random() * 0.6 + 0.2
    }));

    const hexes = Array.from({ length: 16 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 16 + 8,
      drift: (Math.random() * 0.4 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
      alpha: Math.random() * 0.25 + 0.08
    }));

    const drawHex = (x, y, size, alpha) => {
      const angle = Math.PI / 3;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const px = x + size * Math.cos(angle * i);
        const py = y + size * Math.sin(angle * i);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach(s => {
        ctx.fillStyle = `rgba(34,211,238,${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.y += s.speed;
        if (s.y > height) s.y = -2;
      });

      tick += 0.004;
      hexes.forEach(h => {
        const wobble = Math.sin(tick + h.x * 0.01) * 6;
        drawHex(h.x + wobble, h.y, h.size, h.alpha);
        h.y += h.drift * 0.6;
        if (h.y < -20) h.y = height + 20;
        if (h.y > height + 20) h.y = -20;
      });

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(render);
    });
  }
>>>>>>> theirs
});
