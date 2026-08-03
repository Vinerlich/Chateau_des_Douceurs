import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDl_8Y9-9Ga9B0zGBRhqV_4ar0wuOM0DSg",
    authDomain: "chateaudesdouceursdocesbolos.firebaseapp.com",
    projectId: "chateaudesdouceursdocesbolos",
    storageBucket: "chateaudesdouceursdocesbolos.firebasestorage.app",
    messagingSenderId: "359953974692",
    appId: "1:359953974692:web:32f549b3f4c3159f152d31"
};

let db;
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
} catch (e) {
    console.warn("Erro ao conectar com o Firebase:", e);
}

// Catálogo com Sufixos Elegantes para Cada Formato de Venda (/ kg ou / 25 un)
const produtos = [
    // 🍰 1. LES GÂTEAUX D'EXCEPTION
    { 
        id: 1, 
        categoria: "bolo", 
        secao: "bolo", 
        nome: "Gâteau Impérial aux Fruits Rouges", 
        descricao: "Massa leve de baunilha de Madagascar, suave creme diplomata e geleia artesanal de frutas vermelhas.", 
        preco: 220.00, 
        unidade: "/ kg",
        img: "./img/bolo7.jpg" 
    },
    { 
        id: 2, 
        categoria: "bolo", 
        secao: "bolo", 
        nome: "Gâteau au Chocolat Belge et Noisette", 
        descricao: "Camadas de pão de ló de cacau nobre, praliné crocante de avelãs e ganache de chocolate 70%.", 
        preco: 195.00, 
        unidade: "/ kg",
        img: "./img/bolo6.jpg" 
    },
    { 
        id: 3, 
        categoria: "bolo", 
        secao: "bolo", 
        nome: "Gâteau Fleur d'Oranger et Amandes", 
        descricao: "Bolo festivo perfumado com água de flor de laranjeira, recheio de amêndoas e pasta americana.", 
        preco: 240.00, 
        unidade: "/ kg",
        img: "./img/bolo1.jpg" 
    },

    // 🍬 2. LES DOUCEURS FINES
    { 
        id: 4, 
        categoria: "doce", 
        secao: "doce", 
        nome: "Macarons Parisiennes Royale", 
        descricao: "Biscoitos de farinha de amêndoas recheados com ganache belga e detalhes em folha de ouro 24k.", 
        preco: 225.00, 
        unidade: "/ 25 un",
        img: "./img/maca.jpg" 
    },
    { 
        id: 5, 
        categoria: "doce", 
        secao: "doce", 
        nome: "Truffes au Champagne Millésimé", 
        descricao: "Trufas de chocolate nobre infusionadas com champanhe francês e polvilhadas com cacau puro.", 
        preco: 210.00, 
        unidade: "/ 25 un",
        img: "./img/trufa.jpg" 
    },
    { 
        id: 6, 
        categoria: "doce", 
        secao: "doce", 
        nome: "Éclairs au Pistache de Bronte", 
        descricao: "Mini bombas de massa choux crocante recheadas com creme artesanal de pistaches sicilianos.", 
        preco: 190.00, 
        unidade: "/ 25 un",
        img: "./img/eclair.jpg" 
    },
    { 
        id: 7, 
        categoria: "doce", 
        secao: "doce", 
        nome: "Mini Red Velvet Velvet-Creme", 
        descricao: "Mini bolos individuais aveludados com creme leve de cream cheese e pérolas crocantes.", 
        preco: 175.00, 
        unidade: "/ 25 un",
        img: "./img/red.jpg" 
    },
    { 
        id: 8, 
        categoria: "doce", 
        secao: "doce", 
        nome: "Tartaletes au Citron et Meringue", 
        descricao: "Torta miniatura com curd de limão Taiti e merengue suíço suavemente maçaricado.", 
        preco: 165.00, 
        unidade: "/ 25 un",
        img: "./img/tlimao.jpg" 
    },

    // 🎁 3. LES SOUVENIRS DE MARIAGE
    { 
        id: 9, 
        categoria: "lembrancinha", 
        secao: "lembrancinha", 
        nome: "Le Grand Bem-Marié Classique", 
        descricao: "Pão de ló leve selado com calda de açúcar e recheado com doce de leite de fava de baunilha.", 
        preco: 180.00, 
        unidade: "/ 25 un",
        img: "./img/bc.jpg" 
    },
    { 
        id: 10, 
        categoria: "lembrancinha", 
        secao: "lembrancinha", 
        nome: "Coffret de Calissons d'Aix", 
        descricao: "Caixinhas acrílicas com doces provençais tradicionais à base de amêndoas e mel.", 
        preco: 250.00, 
        unidade: "/ 25 un",
        img: "./img/calissons.jpg" 
    },
    { 
        id: 11, 
        categoria: "lembrancinha", 
        secao: "lembrancinha", 
        nome: "Pots de Miel & Fleur d'Oranger", 
        descricao: "Potes de vidro decorados com mel silvestre infusionado com flor de laranjeira.", 
        preco: 220.00, 
        unidade: "/ 25 un",
        img: "./img/mel.jpg" 
    },

    // 🐾 4. LA COLLECTION CANINE & GOURMET
    { 
        id: 12, 
        categoria: "pet", 
        secao: "pet", 
        nome: "Gâteau Canin de Fête", 
        descricao: "Bolo festivo 100% natural de aveia, batata-doce e frango desfiado sem sal ou açúcares.", 
        preco: 130.00, 
        unidade: "/ kg",
        img: "./img/bolodog.jpg" 
    },
    { 
        id: 13, 
        categoria: "pet", 
        secao: "pet", 
        nome: "Pupcakes Gourmet Pomme & Cannelle", 
        descricao: "Mini cupcakes caninos nutritivos de maçã, pasta de amendoim integral e cobertura de iogurte sem lactose.", 
        preco: 145.00, 
        unidade: "/ 25 un",
        img: "./img/pup.jpg" 
    },
    { 
        id: 14, 
        categoria: "pet", 
        secao: "pet", 
        nome: "Truffes Canines à la Caroube", 
        descricao: "Docinhos saudáveis modelados com proteína magra e farinha de alfarroba (substituto pet do cacau).", 
        preco: 135.00, 
        unidade: "/ 25 un",
        img: "./img/brigadog.jpg" 
    }
];

