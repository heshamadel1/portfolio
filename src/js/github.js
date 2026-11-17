(async () => {
  const u = 'heshamadel1';

  const colors = {
    // Backend
    PHP: '#777BB4',
    Laravel: '#FF2D20',
    Docker: '#2496ED',

    // Databases
    MySQL: '#4479A1',
    PostgreSQL: '#336791',

    // Frontend
    React: '#61DAFB',
    'React.js': '#61DAFB',
    'Next.js': '#FFFFFF',
    JavaScript: '#f8e347',
    TypeScript: '#3178C6',
    HTML: '#E34C26',
    CSS: '#563D7C',

    // Development
    Python: '#2496ED',
    Framework: '#A78BFA',
    default: '#FA8112',
  };

  // Reveal Observer
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  try {
    const res = await fetch(
      `https://api.github.com/users/${u}/repos?per_page=6&sort=updated&type=public`,
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const repos = await res.json();

    const load = document.getElementById('gh-load');
    const out = document.getElementById('gh-out');
    const cont = document.getElementById('gh-repos');

    load.style.display = 'none';
    out.style.display = 'block';

    // Clear previous repositories
    cont.replaceChildren();

    if (!Array.isArray(repos) || !repos.length) {
      cont.innerHTML = `
        <p style="color:var(--c-t2);font-size:.9rem;grid-column:1/-1">
          No public repositories yet.
          <a href="https://github.com/${u}"
             target="_blank"
             rel="noopener"
             style="color:var(--c-ind-l)">
            View on GitHub →
          </a>
        </p>
      `;
      return;
    }

    repos.forEach((rp, i) => {
      const lang = rp.language || '';
      const col = colors[lang] || colors.default;

      const a = document.createElement('a');

      a.href = rp.html_url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';

      // No "on" class initially
      a.className = 'gh-repo rv' + (i ? ` d${Math.min(i, 5)}` : '');

      a.setAttribute('aria-label', `GitHub repository: ${rp.name}`);

      a.innerHTML = `
        <div class="gh-rh">
          <div class="gh-rn">
            <i class="fa-solid fa-code-branch fa-xs"
               style="margin-right:5px;opacity:.4"
               aria-hidden="true"></i>
            ${rp.name}
          </div>
          <span class="gh-rb">
            ${rp.private ? 'Private' : 'Public'}
          </span>
        </div>

        <div class="gh-rd">
          ${rp.description || 'No description provided.'}
        </div>

        <div class="gh-rm">
          ${
            lang
              ? `
                <span>
                  <span class="gh-ld"
                        style="background:${col}"
                        aria-hidden="true"></span>
                  ${lang}
                </span>
              `
              : ''
          }

          <span>
            <i class="fa-regular fa-star fa-xs"
               aria-hidden="true"></i>
            ${rp.stargazers_count}
          </span>

          <span>
            <i class="fa-solid fa-code-fork fa-xs"
               aria-hidden="true"></i>
            ${rp.forks_count}
          </span>
        </div>
      `;

      cont.appendChild(a);

      // Observe each repository
      obs.observe(a);
    });
  } catch (error) {
    const load = document.getElementById('gh-load');

    load.innerHTML = `
      <p style="color:var(--c-t2);font-size:.85rem;font-family:var(--fm)">
        Couldn't load repos.
        <a href="https://github.com/${u}"
           target="_blank"
           rel="noopener"
           style="color:var(--c-ind-l)">
          View on GitHub →
        </a>
      </p>
    `;

    console.error('GitHub API Error:', error);
  }
})();
