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
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
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

    // --- CORREÇÃO: EFEITO PARALLAX INTERATIVO NA SEÇÃO "O QUE É STORYMAKER" ---
    const parallaxContainer = document.querySelector('.image-stack-container');
    if (parallaxContainer) {
        const image1 = parallaxContainer.querySelector('.image-1');
        const image2 = parallaxContainer.querySelector('.image-2');
        const image3 = parallaxContainer.querySelector('.image-3');

        const handleMouseMove = (e) => {
            const rect = parallaxContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Movimenta cada imagem com uma intensidade diferente para dar profundidade
            if (image1) image1.style.transform = `translate(${-x * 0.04}px, ${-y * 0.04}px) rotate(-10deg)`;
            if (image2) image2.style.transform = `translate(${-x * 0.06}px, ${-y * 0.06}px) translateY(-50%) rotate(5deg)`;
            if (image3) image3.style.transform = `translate(${-x * 0.03}px, ${-y * 0.03}px) rotate(8deg)`;
        };

        const handleMouseLeave = () => {
            // Retorna as imagens à posição original quando o mouse sai
            if (image1) image1.style.transform = `rotate(-10deg)`;
            if (image2) image2.style.transform = `translateY(-50%) rotate(5deg)`;
            if (image3) image3.style.transform = `rotate(8deg)`;
        };

        parallaxContainer.addEventListener('mousemove', handleMouseMove);
        parallaxContainer.addEventListener('mouseleave', handleMouseLeave);
    }
});