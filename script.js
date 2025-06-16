document.addEventListener('DOMContentLoaded', () => {
    // 0. Pré-carregamento e Transição do Body
    const bodyElement = document.querySelector('body');

    // --- Efeito de Estrelas da Galáxia ---
    function generateStars(numStars) {
        let starsCss = '';
        for (let i = 0; i < numStars; i++) {
            const x = Math.floor(Math.random() * 100); // Posição X em %
            const y = Math.floor(Math.random() * 100); // Posição Y em %
            // Reduzimos o tamanho máximo da estrela e a opacidade para um efeito mais leve e performático
            const size = (Math.random() * 0.5) + 0.2; // Tamanho da estrela (0.2 a 0.7px)
            const opacity = (Math.random() * 0.5) + 0.2; // Opacidade da estrela (0.2 a 0.7)
            starsCss += `radial-gradient(circle at ${x}vw ${y}vh, rgba(255,255,255,${opacity}) ${size}px, transparent ${size + 0.5}px)${(i < numStars - 1) ? ',' : ''}`;
        }
        return starsCss;
    }

    // Geração e injeção das estrelas no head
    // REDUZIMOS O NÚMERO DE ESTRELAS PARA MELHORAR O DESEMPENHO
    const starCount = 150; // Reduzido de 700 para 150-200. Você pode ajustar este número.
                         // Um número menor manterá o efeito sem sobrecarregar o navegador.
    const generatedStarsCss = generateStars(starCount);

    const styleTag = document.createElement('style');
    styleTag.textContent = `
        body::before {
            background-image: ${generatedStarsCss};
        }
    `;
    document.head.appendChild(styleTag);

    // Agora que as estrelas foram injetadas, podemos fazer o body aparecer
    // Isso garante que o fundo esteja pronto antes do conteúdo aparecer
    bodyElement.classList.add('loaded');

    // --- Animação do Gradiente de Fundo ---
    const colors = [
        ['#3b006b', '#6a0dad', '#000000'], // Roxo escuro para preto
        ['#4b0082', '#7b2e9d', '#1a0033'], // Variação 1 de roxo
        ['#2a004a', '#5a007b', '#000000'], // Variação 2 de roxo
        ['#0a002a', '#3a005b', '#000000']  // Variação 3 de roxo mais para o azulado
    ];
    let currentColorIndex = 0;

    function animateGradient() {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        const nextColors = colors[currentColorIndex];

        // Animação suave entre os gradientes
        bodyElement.style.transition = 'background 5s ease-in-out'; // Transição mais longa para suavidade
        bodyElement.style.background = `linear-gradient(180deg, ${nextColors[0]} 0%, ${nextColors[1]} 50%, ${nextColors[2]} 100%)`;
        bodyElement.style.backgroundAttachment = 'fixed'; // Garante que continue fixo

        // Define o próximo ciclo de animação
        setTimeout(animateGradient, 10000); // Muda a cada 10 segundos
    }

    // Inicia a animação do gradiente
    // Define o gradiente inicial imediatamente
    bodyElement.style.background = `linear-gradient(180deg, ${colors[0][0]} 0%, ${colors[0][1]} 50%, ${colors[0][2]} 100%)`;
    bodyElement.style.backgroundAttachment = 'fixed';
    setTimeout(animateGradient, 5000); // Inicia a troca de cores após 5 segundos

    // 1. Animação de digitação/aparecimento do texto na seção Hero
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButton = document.querySelector('.hero-section .btn');

    // Função para animar caracteres um por um (digitação)
    const typeText = (element, text, delay = 50, callback) => {
        let i = 0;
        element.innerHTML = '';
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

    // Atraso para iniciar as animações do Hero após o carregamento do body
    setTimeout(() => {
        // Animação do título
        typeText(heroTitle, heroTitle.textContent, 70, () => {
            // Animação da descrição após o título
            typeText(heroDescription, heroDescription.textContent, 50, () => {
                // Animação do botão de "fade-in" após a descrição
                heroButton.classList.add('is-visible');
            });
        });
    }, 1000); // Atraso maior para permitir que o body apareça completamente (1 segundo)

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
    }, 2500); // Ajuste este tempo para sincronizar com as animações de digitação completas


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
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                formStatus.textContent = 'Por favor, preencha todos os campos.';
                formStatus.style.color = '#ff6b6b';
            } else if (!isValidEmail(email)) {
                formStatus.textContent = 'Por favor, insira um email válido.';
                formStatus.style.color = '#ff6b6b';
            } else {
                formStatus.textContent = 'Enviando mensagem...';
                formStatus.style.color = '#8be9fd';

                setTimeout(() => {
                    formStatus.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
                    formStatus.style.color = '#50fa7b';
                    contactForm.reset();
                }, 2000);
            }
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});