// URL para o nosso ficheiro de dados JSON
const DATA_URL = 'data.json';

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
        
        // Chamar as funções para renderizar cada secção
        applyGeneralConfig(data.config);
        renderTotalGoals(data.config.totalGoals);
        renderClubs(data.clubs);
        renderTrophies(data.trophies);
        
    } catch (error) {
        console.error("Erro ao carregar ou processar os dados:", error);
        // Mostrar uma mensagem de erro simples no site se falhar
        document.getElementById('total-goals-display').textContent = 'ERRO';
    }
}

// ----------------------------------------------------
// Função para aplicar as configurações gerais (Requisito 1 & 2 - Cor)
// ----------------------------------------------------
function applyGeneralConfig(config) {
    const root = document.documentElement; // O elemento <html>
    
    // 1. Fundo Fixo: Define a variável CSS --bg-image para o body
    // Nota: O style.css é que garante o "background-attachment: fixed"
    root.style.setProperty('--bg-image', `url(${config.background})`);
    
    // 2. Cor do Contador: Define a variável CSS --counter-color
    root.style.setProperty('--counter-color', config.counterColor);
}


// ----------------------------------------------------
// Função para renderizar o contador principal (Requisito 2)
// ----------------------------------------------------
function renderTotalGoals(totalGoals) {
    const display = document.getElementById('total-goals-display');
    
    // Formata o número com 3 dígitos (ex: 005) ou mais
    // Depende do número de dígitos do número real (ex: 895)
    // Usamos toLocaleString para separar milhares (ex: 1.000)
    display.textContent = totalGoals.toLocaleString('pt-PT');
}


// ----------------------------------------------------
// Função para gerar os cartões dos clubes (Requisitos 3, 4, 5)
// ----------------------------------------------------
function renderClubs(clubs) {
    const container = document.getElementById('clubs-container');
    
    // Limpar o conteúdo anterior (útil se quisermos atualizar sem recarregar)
    container.innerHTML = '';
    
    clubs.forEach(club => {
        // 3. Criar o elemento HTML para cada clube
        const clubItem = document.createElement('div');
        clubItem.classList.add('club-item');
        
        // Montar o HTML interno
        clubItem.innerHTML = `
            <img src="${club.logo}" alt="${club.name} Logo" class="club-logo">
            <h3>${club.name}</h3>
            <p class="club-goals">${club.goals.toLocaleString('pt-PT')}</p>
            <p class="club-games">${club.games.toLocaleString('pt-PT')} jogos</p>
        `;
        
        container.appendChild(clubItem);
    });
}


// ----------------------------------------------------
// Função para gerar os cartões dos troféus (Requisito 6)
// ----------------------------------------------------
function renderTrophies(trophies) {
    const container = document.getElementById('trophies-container');
    
    container.innerHTML = '';
    
    trophies.forEach(trophy => {
        // 6. Criar o elemento HTML para cada troféu
        const trophyItem = document.createElement('div');
        trophyItem.classList.add('trophy-item');
        
        // Nota: Neste exemplo estamos a usar SVGs de ícones simples (Line Awesome)
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

// NOTA SOBRE A ATUALIZAÇÃO DO CONTADOR
// O contador total (totalGoals) é lido diretamente do data.json. 
// A regra de que "adicionar um golo nas equipas, adiciona no contador principal" 
// terá de ser tratada no seu Editor (Google Sheets), garantindo que:
// Total de Golos = SOMA (Golos de todos os Clubes)
// O Sheets fará esse cálculo automaticamente antes de exportar o JSON.