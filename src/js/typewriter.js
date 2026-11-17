/* ── TYPEWRITER ── */
(() => {
  const el = document.getElementById('tw-text');
  if (!el) return;
  const phrases = [
    'Backend Developer',
    'PHP',
    'Laravel',
    'Rest API',
    'Docker',
    'Git',
    'Open to Work 🚀',
  ];
  let pi = 0,
    ci = 0,
    del = false;
  function tick() {
    const p = phrases[pi];
    if (!del) {
      el.textContent = p.slice(0, ++ci);
      if (ci === p.length) {
        del = true;
        setTimeout(tick, 2200);
        return;
      }
      setTimeout(tick, 80);
    } else {
      el.textContent = p.slice(0, --ci);
      if (ci === 0) {
        del = false;
        pi = (pi + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 45);
    }
  }
  setTimeout(tick, 1800);
})();
