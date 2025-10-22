// Simple interactive features: menu toggle, theme toggle, typing effect, progress animation, form validation and active nav

// ===== Theme toggle =====
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon();

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  if (next === 'dark') document.documentElement.setAttribute('data-theme','dark');
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('theme', next === 'dark' ? 'dark' : 'light');
  updateThemeIcon();
});
function updateThemeIcon(){
  const t = document.documentElement.getAttribute('data-theme');
  themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
}

// ===== Mobile menu toggle =====
const menuToggle = document.getElementById('menu-toggle');
const navList = document.querySelector('.nav-list');
menuToggle.addEventListener('click', () => navList.classList.toggle('show'));

// Close mobile menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navList.classList.remove('show'));
});

// ===== Typing effect (hero) =====
const typingEl = document.getElementById('typing');
const phrases = ['Frontend Developer', 'HTML • CSS • JavaScript', 'Responsive Web Designer', 'React Learner'];
let pIndex = 0, charIndex = 0, typingForward = true;
function typeLoop(){
  const current = phrases[pIndex];
  if (typingForward) {
    charIndex++;
    if (charIndex > current.length) {
      typingForward = false;
      setTimeout(typeLoop, 900);
      return;
    }
  } else {
    charIndex--;
    if (charIndex < 0) {
      typingForward = true;
      pIndex = (pIndex + 1) % phrases.length;
    }
  }
  typingEl.textContent = current.substring(0, charIndex);
  setTimeout(typeLoop, typingForward ? 80 : 40);
}
typeLoop();

// ===== Progress bars animation when visible =====
const progressEls = document.querySelectorAll('.progress');
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const value = el.getAttribute('data-value') || 0;
      el.querySelector('span').style.width = value + '%';
      obs.unobserve(el);
    }
  });
},{threshold:0.4});
progressEls.forEach(p => obs.observe(p));

// ===== Highlight active nav link on scroll =====
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
},{threshold: 0.45});
sections.forEach(s => sectionObserver.observe(s));

// ===== Back-to-top year =====
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelector('.back-top').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({top:0, behavior:'smooth'});
});

// ===== Basic form validation (mail client via mailto) =====
function validateForm(e){
  // This prevents form from submitting if fields empty or invalid (simple check)
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) {
    alert('Please fill all fields.');
    return false;
  }
  // basic email regex
  const re = /^\S+@\S+\.\S+$/;
  if (!re.test(email)) { alert('Please enter a valid email.'); return false; }

  // Build mailto (works by opening user's mail client)
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  const mailto = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
  window.location.href = mailto;
  return false; // prevent default form submission (we used mailto)
}
