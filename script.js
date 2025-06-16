document.addEventListener('DOMContentLoaded', () => {
    // 1. Animação de digitação/aparecimento do texto na seção Hero
    const heroTitle = document.querySelector('.hero-title'); /* cite: 2 */
    const heroDescription = document.querySelector('.hero-description'); /* cite: 2 */
    const heroButton = document.querySelector('.hero-section .btn'); /* cite: 2 */

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
    heroTitle.classList.add('animate-text'); /* cite: 2 */
    heroDescription.classList.add('animate-text'); /* cite: 2 */
    heroButton.classList.add('animate-fade-in'); /* cite: 2 */

    // Transição de opacidade e movimento para os elementos do Hero após a digitação
    setTimeout(() => {
        heroTitle.style.opacity = 1; /* cite: 2 */
        heroTitle.style.transform = 'translateY(0)'; /* cite: 2 */
        heroDescription.style.opacity = 1; /* cite: 2 */
        heroDescription.style.transform = 'translateY(0)'; /* cite: 2 */
        heroButton.style.opacity = 1; /* cite: 2 */
    }, 1500); // Ajuste este tempo para sincronizar com as animações de digitação


    // 2. Efeito de scroll no cabeçalho
    const header = document.querySelector('.header'); /* cite: 2 */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled'); /* cite: 2 */
        } else {
            header.classList.remove('scrolled'); /* cite: 2 */
        }
    });

    // 3. Menu Hamburger para Responsividade
    const menuToggle = document.querySelector('.menu-toggle'); /* cite: 2 */
    const navLinks = document.querySelector('.nav-links'); /* cite: 2 */

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active'); /* cite: 2 */
        menuToggle.classList.toggle('active'); /* cite: 2 */
    });

    // Fechar menu ao clicar em um link (apenas em mobile)
    document.querySelectorAll('.nav-links a').forEach(link => { /* cite: 2 */
        link.addEventListener('click', () => { /* cite: 2 */
            if (window.innerWidth <= 768) { /* cite: 2 */
                navLinks.classList.remove('active'); /* cite: 2 */
                menuToggle.classList.remove('active'); /* cite: 2 */
            }
        });
    });

    // 4. Animação de elementos ao rolar a página (Intersection Observer API)
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll'); /* cite: 2 */

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px', /* cite: 2 */
        threshold: 0.1 // 10% do elemento visível para ativar
    };

    const observer = new IntersectionObserver((entries, observer) => { /* cite: 2 */
        entries.forEach(entry => { /* cite: 2 */
            if (entry.isIntersecting) { /* cite: 2 */
                entry.target.classList.add('is-visible'); /* cite: 2 */
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(element => { /* cite: 2 */
        observer.observe(element); /* cite: 2 */
    });

    // 5. Scroll Spy (Destacar link da navegação ao rolar para a seção)
    const sections = document.querySelectorAll('section[id]'); /* cite: 2 */
    window.addEventListener('scroll', () => {
        let current = ''; /* cite: 2 */
        sections.forEach(section => { /* cite: 2 */
            const sectionTop = section.offsetTop; /* cite: 2 */
            const sectionHeight = section.clientHeight; /* cite: 2 */
            if (pageYOffset >= sectionTop - sectionHeight / 3) { // Ajuste para melhor detecção
                current = section.getAttribute('id'); /* cite: 2 */
            }
        });

        navLinks.querySelectorAll('a').forEach(link => { /* cite: 2 */
            link.classList.remove('active'); /* cite: 2 */
            if (link.getAttribute('href').includes(current)) { /* cite: 2 */
                link.classList.add('active'); /* cite: 2 */
            }
        });
    });

    // 6. Validação de Formulário de Contato (Exemplo Básico)
    const contactForm = document.getElementById('contactForm'); /* cite: 2 */
    const formStatus = document.getElementById('formStatus'); /* cite: 2 */

    if (contactForm) { /* cite: 2 */
        contactForm.addEventListener('submit', (e) => { /* cite: 2 */
            e.preventDefault(); // Impede o envio padrão do formulário

            const name = document.getElementById('name').value.trim(); /* cite: 2 */
            const email = document.getElementById('email').value.trim(); /* cite: 2 */
            const message = document.getElementById('message').value.trim(); /* cite: 2 */

            if (name === '' || email === '' || message === '') { /* cite: 2 */
                formStatus.textContent = 'Por favor, preencha todos os campos.'; /* cite: 2 */
                formStatus.style.color = '#ff6b6b'; // Vermelho para erro
            } else if (!isValidEmail(email)) { /* cite: 2 */
                formStatus.textContent = 'Por favor, insira um email válido.'; /* cite: 2 */
                formStatus.style.color = '#ff6b6b'; /* cite: 2 */
            } else {
                // Aqui você enviaria os dados para um serviço de backend (Ex: Formspree, Netlify Forms, sua API)
                // Para este exemplo, apenas simula o envio
                formStatus.textContent = 'Enviando mensagem...'; /* cite: 2 */
                formStatus.style.color = '#8be9fd'; // Azul claro

                setTimeout(() => {
                    formStatus.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.'; /* cite: 2 */
                    formStatus.style.color = '#50fa7b'; // Verde para sucesso
                    contactForm.reset(); // Limpa o formulário
                }, 2000); // Simula atraso de envio
            }
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; /* cite: 2 */
        return re.test(String(email).toLowerCase()); /* cite: 2 */
    }

    // --- Efeito de Estrelas da Galáxia ---
    function generateStars(numStars) {
        let stars = '';
        for (let i = 0; i < numStars; i++) {
            const x = Math.floor(Math.random() * 100); // Posição X em %
            const y = Math.floor(Math.random() * 100); // Posição Y em %
            const size = Math.random() * 1.5; // Tamanho da estrela (0.5 a 2px)
            const duration = Math.random() * 5 + 5; // Duração da animação (5 a 10s)
            const delay = Math.random() * 5; // Atraso da animação (0 a 5s)

            stars += `${x}vw ${y}vh ${size}px ${size}px #FFFFFF,`;
        }
        return stars.slice(0, -1); // Remove a última vírgula
    }

    // Gera um número diferente de estrelas para camadas diferentes para um efeito de profundidade
    const bodyBefore = document.body; // O pseudo-elemento :before é estilizado, não pode ser selecionado diretamente.
                                      // Aplicamos o background ao body e deixamos o CSS para o pseudo-elemento.

    // Camada 1: Estrelas maiores e mais próximas
    const stars1 = generateStars(100); // Menos estrelas, maiores
    // Camada 2: Estrelas médias
    const stars2 = generateStars(200);
    // Camada 3: Estrelas pequenas e mais distantes
    const stars3 = generateStars(300);

    // Aplica o background com as estrelas geradas ao body (que é quem tem o ::before)
    // Usamos um truque aqui: o CSS já define a animação `twinkle` para `body::before`.
    // O JavaScript irá criar a propriedade `background` que o CSS usa.
    // Combinamos as camadas para um efeito mais denso.
    // Não podemos definir `background-image` para o `body::before` diretamente no JS,
    // mas podemos injetar estilos. Uma forma mais comum para estrelas é usando `box-shadow`.
    // O CSS usa `background-position` para a animação `twinkle`.
    // Vamos gerar múltiplos box-shadows para as estrelas e aplicar ao body::before através de uma classe ou estilo inline.
    // No entanto, para usar `box-shadow` num pseudo-elemento e animar a posição de fundo, é mais complexo.
    // Uma solução mais simples e performática para "estrelas" animadas é usar múltiplas `box-shadow` no `body::before`.
    // E para o `twinkle`, você anima o `opacity` de algumas estrelas ou usa multiple `background-image` com `background-position`.

    // Vou ajustar a abordagem: O CSS já tem a animação `twinkle` no `background-position`.
    // Vamos gerar múltiplos `radial-gradient` para as estrelas e combiná-los.

    const bodyElement = document.querySelector('body');
    const starCount = 700; // Total de estrelas
    let starsCss = '';

    for (let i = 0; i < starCount; i++) {
        const x = Math.floor(Math.random() * 100); // Posição X em %
        const y = Math.floor(Math.random() * 100); // Posição Y em %
        const size = (Math.random() * 0.8) + 0.5; // Tamanho da estrela (0.5 a 1.3px)
        const opacity = (Math.random() * 0.7) + 0.3; // Opacidade da estrela (0.3 a 1.0)
        starsCss += `radial-gradient(circle at ${x}vw ${y}vh, rgba(255,255,255,${opacity}) ${size}px, transparent ${size + 1}px)${(i < starCount - 1) ? ',' : ''}`;
    }

    // Cria uma tag <style> e injeta os fundos das estrelas
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        body::before {
            background-image: ${starsCss};
            background-size: 2000px 2000px; /* Tamanho maior para o fundo das estrelas para o efeito de movimento */
        }
    `;
    document.head.appendChild(styleTag);
});