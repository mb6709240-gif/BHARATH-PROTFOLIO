/* ==============================================================
   LOADING SCREEN
   ============================================================== */
(function loader() {
    const loader = document.getElementById('loader');
    const fill = document.getElementById('loaderFill');
    const percent = document.getElementById('loaderPercent');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 400);
        }
        fill.style.width = progress + '%';
        percent.textContent = Math.min(Math.floor(progress), 100);
    }, 120);
})();

/* ==============================================================
   CUSTOM CURSOR
   ============================================================== */
if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.getElementById('cursorGlow');
    const dot = document.getElementById('cursorDot');

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        glow.style.opacity = '0';
    });

    document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .cert-card, .social-link').forEach(el => {
        el.addEventListener('mouseenter', () => dot.classList.add('hover'));
        el.addEventListener('mouseleave', () => dot.classList.remove('hover'));
    });
}

/* ==============================================================
   SCROLL PROGRESS
   ============================================================== */
const progressBar = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
});

/* ==============================================================
   TYPING ANIMATION
   ============================================================== */
const typedTextSpan = document.querySelector('.typed-text');
const texts = ['Frontend Developer', 'React Developer', 'Creative UI Engineer'];
let textIndex = 0,
    charIndex = 0,
    isDeleting = false;

function typeLoop() {
    const current = texts[textIndex];
    if (isDeleting) {
        typedTextSpan.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeLoop, 600);
            return;
        }
        setTimeout(typeLoop, 35);
    } else {
        typedTextSpan.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(typeLoop, 2000);
            return;
        }
        setTimeout(typeLoop, 55);
    }
}
typeLoop();

/* ==============================================================
   PARTICLE BACKGROUND (Canvas)
   ============================================================== */
(function particles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const mouse = { x: null, y: null };

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = canvas.width = rect.width || window.innerWidth;
        height = canvas.height = rect.height || window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    this.x -= dx * force * 0.02;
                    this.y -= dy * force * 0.02;
                }
            }

            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    const count = Math.min(Math.floor((width * height) / 8000), 200);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    document.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    document.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update();
            p.draw(); });
        drawConnections();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        resize();
        particles = [];
        const newCount = Math.min(Math.floor((width * height) / 8000), 200);
        for (let i = 0; i < newCount; i++) {
            particles.push(new Particle());
        }
    });
})();

/* ==============================================================
   DATA
   ============================================================== */
const skillsData = [
    { name: 'Java', icon: '☕', pct: 85 },
    { name: 'Python', icon: '🐍', pct: 80 },
    { name: 'HTML', icon: '🌐', pct: 95 },
    { name: 'CSS', icon: '🎨', pct: 92 },
    { name: 'JavaScript', icon: '⚡', pct: 88 },
    { name: 'React', icon: '⚛️', pct: 78 },
];

const projectsData = [{
    id: 1,
    title: 'HOBBY WEBSITE',
    desc: 'A personal website built to showcase my hobbies and interests.',
    tech: ['React', 'Tailwind', 'Framer'],
    icon: '🎬',
    github: 'https://github.com/mb6709240-gif',
    demo: 'https://github.com/mb6709240-gif',
}, {
    id: 2,
    title: 'MY PORTFOLIO',
    desc: 'A personal portfolio website to showcase my skills and projects.',
    tech: ['JS', 'REACT', 'CSS'],
    icon: '💻',
    github: 'https://github.com/mb6709240-gif',
    demo: 'https://github.com/mb6709240-gif',
}, {
    id: 3,
    title: 'ATTENDENCE MANAGEMENT SYSTEM',
    desc: 'A web application to manage and track attendance for students and employees.',
    tech: ['React', 'Node', 'CSS'],
    icon: '📊',
    github: 'https://github.com/mb6709240-gif',
    demo: 'https://mb6709240-gif.github.io/WEBSAMPLE01/',
}, ];

const certsData = [{
    id: 1,
    title: 'LEGACY RESPONSIVE WEB DESIGN V8',
    desc: 'an older freeCodeCamp certification course that teaches core HTML and CSS skills like media queries and flexbox through hands-on project',
    img: '1.png',
}, {
    id: 2,
    title: 'Responsive Web Design',
    desc: ' a web approach that makes pages change size and shape to fit any screen',
    img: 'freecodecamp 2.png',
}, {
    id: 3,
    title: 'INFOSYS JAVA PROGRAMMING FUNDAMENTALS',
    desc: ' structured training module designed to teach core Java Programming Basics and object-oriented programming concepts to aspiring software developers',
    img: 'JAVA.jpeg',
}, {
    id: 4,
    title: 'INFOSYS PYTHON PROGRAMMING FUNDAMENTALS',
    desc: ' structured training module designed to teach core Python Programming Basics and object-oriented programming concepts to aspiring software developers',
    img: 'PYTHON.jpeg',
}, ];

/* ==============================================================
   RENDER SKILLS
   ============================================================== */
const skillsGrid = document.getElementById('skillsGrid');
skillsData.forEach((s, i) => {
    const card = document.createElement('div');
    card.className = `skill-card reveal delay-${(i % 4) + 1}`;
    card.innerHTML = `
                <span class="icon">${s.icon}</span>
                <h4>${s.name}</h4>
                <div class="skill-bar"><div class="fill" data-pct="${s.pct}"></div></div>
                <span class="pct">${s.pct}%</span>
            `;
    skillsGrid.appendChild(card);
});

function animateSkillBars() {
    document.querySelectorAll('.skill-card .fill').forEach(bar => {
        const pct = parseFloat(bar.dataset.pct);
        const rect = bar.closest('.skill-card').getBoundingClientRect();
        if (rect.top < window.innerHeight - 60 && rect.bottom > 0) {
            bar.style.width = pct + '%';
        }
    });
}

