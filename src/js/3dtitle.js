/* ── 3D TILT on projects ── */
document.querySelectorAll('.prj-card').forEach((c) => {
  c.addEventListener('mousemove', (e) => {
    const r = c.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    c.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  c.addEventListener('mouseleave', () => {
    c.style.transition = 'transform .5s ease';
    c.style.transform = '';
    setTimeout(() => (c.style.transition = ''), 500);
  });
});
