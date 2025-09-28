document.addEventListener('DOMContentLoaded', () => {
    
    // =======================================================
    // 1. REGISTO DO SERVICE WORKER (Para modo Offline / PWA)
    // =======================================================
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registado com sucesso: ', registration.scope);
                })
                .catch(error => {
                    console.error('Falha no registo do ServiceWorker: ', error);
                });
        });
    }

    // =======================================================
    // 2. LÓGICA DO CONTADOR
    // =======================================================
    
    const dataPath = 'data.json';
    const totalGoalsDisplay = document.getElementById('total-goals-display');
    const clubsContainer = document.getElementById('clubs-container');
    const trophiesContainer = document.getElementById('trophies-container');
    
    async function fetchGoalsData() {
        try {
            const response = await fetch(dataPath);
            if (!response.ok) {
                throw new Error(`Erro ao carregar dados: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Erro no fetchGoalsData:", error);
            if (totalGoalsDisplay) {
                totalGoalsDisplay.textContent = 'ERRO';
            }
            return null;
        }
    }

    function renderTotalCounter(data) {
        if (!data || !data.clubs) return;

        const totalGoals = data.clubs.reduce((sum, club) => sum + club.goals, 0);
        
        if (totalGoalsDisplay) {
            const formattedGoals = String(totalGoals).padStart(3, '0');
            totalGoalsDisplay.textContent = formattedGoals;
        }
    }

    function renderClubs(clubs) {
        if (!clubs || !clubsContainer) return;
        
        clubsContainer.innerHTML = clubs.map(club => `
            <div class="club-item">
                <img src="${club.logo}" alt="${club.name} Logo" class="club-logo">
                <span class="club-name">${club.name}</span>
                <span class="club-goals">${club.goals} Goals</span>
                <span class="club-games">${club.games} Games</span>
            </div>
        `).join('');
    }

    function renderTrophies(trophies) {
        if (!trophies || !trophiesContainer) return;

        trophiesContainer.innerHTML = trophies.map(trophy => `
            <div class="trophy-item">
                <img src="${trophy.icon}" alt="${trophy.name} Icon" class="trophy-icon">
                <span class="trophy-count">${trophy.count}</span>
                <span class="trophy-name">${trophy.name}</span>
            </div>
        `).join('');
    }

    // Inicialização
    async function init() {
        const data = await fetchGoalsData();
        
        if (data) {
            renderTotalCounter(data);
            renderClubs(data.clubs);
            renderTrophies(data.trophies);
        }
    }

    init();
});
