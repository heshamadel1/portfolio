/* ── PARTICLES ── */
(() => {
  const cv = document.getElementById('bgcvs'),
    ctx = cv.getContext('2d');
  let W,
    H,
    pts = [];
  const rsz = () => {
    W = cv.width = innerWidth;
    H = cv.height = innerHeight;
  };
  rsz();
  addEventListener('resize', rsz);
  for (let i = 0; i < 90; i++)
    pts.push({
      x: Math.random() * 2400,
      y: Math.random() * 1600,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.14,
      r: Math.random() * 0.7 + 0.2,
      a: Math.random() * 0.3 + 0.07,
    });
  (function frame() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,102,241,${p.a * 0.22})`;
      ctx.fill();
    });
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 100) * 0.04})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    requestAnimationFrame(frame);
  })();
})();
