import { renderInstallation } from "./installation.mjs";
import { products, phases } from "./products.mjs";
export const escape = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export const icon = (kind = "grid") =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${{ grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>', terminal: '<rect x="2.5" y="4" width="19" height="16" rx="3"/><path d="m7 9 3 3-3 3m6 0h4"/>', layers: '<path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5"/>', git: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-4a3.5 3.5 0 0 0-1-2.7c3.3-.4 6.8-1.6 6.8-7.3a5.6 5.6 0 0 0-1.5-3.9A5.2 5.2 0 0 0 20.1.3S18.9-.1 16 1.8a13.7 13.7 0 0 0-7 0C6.1-.1 4.9.3 4.9.3a5.2 5.2 0 0 0-.2 3.8A5.6 5.6 0 0 0 3.2 8c0 5.7 3.5 6.9 6.8 7.3A3.5 3.5 0 0 0 9 18v4"/>', check: '<path d="m5 12 4 4L19 6"/>', pause: '<path d="M9 5v14M15 5v14"/>', spark: '<path d="m12 2 2.7 7.3L22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2Z"/>' }[kind] ?? ""}</svg>`;
const mark = (base) =>
  `<img class="brand-mark" src="${base}assets/images/aikya-mark.svg" width="32" height="32" alt=""><span>Aikya<span class="brand-period">.</span></span>`;
export function layout({
  title,
  description,
  base = "./",
  route = "",
  body,
  active = "",
}) {
  return `<!doctype html><html lang="en" data-motion="paused"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(title)} · Aikya</title><meta name="description" content="${escape(description)}"><meta name="theme-color" content="#0b1f44"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'"><link rel="canonical" href="https://jlema0590.github.io/aikya-page/${route}"><meta property="og:title" content="${escape(title)} · Aikya"><meta property="og:description" content="${escape(description)}"><meta property="og:type" content="website"><link rel="icon" type="image/svg+xml" href="${base}assets/images/aikya-mark.svg"><link rel="preload" href="${base}assets/fonts/outfit.ttf" as="font" type="font/ttf" crossorigin><link rel="stylesheet" href="${base}assets/style.css"><script type="module" src="${base}assets/app.mjs"></script></head><body><a class="skip-link" href="#main">Skip to content</a><div class="page-shell"><header class="site-header"><a class="brand" href="${base}" aria-label="Aikya home">${mark(base)}</a><nav aria-label="Main navigation"><a href="${base}#ecosystem" ${active === "products" ? 'aria-current="page"' : ""}>Ecosystem</a><a href="${base}guides/comparison/" ${active === "compare" ? 'aria-current="page"' : ""}>Compare</a><a href="${base}guides/get-started/" ${active === "start" ? 'aria-current="page"' : ""}>Documentation</a></nav><a class="header-github" href="https://github.com/jlema0590/aikya-page">${icon("git")}<span>GitHub</span></a></header><main id="main">${body}</main><footer class="site-footer"><div><a class="brand" href="${base}" aria-label="Aikya home">${mark(base)}</a><p>Independent tools.<br> One connected ecosystem.</p></div><div class="footer-links"><p>Explore Aikya</p>${products.map((p) => `<a href="${base}products/${p.id}/">${p.name}</a>`).join("")}</div><div class="footer-links"><p>Build with context</p><a href="${base}guides/get-started/">Get started</a><a href="${base}guides/comparison/">Compare products</a><a href="https://github.com/jlema0590/aikya-page">Website source</a></div><div class="footer-bottom"><span>Open source. Built with intention.</span><span>© 2026 Aikya</span></div></footer></div></body></html>`;
}
function flowArt() {
  return `<div class="hero-visual"><div class="visual-caption"><span class="small-rule"></span>Independent tools. Shared intent.</div><div class="orbital"><svg class="flow-art" viewBox="0 0 580 450" role="img" aria-label="An illustrated connection between the three independent Aikya products"><defs><linearGradient id="thread" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0fb3f1"/><stop offset="1" stop-color="#1fccba"/></linearGradient></defs><circle class="orbit-guide" cx="290" cy="220" r="180"/><circle class="orbit-guide second" cx="290" cy="220" r="145"/><circle class="connection-path" cx="290" cy="220" r="162"/><image class="hero-brand-mark" href="./assets/images/aikya-mark.svg" x="195" y="50" width="205" height="205" preserveAspectRatio="xMidYMid meet"/><g class="flow-particle"><circle cx="470" cy="220" r="5"/></g><g class="flow-particle particle-two"><circle cx="290" cy="75" r="4"/></g><g class="flow-particle particle-three"><circle cx="145" cy="220" r="3"/></g></svg><button class="visual-product product-harness" data-product="harness" aria-pressed="true">${icon("layers")}<span>Harness</span></button><button class="visual-product product-forge" data-product="forge" aria-pressed="false">${icon("terminal")}<span>Forge</span></button><button class="visual-product product-mods" data-product="mods" aria-pressed="false">${icon("grid")}<span>Mods</span></button></div><div class="preview-panel"><div class="window-bar"><span class="window-dots"><i></i><i></i><i></i></span><span>Workflow illustration</span><span class="window-symbol">⌘</span></div><div class="preview-content"><p class="preview-label">Product preview</p><h3 data-product-name>Aikya Harness</h3><p data-product-description>${products[0].preview}</p><a class="text-link" data-product-link href="products/harness/">Explore this product</a></div></div><button class="motion-button" aria-label="Pause animation" data-motion-toggle hidden>${icon("pause")}<span data-motion-label>Pause animation</span></button></div>`;
}
export function homepage() {
  return layout({
    title: "From intent to evidence",
    description:
      "Explore Aikya Harness, Forge and Mods. Independent tools for AI-assisted engineering, project context and visible workflows.",
    body: `<section class="hero"><div class="hero-copy"><p class="intro-line">The Aikya ecosystem</p><h1>From intent<br> to evidence.</h1><p class="hero-description">Bring structure to AI-assisted engineering.<br> Keep your project in context, your workflow explicit, and your next step clear.</p><div class="button-row"><a class="button primary" href="#ecosystem">Explore the ecosystem</a><a class="button quiet" href="guides/get-started/">Find your starting point</a></div><p class="hero-footnote"><span class="mini-mark">${icon("spark")}</span>Built around your work. Kept close to your project.</p></div>${flowArt()}</section><section class="ecosystem section" id="ecosystem"><div class="section-heading"><div><p class="section-label">Choose how you work</p><h2>One ecosystem.<br> Three independent tools.</h2></div><p>Start where you need support.<br> Each product has its own purpose,<br> repository and release cycle.</p></div><div class="product-grid">${products.map((p) => `<article class="product-summary"><div class="product-top"><span class="product-icon">${icon(p.id === "harness" ? "layers" : p.id === "forge" ? "terminal" : "grid")}</span><span class="product-kind">${p.tag}</span></div><h3>${p.name}</h3><p class="product-description">${p.description}</p><div class="mini-preview ${p.id}" aria-hidden="true">${p.id === "harness" ? '<span class="mini-command">/aikya-analyze</span><span class="mini-step"><i></i>Explore <b>Complete</b></span><span class="mini-step"><i></i>Plan <b>Approved</b></span><span class="mini-step current"><i></i>Implement <b>In progress</b></span>' : p.id === "forge" ? '<span class="mini-command">aikya</span><span class="mini-terminal">Project &amp; Git <i>main</i></span><span class="mini-terminal">Agents <i>Claude · Codex</i></span><span class="mini-terminal">Local memory <i>Project scope</i></span>' : '<span class="mini-command">Claude Code + Aikya Mods</span><span class="mini-step"><i></i>Flow <b>Phase views</b></span><span class="mini-step"><i></i>Usage <b>Observed data</b></span><span class="mini-step"><i></i>BoxBot <b>Optional</b></span>'}</div><p class="illustration-note">Illustrative interface</p><div class="product-chips">${p.chips.map((c) => `<span>${c}</span>`).join("")}</div><a class="text-link product-link" href="products/${p.id}/">Explore ${p.short}</a></article>`).join("")}</div></section><section class="workflow-section section"><div class="workflow-copy"><p class="section-label">A deliberate way to build</p><h2>Move the work forward.<br> Keep the reasoning.</h2><p>Aikya’s engineering workflows make each phase visible, from exploring a codebase to reviewing the result. Decisions, approvals and evidence keep their own place.</p><a class="text-link" href="guides/comparison/">See how the products fit</a></div><div class="workflow-illustration"><div class="workflow-title"><span>Engineering workflow</span><span class="example-label">Illustration</span></div><ol class="phase-list">${phases.map((phase, i) => `<li class="${i < 2 ? "complete" : i === 2 ? "active" : "pending"}"><span class="phase-symbol">${i < 2 ? "✓" : i === 2 ? "◐" : "○"}</span><span>${phase}</span><small>${i < 2 ? "Complete" : i === 2 ? "In progress" : "Next"}</small></li>`).join("")}</ol><p class="illustration-note">An example flow, not a live execution or test result.</p></div></section><section class="principles section"><div class="section-heading"><div><p class="section-label">The work stays connected</p><h2>Context you can return to.</h2></div><p>Tools should help you understand<br> what changed and why.</p></div><div class="principles-grid"><article><span class="principle-icon">${icon("layers")}</span><h3>Start with the project</h3><p>Harness and Forge keep project context and local knowledge close to the code you are working on.</p></article><article><span class="principle-icon">${icon("check")}</span><h3>Make the steps explicit</h3><p>Methodology, checks and review have distinct roles. A diagram or a generated file does not certify success.</p></article><article><span class="principle-icon">${icon("grid")}</span><h3>See what is observed</h3><p>Available phase and usage evidence is shown as such. Missing information stays visible, too.</p></article></div></section><section class="closing-banner"><div><p class="section-label">Your next step</p><h2>Find your place<br> in the flow.</h2></div><div><p>Already use Claude Code? Start with Harness.<br> Prefer a dedicated terminal? Explore Forge.<br> Want more visibility? Look at Mods.</p><a class="button primary" href="guides/get-started/">Get started with Aikya</a></div></section>`,
  });
}
export function productPage(product) {
  const p = product;
  return layout({
    base: "../../",
    route: `products/${p.id}/`,
    active: "products",
    title: p.name,
    description: p.description,
    body: `<section class="detail-hero section"><a class="breadcrumb" href="../../#ecosystem">Aikya ecosystem / ${p.short}</a><p class="section-label">${p.kind}</p><h1>${p.name}</h1><p class="detail-headline">${p.headline}</p><p class="detail-description">${p.description}</p><div class="button-row"><a class="button primary" href="#installation">Installation</a><a class="button quiet" href="${p.repo}">View repository</a></div><div class="availability ${p.id === "forge" ? "pending-release" : ""}"><span>${p.availability}</span><p>${p.note}</p></div></section><section id="installation" class="section product-installation">${renderInstallation(p, escape)}</section><section class="feature-section section"><div class="section-heading"><h2>What you can do</h2><a class="text-link" href="${p.repo}#readme">Read the documentation</a></div><div class="feature-grid">${p.features.map(([title, body], i) => `<article><span class="feature-glyph">${icon(["layers", "terminal", "grid", "check"][i])}</span><h3>${title}</h3><p>${body}</p></article>`).join("")}</div></section><section class="product-detail-bottom section"><div><p class="section-label">Before you begin</p><h2>Your environment,<br> your workflow.</h2><p>${p.requirements}</p></div><div class="source-panel"><p class="section-label">Keep the version in view</p><h3>Follow the official release.</h3><p>${p.note}</p><a class="text-link" href="${p.release}">View releases</a><a class="text-link" href="../../guides/comparison/">Compare with the other products</a></div></section>`,
  });
}
export function comparison() {
  return layout({
    base: "../../",
    route: "guides/comparison/",
    active: "compare",
    title: "Compare the products",
    description:
      "Find the right Aikya product for Claude Code workflows, a dedicated terminal or workflow visibility.",
    body: `<section class="detail-hero section"><p class="section-label">A shared ecosystem, distinct purposes</p><h1>Find the right fit.</h1><p class="detail-description">Harness and Forge are independent products. Mods are optional Claude Code extensions. Choose the environment that fits your work.</p></section><section class="section compare-section"><div class="table-scroll"><table><caption>Aikya products at a glance</caption><thead><tr><th scope="col">Your question</th>${products.map((p) => `<th scope="col">${p.name}</th>`).join("")}</tr></thead><tbody>${[
      [
        "Where does it run?",
        "Inside the Claude Code workflow",
        "An independent Pi-based terminal",
        "Inside compatible Claude Code",
      ],
      [
        "What is it for?",
        "Engineering structure and project workflows",
        "Terminal workflows, project context and controlled AI execution",
        "Phase views, observed usage and optional decoration",
      ],
      [
        "What is local?",
        "Project policies, memory and living documentation",
        "Project memory, session data and preferences",
        "Retained plugin files; observed data depends on the mod",
      ],
      [
        "How do I start?",
        "/aikya-init or /aikya-analyze",
        "Source quick start until a stable native release is published",
        "Choose the released mods compatible with your Claude version",
      ],
    ]
      .map(
        (row) =>
          `<tr><th scope="row">${row[0]}</th>${row
            .slice(1)
            .map((c) => `<td>${c}</td>`)
            .join("")}</tr>`,
      )
      .join(
        "",
      )}</tbody></table></div></section><section class="section choice-grid">${products.map((p) => `<article><p class="section-label">${p.kind}</p><h2>${p.short}</h2><p>${p.description}</p><a class="text-link" href="../../products/${p.id}/">Explore ${p.short}</a></article>`).join("")}</section>`,
  });
}
export function gettingStarted() {
  return layout({
    base: "../../",
    route: "guides/get-started/",
    active: "start",
    title: "Get started",
    description:
      "Choose an Aikya product and follow its official installation requirements and release notes.",
    body: `<section class="detail-hero section"><p class="section-label">Start with your environment</p><h1>Your next step,<br> made clear.</h1><p class="detail-description">Choose a product, review its requirements and follow its official installation guide. Each product owns its releases and installation process.</p></section><section class="section start-list">${products.map((p) => `<article class="start-product"><div><p class="section-label">${p.kind}</p><h2>${p.name}</h2><p>${p.requirements}</p></div><div><span class="release-label">${p.availability}</span><p>${p.note}</p><div class="button-row"><a class="button primary" href="${p.installation}">Installation instructions</a><a class="text-link" href="${p.release}">Release notes</a></div></div>${renderInstallation(p, escape)}</article>`).join("")}</section><section class="section start-note"><h2>Keep documentation and releases together.</h2><p>A repository’s main branch can describe features that have not shipped yet. Use the requirements and downloads attached to the release you select. Forge’s native public installer remains pending its first accepted stable release.</p><a class="text-link" href="../comparison/">Compare products before choosing</a></section>`,
  });
}
