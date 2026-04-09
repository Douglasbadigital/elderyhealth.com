// =====================================================================
// ⚙️ CONFIGURAÇÕES PRINCIPAIS (Altere apenas os valores aqui)
// =====================================================================

const CONFIG = {
    // ⏱️ Tempo de Delay: Formato "Minutos:Segundos"
    // Esse tempo é sincronizado com o vídeo VTurb (não com o tempo de página)
    // Exemplo: "34:00" = aparece aos 34 minutos do vídeo
    // Para testes use valores baixos como "00:10"
    tempoDeDelay: "00:10",

    // 🔗 Links de Checkout dos Botões (Men Balance Pro)
    linkPote2: "https://travozilla.com/b?p=MBP2V1&nc=1&preview=1&b=123&fid=268&fnid=72&pfnid=1&pg=9207&template=2b&aff_id=119995&subid={subid}",
    linkPote6: "https://travozilla.com/b?p=MBP6V1&nc=1&preview=1&b=123&fid=268&fnid=72&pfnid=1&pg=9207&template=6b&aff_id=119995&subid={subid}",
    linkPote3: "https://travozilla.com/b?p=MBP3V1&nc=1&preview=1&b=123&fid=268&fnid=72&pfnid=1&pg=9207&template=3b&aff_id=119995&subid={subid}"
};

// =====================================================================
// 💻 CÓDIGO DO SISTEMA (Não precisa alterar nada daqui para baixo)
// =====================================================================

