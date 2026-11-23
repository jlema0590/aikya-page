import { previews } from "./previews.mjs";

const root = document.documentElement;
const locale = root.lang === "es" ? "es" : "en";
const copy = locale === "es"
  ? { reduced: "Movimiento reducido activado", resume: "Reanudar animación", pause: "Pausar animación" }
  : { reduced: "Reduced motion enabled", resume: "Resume animation", pause: "Pause animation" };
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const toggle = document.querySelector("[data-motion-toggle]");
let userPaused = false;

function applyMotion() {
  const paused = userPaused || reduced.matches || document.hidden;
  root.dataset.motion = paused ? "paused" : "running";
  if (!toggle) return;
  toggle.hidden = false;
  toggle.disabled = reduced.matches;
  const label = reduced.matches
    ? copy.reduced
    : paused
      ? copy.resume
      : copy.pause;
  toggle.setAttribute("aria-label", label);
  toggle.setAttribute("aria-pressed", String(paused));
  toggle.querySelector("[data-motion-label]").textContent = label;
}

toggle?.addEventListener("click", () => {
  userPaused = !userPaused;
  applyMotion();
});
reduced.addEventListener("change", applyMotion);
document.addEventListener("visibilitychange", applyMotion);
applyMotion();

const buttons = [...document.querySelectorAll("[data-product]")];
for (const button of buttons) {
  button.addEventListener("click", () => {
    const id = button.dataset.product,
      preview = previews[locale][id];
    if (!preview) return;
    for (const item of buttons)
      item.setAttribute("aria-pressed", String(item === button));
    document.querySelector("[data-product-name]").textContent = preview.name;
    document.querySelector("[data-product-description]").textContent =
      preview.description;
    document.querySelector("[data-product-link]").href = "products/" + id + "/";
  });
}

const visual = document.querySelector(".hero-visual");
if (visual && "IntersectionObserver" in window) {
  new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        entry.target.dataset.visible = String(entry.isIntersecting);
    },
    { threshold: 0.05 },
  ).observe(visual);
}
