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

// Catálogo Reorganizado: Mesa de Doces vs. Lembrancinhas e Linha Pet
const produtos = [
    // 🍰 BOLOS (Mesa de Doces)
    { id: 1, categoria: "bolo", secao: "evento", nome: "Gâteau Impérial aux Fruits Rouges", descricao: "Bolo esculpido de três andares com massa de baunilha de Madagascar e geleia de frutas vermelhas.", preco: 1200.00, img: "./img/bolo7.jpg" },
    { id: 2, categoria: "bolo", secao: "evento", nome: "Gâteau au Chocolat et Noisette", descricao: "Bolo contemporâneo de camadas com gianduia, avelãs torradas e cobertura espelhada de cacau.", preco: 980.00, img: "./img/bolo6.jpg" },
    { id: 3, categoria: "bolo", secao: "evento", nome: "Gâteau à la Fleur d'Oranger et Amandes", descricao: "Bolo de casamento perfumado com água de flor de laranjeira, praliné de amêndoas e pasta americana.", preco: 1150.00, img: "./img/bolo1.jpg" },

    // 🍬 DOCES FINOS & MINIATURAS (Mesa de Doces)
    { id: 4, categoria: "doce", secao: "evento", nome: "Mini Red Velvet Royale (25 un)", descricao: "Mini bolos individuais de textura aveludada com suave creme de cream cheese e pérolas de açúcar.", preco: 195.00, img: "./img/red.jpg" },
    { id: 6, categoria: "doce", secao: "evento", nome: "Macarons (25 un)", descricao: "Finos biscoitos artesanais recheados com ganache de chocolate belga 70% e folha de ouro 24k.", preco: 240.00, img: "./img/maca.jpg" },
    { id: 7, categoria: "doce", secao: "evento", nome: "Truffes au Champagne (25 un)", descricao: "Trufas de chocolate nobre com infusão de champanhe francês Millésimé e pó de cacau.", preco: 310.00, img: "./img/trufa.jpg" },
    { id: 8, categoria: "doce", secao: "evento", nome: "Éclairs de Pistache d'Bronte (25 un)", descricao: "Massa choux crocante recheada com cremoso praliné de pistaches sicilianos selecionados.", preco: 280.00, img: "./img/eclair.jpg" },
    { id: 9, categoria: "doce", secao: "evento", nome: "Tartaletes de Limão Taiti e Merengue (25 un)", descricao: "Delicadas tortinhas individuais com curd de limão Taiti e merengue suíço maçaricado à mão.", preco: 210.00, img: "./img/tlimao.jpg" },
    { id: 13, categoria: "doce", secao: "evento", nome: "Dôme de Noisette et Chocolat (25 un)", descricao: "Domo delicado de chocolate belga com recheio cremoso de gianduia e crostini de avelãs.", preco: 260.00, img: "./img/dome.jpg" },

    // 🎁 LEMBRANCINHAS & SOUVENIRS
    { id: 5, categoria: "lembrancinha", secao: "lembrancinha", nome: "Le Grand Bem-Marié Classique (25 un)", descricao: "Tradicional bem-casado de pão de ló macio recheado com doce de leite artesanal fava de baunilha.", preco: 180.00, img: "./img/bc.jpg" },
    { id: 14, categoria: "lembrancinha", secao: "lembrancinha", nome: "Coffret de Calissons d'Aix (12 caixas)", descricao: "Caixas acrílicas personalizadas com doces tradicionais da Provence à base de amêndoas e frutas cristalizadas.", preco: 320.00, img: "./img/calissons.jpg" },
    { id: 15, categoria: "lembrancinha", secao: "lembrancinha", nome: "Pot de Miel & Fleur d'Oranger (20 un)", descricao: "Potes de vidro delicados com mel silvestre artesanal infusionado com flor de laranjeira e laço de cetim.", preco: 290.00, img: "./img/mel.jpg" },

    // 🐾 LINHA PET-FRIENDLY
    { id: 10, categoria: "pet", secao: "pet", nome: "Gâteau Canó Canine & Feline (Pet-Friendly)", descricao: "Bolo festivo 100% natural para pets, feito com aveia, cenoura, frango desfiado sem açúcar.", preco: 150.00, img: "./img/bolodog.jpg" },
    { id: 11, categoria: "pet", secao: "pet", nome: "Pupcakes Gourmet à la Pomme et Cannelle", descricao: "Mini cupcakes caninos nutritivos de maçã, pasta de amendoim e iogurte sem lactose.", preco: 110.00, img: "./img/pup.jpg" },
    { id: 12, categoria: "pet", secao: "pet", nome: "Truffes Canines à la Patate Douce et Caroube", descricao: "Docinhos saudáveis de batata-doce, frango desfiado e farinha de alfarroba.", preco: 130.00, img: "./img/brigadog.jpg" }
];

// Renderiza a vitrine de produtos organizada por seções elegantes
function renderizarProdutos() {
    const container = document.getElementById("produtos-container");
    if (!container) return;

    container.innerHTML = `
        <h3 class="categoria-titulo">Mesa de Doces & Bolos Solemnes</h3>
        <div class="grid-produtos" id="grid-evento"></div>
        
        <h3 class="categoria-titulo">Lembrancinhas & Souvenirs Elegantes</h3>
        <div class="grid-produtos" id="grid-lembrancinhas"></div>

        <h3 class="categoria-titulo">Linha Pet-Friendly Gourmet</h3>
        <div class="grid-produtos" id="grid-pet"></div>
    `;

    const gridEvento = document.getElementById("grid-evento");
    const gridLembrancinhas = document.getElementById("grid-lembrancinhas");
    const gridPet = document.getElementById("grid-pet");

    produtos.forEach(produto => {
        const cardHTML = `
            <div class="card-produto">
                <img src="${produto.img}" alt="${produto.nome}" onclick="abrirZoomImagem('${produto.img}', '${produto.nome}')" style="cursor: zoom-in;">
                <div class="card-body">
                    <h4 class="card-title">${produto.nome}</h4>
                    <p class="card-description">${produto.descricao}</p>
                    <p class="card-price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
                    <button class="btn-primary" onclick="adicionarAoCarrinho('${produto.nome}')">Reservar para o Evento</button>
                </div>
            </div>
        `;

        if (produto.secao === "evento") {
            gridEvento.innerHTML += cardHTML;
        } else if (produto.secao === "lembrancinha") {
            gridLembrancinhas.innerHTML += cardHTML;
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
                    <small>R$ ${prod.preco.toFixed(2).replace('.', ',')}</small>
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
        if (caption) caption.innerText = titulo;
        modalImg.classList.remove("hidden");
    }
}

window.fecharZoomImagem = function () {
    const modalImg = document.getElementById("modalImagemZoom");
    if (modalImg) modalImg.classList.add("hidden");
}

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
            containerEndereco.innerHTML = "<span style='color: var(--accent-color);'>CEP não localizado.</span>";
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