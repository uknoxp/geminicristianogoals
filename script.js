// script.js
// Elementos DOM (Capturados no topo do ficheiro)
const totalGoalsDisplay = document.getElementById('total-goals-display');
const clubsContainer = document.getElementById('clubs-container');
const trophiesContainer = document.getElementById('trophies-container');

// URL para o nosso ficheiro de dados JSON
const DATA_URL = 'data.json';
// Função principal para carregar e processar os dados
async function loadData() {
    try {
        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        // CÁLCULO DINÂMICO DO TOTAL: Soma todos os golos das equipas
        const calculatedTotalGoals = data.clubs.reduce((sum, club) => sum + club.goals, 0);
        // Chamar as funções para renderizar cada secção
        applyGeneralConfig(data.config);
        renderTotalGoals(calculatedTotalGoals);
        renderClubs(data.clubs);
        renderTrophies(data.trophies);
    } catch (error) {
        console.error("Erro ao carregar ou processar os dados:", error);
        totalGoalsDisplay.textContent = 'ERRO';
    }
}

// ----------------------------------------------------
// Função para aplicar as configurações gerais
// ----------------------------------------------------
function applyGeneralConfig(config) {
    const root = document.documentElement;
    root.style.setProperty('--bg-image', `url(${config.background})`);
    root.style.setProperty('--counter-color', config.counterColor);
}


// ----------------------------------------------------
// Função para renderizar o contador principal
// ----------------------------------------------------
function renderTotalGoals(totalGoals) {
    totalGoalsDisplay.textContent = totalGoals.toLocaleString('pt-PT');
}


// ----------------------------------------------------
// Função para gerar os cartões dos clubes
// ----------------------------------------------------
function renderClubs(clubs) {
    clubsContainer.innerHTML = '';
    clubs.forEach(club => {
        const clubItem = document.createElement('div');
        clubItem.classList.add('club-item');
        
        clubItem.innerHTML = `
            <img src="${club.logo}" alt="${club.name} Logo" class="club-logo">
            <h3 class="club-name">${club.name}</h3>
            <p class="club-goals">${club.goals.toLocaleString('pt-PT')} Goals</p>
            <p class="club-games">${club.games.toLocaleString('pt-PT')} Games</p>
        `;
        
        clubsContainer.appendChild(clubItem);
    });
}


// ----------------------------------------------------
// Função para gerar os cartões dos troféus
// ----------------------------------------------------
function renderTrophies(trophies) {
    trophiesContainer.innerHTML = '';
    trophies.forEach(trophy => {
        const trophyItem = document.createElement('div');
        trophyItem.classList.add('trophy-item');
        
        trophyItem.innerHTML = `
            <img src="${trophy.icon}" alt="${trophy.name} Icon" class="trophy-icon">
            <h3 class="trophy-count">${trophy.count}x</h3>
            <p class="trophy-name">${trophy.name}</p>
        `;
        
        trophiesContainer.appendChild(trophyItem);
    });
}

// ----------------------------------------------------
// Iniciar a aplicação
// ----------------------------------------------------
loadData();
