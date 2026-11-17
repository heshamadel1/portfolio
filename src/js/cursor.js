/* ── CURSOR ── */
(() => {
  if (window.matchMedia('(pointer:coarse)').matches) return;
  const dot = document.getElementById('cur-dot'),
    ring = document.getElementById('cur-ring');
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    // trail
    const t = document.createElement('div');
    t.className = 'csr-trail';
    t.style.cssText = `left:${mx}px;top:${my}px;width:5px;height:5px`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 600);
  });
  (function lp() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(lp);
  })();
  document.querySelectorAll('a,button').forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('csr-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('csr-hover'));
  });
})();
