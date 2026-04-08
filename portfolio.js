const body = document.body;
const typingText = document.getElementById("typingText");
const navToggle = document.getElementById("navToggle");
const navPanel = document.getElementById("navPanel");
const revealItems = document.querySelectorAll(".reveal");
const progressBars = document.querySelectorAll(".progress-fill");
const certificateGrid = document.getElementById("certificateGrid");
const resumeButton = document.getElementById("resumeDownload");
const contactForm = document.getElementById("contactForm");
const contactNext = document.getElementById("contactNext");
const contactUrl = document.getElementById("contactUrl");
const contactStatus = document.getElementById("contactStatus");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  "passionate programmer and tech learner",
  "curious web developer in progress",
  "builder of practical student-first ideas"
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

  let delay = deleting ? 42 : 86;

  if (!deleting && charIndex === currentWord.length + 1) {
    deleting = true;
    delay = 1200;
  } else if (deleting && charIndex === -1) {
    deleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
    charIndex = 0;
    delay = 220;
  }

  window.setTimeout(runTypingEffect, prefersReducedMotion ? 1800 : delay);
}

function renderCertificateCards() {
  if (!certificateGrid) return;

  certificateGrid.innerHTML = certificateData.map((certificate, index) => {
    const bodyMarkup = `
      <span class="certificate-card__index">${String(index + 1).padStart(2, "0")}</span>
      <h3>${certificate.title}</h3>
      <p>${certificate.summary}</p>
      <div class="certificate-card__meta">
        <span>Certificate</span>
        <strong>${certificate.available ? "Ready" : "Pending"}</strong>
      </div>
      <span class="certificate-card__action">${certificate.available ? "Open Certificate" : "Coming Soon"}</span>
    `;

    if (certificate.available) {
      return `<a class="certificate-card" href="${certificate.file}" target="_blank" rel="noreferrer">${bodyMarkup}</a>`;
    }

    return `<article class="certificate-card is-placeholder">${bodyMarkup}</article>`;
  }).join("");
}

function initNavigation() {
  if (!navToggle || !navPanel) return;

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navPanel.classList.toggle("is-open");
    body.classList.toggle("menu-open");
  });

  navPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navPanel.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("menu-open");
    });
  });
}

function initRevealAnimations() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.16 });

  revealItems.forEach((item) => revealObserver.observe(item));

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.width = `${entry.target.dataset.progress}%`;
      skillObserver.unobserve(entry.target);
    });
  }, { threshold: 0.45 });

  progressBars.forEach((bar) => skillObserver.observe(bar));
}

function initResumeDownload() {
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
}

function initContactForm() {
  if (!contactForm) return;

  const isHosted = window.location.protocol.startsWith("http");
  if (isHosted) {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete("contact");
    currentUrl.hash = "contact";

    const successUrl = new URL(currentUrl.toString());
    successUrl.searchParams.set("contact", "sent");

    if (contactUrl) contactUrl.value = currentUrl.toString();
    if (contactNext) contactNext.value = successUrl.toString();
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("contact") === "sent" && contactStatus) {
    contactStatus.textContent = "Message sent successfully. Check your email too if you want to continue the conversation.";
    contactStatus.classList.add("is-success");
  }
}

function initAmbientPointer() {
  const updatePointer = (event) => {
    const point = event.touches?.[0] || event;
    const x = (point.clientX / innerWidth) * 100;
    const y = (point.clientY / innerHeight) * 100;
    body.style.setProperty("--pointer-x", `${x.toFixed(2)}%`);
    body.style.setProperty("--pointer-y", `${y.toFixed(2)}%`);
  };

  updatePointer({ clientX: innerWidth * 0.5, clientY: innerHeight * 0.35 });
  addEventListener("mousemove", updatePointer, { passive: true });
  addEventListener("touchmove", updatePointer, { passive: true });
}

function initCardTilt() {
  if (prefersReducedMotion) return;

  const tiltTargets = document.querySelectorAll(".portrait-card, .project-card__visual");

  tiltTargets.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 10;
      const rotateX = (0.5 - y) * 8;
      card.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function rotateX(point, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos
  };
}