// Renderiza a vitrine com Títulos Limpos e Pura Sofisticação
function renderizarProdutos() {
    const container = document.getElementById("produtos-container");
    if (!container) return;

    container.innerHTML = `
        <h3 class="categoria-titulo">Les Gâteaux d'Exception</h3>
        <div class="grid-produtos" id="grid-bolo"></div>
        
        <h3 class="categoria-titulo">Les Douceurs Fines</h3>
        <div class="grid-produtos" id="grid-doce"></div>

        <h3 class="categoria-titulo">Les Souvenirs de Mariage</h3>
        <div class="grid-produtos" id="grid-lembrancinha"></div>

        <h3 class="categoria-titulo">La Collection Canine & Gourmet</h3>
        <div class="grid-produtos" id="grid-pet"></div>
    `;

    const gridBolo = document.getElementById("grid-bolo");
    const gridDoce = document.getElementById("grid-doce");
    const gridLembrancinha = document.getElementById("grid-lembrancinha");
    const gridPet = document.getElementById("grid-pet");

    produtos.forEach(produto => {
        const nomeEscapado = produto.nome.replace(/'/g, "\\'");

        const cardHTML = `
            <div class="card-produto">
                <img src="${produto.img}" alt="${produto.nome}" onclick="abrirZoomImagem('${produto.img}', '${nomeEscapado}')" style="cursor: zoom-in;">
                <div class="card-body">
                    <h4 class="card-title">${produto.nome}</h4>
                    <p class="card-description">${produto.descricao}</p>
                    <p class="card-price">
                        R$ ${produto.preco.toFixed(2).replace('.', ',')} 
                        <small style="font-size: 0.78rem; font-weight: 400; color: var(--text-muted);">${produto.unidade}</small>
                    </p>
                    <button class="btn-primary" onclick="adicionarAoCarrinho('${nomeEscapado}')">Reservar para o Evento</button>
                </div>
            </div>
        `;

        if (produto.secao === "bolo") {
            gridBolo.innerHTML += cardHTML;
        } else if (produto.secao === "doce") {
            gridDoce.innerHTML += cardHTML;
        } else if (produto.secao === "lembrancinha") {
            gridLembrancinha.innerHTML += cardHTML;
        } else if (produto.secao === "pet") {
            gridPet.innerHTML += cardHTML;
        }
    });
}

// Configuração do Menu Hambúrguer (Mobile) e Eventos de Inicialização
function inicializarEventosMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('open');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a, .nav-links button').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('open');
                navLinks.classList.remove('active');
            });
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        renderizarProdutos();
        inicializarEventosMenu();
    });
} else {
    renderizarProdutos();
    inicializarEventosMenu();
}

// Estado das Metas e Seleção Livre dos Noivos
let metaEvento = { boloKg: 0, docesUn: 0, petsPorcoes: 0 };
let selecaoNoivos = { docesUn: 0, petsPorcoes: 0, itens: {} };

window.definirMetasEvento = function (event) {
    event.preventDefault();

    const adultos = parseInt(document.getElementById("qtdAdultos").value) || 0;
    const criancas = parseInt(document.getElementById("qtdCriancas").value) || 0;
    const pets = parseInt(document.getElementById("qtdPets").value) || 0;

    metaEvento.boloKg = parseFloat(((adultos * 0.100) + (criancas * 0.050)).toFixed(1));
    metaEvento.docesUn = (adultos * 5) + (criancas * 3);
    metaEvento.petsPorcoes = pets;

    document.getElementById("metaBoloTotal").innerText = metaEvento.boloKg;
    document.getElementById("metaDocesTotal").innerText = metaEvento.docesUn;
    document.getElementById("metaPetsTotal").innerText = metaEvento.petsPorcoes;

    renderizarOpcoesCardapio();
    document.getElementById("painelSelecaoMenu").classList.remove("hidden");
}

