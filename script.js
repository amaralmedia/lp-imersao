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

    // --- LÓGICA PARA LAZY-LOADING DO VÍDEO DO YOUTUBE ---
    const lazyYouTubeContainers = document.querySelectorAll('.lazy-youtube');

    lazyYouTubeContainers.forEach(container => {
        container.addEventListener('click', () => {
            const youtubeId = container.dataset.youtubeId;
            if (youtubeId) {
                const iframe = document.createElement('iframe');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', '');
                // Adiciona parâmetros para autoplay e controles
                iframe.setAttribute('src', `https://www.youtube.com/embed/${youtubeId}?rel=0&showinfo=0&autoplay=1`);
                
                // Remove o conteúdo do placeholder (botão de play)
                container.innerHTML = '';
                // Adiciona o iframe
                container.appendChild(iframe);
                // Remove a classe para não adicionar o evento de clique novamente
                container.classList.remove('lazy-youtube');
            }
        }, { once: true }); // O evento só precisa ser disparado uma vez
    });

});