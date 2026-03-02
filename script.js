document.addEventListener('DOMContentLoaded', () => {
    // ===== Theme toggle =====
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
    
    function updateThemeIcon() {
        const t = document.documentElement.getAttribute('data-theme');
        if (themeToggle) themeToggle.textContent = t === 'dark' ? '☀️' : '🌙';
    }
    updateThemeIcon();

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            if (next === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
            else document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', next === 'dark' ? 'dark' : 'light');
            updateThemeIcon();
        });
    }

    // ===== Mobile menu toggle (Safety Check Added) =====
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('.nav-list');
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => navList.classList.toggle('show'));
    }

    // Close mobile menu when link clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navList) navList.classList.remove('show');
        });
    });

    // ===== Project Filtering =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    function applyFilter(filter) {
        cards.forEach(card => {
            card.style.display = card.classList.contains(filter) ? "block" : "none";
        });
    }

    applyFilter("htmlcss"); // Default

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const activeBtn = document.querySelector('.filter-btn.active');
            if (activeBtn) activeBtn.classList.remove('active');
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            if (filter === "all") cards.forEach(c => c.style.display = "block");
            else applyFilter(filter);
        });
    });

    // ===== Typing Effect (Optimized) =====
    const phrases = ['Frontend Developer', 'HTML • CSS • JavaScript', 'Responsive Web Designer', 'React Learner'];
    let pIndex = 0, charIndex = 0, typingForward = true;
    const typingEl = document.getElementById('typing');

    function typeLoop() {
        if (!typingEl) return;
        const current = phrases[pIndex];

        if (typingForward) {
            charIndex++;
            if (charIndex > current.length) {
                typingForward = false;
                setTimeout(typeLoop, 1500);
                return;
            }
        } else {
            charIndex--;
            if (charIndex < 0) {
                typingForward = true;
                pIndex = (pIndex + 1) % phrases.length;
            }
        }
        typingEl.textContent = current.substring(0, charIndex) || '\u00A0';
        setTimeout(typeLoop, typingForward ? 100 : 50);
    }
    if (typingEl) typeLoop();

    // ===== Progress bars animation =====
    const progressEls = document.querySelectorAll('.progress');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const value = el.getAttribute('data-value') || 0;
                const span = el.querySelector('span');
                if (span) span.style.width = value + '%';
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.4 });
    progressEls.forEach(p => obs.observe(p));

    // ===== Back-to-top year =====
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    
    const backTop = document.querySelector('.back-top');
    if (backTop) {
        backTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});