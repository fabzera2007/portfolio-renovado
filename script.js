// --- CÓDIGO EXISTENTE DA GALÁXIA ---
const canvas = document.getElementById('galaxy-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numStars = 200;

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.5;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        this.x += Math.random() * 0.5 - 0.25;
        this.y += Math.random() * 0.5 - 0.25;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
    }
}

function initStars() {
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2);
    gradient.addColorStop(0, '#0b032d');
    gradient.addColorStop(1, '#08021b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });
}

// --- CÓDIGO EXISTENTE DA ROLAGEM SUAVE ---
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// --- NOVO CÓDIGO PARA O EFEITO DE DIGITAÇÃO ---

const typingElement = document.getElementById('typing-effect');
// Edite as frases aqui
const phrasesToType = [
    "Desenvolvedor em formação.",
    "Apaixonado por tecnologia.",
    "Criando soluções com código.",
    "Sempre aprendendo algo novo."
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100; // Velocidade de digitação (em ms)
const erasingSpeed = 50; // Velocidade ao apagar (em ms)
const delayBetweenPhrases = 2000; // Pausa antes de começar a apagar

function type() {
    const currentPhrase = phrasesToType[phraseIndex];

    if (isDeleting) {
        // Apagando
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Escrevendo
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    // Se a frase foi totalmente escrita
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, delayBetweenPhrases); // Pausa
    } 
    // Se a frase foi totalmente apagada
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrasesToType.length; // Vai para a próxima frase
        setTimeout(type, typingSpeed);
    } 
    // Continua a animação (escrevendo ou apagando)
    else {
        const speed = isDeleting ? erasingSpeed : typingSpeed;
        setTimeout(type, speed);
    }
}

// Inicia a animação de fundo e o efeito de digitação
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    animate();
    setTimeout(type, 1000); // Inicia a digitação após um pequeno atraso
});


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    initStars();
});