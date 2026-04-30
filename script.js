const topbar = document.getElementById("topbar");
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");
const revealEls = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-counter]");
const accordions = document.querySelectorAll(".acc-item");
const faqs = document.querySelectorAll(".faq-item");

function setHeaderState() {
  topbar.classList.toggle("scrolled", window.scrollY > 10);
}

window.addEventListener("scroll", setHeaderState);
setHeaderState();

menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

revealEls.forEach((el) => revealObserver.observe(el));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.7 }
);

counters.forEach((counter) => counterObserver.observe(counter));

function animateCounter(counter) {
  const target = Number(counter.dataset.counter);
  const start = performance.now();
  const duration = 1300;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

accordions.forEach((item) => {
  item.querySelector("button").addEventListener("click", () => {
    accordions.forEach((other) => {
      if (other !== item) {
        other.classList.remove("active");
        other.querySelector("button span").textContent = "+";
      }
    });

    const isActive = item.classList.toggle("active");
    item.querySelector("button span").textContent = isActive ? "-" : "+";
  });
});

faqs.forEach((item) => {
  item.querySelector("button").addEventListener("click", () => {
    faqs.forEach((other) => {
      if (other !== item) other.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});

document.querySelector(".project-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  const original = button.innerHTML;
  button.innerHTML = "<span>+</span> Message sent";
  setTimeout(() => {
    button.innerHTML = original;
    event.currentTarget.reset();
  }, 1700);
});