function rotateY(point, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos + point.z * sin,
    y: point.y,
    z: -point.x * sin + point.z * cos
  };
}

function rotateZ(point, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
    z: point.z
  };
}

class DimensionBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.8);
    this.pointer = { x: innerWidth * 0.5, y: innerHeight * 0.35 };
    this.last = 0;
    this.cameraDistance = 780;
    this.stars = [];
    this.nodes = [];
    this.shapes = [];
    this.resize = this.resize.bind(this);
    this.handlePointer = this.handlePointer.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.animate = this.animate.bind(this);
    this.scrollFactor = 0;
    this.init();
  }

  init() {
    this.resize();
    this.handleScroll();
    addEventListener("resize", this.resize);
    addEventListener("mousemove", this.handlePointer, { passive: true });
    addEventListener("touchmove", this.handlePointer, { passive: true });
    addEventListener("scroll", this.handleScroll, { passive: true });

    if (prefersReducedMotion) {
      this.draw(0);
    } else {
      requestAnimationFrame(this.animate);
    }
  }

  resize() {
    this.width = innerWidth;
    this.height = innerHeight;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.stars = Array.from({ length: Math.min(170, Math.max(110, Math.floor(this.width / 9))) }, () => ({
      x: (Math.random() - 0.5) * this.width * 1.5,
      y: (Math.random() - 0.5) * this.height * 1.5,
      z: Math.random() * 900 + 80,
      size: Math.random() * 1.8 + 0.5,
      speed: Math.random() * 1.8 + 0.5,
      color: ["108,184,255", "123,241,209", "255,159,114", "165,177,255"][Math.floor(Math.random() * 4)]
    }));

    this.nodes = Array.from({ length: 26 }, (_, index) => ({
      baseX: (Math.random() - 0.5) * 620,
      baseY: (Math.random() - 0.5) * 260,
      baseZ: Math.random() * 420 + 180,
      phase: Math.random() * Math.PI * 2,
      offset: index * 0.18
    }));

    this.shapes = [
      {
        type: "sphere",
        x: -220,
        y: -10,
        z: 340,
        radius: 96,
        rotX: 0.78,
        rotY: 0.12,
        speedX: 0.00034,
        speedY: 0.00048,
        color: "108,184,255"
      },
      {
        type: "cube",
        x: 255,
        y: -130,
        z: 430,
        size: 132,
        rotX: 0.35,
        rotY: 0.42,
        speedX: -0.00028,
        speedY: 0.00034,
        color: "123,241,209"
      },
      {
        type: "sphere",
        x: 170,
        y: 190,
        z: 280,
        radius: 58,
        rotX: 0.62,
        rotY: 0.2,
        speedX: 0.0005,
        speedY: -0.00046,
        color: "255,159,114"
      }
    ];
  }

  handlePointer(event) {
    const point = event.touches?.[0] || event;
    this.pointer.x = point.clientX;
    this.pointer.y = point.clientY;
  }

  handleScroll() {
    const doc = document.documentElement;
    const scrollable = Math.max(doc.scrollHeight - innerHeight, 1);
    this.scrollFactor = scrollY / scrollable;
  }

  project(point) {
    const depth = point.z + this.cameraDistance;
    const scale = this.cameraDistance / depth;
    const parallaxX = (this.pointer.x - this.centerX) * 0.12;
    const parallaxY = (this.pointer.y - this.centerY) * 0.08;

    return {
      x: this.centerX + point.x * scale + parallaxX,
      y: this.centerY + point.y * scale + parallaxY,
      scale,
      depth
    };
  }

  drawPerspectiveGrid(time) {
    const { ctx, width, height } = this;
    const horizon = height * (0.42 + this.scrollFactor * 0.06);
    const gridBottom = height + 120;
    const pointerShift = (this.pointer.x - this.centerX) * 0.08;

    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;

    for (let i = 0; i < 11; i += 1) {
      const t = i / 10;
      const y = horizon + Math.pow(t, 1.8) * (gridBottom - horizon);
      ctx.beginPath();
      ctx.moveTo(-80, y + Math.sin(time * 0.0007 + i * 0.4) * 4);
      ctx.lineTo(width + 80, y);
      ctx.stroke();
    }

    for (let i = -8; i <= 8; i += 1) {
      const topX = this.centerX + i * 56 + pointerShift * 0.12;
      const bottomX = this.centerX + i * 140 - pointerShift * 0.35;
      ctx.beginPath();
      ctx.moveTo(topX, horizon);
      ctx.lineTo(bottomX, gridBottom);
      ctx.stroke();
    }

    ctx.restore();
  }

  drawStars(delta) {
    const { ctx } = this;

    this.stars.forEach((star) => {
      star.z -= star.speed * delta * 8;
      if (star.z < 20) {
        star.z = 980;
        star.x = (Math.random() - 0.5) * this.width * 1.5;
        star.y = (Math.random() - 0.5) * this.height * 1.5;
      }

      const projected = this.project(star);
      if (projected.depth <= 0) return;

      const radius = star.size * projected.scale * 1.9;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${star.color}, ${Math.min(0.9, 0.18 + projected.scale * 0.8)})`;
      ctx.shadowBlur = 16;
      ctx.shadowColor = `rgba(${star.color}, 0.28)`;
      ctx.arc(projected.x, projected.y, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.shadowBlur = 0;
  }

  drawNodeField(time) {
    const { ctx } = this;
    const rendered = this.nodes.map((node, index) => {
      const wave = time * 0.0012 + node.phase;
      const point = {
        x: node.baseX + Math.cos(wave + node.offset) * 36,
        y: node.baseY + Math.sin(wave * 1.4 + node.offset) * 26,
        z: node.baseZ + Math.sin(wave * 1.2 + index * 0.4) * 54
      };
      return { ...this.project(point), color: index % 2 === 0 ? "108,184,255" : "123,241,209" };
    });

    for (let i = 0; i < rendered.length; i += 1) {
      const a = rendered[i];
      for (let j = i + 1; j < rendered.length; j += 1) {
        const b = rendered[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance < 110) {
          ctx.strokeStyle = `rgba(255,255,255, ${(1 - distance / 110) * 0.07})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    rendered.forEach((node) => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${node.color}, 0.42)`;
      ctx.arc(node.x, node.y, Math.max(1.4, node.scale * 4), 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawPolyline(points, color, alpha = 0.18, width = 1) {
    const { ctx } = this;
    let started = false;

    ctx.beginPath();

    points.forEach((point) => {
      if (point.depth <= 10) return;
      if (!started) {
        ctx.moveTo(point.x, point.y);
        started = true;
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    if (!started) return;

    ctx.strokeStyle = `rgba(${color}, ${alpha})`;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  drawWireSphere(shape, time) {
    const latitudes = [-60, -30, 0, 30, 60];
    const meridians = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4];
    const spinX = shape.rotX + time * shape.speedX;
    const spinY = shape.rotY + time * shape.speedY;

    latitudes.forEach((deg) => {
      const lat = (deg * Math.PI) / 180;
      const ring = [];

      for (let step = 0; step <= 28; step += 1) {
        const lon = (step / 28) * Math.PI * 2;
        let point = {
          x: Math.cos(lat) * Math.cos(lon) * shape.radius,
          y: Math.sin(lat) * shape.radius,
          z: Math.cos(lat) * Math.sin(lon) * shape.radius
        };
        point = rotateY(rotateX(point, spinX), spinY);
        point.x += shape.x;
        point.y += shape.y;
        point.z += shape.z;
        ring.push(this.project(point));
      }

      this.drawPolyline(ring, shape.color, 0.18, deg === 0 ? 1.4 : 1);
    });

    meridians.forEach((meridian) => {
      const arc = [];

      for (let step = 0; step <= 24; step += 1) {
        const lat = (-Math.PI / 2) + (step / 24) * Math.PI;
        let point = {
          x: Math.cos(lat) * Math.cos(meridian) * shape.radius,
          y: Math.sin(lat) * shape.radius,
          z: Math.cos(lat) * Math.sin(meridian) * shape.radius
        };
        point = rotateY(rotateX(point, spinX), spinY);
        point.x += shape.x;
        point.y += shape.y;
        point.z += shape.z;
        arc.push(this.project(point));
      }

      this.drawPolyline(arc, shape.color, 0.11, 1);
    });
  }

  drawCube(shape, time) {
    const half = shape.size / 2;
    const vertices = [
      { x: -half, y: -half, z: -half },
      { x: half, y: -half, z: -half },
      { x: half, y: half, z: -half },
      { x: -half, y: half, z: -half },
      { x: -half, y: -half, z: half },
      { x: half, y: -half, z: half },
      { x: half, y: half, z: half },
      { x: -half, y: half, z: half }
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];

    const spinX = shape.rotX + time * shape.speedX;
    const spinY = shape.rotY + time * shape.speedY;
    const projected = vertices.map((vertex) => {
      let point = rotateY(rotateX(rotateZ(vertex, time * 0.00016), spinX), spinY);
      point.x += shape.x;
      point.y += shape.y;
      point.z += shape.z;
      return this.project(point);
    });

    const { ctx } = this;
    ctx.strokeStyle = `rgba(${shape.color}, 0.18)`;
    ctx.lineWidth = 1.2;

    edges.forEach(([a, b]) => {
      const from = projected[a];
      const to = projected[b];
      if (from.depth <= 10 || to.depth <= 10) return;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    });

    projected.forEach((point) => {
      ctx.beginPath();
      ctx.fillStyle = `rgba(${shape.color}, 0.34)`;
      ctx.arc(point.x, point.y, Math.max(1.5, point.scale * 5), 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawShapeHalos(time) {
    const { ctx } = this;
    const halos = [
      { x: -190, y: -40, z: 330, radius: 150, color: "108,184,255" },
      { x: 240, y: -130, z: 430, radius: 110, color: "123,241,209" },
      { x: 160, y: 180, z: 290, radius: 92, color: "255,159,114" }
    ];

    halos.forEach((halo, index) => {
      const center = this.project(halo);
      const radius = halo.radius * center.scale;
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(time * 0.00018 * (index % 2 === 0 ? 1 : -1));
      ctx.strokeStyle = `rgba(${halo.color}, 0.14)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius, radius * 0.34, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.7, radius * 0.22, Math.PI / 2.8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });
  }

  draw(time) {
    const { ctx, width, height } = this;
    const delta = Math.max(0.5, (time - this.last) / 16.666);
    this.last = time;
    ctx.clearRect(0, 0, width, height);

    const glow = ctx.createRadialGradient(this.pointer.x, this.pointer.y, 0, this.pointer.x, this.pointer.y, 320);
    glow.addColorStop(0, "rgba(108,184,255,0.16)");
    glow.addColorStop(0.45, "rgba(123,241,209,0.08)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    const horizonGlow = ctx.createLinearGradient(0, height * 0.34, 0, height);
    horizonGlow.addColorStop(0, "rgba(10,20,38,0)");
    horizonGlow.addColorStop(1, "rgba(10,31,57,0.18)");
    ctx.fillStyle = horizonGlow;
    ctx.fillRect(0, 0, width, height);

    this.drawPerspectiveGrid(time);
    this.drawStars(delta);
    this.drawNodeField(time);
    this.drawShapeHalos(time);

    this.shapes.forEach((shape) => {
      if (shape.type === "sphere") {
        this.drawWireSphere(shape, time);
      } else if (shape.type === "cube") {
        this.drawCube(shape, time);
      }
    });
  }

  animate(time) {
    this.draw(time);
    requestAnimationFrame(this.animate);
  }
}

function initBackground() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  new DimensionBackground(canvas);
}

renderCertificateCards();
initNavigation();
initRevealAnimations();
initResumeDownload();
initContactForm();
initAmbientPointer();
initCardTilt();
initBackground();
runTypingEffect();
