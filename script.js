document.addEventListener('DOMContentLoaded', () => {
    // 1. Animação de digitação/aparecimento do texto na seção Hero
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButton = document.querySelector('.hero-section .btn');

    // Função para animar caracteres um por um (digitação)
    const typeText = (element, text, delay = 50, callback) => {
        let i = 0;
        element.innerHTML = ''; // Limpa o conteúdo inicial
        const interval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, delay);
    };

    // Atraso para iniciar as animações
    setTimeout(() => {
        // Animação do título
        typeText(heroTitle, heroTitle.textContent, 70, () => {
            // Animação da descrição após o título
            typeText(heroDescription, heroDescription.textContent, 50, () => {
                // Animação do botão de "fade-in" após a descrição
                heroButton.classList.add('is-visible'); // Classe que aplica opacidade 1
            });
        });
    }, 500); // Começa 0.5 segundos após o carregamento da página

    // Adiciona classe de visibilidade para os elementos no Hero
    heroTitle.classList.add('animate-text');
    heroDescription.classList.add('animate-text');
    heroButton.classList.add('animate-fade-in');

    // Transição de opacidade e movimento para os elementos do Hero após a digitação
    setTimeout(() => {
        heroTitle.style.opacity = 1;
        heroTitle.style.transform = 'translateY(0)';
        heroDescription.style.opacity = 1;
        heroDescription.style.transform = 'translateY(0)';
        heroButton.style.opacity = 1;
    }, 1500); // Ajuste este tempo para sincronizar com as animações de digitação


    // 2. Efeito de scroll no cabeçalho
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Menu Hamburger para Responsividade
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link (apenas em mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // 4. Animação de elementos ao rolar a página (Intersection Observer API)
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% do elemento visível para ativar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });

    // 5. Scroll Spy (Destacar link da navegação ao rolar para a seção)
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Ajuste para melhor detecção
                current = section.getAttribute('id');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 6. Validação de Formulário de Contato (Exemplo Básico)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                formStatus.textContent = 'Por favor, preencha todos os campos.';
                formStatus.style.color = '#ff6b6b'; // Vermelho para erro
            } else if (!isValidEmail(email)) {
                formStatus.textContent = 'Por favor, insira um email válido.';
                formStatus.style.color = '#ff6b6b';
            } else {
                // Aqui você enviaria os dados para um serviço de backend (Ex: Formspree, Netlify Forms, sua API)
                // Para este exemplo, apenas simula o envio
                formStatus.textContent = 'Enviando mensagem...';
                formStatus.style.color = '#8be9fd'; // Azul claro

                setTimeout(() => {
                    formStatus.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
                    formStatus.style.color = '#50fa7b'; // Verde para sucesso
                    contactForm.reset(); // Limpa o formulário
                }, 2000); // Simula atraso de envio
            }
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // --- Efeitos Adicionais (Você pode adicionar mais aqui!) ---

    // Exemplo: Efeito de partículas no Hero (usando uma biblioteca externa como particles.js)
    // Para usar particles.js:
    // 1. Adicione a biblioteca no seu HTML: <script src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"></script>
    // 2. Crie uma div no HTML dentro da section hero com id="particles-js"
    // 3. Adicione o CSS: #particles-js { position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 1; }
    /*
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            // Configurações do particles.js (exemplo simples)
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
            },
            "retina_detect": true
        });
    }
    */
});