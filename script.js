// script.js
// URL para o nosso ficheiro de dados JSON
const DATA_URL = 'data.json'; // Ajustado para ser apenas o nome do ficheiro, se estiver na raiz

// Função principal para carregar e processar os dados
async function loadData() {
    try {
        // 1. Fetch: Buscar o ficheiro data.json
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // 2. Parse: Converter a resposta em objeto JavaScript
        const data = await response.json();
        
        // NOVO CÁLCULO DINÂMICO DO TOTAL
        // Soma todos os golos de todas as equipas
        const calculatedTotalGoals = data.clubs.reduce((sum, club) => sum + club.goals, 0);

        // Chamar as funções para renderizar cada secção
        applyGeneralConfig(data.config);
        renderTotalGoals(calculatedTotalGoals); // USA O VALOR CALCULADO AQUI
        renderClubs(data.clubs);
        renderTrophies(data.trophies);
        
    } catch (error) {
        console.error("Erro ao carregar ou processar os dados:", error);
        // Mostrar uma mensagem de erro simples no site se falhar
        document.getElementById('total-goals-display').textContent = 'ERRO';
    }
}

// ----------------------------------------------------
// Função para aplicar as configurações gerais (Cor do Contador e Fundo)
// ----------------------------------------------------
function applyGeneralConfig(config) {
    const root = document.documentElement; // O elemento <html>
    
    // 1. Fundo Fixo: Define a variável CSS --bg-image para o body
    root.style.setProperty('--bg-image', `url(${config.background})`);
    
    // 2. Cor do Contador: Define a variável CSS --counter-color
    root.style.setProperty('--counter-color', config.counterColor);
}


// ----------------------------------------------------
// Função para renderizar o contador principal
// ----------------------------------------------------
function renderTotalGoals(totalGoals) {
    const display = document.getElementById('total-goals-display');
    
    // Formata o número (ex: 895)
    display.textContent = totalGoals.toLocaleString('pt-PT');
}


// ----------------------------------------------------
// Função para gerar os cartões dos clubes
// ----------------------------------------------------
function renderClubs(clubs) {
    const container = document.getElementById('clubs-container');
    
    container.innerHTML = '';
    
    clubs.forEach(club => {
        const clubItem = document.createElement('div');
        clubItem.classList.add('club-item');
        
        // Montar o HTML interno
        clubItem.innerHTML = `
            <img src="${club.logo}" alt="${club.name} Logo" class="club-logo">
            <h3>${club.name}</h3>
            <p class="club-goals">${club.goals.toLocaleString('pt-PT')}</p>
            <p class="club-games">${club.games.toLocaleString('pt-PT')} Games</p> `;
        
        container.appendChild(clubItem);
    });
}


// ----------------------------------------------------
// Função para gerar os cartões dos troféus
// ----------------------------------------------------
function renderTrophies(trophies) {
    const container = document.getElementById('trophies-container');
    
    container.innerHTML = '';
    
    trophies.forEach(trophy => {
        const trophyItem = document.createElement('div');
        trophyItem.classList.add('trophy-item');
        
        trophyItem.innerHTML = `
            <img src="${trophy.icon}" alt="${trophy.name} Icon" class="trophy-icon">
            <h3 class="trophy-count">${trophy.count}</h3>
            <p class="trophy-name">${trophy.name}</p>
        `;
        
        container.appendChild(trophyItem);
    });
}

// ----------------------------------------------------
// Iniciar a aplicação
// ----------------------------------------------------
loadData();
