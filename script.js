const body = document.body;
const typingText = document.getElementById("typingText");
const themeToggle = document.getElementById("themeToggle");
const themeToggleLabel = themeToggle?.querySelector(".theme-toggle__label");
const themeToggleIcon = themeToggle?.querySelector(".theme-toggle__icon");
const navToggle = document.getElementById("navToggle");
const navPanel = document.getElementById("navPanel");
const revealItems = document.querySelectorAll(".reveal");
const progressBars = document.querySelectorAll(".progress-fill");
const certTriggers = document.querySelectorAll(".cert-trigger");
const certificateGrid = document.getElementById("certificateGrid");
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalClose = document.getElementById("modalClose");
const resumeButton = document.getElementById("resumeDownload");
const tiltCards = document.querySelectorAll("[data-tilt]");
const cursorEcho = document.getElementById("cursorEcho");
const cursorAura = document.getElementById("cursorAura");
const cursorOrbits = document.querySelectorAll(".cursor-orbit");
const cursorDot = document.getElementById("cursorDot");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

const certificateData = [
  {
    title: "Foundations of Digital Marketing and E-commerce",
    summary: "Foundational certificate in digital marketing and e-commerce concepts.",
    file: "foundations-of-digital-marketing-and-e-commerce.pdf",
    available: true
  },
  {
    title: "Introduction to Python Programming",
    summary: "Certificate focused on Python programming basics and practical coding.",
    file: "introduction-to-python-programming.pdf",
    available: true
  },
  {
    title: "Generative AI Prompt Engineering Basics",
    summary: "Certificate covering prompt design fundamentals for generative AI.",
    file: "generative-ai-prompt-engineering-basics.pdf",
    available: true
  },
  {
    title: "Ethics in AI",
    summary: "Certificate on responsible AI use, fairness, and ethical considerations.",
    file: "ethics-in-ai.pdf",
    available: true
  },
  {
    title: "Learning How to Learn",
    summary: "Certificate about practical learning methods and mental tools for mastery.",
    file: "learning-how-to-learn.pdf",
    available: true
  },
  {
    title: "Ask Questions to Make Data-Driven Decisions",
    summary: "Certificate focused on analytical thinking and data-driven questioning.",
    file: "ask-questions-to-make-data-driven-decisions.pdf",
    available: true
  },
  {
    title: "Foundations of Cybersecurity",
    summary: "Certificate introducing cybersecurity concepts, systems, and risk awareness.",
    file: "foundations-of-cybersecurity.pdf",
    available: true
  },
  {
    title: "Introduction to Programming with MATLAB",
    summary: "Certificate in programming basics and problem solving using MATLAB.",
    file: "introduction-to-programming-with-matlab.pdf",
    available: true
  },
  {
    title: "Professional Etiquette Skills",
    summary: "Certificate focused on professional communication and workplace etiquette.",
    file: "professional-etiquette-skills.pdf",
    available: true
  },
  {
    title: "Build AI Apps with ChatGPT, DALL-E, and GPT-4",
    summary: "Certificate around building AI-powered apps with modern OpenAI tools.",
    file: "build-ai-apps-with-chatgpt-dall-e-and-gpt-4.pdf",
    available: true
  },
  {
    title: "Email Etiquette",
    summary: "Certificate on writing clearer and more professional email communication.",
    file: "email-etiquette.pdf",
    available: true
  },
  {
    title: "Basics of Cisco Networking",
    summary: "Certificate covering networking fundamentals and Cisco basics.",
    file: "basics-of-cisco-networking.pdf",
    available: true
  },
  {
    title: "Foundations: Data, Data, Everywhere",
    summary: "Certificate introducing data concepts, workflows, and data culture.",
    file: "foundations-data-data-everywhere.pdf",
    available: true
  },
  {
    title: "Coursera Certificate 020TJ3QTOROZ",
    summary: "Verified Coursera completion certificate.",
    file: "coursera-020tj3qt0roz.pdf",
    available: true
  },
  {
    title: "AI for Everyone",
    summary: "Certificate covering AI concepts for general understanding and application.",
    file: "ai-for-everyone.pdf",
    available: true
  }
];