function renderizarOpcoesCardapio() {
    const container = document.getElementById("listaProdutosSelecao");
    if (!container) return;

    container.innerHTML = "";
    produtos.forEach(prod => {
        const qtdAtual = selecaoNoivos.itens[prod.id] || 0;
        
        container.innerHTML += `
            <div class="item-selecao-row">
                <div class="item-selecao-info">
                    <strong>${prod.nome}</strong>
                    <small>R$ ${prod.preco.toFixed(2).replace('.', ',')} ${prod.unidade}</small>
                </div>
                <div class="qtd-controls">
                    <button class="btn-secondary" onclick="alterarQtdItem(${prod.id}, -1)">-</button>
                    <span>${qtdAtual}</span>
                    <button class="btn-secondary" onclick="alterarQtdItem(${prod.id}, 1)">+</button>
                </div>
            </div>
        `;
    });
}

window.alterarQtdItem = function (idProduto, delta) {
    const qtdAtual = selecaoNoivos.itens[idProduto] || 0;
    const novaQtd = Math.max(0, qtdAtual + delta);
    
    selecaoNoivos.itens[idProduto] = novaQtd;
    recalcularTotaisSelecao();
    renderizarOpcoesCardapio();
}

function recalcularTotaisSelecao() {
    let acumuladoDoces = 0;
    let acumuladoPets = 0;

    produtos.forEach(prod => {
        const qtd = selecaoNoivos.itens[prod.id] || 0;
        if (prod.categoria === "doce" || prod.categoria === "lembrancinha") {
            acumuladoDoces += qtd * 25;
        } else if (prod.categoria === "pet") {
            acumuladoPets += qtd;
        }
    });

    selecaoNoivos.docesUn = acumuladoDoces;
    selecaoNoivos.petsPorcoes = acumuladoPets;

    document.getElementById("metaDocesAtual").innerText = selecaoNoivos.docesUn;
    document.getElementById("metaPetsAtual").innerText = selecaoNoivos.petsPorcoes;
}

window.finalizarSelecaoPersonalizada = function () {
    alert("Seleção do menu do casamento gravada com sucesso! O ateliê entrará em contato para os detalhes de degustação.");
    fecharCalculadora();
}

window.adicionarAoCarrinho = function (nomeProduto) {
    alert(`O item "${nomeProduto}" foi adicionado com sucesso à sua seleção de casamento!`);
}

// Funções dos Modais
window.abrirFAQ = () => document.getElementById("modalFAQ").style.display = "flex";
window.fecharFAQ = () => document.getElementById("modalFAQ").style.display = "none";
window.abrirCalculadora = () => document.getElementById("modalCalculadora").style.display = "flex";
window.fecharCalculadora = () => document.getElementById("modalCalculadora").style.display = "none";

// Zoom de Imagens (Lightbox)
window.abrirZoomImagem = function (src, titulo) {
    const modalImg = document.getElementById("modalImagemZoom");
    const imgElement = document.getElementById("imgAmpliada");
    const caption = document.getElementById("captionImagem");

    if (modalImg && imgElement) {
        imgElement.src = src;
        if (caption) caption.innerText = titulo || '';
        modalImg.classList.remove("hidden");
    }
}

window.fecharZoomImagem = function () {
    const modalImg = document.getElementById("modalImagemZoom");
    if (modalImg) modalImg.classList.add("hidden");
}

// Envio de Feedback/Contato para o Firebase
window.enviarFAQ = async function (event) {
    event.preventDefault();
    if (!db) { alert("O banco de dados não está conectado."); return; }

    const tipo = document.getElementById("tipoFeedback").value;
    const mensagem = document.getElementById("msgFeedback").value;

    try {
        await addDoc(collection(db, "faq"), { tipo, mensagem, data: serverTimestamp() });
        alert("Sua mensagem foi enviada ao ateliê Château des Douceurs com sucesso!");
        document.getElementById("formFAQ").reset();
        fecharFAQ();
    } catch (error) {
        alert("Falha ao enviar mensagem.");
    }
}

// Cálculo de Frete via ViaCEP
window.calcularFrete = async function () {
    const cep = document.getElementById("cepInput").value.replace(/\D/g, '');
    const containerEndereco = document.getElementById("resultadoEndereco");
    const containerFrete = document.getElementById("resultadoFrete");

    if (cep.length !== 8) {
        alert("Informe um CEP válido com 8 dígitos.");
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            containerEndereco.innerHTML = "<span style='color: var(--accent-rose);'>CEP não localizado.</span>";
            containerFrete.innerHTML = "";
            return;
        }

        containerEndereco.innerHTML = `<strong>Local de Entrega:</strong> ${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
        if (data.uf === "SP" || data.uf === "RJ") {
            containerFrete.innerHTML = "<span style='color: #2e7d32; font-weight: 600;'>Sua região tem direito a Frete Grátis com transporte climatizado.</span>";
        } else {
            containerFrete.innerHTML = "<span>Frete Especial para Casamentos: <strong>R$ 55,00</strong>.</span>";
        }
    } catch (error) {
        containerEndereco.innerHTML = "Erro ao conectar com o serviço de frete.";
    }
}