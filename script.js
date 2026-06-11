// Year stamp
document.getElementById("year").textContent = new Date().getFullYear();

// Resize hero photo to match the text column height (preserving 4:5 aspect ratio).
// On load, on resize, and whenever the text's height changes (font load, etc.).
(function syncHeroPhotoSize() {
  const text = document.querySelector(".hero-text");
  const photo = document.querySelector(".hero-photo");
  if (!text || !photo) return;

  function update() {
    if (window.innerWidth < 880) {
      photo.style.height = "";
      photo.style.width = "";
      return;
    }
    const h = text.offsetHeight * 0.945;
    photo.style.height = h + "px";
    photo.style.width = (h * 4) / 5 + "px";
  }

  update();
  window.addEventListener("load", update);
  window.addEventListener("resize", update);
  if ("ResizeObserver" in window) {
    new ResizeObserver(update).observe(text);
  }
})();

// Hero photo slideshow: shuffle order on load, then crossfade every 5s
(function heroSlideshow() {
  const figure = document.getElementById("hero-photo");
  if (!figure) return;
  const imgs = Array.from(figure.querySelectorAll(".hp-img"));
  if (imgs.length === 0) return;

  // Fisher–Yates shuffle of indices
  const order = imgs.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  let idx = 0;
  const show = (k) => {
    const img = imgs[order[k]];
    imgs.forEach((el) => el.classList.toggle("is-active", el === img));
  };
  show(0);

  if (imgs.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(() => {
      idx = (idx + 1) % order.length;
      show(idx);
    }, 5000);
  }
})();

// Reveal-on-scroll
const revealTargets = document.querySelectorAll(
  ".section, .paper, .hero-text, .hero-photo, .collab-inner"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);
revealTargets.forEach((el) => io.observe(el));

// Active nav tracking
const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const navObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((a) =>
        a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`)
      );
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);
sections.forEach((s) => navObs.observe(s));
