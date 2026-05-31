/* =======================
   PARTICLE BACKGROUND
======================= */
const canvas = document.createElement("canvas");
document.body.prepend(canvas);
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";

const ctx = canvas.getContext("2d");
let particlesArray;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 2;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = "rgba(245, 241, 233, 0.6)"; // beige glow
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 200; i++) {
    particlesArray.push(new Particle());
  }
}
initParticles();

function animateParticles() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* =======================
   HERO TYPEWRITER
======================= */
const heroText = document.querySelector('.hero h1');
const words = [
  "Hi, I'm Kushagra",
  "Hi, I'm a Coder",
  "Hi, I'm a Gamer",
  "Hi, I'm a Learner 🚀"
];
let currentWord = 0;
let currentChar = 0;
let typing = true;

function typeWriter() {
  if (typing) {
    heroText.textContent = words[currentWord].substring(0, currentChar+1);
    currentChar++;
    if (currentChar === words[currentWord].length) {
      typing = false;
      setTimeout(typeWriter, 1500);
      return;
    }
  } else {
    heroText.textContent = words[currentWord].substring(0, currentChar-1);
    currentChar--;
    if (currentChar === 0) {
      typing = true;
      currentWord = (currentWord + 1) % words.length;
    }
  }
  setTimeout(typeWriter, typing ? 120 : 60);
}
typeWriter();

/* =======================
   ABOUT SECTION FADE-IN
======================= */
const aboutSection = document.querySelector('#about .about-container');

function fadeInAbout() {
  const sectionTop = aboutSection.getBoundingClientRect().top;
  const triggerBottom = window.innerHeight / 1.2;

  if (sectionTop < triggerBottom) {
    aboutSection.classList.add('show');
  }
}

window.addEventListener('scroll', fadeInAbout);
fadeInAbout(); // trigger if already in view

/* =======================
   SKILL BAR ANIMATION
======================= */
const skillSection = document.querySelector('#skills');
const skillBars = document.querySelectorAll('.skill-bar span');
const skillPercents = document.querySelectorAll('.skill-percent');
let skillsAnimated = false;

function animateSkills() {
  const sectionTop = skillSection.getBoundingClientRect().top;
  const triggerBottom = window.innerHeight / 1.2;

  if (!skillsAnimated && sectionTop < triggerBottom) {
    skillsAnimated = true;

    skillBars.forEach((bar, i) => {
      const targetWidth = parseInt(bar.getAttribute('data-width'));
      let width = 0;
      const interval = setInterval(() => {
        if (width >= targetWidth) clearInterval(interval);
        else {
          width++;
          bar.style.width = width + '%';
          skillPercents[i].textContent = width + '%';
        }
      }, 15); // smooth speed
    });
  }
}

window.addEventListener('scroll', animateSkills);
animateSkills();

/* =======================
   SMOOTH SCROLL NAV
======================= */
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    const targetPosition = target.offsetTop;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });
});
