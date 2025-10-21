   class AdvancedParallax {
            constructor() {
                this.speed = 5;
                this.intensity = 5;
                this.effectsEnabled = true;
                this.init();
            }

            init() {
                this.setupEventListeners();
                this.setupScrollAnimations();
                this.animateTitle();
            }

            setupEventListeners() {
                // Speed control
                document.getElementById('speedControl').addEventListener('input', (e) => {
                    this.speed = parseInt(e.target.value);
                });

                // Intensity control
                document.getElementById('effectControl').addEventListener('input', (e) => {
                    this.intensity = parseInt(e.target.value);
                });

                // Toggle effects
                document.getElementById('toggleEffects').addEventListener('click', () => {
                    this.effectsEnabled = !this.effectsEnabled;
                    document.getElementById('toggleEffects').textContent = 
                        this.effectsEnabled ? 'Disable Effects' : 'Enable Effects';
                });

                // Mouse move parallax
                document.addEventListener('mousemove', (e) => {
                    if (!this.effectsEnabled) return;
                    
                    const mouseX = e.clientX / window.innerWidth;
                    const mouseY = e.clientY / window.innerHeight;
                    
                    const parallaxEl = document.getElementById('mouseParallax');
                    parallaxEl.style.left = (e.clientX - 100) + 'px';
                    parallaxEl.style.top = (e.clientY - 100) + 'px';
                    
                    // Move background layers based on mouse position
                    this.moveLayers(mouseX, mouseY);
                });

                // Scroll parallax
                window.addEventListener('scroll', () => {
                    this.handleScroll();
                });

                // Window resize
                window.addEventListener('resize', () => {
                    this.handleResize();
                });
            }

            moveLayers(mouseX, mouseY) {
                if (!this.effectsEnabled) return;

                const layers = document.querySelectorAll('.parallax-layer');
                layers.forEach((layer, index) => {
                    const speed = (index + 1) * 0.1 * this.intensity;
                    const xMove = (mouseX - 0.5) * speed * 100;
                    const yMove = (mouseY - 0.5) * speed * 100;
                    
                    layer.style.transform = `translateZ(-${index + 1}px) scale(${index + 2}) translate(${xMove}px, ${yMove}px)`;
                });
            }

            handleScroll() {
                const scrolled = window.pageYOffset;
                const parallaxContainer = document.getElementById('parallaxContainer');
                const rate = scrolled * -0.5 * (this.speed / 10);
                
                if (this.effectsEnabled) {
                    parallaxContainer.style.transform = `translateY(${rate}px)`;
                }

                // Fade in title on initial scroll
                if (scrolled > 50) {
                    document.getElementById('mainTitle').style.opacity = '1';
                    document.getElementById('mainTitle').style.transform = 'translateY(0)';
                    document.getElementById('subTitle').style.opacity = '1';
                    document.getElementById('subTitle').style.transform = 'translateY(0)';
                }
            }

            setupScrollAnimations() {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                }, { threshold: 0.3 });

                document.querySelectorAll('.card').forEach(card => {
                    observer.observe(card);
                });
            }

            animateTitle() {
                // Animate title on load
                setTimeout(() => {
                    document.getElementById('mainTitle').style.opacity = '1';
                    document.getElementById('mainTitle').style.transform = 'translateY(0)';
                }, 500);

                setTimeout(() => {
                    document.getElementById('subTitle').style.opacity = '1';
                    document.getElementById('subTitle').style.transform = 'translateY(0)';
                }, 1000);
            }

            handleResize() {
                // Reset transformations on resize
                const layers = document.querySelectorAll('.parallax-layer');
                layers.forEach((layer, index) => {
                    layer.style.transform = `translateZ(-${index + 1}px) scale(${index + 2})`;
                });
            }
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', () => {
            new AdvancedParallax();
        });
 
