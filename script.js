document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DA BARRA DE PROGRESSO COM ANIMAÇÃO DE ENTRADA ---
    // Seleciona todos os elementos necessários no início
    const progressBarContainer = document.querySelector('.progress-bar-container');
    const badge = document.querySelector('.scarcity-badge');
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const progressBarText = document.querySelector('.progress-bar-text');

    // A função que calcula e anima a barra
    const animateProgressBar = () => {
        const totalSpots = 100; // Defina o total de vagas do lote aqui

        // Extrai apenas os números do texto do badge
        const textContent = badge.textContent;
        // Usamos /g para pegar TODOS os números e depois pegamos o último
        const matches = textContent.match(/\d+/g);

        if (matches && matches.length > 0) {
            const remainingSpots = parseInt(matches[matches.length - 1], 10);
            const filledSpots = totalSpots - remainingSpots;
            const percentage = (filledSpots / totalSpots) * 100;

            // Atualiza a largura da barra de progresso (isso vai disparar a animação do CSS)
            progressBarFill.style.width = percentage + '%';

            // Atualiza o texto da barra
            progressBarText.textContent = `${filledSpots}% DAS VAGAS PREENCHIDAS!`;
        }
    };

    // Verifica se todos os elementos existem antes de configurar o observer
    if (progressBarContainer && badge && progressBarFill && progressBarText) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Se o container da barra de progresso estiver visível na tela
                if (entry.isIntersecting) {
                    animateProgressBar();
                    // Para a observação após a animação para não repetir
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); // A animação começa quando 50% da barra estiver visível

        // Inicia a observação do elemento
        observer.observe(progressBarContainer);
    }

    // --- LÓGICA DO FAQ (ACORDEÃO) ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Abre ou fecha o item clicado
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});