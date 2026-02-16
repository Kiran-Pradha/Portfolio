class ForestPortfolio {
    constructor() {
        this.initCanvas();
        this.initNav();
        this.initScroll();
    }

    initCanvas() {
        const canvas = document.getElementById('bgCanvas');
        const ctx = canvas.getContext('2d');
        
        let particles = [];
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resize);
        resize();
        
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: canvas.height + Math.random() * 100,
                vy: Math.random() * 0.8 + 0.3,
                size: Math.random() * 3 + 1,
                alpha: Math.random() * 0.5 + 0.2
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.y -= p.vy;
                if (p.y < 0) p.y = canvas.height + 50;
                
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.shadowBlur = 12;
                ctx.shadowColor = '#50C878';
                ctx.fillStyle = '#81C784';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    initNav() {
        const btn = document.querySelector('.menu-btn');
        const list = document.querySelector('.nav-list');
        
        btn.addEventListener('click', () => {
            list.classList.toggle('open');
        });
        
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                list.classList.remove('open');
            });
        });
    }
    
    initScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 120);
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.glow-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) scale(0.95)';
            el.style.transition = 'all 0.7s ease';
            observer.observe(el);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ForestPortfolio();
});
// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('.nav-list');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navList.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        navList.classList.remove('active');
    });
});