/* ==============================================================
   RENDER PROJECTS
   ============================================================== */
const projectsGrid = document.getElementById('projectsGrid');
projectsData.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = `project-card reveal delay-${(i % 3) + 1}`;
    card.innerHTML = `
                <div class="project-img">
                    ${p.icon}
                    <div class="overlay">
                        <a href="${p.github}" class="btn btn-primary btn-sm"><i class="fab fa-github"></i> Code</a>
                        <a href="${p.demo}" class="btn btn-primary btn-sm"><i class="fas fa-external-link-alt"></i> Live</a>
                    </div>
                </div>
                <div class="project-body">
                    <h3>${p.title}</h3>
                    <div class="tech-stack">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
                    <p>${p.desc}</p>
                </div>
            `;
    projectsGrid.appendChild(card);

    // 3D Tilt effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
            `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-12px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)';
    });
});

/* ==============================================================
   RENDER CERTIFICATES (with images)
   ============================================================== */
const certsGrid = document.getElementById('certsGrid');
certsData.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = `cert-card reveal delay-${(i % 4) + 1}`;
    card.innerHTML = `
                <div class="cert-img">
                    <img src="${c.img}" alt="${c.title}" onerror="this.style.display='none'; this.parentElement.textContent='📜'; this.parentElement.style.fontSize='4rem'; this.parentElement.style.color='var(--text-muted)';" />
                </div>
                <div class="cert-body">
                    <h4>${c.title}</h4>
                    <p>${c.desc}</p>
                    <div class="cert-actions">
                        <button class="btn btn-primary btn-sm view-cert" data-id="${c.id}"><i class="fas fa-eye"></i> View</button>
                        <button class="btn btn-outline btn-sm download-cert" data-id="${c.id}"><i class="fas fa-download"></i> Download</button>
                    </div>
                </div>
            `;
    certsGrid.appendChild(card);
});

/* ==============================================================
   CERTIFICATE MODAL
   ============================================================== */
const modal = document.getElementById('certModal');
const modalClose = document.getElementById('modalClose');
const modalPreview = document.getElementById('modalPreview');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalDownloadBtn = document.getElementById('modalDownloadBtn');
let currentCertId = null;

function openModal(id) {
    const cert = certsData.find(c => c.id === id);
    if (!cert) return;
    currentCertId = id;
    modalPreview.innerHTML = `<img src="${cert.img}" alt="${cert.title}" onerror="this.style.display='none'; this.parentElement.textContent='📜'; this.parentElement.style.fontSize='4rem';" />`;
    modalTitle.textContent = cert.title;
    modalDesc.textContent = cert.desc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentCertId = null;
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// Modal download button
modalDownloadBtn.addEventListener('click', () => {
    if (currentCertId !== null) {
        downloadCert(currentCertId);
    }
});

// View and Download buttons (delegated)
document.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('.view-cert');
    if (viewBtn) {
        const id = parseInt(viewBtn.dataset.id);
        openModal(id);
    }

    const downloadBtn = e.target.closest('.download-cert');
    if (downloadBtn) {
        const id = parseInt(downloadBtn.dataset.id);
        downloadCert(id);
    }
});

function downloadCert(id) {
    const cert = certsData.find(c => c.id === id);
    if (!cert) return;

    // Try to fetch and download the image
    fetch(cert.img)
        .then(res => {
            if (!res.ok) throw new Error('Image not found');
            return res.blob();
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = cert.img.split('/').pop() || `${cert.title.replace(/\s/g, '_')}.jpg`;
            a.click();
            URL.revokeObjectURL(url);
        })
        .catch(() => {
            // Fallback: download as text file
            const content = `Certificate: ${cert.title}\n${cert.desc}`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${cert.title.replace(/\s/g, '_')}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        });
}

/* ==============================================================
   DOWNLOAD RESUME
   ============================================================== */
document.getElementById('downloadResumeBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const content =
        'Bharath Kumar — Resume\n\nComputer Science Engineering Student\nSkills: Java, Python, HTML, CSS, JS, React\nEducation: Anna University (2024–2028)\n\nPassionate about building elegant digital experiences.';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Bharath_Kumar_Resume.txt';
    a.click();
    URL.revokeObjectURL(url);
});

/* ==============================================================
   MAGNETIC BUTTONS
   ============================================================== */
document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        btn.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
        btn.style.transition = 'transform 0.1s ease';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
});

/* ==============================================================
   SCROLL REVEAL (Intersection Observer)
   ============================================================== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
});

revealElements.forEach(el => revealObserver.observe(el));

/* ==============================================================
   NAVBAR ACTIVE LINK + SCROLL EFFECT
   ============================================================== */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    let current = '';
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120) current = section.id;
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });

    animateSkillBars();
}

window.addEventListener('scroll', updateNavbar);
window.addEventListener('load', () => {
    updateNavbar();
    setTimeout(animateSkillBars, 500);
});

/* ==============================================================
   HAMBURGER
   ============================================================== */
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
});

navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('open');
    });
});

/* ==============================================================
   SCROLL TO TOP
   ============================================================== */
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==============================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

/* ==============================================================
   KEYBOARD SHORTCUT: 'S' for scroll to top
   ============================================================== */
document.addEventListener('keydown', (e) => {
    if (e.key === 's' && !e.ctrlKey && !e.metaKey) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

console.log('🚀 Bharath Kumar — World-class Portfolio');
console.log('✨ Built with ❤️ for the future.');