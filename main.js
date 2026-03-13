document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission to Webhook
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = waitlistForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Collect Form Data
            const formData = new FormData(waitlistForm);
            const data = {
                email: formData.get('email'),
                pain_point: formData.get('pain'),
                submitted_at: new Date().toISOString()
            };

            btn.innerHTML = 'Reserving...';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            try {
                // Trigger Webhook
                const response = await fetch('https://hook.eu1.make.com/hgtsn7kxba1m8aaoy61xtd7qv1vhk9r3', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    btn.innerHTML = 'Spot Reserved!';
                    btn.style.background = '#1E7D5C'; // Brand Green
                    waitlistForm.reset();
                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                console.error('Error:', error);
                btn.innerHTML = 'Error. Try again?';
            } finally {
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }
        });
    }

    // Intersection Observer for Section Reveals
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Simple Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});
