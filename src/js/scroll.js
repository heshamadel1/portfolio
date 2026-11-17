/* ── SCROLL: progress + nav + back-to-top ── */
const spFill = document.getElementById('sp-fill');
const btt = document.getElementById('btt');
const navLinks = document.querySelectorAll('.n-links a');
const sections = ['about', 'skills', 'projects', 'experience', 'github', 'education', 'contact'];
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    // progress
    const pct = (scrollY / (document.body.scrollHeight - innerHeight)) * 100;
    spFill.style.width = pct + '%';
    // back to top
    btt.classList.toggle('show', scrollY > 400);
    // nav scrolled
    nav.classList.toggle('scrolled', scrollY > 60);
    // active link
    let current = '';
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < innerHeight * 0.4) current = id;
    });
    navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
    ticking = false;
  });
}
addEventListener('scroll', onScroll, { passive: true });

btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── SCROLL REVEAL + BARS ── */
let barsOk = false;
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('on');
      if (e.target.id === 'about-bars' && !barsOk) {
        barsOk = true;
        setTimeout(
          () =>
            e.target
              .querySelectorAll('.bar-fill')
              .forEach((f, i) => setTimeout(() => f.classList.add('go'), i * 160)),
          300,
        );
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll('.rv,.tl-item').forEach((el) => obs.observe(el));