document.addEventListener("DOMContentLoaded", function() {

    // 1. APLICAR LINKS DE CHECKOUT
    document.getElementById('card-2-bottles').href = CONFIG.linkPote2;
    document.getElementById('card-6-bottles').href = CONFIG.linkPote6;
    document.getElementById('card-3-bottles').href = CONFIG.linkPote3;


    // 2. SISTEMA DE DELAY SINCRONIZADO COM O VÍDEO VTURB
    function calcularDelayEmSegundos(tempoStr) {
        const partes = tempoStr.split(':');
        const minutos = parseInt(partes[0], 10) || 0;
        const segundos = parseInt(partes[1], 10) || 0;
        return (minutos * 60) + segundos;
    }

    const DELAY_SEGUNDOS = calcularDelayEmSegundos(CONFIG.tempoDeDelay);
    var jaApareceu = false;
// DIAGNÓSTICO - remover após identificar o problema
window.addEventListener("load", function() {
    var tentativas = 0;
    var diag = setInterval(function() {
        tentativas++;
        var player = document.getElementById("vid-69d713ad397625cd1e9ad0a8");
        console.log("Tentativa " + tentativas + " - player encontrado:", player);
        console.log("Tipo do player:", typeof player);
        if (player) {
            console.log("currentTime:", player.currentTime);
            console.log("Métodos disponíveis:", Object.getOwnPropertyNames(player));
        }
        if (tentativas > 10) clearInterval(diag);
    }, 2000);
});
    function mostrarOferta() {
        if (jaApareceu) return;
        jaApareceu = true;

        // A. Revela a seção de oferta com fade in
        var secao = document.querySelector('.video-cta-container');
        if (secao) {
            secao.style.display = 'block';
            setTimeout(function() {
                secao.style.opacity = '1';
            }, 100);
        }

        // B. 2 segundos após aparecer, desliza até o card de 6 potes
        setTimeout(function() {
            var card6 = document.getElementById('card-6-bottles');
            if (card6) {
                card6.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 2000);

        // C. Popups iniciam 10 segundos após a seção aparecer
        setTimeout(function() {
            startAllNotifications();
        }, 10000);
    }

    // Aguarda o player VTurb estar pronto e usa a API oficial
    window.addEventListener("load", function() {
        var tentativas = 0;
        var verificar = setInterval(function() {
            tentativas++;
            var player = document.getElementById("vid-69d713ad397625cd1e9ad0a8");

            if (player && typeof player.addEventListener === "function") {
                clearInterval(verificar);

                // Usa o evento oficial do VTurb
                player.addEventListener("timeupdate", function(e) {
                    var tempo = player.currentTime || (e.detail && e.detail.currentTime) || 0;
                    if (tempo >= DELAY_SEGUNDOS) {
                        mostrarOferta();
                    }
                });
            }

            // Para de tentar após 30 segundos
            if (tentativas > 30) clearInterval(verificar);

        }, 1000);
    });


    // 3. SISTEMA DO CONTADOR DE PESSOAS ASSISTINDO (Roda desde o início)
    function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }
    function updateCounter() {
        var currentCount = parseInt(document.getElementById('viewsCount').textContent.replace(/,/g, ''), 10);
        var increment = getRandomInt(1, 5);
        var nextCount = currentCount + increment;
        document.getElementById('viewsCount').textContent = nextCount.toLocaleString('en-US');
        var nextDelay = getRandomInt(1500, 3000);
        setTimeout(updateCounter, nextDelay);
    }
    document.getElementById('viewsCount').textContent = '71,712';
    updateCounter();


    // 4. SISTEMA DE NOTIFICAÇÕES FALSAS DE COMPRA (POP-UPS)
    // Inicia apenas 10 segundos após a seção de oferta aparecer
    const customerNames = ["Olivia", "Emma", "Ava", "Charlotte", "Sophia", "Amelia", "Isabella", "Mia", "Evelyn", "Harper", "Camila", "Gianna", "Abigail", "Luna", "Ella", "Elizabeth", "Sofia", "Emily", "Avery", "Mila", "Liam", "Noah", "Oliver", "Elijah", "William", "James", "Benjamin", "Lucas", "Henry", "Alexander"];
    const states = [
        {"name": "Alabama", "abbreviation": "al"}, {"name": "Alaska", "abbreviation": "ak"}, {"name": "Arizona", "abbreviation": "az"}, {"name": "Arkansas", "abbreviation": "ar"}, {"name": "California", "abbreviation": "ca"}, {"name": "Colorado", "abbreviation": "co"}, {"name": "Florida", "abbreviation": "fl"}, {"name": "Georgia", "abbreviation": "ga"}, {"name": "Hawaii", "abbreviation": "hi"}, {"name": "Illinois", "abbreviation": "il"}, {"name": "Texas", "abbreviation": "tx"}, {"name": "New York", "abbreviation": "ny"}
    ];
    const productNames = ["2 Bottles of Men Balance Pro", "3 Bottles of Men Balance Pro", "6 Bottles of Men Balance Pro"];

    function startAllNotifications() {
        const purchaseNotification = document.getElementById('purchase-notification');

        function updateNotificationContent(name, location, product, image) {
            purchaseNotification.querySelector('.customer-name').textContent = name;
            purchaseNotification.querySelector('.customer-location').textContent = location;
            purchaseNotification.querySelector('.product-name').textContent = product;
            purchaseNotification.querySelector('.profile-image').src = image;
        }

        function showNotification() {
            const name = customerNames[Math.floor(Math.random() * customerNames.length)];
            const state = states[Math.floor(Math.random() * states.length)];
            const product = productNames[Math.floor(Math.random() * productNames.length)];
            const image = `https://flagcdn.com/h40/us-${state.abbreviation}.png`;

            updateNotificationContent(name, state.name, product, image);

            setTimeout(() => {
                purchaseNotification.classList.add('show');
                setTimeout(() => {
                    purchaseNotification.classList.remove('show');
                    purchaseNotification.classList.add('hide');
                    setTimeout(() => purchaseNotification.classList.remove('hide'), 500);
                }, 10000); // Fica na tela por 10 segundos
            }, 500);
        }

        function startRandomInterval() {
            setTimeout(() => {
                showNotification();
                startRandomInterval();
            }, Math.random() * (30000 - 10000) + 11000); // Próximas demoram entre 11s e 30s
        }

        // Mostra a primeira notificação 2 segundos após os popups iniciarem
        setTimeout(() => {
            showNotification();
            startRandomInterval();
        }, 2000);
    }

});