const typingWords = [
  "Designing immersive student-first experiences",
  "Learning fast. Shipping faster.",
  "Building clean interfaces with real purpose"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function runTypingEffect() {
  if (!typingText) return;

  const currentWord = typingWords[wordIndex];
  typingText.textContent = deleting
    ? currentWord.slice(0, charIndex--)
    : currentWord.slice(0, charIndex++);

  let delay = deleting ? 40 : 90;

  if (!deleting && charIndex === currentWord.length + 1) {
    deleting = true;
    delay = 1200;
  } else if (deleting && charIndex === -1) {
    deleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    charIndex = 0;
    delay = 200;
  }

  window.setTimeout(runTypingEffect, prefersReducedMotion ? 1800 : delay);
}

function renderCertificateCards() {
  if (!certificateGrid) return;

  certificateGrid.innerHTML = certificateData.map((certificate, index) => {
    const cardBody = `
      <span class="certificate-card__index">${String(index + 1).padStart(2, "0")}</span>
      <h3>${certificate.title}</h3>
      <p>${certificate.summary}</p>
      <div class="certificate-card__meta">
        <span>Certificate</span>
        <strong>${certificate.available ? "Ready" : "Pending"}</strong>
      </div>
      <span class="certificate-card__action">${certificate.available ? "Open Certificate" : "Add Certificate"}</span>
    `;

    if (certificate.available) {
      return `<a class="certificate-card" href="${certificate.file}" target="_blank" rel="noreferrer">${cardBody}</a>`;
    }

    return `<article class="certificate-card is-placeholder">${cardBody}</article>`;
  }).join("");
}

function setTheme(theme) {
  const isLight = theme === "light";
  body.classList.toggle("light-mode", isLight);
  themeToggle?.setAttribute("aria-pressed", String(isLight));
  if (themeToggleLabel) themeToggleLabel.textContent = isLight ? "Light" : "Dark";
  if (themeToggleIcon) themeToggleIcon.textContent = isLight ? "L" : "D";
  localStorage.setItem("portfolio-theme", theme);
}

const savedTheme = localStorage.getItem("portfolio-theme");
setTheme(savedTheme || "dark");

themeToggle?.addEventListener("click", () => {
  const nextTheme = body.classList.contains("light-mode") ? "dark" : "light";
  setTheme(nextTheme);
});

function initAmbientSync() {
  const updatePointer = (event) => {
    const point = event.touches?.[0] || event;
    const x = (point.clientX / innerWidth) * 100;
    const y = (point.clientY / innerHeight) * 100;
    body.style.setProperty("--pointer-x", `${x.toFixed(2)}%`);
    body.style.setProperty("--pointer-y", `${y.toFixed(2)}%`);
  };

  const updateScroll = () => {
    const doc = document.documentElement;
    const scrollable = Math.max(doc.scrollHeight - innerHeight, 1);
    const progress = scrollY / scrollable;
    body.style.setProperty("--scroll-progress", progress.toFixed(4));
    body.style.setProperty("--ambient-shift", `${(progress * 180).toFixed(1)}px`);
  };

  updatePointer({ clientX: innerWidth * 0.52, clientY: innerHeight * 0.3 });
  updateScroll();

  addEventListener("mousemove", updatePointer, { passive: true });
  addEventListener("touchmove", updatePointer, { passive: true });
  addEventListener("scroll", updateScroll, { passive: true });
  addEventListener("resize", updateScroll);
}

navToggle?.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  navPanel.classList.toggle("is-open");
  body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-panel a").forEach((link) => {
  link.addEventListener("click", () => {
    navPanel.classList.remove("is-open");
    body.classList.remove("menu-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => revealObserver.observe(item));

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.style.width = `${entry.target.dataset.progress}%`;
    skillObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });

progressBars.forEach((bar) => skillObserver.observe(bar));

renderCertificateCards();

certTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const image = trigger.querySelector("img");
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalTitle.textContent = trigger.dataset.title || "Certificate Preview";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

resumeButton?.addEventListener("click", () => {
  const resumeText = `
UTKARSH KAMBLE
Passionate Programmer and Tech Learner

Education
- BTech Computer Science Engineering (1st Year)

About
- A passionate computer science student who enjoys coding, building projects, and learning new technologies.
- Interested in web development and software engineering.

Skills
- C: 30%
- Python: 35%
- Git and GitHub: 25%

Project
- Campus Transportation Management System
  A system to manage and optimize campus transportation efficiently.

Contact
- Email: utkarshkamble576@gmail.com
- Phone: +91 98342491820
- GitHub: https://github.com/utkarsh-92
- LinkedIn: https://www.linkedin.com/in/utkarsh-kamble-861a45375
`.trim();

  const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Utkarsh-Kamble-Resume.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

function initCreativeCursor() {
  if (!supportsFinePointer || prefersReducedMotion || !cursorAura || !cursorDot || !cursorEcho || !cursorOrbits.length) return;

  body.classList.add("cursor-ready");

  const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
  const aura = { x: pointer.x, y: pointer.y };
  const dot = { x: pointer.x, y: pointer.y };
  const echo = { x: pointer.x, y: pointer.y };
  let angle = 0;
  let lastPointerX = pointer.x;
  let lastPointerY = pointer.y;
  let pressTimeout;

  const interactiveSelector = "a, button, [data-tilt], .portrait-orbit, .signal-chip, .certificate-card";

  const handleMove = (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  };

  const setHoverState = (isHovering) => {
    body.classList.toggle("cursor-hover", isHovering);
  };

  document.addEventListener("mousemove", handleMove, { passive: true });
  document.querySelectorAll(interactiveSelector).forEach((element) => {
    element.addEventListener("mouseenter", () => setHoverState(true));
    element.addEventListener("mouseleave", () => setHoverState(false));
  });

  document.addEventListener("mousedown", () => {
    body.classList.add("cursor-press");
    clearTimeout(pressTimeout);
    pressTimeout = window.setTimeout(() => body.classList.remove("cursor-press"), 180);
  });

  const animate = (time = 0) => {
    aura.x += (pointer.x - aura.x) * 0.18;
    aura.y += (pointer.y - aura.y) * 0.18;
    dot.x += (pointer.x - dot.x) * 0.34;
    dot.y += (pointer.y - dot.y) * 0.34;
    echo.x += (aura.x - echo.x) * 0.1;
    echo.y += (aura.y - echo.y) * 0.1;

    const velocityX = pointer.x - lastPointerX;
    const velocityY = pointer.y - lastPointerY;
    const velocity = Math.min(Math.hypot(velocityX, velocityY), 40);
    angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI);

    const stretchX = 1 + velocity / 38;
    const stretchY = 1 - velocity / 100;
    const dotScale = body.classList.contains("cursor-hover") ? 1.8 : 1;
    const echoScale = body.classList.contains("cursor-hover") ? 1.2 : 1;
    const orbitSpread = body.classList.contains("cursor-hover") ? 42 : 28;

    cursorAura.style.transform = `translate3d(${aura.x}px, ${aura.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${stretchX}, ${stretchY})`;
    cursorEcho.style.transform = `translate3d(${echo.x}px, ${echo.y}px, 0) translate(-50%, -50%) rotate(${angle * 0.5}deg) scale(${echoScale + velocity / 110})`;
    cursorDot.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;

    cursorOrbits.forEach((orbit, index) => {
      const baseAngle = time * 0.0021 + index * 2.15;
      const radiusX = orbitSpread + index * 10 + velocity * 0.25;
      const radiusY = orbitSpread * 0.58 + index * 5;
      const orbitX = aura.x + Math.cos(baseAngle * (1 + index * 0.12)) * radiusX;
      const orbitY = aura.y + Math.sin(baseAngle * (1.4 + index * 0.08)) * radiusY;
      const scale = body.classList.contains("cursor-hover") ? 1.25 - index * 0.16 : 1 - index * 0.12;
      orbit.style.transform = `translate3d(${orbitX}px, ${orbitY}px, 0) translate(-50%, -50%) scale(${scale})`;
    });

    lastPointerX = pointer.x;
    lastPointerY = pointer.y;
    requestAnimationFrame(animate);
  };

  animate();
}

if (!prefersReducedMotion) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 10;
      const rotateX = (0.5 - y) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

class CreativeBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.pointer = { x: innerWidth * 0.52, y: innerHeight * 0.3 };
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.8);
    this.particles = [];
    this.hubs = [];
    this.last = 0;
    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);
    this.handlePointer = this.handlePointer.bind(this);
    this.init();
  }

  init() {
    this.resize();
    addEventListener("resize", this.resize);
    addEventListener("mousemove", this.handlePointer, { passive: true });
    addEventListener("touchmove", this.handlePointer, { passive: true });
    if (prefersReducedMotion) {
      this.draw(0);
    } else {
      requestAnimationFrame(this.animate);
    }
  }

  resize() {
    this.width = innerWidth;
    this.height = innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    const total = Math.min(110, Math.max(60, Math.floor(this.width / 16)));
    this.particles = Array.from({ length: total }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      z: Math.random() * 1.4 + 0.2,
      size: Math.random() * 2.3 + 0.6,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.14,
      phase: Math.random() * Math.PI * 2,
      color: ["244, 197, 108", "255, 140, 102", "87, 182, 255", "116, 240, 207", "156, 171, 255"][Math.floor(Math.random() * 5)]
    }));
    this.hubs = [
      { x: this.width * 0.18, y: this.height * 0.76, radius: 72, color: "244, 197, 108" },
      { x: this.width * 0.8, y: this.height * 0.22, radius: 88, color: "87, 182, 255" }
    ];
  }

  handlePointer(event) {
    const point = event.touches?.[0] || event;
    this.pointer.x = point.clientX;
    this.pointer.y = point.clientY;
  }

  drawGrid(time, scrollFactor) {
    const { ctx, width, height } = this;
    const pointerShift = (this.pointer.x - width / 2) * 0.04;

    ctx.save();
    ctx.strokeStyle = `rgba(255,255,255, ${0.03 + scrollFactor * 0.01})`;
    ctx.lineWidth = 1;

    for (let i = 0; i < 11; i += 1) {
      const progress = i / 10;
      const y = height * 0.5 + progress * height * 0.55 + Math.sin(time * 0.0008 + i * 0.45) * 4;
      ctx.beginPath();
      ctx.moveTo(-40, y);
      ctx.lineTo(width + 40, y + progress * 18);
      ctx.stroke();
    }

    for (let i = 0; i < 16; i += 1) {
      const baseX = (i / 15) * width;
      ctx.beginPath();
      ctx.moveTo(baseX + pointerShift * 0.08, height * 0.34);
      ctx.lineTo(baseX - pointerShift * 0.14, height + 40);
      ctx.stroke();
    }

    ctx.restore();
  }

  draw(time) {
    const { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);
    const scrollFactor = Math.min(scrollY / Math.max(height, 1), 1.8);

    const glow = ctx.createRadialGradient(this.pointer.x, this.pointer.y, 0, this.pointer.x, this.pointer.y, 360);
    glow.addColorStop(0, "rgba(116,240,207,0.18)");
    glow.addColorStop(0.42, "rgba(87,182,255,0.11)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    const beacons = [
      { x: width * 0.16 + Math.sin(time * 0.00028) * 30, y: height * 0.18, radius: 280, color: "255,140,102", alpha: 0.14 },
      { x: width * 0.82 + Math.cos(time * 0.00024) * 24, y: height * 0.22, radius: 320, color: "87,182,255", alpha: 0.14 },
      { x: width * 0.6 + Math.sin(time * 0.00022) * 16, y: height * 0.84, radius: 260, color: "244,197,108", alpha: 0.1 }
    ];

    beacons.forEach((beacon) => {
      const gradient = ctx.createRadialGradient(beacon.x, beacon.y, 0, beacon.x, beacon.y, beacon.radius);
      gradient.addColorStop(0, `rgba(${beacon.color}, ${beacon.alpha})`);
      gradient.addColorStop(1, `rgba(${beacon.color}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    });

    this.drawGrid(time, scrollFactor);

    this.particles.forEach((particle) => {
      particle.x += particle.vx * particle.z * 2;
      particle.y += particle.vy * particle.z * 2;

      if (particle.x < -30) particle.x = width + 30;
      if (particle.x > width + 30) particle.x = -30;
      if (particle.y < -30) particle.y = height + 30;
      if (particle.y > height + 30) particle.y = -30;

      const offsetX = (this.pointer.x - width / 2) * 0.01 * particle.z;
      const offsetY = (this.pointer.y - height / 2) * 0.01 * particle.z;
      const waveX = Math.cos(time * 0.0008 + particle.phase) * 5 * particle.z;
      const waveY = Math.sin(time * 0.0006 + particle.phase) * 7 * particle.z;
      const x = particle.x + offsetX + waveX;
      const y = particle.y + offsetY + waveY;
      const alpha = 0.14 + particle.z * 0.16 + Math.sin(time * 0.002 + particle.phase) * 0.04;

      ctx.beginPath();
      ctx.fillStyle = `rgba(${particle.color}, ${alpha.toFixed(3)})`;
      ctx.shadowBlur = 16;
      ctx.shadowColor = `rgba(${particle.color}, 0.24)`;
      ctx.arc(x, y, particle.size * (0.8 + particle.z), 0, Math.PI * 2);
      ctx.fill();

      particle.renderX = x;
      particle.renderY = y;
    });

    ctx.shadowBlur = 0;

    for (let i = 0; i < this.particles.length; i += 1) {
      const a = this.particles[i];
      for (let j = i + 3; j < this.particles.length; j += 6) {
        const b = this.particles[j];
        const distance = Math.hypot(a.renderX - b.renderX, a.renderY - b.renderY);
        if (distance < 110) {
          ctx.strokeStyle = `rgba(255,255,255, ${(1 - distance / 110) * 0.07})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.renderX, a.renderY);
          ctx.lineTo(b.renderX, b.renderY);
          ctx.stroke();
        }
      }
    }

    const ribbons = [
      { y: height * 0.18, amp: 18, speed: 0.0012, alpha: 0.08, color: "255,255,255" },
      { y: height * 0.28, amp: 26, speed: 0.00105, alpha: 0.13, color: "116,240,207" },
      { y: height * 0.72, amp: 22, speed: 0.00095, alpha: 0.09, color: "255,140,102" }
    ];

    ribbons.forEach((ribbon, index) => {
      ctx.strokeStyle = `rgba(${ribbon.color}, ${ribbon.alpha})`;
      ctx.lineWidth = index === 1 ? 1.8 : 1.2;
      ctx.beginPath();
      for (let x = -60; x <= width + 60; x += 18) {
        const y = ribbon.y
          + Math.sin(x * 0.01 + time * ribbon.speed) * ribbon.amp
          + Math.cos(x * 0.004 + time * ribbon.speed * 1.4) * (ribbon.amp * 0.42);
        if (x === -60) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });

    this.hubs.forEach((hub, index) => {
      const hubX = hub.x + Math.cos(time * 0.00045 + index) * 18;
      const hubY = hub.y + Math.sin(time * 0.0005 + index * 1.8) * 14;

      ctx.save();
      ctx.translate(hubX, hubY);
      ctx.rotate(time * 0.0002 * (index === 0 ? 1 : -1));
      ctx.setLineDash([8, 12]);
      for (let i = 0; i < 3; i += 1) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${hub.color}, ${0.08 + i * 0.04})`;
        ctx.lineWidth = 1;
        ctx.arc(0, 0, hub.radius + i * 18, Math.PI * (0.16 + i * 0.08), Math.PI * (1.22 + i * 0.08));
        ctx.stroke();
      }

      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.fillStyle = `rgba(${hub.color}, 0.28)`;
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  animate(time) {
    if (time - this.last > 12) {
      this.draw(time);
      this.last = time;
    }
    requestAnimationFrame(this.animate);
  }
}

const canvas = document.getElementById("bg-canvas");
initAmbientSync();
if (canvas) new CreativeBackground(canvas);
initCreativeCursor();
runTypingEffect();
