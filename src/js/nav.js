/* ── NAV ── */
const nav = document.getElementById('nav');
const ham = document.getElementById('ham');
const panel = document.getElementById('npanel');
function closePanel() {
  ham.classList.remove('open');
  panel.classList.remove('open');
  ham.setAttribute('aria-expanded', 'false');
  panel.setAttribute('aria-hidden', 'true');
}
ham.addEventListener('click', () => {
  const open = !ham.classList.contains('open');
  ham.classList.toggle('open', open);
  panel.classList.toggle('open', open);
  ham.setAttribute('aria-expanded', open);
  panel.setAttribute('aria-hidden', !open);
});
document.getElementById('nclose').addEventListener('click', closePanel);
document.querySelectorAll('.n-panel a').forEach((l) => l.addEventListener('click', closePanel));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePanel();
});
