/* ── COUNTERS ── */
let cntOk = false;
new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting || cntOk) return;
      cntOk = true;
      document.querySelectorAll('[data-count]').forEach((el) => {
        const t = +el.dataset.count,
          dur = 1400,
          s = performance.now();
        (function step(n) {
          const p = Math.min((n - s) / dur, 1),
            ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(ease * t) + '+';
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = t + '+';
        })(s);
      });
    });
  },
  { threshold: 0.5 },
).observe(document.querySelector('.h-stats'));
