// =====================================================================
// ⚙️ CONFIGURAÇÕES PRINCIPAIS (Altere apenas os valores aqui)
// =====================================================================

const CONFIG = {
    // ⏱️ Tempo de Delay: Formato "Minutos:Segundos"
    // Exemplo: "48:55", "12:00" ou "00:15"
    tempoDeDelay: "00:00",

    // 🔗 Links de Checkout dos Botões (Men Balance Pro)
    linkPote2: "/b?p=MBP2V1&nc=1&preview=1&b=123&pg=9382&template=2b",
    linkPote6: "/b?p=MBP6V1&nc=1&preview=1&b=123&pg=9382&template=6b",
    linkPote3: "/b?p=MBP3V1&nc=1&preview=1&b=123&pg=9382&template=3b"
};

// =====================================================================
// 💻 CÓDIGO DO SISTEMA (Não precisa alterar nada daqui para baixo)
// =====================================================================

document.addEventListener("DOMContentLoaded", function() {

    // 1. APLICAR LINKS DE CHECKOUT
    document.getElementById('card-2-bottles').href = CONFIG.linkPote2;
    document.getElementById('card-6-bottles').href = CONFIG.linkPote6;
    document.getElementById('card-3-bottles').href = CONFIG.linkPote3;

    // 2. SISTEMA DE DELAY DA OFERTA E NOTIFICAÇÕES
    function calcularDelayEmMilissegundos(tempoStr) {
        const partes = tempoStr.split(':');
        const minutos = parseInt(partes[0], 10) || 0;
        const segundos = parseInt(partes[1], 10) || 0;
        const totalSegundos = (minutos * 60) + segundos;
        return totalSegundos * 1000;
    }

    // O QUE ESTÁ AQUI DENTRO SÓ ACONTECE APÓS O TEMPO DO DELAY
    setTimeout(() => {
        // A. Revela a área com os botões e garantia
        document.querySelector('.video-cta-container').style.display = 'block';

        // B. Inicia os pop-ups de vendas falsas apenas agora!
        startAllNotifications();

    }, calcularDelayEmMilissegundos(CONFIG.tempoDeDelay));


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

        // Mostra a primeira notificação 2 segundos APÓS os botões aparecerem
        setTimeout(() => {
            showNotification();
            startRandomInterval();
        }, 2000);
    }
});
