// Data inicial do relacionamento
const startDate = new Date('2024-08-13T19:16:00');

// Configurações dos corações animados
let heartCount = 0;
const MAX_HEARTS = 30;
let heartInterval;

// Função para atualizar o contador de tempo
function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    // Cálculo das unidades de tempo
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Montagem do texto do timer
    let timerText = 'Nos conhecemos há: ';
    if (years > 0) timerText += `${years} anos, `;
    timerText += `${months} meses, ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;

    document.getElementById('timer').textContent = timerText;
}

// Função para criar coração animado
function createHeart() {
    if (heartCount >= MAX_HEARTS) return;

    const heart = document.createElement('div');
    heart.className = 'heart';    heart.innerHTML = '💙';
    
    // Configurações aleatórias para o coração
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * (30 - 15) + 15) + 'px';
    heart.style.animationDuration = (Math.random() * (6 - 3) + 3) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(heart);
    heartCount++;

    // Remover coração após animação
    heart.addEventListener('animationend', () => {
        heart.remove();
        heartCount--;
    });
}

// Função para criar coração subindo na tela inicial
function createRisingHeart() {
    const heart = document.createElement('div');
    heart.className = 'rising-heart';    heart.innerHTML = '💙';
    
    // Configurações aleatórias para o coração
    heart.style.left = (Math.random() * 80 + 10) + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 1 + 3) + 's';
    heart.style.opacity = (Math.random() * 0.3 + 0.7).toString();
    
    document.querySelector('.initial-screen').appendChild(heart);
    heart.addEventListener('animationend', () => heart.remove());
}

// Função para mostrar o conteúdo principal
function showMainContent() {
    const transitionScreen = document.querySelector('.transition-screen');
    const mainContent = document.querySelector('.main-content');
    
    transitionScreen.classList.remove('visible');
    mainContent.classList.add('visible');
    
    // Configurar player do Spotify
    const player = document.getElementById('spotify-player');
    player.style.display = 'block';
    player.src = player.src;
    
    // Mostrar mensagem com delay
    const messageContainer = document.getElementById('message-container');
    setTimeout(() => messageContainer.classList.add('visible'), 1000);
    
    // Iniciar animação de corações
    heartInterval = setInterval(createHeart, 300);
}

// Inicializar timer e animações iniciais
const timerInterval = setInterval(updateTimer, 1000);
updateTimer();
createRisingHeart();
const initialHeartsInterval = setInterval(createRisingHeart, 600);

// Evento de clique no botão principal
document.getElementById('main-button').addEventListener('click', function() {
    clearInterval(initialHeartsInterval);
    document.querySelector('.initial-screen').classList.add('fade-out');
    document.querySelector('.transition-screen').classList.add('visible');
    
    // Criar corações na tela de transição
    const transitionHearts = document.createElement('div');
    transitionHearts.className = 'transition-hearts';
    document.querySelector('.transition-screen').appendChild(transitionHearts);
    
    // Criar múltiplos corações com delays
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'rising-heart';
            heart.innerHTML = '💙';
            heart.style.left = (Math.random() * 80 + 10) + 'vw';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.animationDelay = (Math.random() * 0.5) + 's';
            transitionHearts.appendChild(heart);
            heart.addEventListener('animationend', () => heart.remove());
        }, i * 300);
    }

    // Mostrar conteúdo principal após delay
    setTimeout(showMainContent, 6000);
});
