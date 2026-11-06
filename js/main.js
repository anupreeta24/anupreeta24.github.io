/* ==========================================================================
   main.js: content rendering, nav, scroll effects, animations
   ========================================================================== */
(function () {
  "use strict";

  const MOBILE_BREAKPOINT = 768;
  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Copy email button ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for non-secure contexts (e.g. opening the file locally)
    return new Promise((resolve, reject) => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      ok ? resolve() : reject(new Error("copy failed"));
    });
  }

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    const status = btn.parentElement.querySelector("[data-copy-status]");
    let timer = null;
    btn.addEventListener("click", () => {
      copyText(btn.dataset.copy)
        .then(() => {
          btn.textContent = "Copied ✓";
          btn.classList.add("is-copied");
          if (status) status.textContent = "Email address copied to clipboard";
        })
        .catch(() => {
          btn.textContent = "Copy failed";
          if (status) status.textContent = "Copy failed, select the email to copy it";
        })
        .finally(() => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            btn.textContent = "Copy";
            btn.classList.remove("is-copied");
            if (status) status.textContent = "";
          }, 2000);
        });
    });
  });

  /* ==========================================================================
     EDUCATION: edit entries here, they render into #education-list
     ========================================================================== */
  const EDUCATION = [
    {
      degree: "Master of Science, Data Analytics Engineering",
      school: "Northeastern University",
      location: "Boston, MA",
      dates: "Sep 2024 - Aug 2026", 
      coursework: ["Data Warehousing", "Data Storytelling", "Generative AI"],
    },
    {
      degree: "Bachelor of Engineering, Information Technology",
      school: "Pune University", 
      location: "Pune, India",   
      dates: "Aug 2020 - May 2024",         
      coursework: ["Data Science", "Statistics", "Business Analytics & Intelligence"],
    },
  ];

  const CAP_ICON = `
    <svg class="edu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z"/>
      <path d="M6 11.3v4.2c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.2"/>
      <path d="M22 9.5v5"/>
    </svg>`;

  const escapeHTML = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[c]);

  function renderEducation() {
    const list = document.getElementById("education-list");
    if (!list) return;
    list.innerHTML = EDUCATION.map((e) => `
      <article class="edu-card">
        ${CAP_ICON}
        <h3 class="edu-degree">${escapeHTML(e.degree)}</h3>
        <p class="edu-school">${escapeHTML(e.school)} · ${escapeHTML(e.location)}</p>
        <p class="edu-dates">${escapeHTML(e.dates)}</p>
        <ul class="tags" aria-label="Relevant coursework">
          ${e.coursework.map((c) => `<li class="tag">${escapeHTML(c)}</li>`).join("")}
        </ul>
      </article>`).join("");
  }

  renderEducation();

  /* ==========================================================================
     SKILLS: edit groups here, they render into #skills-grid
     color: one of chart-1 ... chart-6
     ========================================================================== */
  const SKILLS = [
    {
      title: "Languages & Analysis",
      color: "chart-1",
      items: ["SQL", "Python", "R", "PostgreSQL", "MySQL", "NoSQL", "Firestore", "Pandas", "NumPy", "SciPy", "Scikit-learn", "XGBoost", "TensorFlow", "Git/GitHub", "Jupyter Notebooks"],
    },
    {
      title: "BI & Visualization",
      color: "chart-2",
      items: ["Tableau", "Power BI", "Excel (Pivot Tables, Lookups, VBA)", "Datawrapper", "Flourish", "Matplotlib", "Seaborn", "Plotly", "Streamlit", "Exploratory Data Analysis (EDA)"],
    },
    {
      title: "Data Engineering",
      color: "chart-3",
      items: ["Snowflake", "ETL/ELT", "dbt", "OLTP/OLAP", "Data Modeling", "Talend", "Airflow", "PySpark", "FastAPI", "REST APIs"],
    },
    {
      title: "AI & Cloud",
      color: "chart-4",
      items: ["AWS", "GCP", "API", "LLMs", "Prompt Engineering", "LangChain", "LangGraph", "RAG", "Pinecone", "Hugging Face"],
    },
  ];

  function renderSkills() {
    const grid = document.getElementById("skills-grid");
    if (!grid) return;
    grid.innerHTML = SKILLS.map((g, i) => `
      <article class="skill-card reveal" style="--c: var(--${escapeHTML(g.color)}); --delay: ${i * 0.1}s">
        <span class="skill-bar" aria-hidden="true"></span>
        <h3 class="skill-title">${escapeHTML(g.title)}</h3>
        <ul class="tags">
          ${g.items.map((s) => `<li class="tag">${escapeHTML(s)}</li>`).join("")}
        </ul>
      </article>`).join("");
  }

  renderSkills();

  /* ==========================================================================
     EXPERIENCE: newest first, renders into #timeline
     Numbers in bullets (7, 30+, 2M+, 12K, 45%) are highlighted automatically.
     To highlight any other phrase, wrap it in **double asterisks**.
     ========================================================================== */
  const EXPERIENCE = [
    {
      role: "Data Science Intern",
      company: "MyEdMaster",
      location: "Boston, MA",
      dates: "Jan 2026 to Apr 2026",
      bullets: [
        "Built LLM extraction pipeline normalizing unstructured intake text into typed, analyzable fields",
        "Shipped 7 API endpoints on GCP ingesting 30+ variables into one analysis-ready dataset",
        "Ensured data accuracy by catching schema regressions pre-deployment with 3 integration test suites",
        "Eliminated silent data loss during outages by queuing failed writes and replaying them on recovery",
      ],
      tags: ["Python", "SQL", "LLMs", "GCP", "REST APIs", "Firestore"],
    },
    {
      role: "Research Assistant",
      company: "MMCOE",
      location: "Pune, India",
      dates: "Sep 2023 to Mar 2024",
      bullets: [
        "Analyzed 2M+ e-learning platform logs for 12K students using Pandas and SQL to study engagement and academic performance",
        "Built Tableau dashboards tracking weekly engagement and performance across 6 departments",
        "Supported faculty research through literature review, data collection, and analysis using Python and Excel",
      ],
      tags: ["Python", "Pandas", "SQL", "Tableau", "Excel"],
    },
    {
      role: "Data Analyst Intern",
      company: "VASP Solutions",
      location: "Pune, India",
      dates: "Feb 2023 to Jun 2023",
      bullets: [
        "Delivered Power BI dashboards for non-technical stakeholders, translating requirements into KPI definitions",
        "Maintained detailed documentation of data sources, lineage, and column definitions for reporting teams",
        "Troubleshot data quality issues by flagging duplicate, null, and out-of-range values at ingestion",
        "Cut a multi-hour weekly reporting cycle to **under one hour** through scheduled Excel-VBA automation",
      ],
      tags: ["Power BI", "SQL", "Excel", "VBA", "Data Quality", "KPI Design"],
    },
  ];

  // Escape, then highlight **phrases** and standalone numbers (with K/M/B, +, %)
  function highlight(text) {
    return escapeHTML(text)
      .split(/(\*\*.+?\*\*)/g)
      .map((part) =>
        part.startsWith("**") && part.endsWith("**")
          ? `<span class="hl">${part.slice(2, -2)}</span>`
          : part.replace(/\b\d+(?:[.,]\d+)*(?:[KMB]\b)?\+?%?/g, '<span class="hl">$&</span>')
      )
      .join("");
  }

  function renderExperience() {
    const list = document.getElementById("timeline");
    if (!list) return;
    list.innerHTML = EXPERIENCE.map((e) => `
      <li class="timeline-item">
        <span class="timeline-node" aria-hidden="true"></span>
        <article class="exp-card">
          <div class="exp-head">
            <h3 class="exp-role">${escapeHTML(e.role)}</h3>
            <p class="exp-dates">${escapeHTML(e.dates)}</p>
          </div>
          <p class="exp-company">${escapeHTML(e.company)} · ${escapeHTML(e.location)}</p>
          <ul class="exp-bullets">
            ${e.bullets.map((b) => `<li>${highlight(b)}</li>`).join("")}
          </ul>
          <ul class="tags" aria-label="Tools used">
            ${e.tags.map((t) => `<li class="tag">${escapeHTML(t)}</li>`).join("")}
          </ul>
        </article>
      </li>`).join("");
  }

  renderExperience();

  /* ==========================================================================
     PROJECTS: data lives in js/projects.js (PROJECTS array)
     ========================================================================== */
  const GITHUB_ICON = `
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/>
    </svg>`;

  // Long metric values ("80% → 87.5%") shrink to fit their column: CSS makes
  // a first estimate from --chars, then fitMetrics() measures and fine-tunes.
  const metricChars = (v) => Math.max(String(v).length, 3);

  function fitMetrics(root = document) {
    root.querySelectorAll(".project-metric-value, .pp-metric-value").forEach((el) => {
      if (!el.offsetParent) return; // hidden (filtered out): fit when shown
      el.style.fontSize = "";
      el.style.overflowWrap = "";
      const min = el.classList.contains("pp-metric-value") ? 20 : 11;
      let size = parseFloat(getComputedStyle(el).fontSize);
      let guard = 0;
      while (el.scrollWidth > el.clientWidth + 0.5 && size > min && guard++ < 80) {
        size -= 0.5;
        el.style.fontSize = `${size}px`;
      }
      // Last resort on extremely narrow screens: allow the value to wrap
      if (el.scrollWidth > el.clientWidth + 0.5) el.style.overflowWrap = "anywhere";
    });
  }

  let fitFrame = null;
  const refitMetrics = () => {
    cancelAnimationFrame(fitFrame);
    fitFrame = requestAnimationFrame(() => fitMetrics());
  };
  window.addEventListener("resize", refitMetrics);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => fitMetrics());

  function renderProjects() {
    const grid = document.getElementById("projects-grid");
    if (!grid || typeof PROJECTS === "undefined") return;
    grid.innerHTML = PROJECTS.map((p) => `
      <article class="project-card" data-category="${escapeHTML(p.category)}" data-featured="${p.featured ? "true" : "false"}">
        <div class="project-top">
          <span class="project-category">${escapeHTML(p.category)}</span>
          ${p.github ? `<a data-goatcounter-click="github-click" class="project-gh" href="${escapeHTML(p.github)}" target="_blank" rel="noopener" aria-label="${escapeHTML(p.title)} on GitHub">${GITHUB_ICON}</a>` : ""}
        </div>
        <h3 class="project-title">${escapeHTML(p.title)}</h3>
        <p class="project-summary">${escapeHTML(p.summary)}</p>
        <ul class="project-metrics">
          ${p.metrics.slice(0, 3).map((m) => `
            <li>
              <span class="project-metric-value" style="--chars: ${metricChars(m.value)}">${escapeHTML(m.value)}</span>
              <span class="project-metric-label">${escapeHTML(m.label)}</span>
            </li>`).join("")}
        </ul>
        <ul class="tags" aria-label="Tech used">
          ${p.tags.map((t) => `<li class="tag">${escapeHTML(t)}</li>`).join("")}
        </ul>
        <a class="project-link" href="project.html?id=${encodeURIComponent(p.id)}">Read the build <span class="arrow" aria-hidden="true">→</span></a>
      </article>`).join("");
  }

  renderProjects();

  /* ---------- Project filters + "View all" ----------
     "All" shows featured projects only, until "View all N projects" is
     clicked. A category filter shows every project in that category and
     hides the toggle. */
  function initProjectView() {
    const grid = document.getElementById("projects-grid");
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll(".project-card"));
    const buttons = Array.from(document.querySelectorAll(".filter-btn"));
    const toggle = document.getElementById("projects-toggle");
    const FADE = prefersReducedMotion() ? 0 : 180;
    const stagger = (i) => `${((i % 2) + Math.floor(i / 2)) * 0.1}s`;
    const isFeatured = (c) => c.dataset.featured === "true";
    const hasFeatured = cards.some(isFeatured);
    const hasExtras = cards.some((c) => !isFeatured(c));

    let filter = "all";
    let expanded = false;
    let timer = null;

    // If nothing is marked featured, "All" simply shows everything
    const shouldShow = (c) =>
      filter === "all" ? expanded || isFeatured(c) || !hasFeatured : c.dataset.category === filter;

    function updateToggle() {
      if (!toggle) return;
      toggle.hidden = !(filter === "all" && hasFeatured && hasExtras);
      toggle.textContent = expanded ? "Show fewer" : `View all ${cards.length} projects`;
      toggle.setAttribute("aria-expanded", String(expanded));
    }

    // Initial state: visible cards join the section's staggered reveal
    let shown = 0;
    cards.forEach((c) => {
      const show = shouldShow(c);
      c.hidden = !show;
      if (show) {
        c.classList.add("reveal");
        c.style.setProperty("--delay", stagger(shown++));
      }
    });
    updateToggle();

    // Fade-up for cards revealed by "View all"
    function fadeIn(list) {
      list.forEach((c, i) => {
        c.hidden = false;
        if (prefersReducedMotion()) return;
        c.classList.add("reveal");
        c.style.setProperty("--delay", stagger(i));
      });
      fitMetrics(grid);
      if (prefersReducedMotion()) return;
      void grid.offsetWidth; // commit the hidden start state before animating
      requestAnimationFrame(() => list.forEach(showReveal));
    }

    if (toggle) {
      toggle.addEventListener("click", () => {
        expanded = !expanded;
        if (expanded) {
          fadeIn(cards.filter((c) => c.hidden && shouldShow(c)));
        } else {
          // Keep the button under the pointer while the grid shrinks
          const before = toggle.getBoundingClientRect().top;
          cards.forEach((c) => { if (!shouldShow(c)) c.hidden = true; });
          const after = toggle.getBoundingClientRect().top;
          window.scrollBy({ top: after - before, behavior: "instant" });
        }
        updateToggle();
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("is-active")) return;
        filter = btn.dataset.filter;
        expanded = false;
        buttons.forEach((b) => {
          const on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", String(on));
        });

        clearTimeout(timer);
        grid.classList.add("is-filtering");
        timer = setTimeout(() => {
          cards.forEach((c) => { c.hidden = !shouldShow(c); });
          fitMetrics(grid);
          updateToggle();
          grid.classList.remove("is-filtering");
        }, FADE);
      });
    });
  }

  initProjectView();

  /* ==========================================================================
     PROJECT DEEP DIVE (project.html?id=...)
     ========================================================================== */
  const ARCH_COLORS = ["chart-5", "chart-3", "chart-4", "chart-2", "chart-1"];

  const CHECK_ICON = `
    <svg class="pp-check" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4.5 12.5l5 5L19.5 7"/>
    </svg>`;

  const ARROW_ICON = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 12h15M14 7l5 5-5 5"/>
    </svg>`;

  function renderProjectPage() {
    const root = document.getElementById("project-root");
    if (!root) return;

    const list = typeof PROJECTS !== "undefined" ? PROJECTS : [];
    const id = new URLSearchParams(window.location.search).get("id");
    const index = list.findIndex((p) => p.id === id);

    if (index === -1) {
      document.title = "Project not found · Anupreeta";
      root.innerHTML = `
        <section class="pp-notfound">
          <span class="section-label">404 / Project</span>
          <h1 class="pp-title">Project not found</h1>
          <p class="pp-summary">That project doesn't exist or the link has changed. The rest of my work is just one click away.</p>
          <a class="btn btn-primary btn-lg" href="index.html#projects">← Back to projects</a>
        </section>`;
      return;
    }

    const p = list[index];
    const next = list[(index + 1) % list.length];
    const esc = escapeHTML;

    document.title = `${p.title} · Anupreeta`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", p.summary);

    const steps = (p.architecture || []).map((s, i) => `
      ${i > 0 ? `<li class="arch-arrow" aria-hidden="true">${ARROW_ICON}</li>` : ""}
      <li class="arch-step" style="--c: var(--${ARCH_COLORS[i % ARCH_COLORS.length]})">
        <div class="arch-head">
          <span class="arch-node" aria-hidden="true"></span>
          <span class="arch-num">${String(i + 1).padStart(2, "0")}</span>
        </div>
        <h3 class="arch-title">${esc(s.title)}</h3>
        <p class="arch-detail">${esc(s.detail)}</p>
      </li>`).join("");


    root.innerHTML = `
      <a class="pp-back" href="index.html#projects"><span class="arrow" aria-hidden="true">←</span> Back to projects</a>

      <header class="reveal">
        <span class="section-label">${esc(p.category)}</span>
        <h1 class="pp-title">${esc(p.title)}</h1>
        <p class="pp-summary">${esc(p.summary)}</p>
        ${p.github || p.liveLink ? `
        <div class="pp-actions">
          ${p.github ? `<a data-goatcounter-click="github-click" class="btn btn-primary btn-lg" href="${esc(p.github)}" target="_blank" rel="noopener">View on GitHub</a>` : ""}
          ${p.liveLink ? `<a class="btn btn-outline btn-lg" href="${esc(p.liveLink)}" target="_blank" rel="noopener">View live dashboard</a>` : ""}
        </div>` : ""}
      </header>

      <ul class="pp-metrics reveal" aria-label="Key results">
        ${(p.metrics || []).slice(0, 3).map((m) => `
          <li class="pp-metric">
            <span class="pp-metric-value" style="--chars: ${metricChars(m.value)}">${esc(m.value)}</span>
            <span class="pp-metric-label">${esc(m.label)}</span>
          </li>`).join("")}
      </ul>

      ${p.problem ? `
      <section class="pp-block reveal">
        <h2>The Problem</h2>
        <p>${esc(p.problem)}</p>
      </section>` : ""}

      ${steps ? `
      <section class="pp-block reveal">
        <h2>Architecture</h2>
        <ol class="arch-flow">${steps}</ol>
      </section>` : ""}

      ${p.approach ? `
      <section class="pp-block reveal">
        <h2>My Approach</h2>
        <p>${esc(p.approach)}</p>
      </section>` : ""}

      ${p.results && p.results.length ? `
      <section class="pp-block reveal">
        <h2>Results</h2>
        <ul class="pp-results">
          ${p.results.map((r) => `<li>${CHECK_ICON}<span>${highlight(r)}</span></li>`).join("")}
        </ul>
      </section>` : ""}

      ${p.learnings ? `
      <section class="pp-block reveal">
        <h2>What I Learned</h2>
        <div class="pp-learn"><p>${esc(p.learnings)}</p></div>
      </section>` : ""}

      ${p.screenshot ? `
      <section class="pp-block reveal" aria-label="Screenshot">
        <figure class="pp-shot"><img src="${esc(p.screenshot)}" alt="Screenshot of ${esc(p.title)}" loading="lazy"></figure>
      </section>` : ""}

      <section class="pp-block reveal">
        <div class="mono-label">Tech used</div>
        <ul class="tags">
          ${(p.tags || []).map((t) => `<li class="tag">${esc(t)}</li>`).join("")}
        </ul>
      </section>

      ${list.length > 1 ? `
      <nav class="pp-next" aria-label="Next project">
        <a href="project.html?id=${encodeURIComponent(next.id)}">
          <span class="pp-next-label">Next project <span class="arrow" aria-hidden="true">→</span></span>
          <span class="pp-next-title">${esc(next.title)}</span>
        </a>
      </nav>` : ""}`;
  }

  renderProjectPage();
  fitMetrics();

  /* ==========================================================================
     ONE SHARED "ONCE IN VIEW" OBSERVER
     Drives every scroll-triggered effect: section/element reveals, staggered
     groups and timeline items. Each element registers a
     callback; it fires once when the element enters the viewport.
     ========================================================================== */
  const inViewCallbacks = new WeakMap();
  const inViewObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const cb = inViewCallbacks.get(entry.target);
              inViewObserver.unobserve(entry.target);
              inViewCallbacks.delete(entry.target);
              if (cb) cb(entry.target);
            });
          },
          // threshold 0 + bottom margin: fires when the top edge is 8% into
          // the viewport, which also works for elements taller than the screen.
          { threshold: 0, rootMargin: "0px 0px -8% 0px" }
        )
      : null;

  function onceInView(el, cb) {
    if (!inViewObserver || prefersReducedMotion()) {
      cb(el);
      return;
    }
    inViewCallbacks.set(el, cb);
    inViewObserver.observe(el);
  }

  /* ---------- Reveal ----------
     .reveal                 fades up 20px on its own
     [data-reveal-group]     reveals all its .reveal children at once
                             (each child staggers via its --delay)        */
  function showReveal(t) {
    t.classList.add("is-visible");
    if (prefersReducedMotion() || t.hidden) {
      t.classList.remove("reveal", "is-visible");
      return;
    }
    // After the fade, drop the reveal classes so hover transforms work normally
    const done = (e) => {
      if (e.target !== t) return; // ignore transitions bubbling from children
      t.removeEventListener("transitionend", done);
      t.classList.remove("reveal", "is-visible");
      t.style.removeProperty("--delay");
    };
    t.addEventListener("transitionend", done);
  }

  function initReveal() {
    document.querySelectorAll("[data-reveal-group]").forEach((group) => {
      onceInView(group, (g) => g.querySelectorAll(".reveal").forEach(showReveal));
    });
    document.querySelectorAll(".reveal").forEach((el) => {
      if (!el.closest("[data-reveal-group]")) onceInView(el, showReveal);
    });
  }

  /* ---------- Timeline: slide cards in and fill nodes ---------- */
  function initTimeline() {
    document.querySelectorAll(".timeline-item").forEach((item) => {
      onceInView(item, (el) => el.classList.add("is-visible"));
    });
  }

  initReveal();
  initTimeline();

  /* ---------- Hero: rotating role ----------
     Each role shows ~2s, then swaps with a 0.4s slide/fade. Pauses while the
     tab is hidden. With reduced motion, CSS shows the static line instead. */
  function initRoleRotator() {
    const words = Array.from(document.querySelectorAll(".role-rotator .role-word"));
    if (words.length < 2 || prefersReducedMotion()) return;

    const HOLD = 2000;
    const SWAP = 400;
    let index = 0;
    let timer = null;

    function next() {
      const current = words[index];
      index = (index + 1) % words.length;
      const incoming = words[index];
      current.classList.remove("is-active");
      current.classList.add("is-leaving");
      incoming.classList.add("is-active");
      // Once the old word has left, park it below again (invisible) for its next turn
      setTimeout(() => current.classList.remove("is-leaving"), SWAP);
      schedule();
    }

    function schedule() {
      clearTimeout(timer);
      timer = setTimeout(next, HOLD + SWAP);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearTimeout(timer);
      else schedule();
    });

    schedule();
  }

  initRoleRotator();

  /* ---------- Headshot ----------
     Set data-photo="assets/headshot.jpg" on .photo-frame in index.html and the
     image replaces the "A" initial. Left empty, nothing is requested (no 404). */
  document.querySelectorAll(".photo-frame[data-photo]").forEach((frame) => {
    const src = frame.dataset.photo.trim();
    if (!src) return;
    const img = new Image();
    img.alt = frame.dataset.photoAlt || "";
    img.decoding = "async";
    img.onload = () => frame.appendChild(img);
    img.src = src;
  });

  /* ---------- Back to top ---------- */
  const toTop = document.querySelector(".to-top");
  const heroEl = document.getElementById("hero");

  function updateToTop() {
    if (!toTop) return;
    const threshold = heroEl ? heroEl.offsetHeight * 0.9 : 600;
    const show = window.scrollY > threshold;
    toTop.classList.toggle("is-visible", show);
    toTop.tabIndex = show ? 0 : -1;
  }

  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      const logo = document.querySelector(".nav-logo");
      if (logo) logo.focus({ preventScroll: true });
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Scroll progress bar ---------- */
  const progress = document.querySelector(".scroll-progress");
  let ticking = false;

  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    progress.style.transform = `scaleX(${ratio})`;
    updateToTop();
    ticking = false;
  }

  if (progress) {
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateProgress);
          ticking = true;
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("mobile-menu");

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
  }

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close when any link in the menu is clicked
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    // Close on Escape, on outside click, and when resizing to desktop
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth >= MOBILE_BREAKPOINT) setMenu(false);
    });
  }

  /* ---------- Active section highlighting ---------- */
  // Only runs on pages whose nav links point at same-page anchors (index.html).
  const links = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  const sectionIds = [...new Set(links.map((a) => a.getAttribute("href").slice(1)))];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function setActive(id) {
    links.forEach((a) => {
      const match = a.getAttribute("href") === `#${id}`;
      a.classList.toggle("is-active", match);
      if (match) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    // A section counts as "on screen" when it crosses a thin band
    // a little above the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));

    // Clear highlight when back up in the hero
    const hero = document.getElementById("hero");
    if (hero) {
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(null);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      ).observe(hero);
    }
  }

  /* ---------- Hero pipeline animation ---------- */
  initPipeline();

  function initPipeline() {
    const card = document.querySelector(".pipeline");
    if (!card) return;

    const flow = card.querySelector(".pipeline-flow");
    const dot = card.querySelector(".pipeline-dot");
    const fill = card.querySelector(".pipeline-fill");
    const metrics = card.querySelector(".pipeline-metrics");
    const stages = Array.from(card.querySelectorAll(".stage"));
    const nodes = stages.map((s) => s.querySelector(".stage-node"));

    const TRAVEL = 5000; // ms for the dot to go from stage 1 to stage 5
    const HOLD = 1800;   // ms everything stays lit before the reset
    const CYCLE = TRAVEL + HOLD;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let nodeYs = [];
    let startY = 0;
    let endY = 0;
    let rafId = null;
    let t0 = null;
    let inView = true;

    // Measure node centers relative to the flow container
    function measure() {
      const base = flow.getBoundingClientRect().top;
      nodeYs = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return r.top - base + r.height / 2;
      });
      startY = nodeYs[0];
      endY = nodeYs[nodeYs.length - 1];
      flow.style.setProperty("--track-top", `${startY}px`);
      flow.style.setProperty("--track-h", `${endY - startY}px`);
    }

    function render(y, done) {
      dot.style.transform = `translateY(${y}px)`;
      fill.style.height = `${y - startY}px`;
      stages.forEach((s, i) => s.classList.toggle("is-lit", y >= nodeYs[i] - 0.5));
      metrics.classList.toggle("is-visible", done);
      card.classList.toggle("is-holding", done);
    }

    function frame(now) {
      if (t0 === null) t0 = now;
      const t = (now - t0) % CYCLE;
      const p = Math.min(t / TRAVEL, 1);
      render(startY + (endY - startY) * p, p >= 1);
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (rafId !== null || reduceMotion.matches || !inView) return;
      card.classList.remove("is-static");
      card.classList.add("is-running");
      t0 = null; // restart cleanly from stage 1
      rafId = requestAnimationFrame(frame);
    }

    function stop() {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    }

    function setStatic() {
      stop();
      card.classList.remove("is-running", "is-holding");
      card.classList.add("is-static");
      stages.forEach((s) => s.classList.add("is-lit"));
      metrics.classList.add("is-visible");
    }

    function applyMotionPreference() {
      if (reduceMotion.matches) {
        setStatic();
      } else {
        stages.forEach((s) => s.classList.remove("is-lit"));
        metrics.classList.remove("is-visible");
        start();
      }
    }

    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    if ("ResizeObserver" in window) new ResizeObserver(measure).observe(flow);
    else window.addEventListener("resize", measure);

    // Pause when the card is off screen or the tab is hidden
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      }).observe(card);
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else start();
    });

    if (reduceMotion.addEventListener) reduceMotion.addEventListener("change", applyMotionPreference);
    applyMotionPreference();
  }
})();
