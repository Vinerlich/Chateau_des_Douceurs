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

// Catálogo Único e Sem Duplicações
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
        img: "./img/bolo7.jpg",
        harmonizacao: { tipo: "espumante", texto: "Champagne Brut Rosé ou Prosecco Superiore." }
    },
    { 
        id: 2, 
        categoria: "bolo", 
        secao: "bolo", 
        nome: "Gâteau au Chocolat Belge et Noisette", 
        descricao: "Camadas de pão de ló de cacau nobre, praliné crocante de avelãs e ganache de chocolate 70%.", 
        preco: 195.00, 
        unidade: "/ kg",
        img: "./img/bolo6.jpg",
        harmonizacao: { tipo: "vinho", texto: "Vinho de Porto Tawny ou Sauternes Francês." }
    },
    { 
        id: 3, 
        categoria: "bolo", 
        secao: "bolo", 
        nome: "Gâteau Fleur d'Oranger et Amandes", 
        descricao: "Bolo festivo perfumado com água de flor de laranjeira, recheio de amêndoas e pasta americana.", 
        preco: 240.00, 
        unidade: "/ kg",
        img: "./img/bolo1.jpg",
        harmonizacao: { tipo: "cafe", texto: "Café Especial de Torra Média ou Chá Earl Grey." }
    },
    { 
        id: 15, 
        categoria: "bolo", 
        secao: "bolo", 
        nome: "Le Royal Pistache", 
        descricao: "Massa aveludada infusionada com pistache puro, ganache montada de pistaches sicilianos e toque de framboesa.", 
        preco: 260.00, 
        unidade: "/ kg",
        img: "./img/pistache.jpg",
        harmonizacao: { tipo: "espumante", texto: "Champagne Blanc de Blancs ou Espumante Brut." }
    },
    { 
        id: 16, 
        categoria: "bolo", 
        secao: "bolo", 
        nome: "Gâteau Champagne et Figues Fraîches", 
        descricao: "Bolo festivo leve com redução de champagne Rosé, recheio de creme de baunilha e figos frescos caramelizados.", 
        preco: 275.00, 
        unidade: "/ kg",
        img: "./img/figos.jpg",
        harmonizacao: { tipo: "espumante", texto: "Champagne Millésimé ou Rosé Mousseux." }
    },
    { 
        id: 23, 
        categoria: "bolo", 
        secao: "bolo", 
        nome: "Gâteau Lavande, Citron & Vanille", 
        descricao: "Massa chiffon suave com sementes de papoula e raspas de limão siciliano, curd leve de limão e ganache montada de baunilha com toque floral de lavanda comestível.", 
        preco: 250.00, 
        unidade: "/ kg",
        img: "./img/lavanda.jpg",
        harmonizacao: { tipo: "espumante", texto: "Gin Tônica Botânico com Zest de Limão ou Espumante Moscatel Refinado." }
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
        img: "./img/maca.jpg",
        harmonizacao: { tipo: "espumante", texto: "Champagne Brut, Cava ou Champagne Rosé." }
    },
    { 
        id: 5, 
        categoria: "doce", 
        secao: "doce", 
        nome: "Truffes au Champagne Millésimé", 
        descricao: "Trufas de chocolate nobre infusionadas com champanhe francês e polvilhadas com cacau puro.", 
        preco: 210.00, 
        unidade: "/ 25 un",
        img: "./img/trufa.jpg",
        harmonizacao: { tipo: "destilado", texto: "Cognac XO, Whisky Single Malt ou Vinho Licoroso." }
    },
    { 
        id: 6, 
        categoria: "doce", 
        secao: "doce", 
        nome: "Éclairs au Pistache de Bronte", 
        descricao: "Mini bombas de massa choux crocante recheadas com creme artesanal de pistaches sicilianos.", 
        preco: 190.00, 
        unidade: "/ 25 un",
        img: "./img/eclair.jpg",
        harmonizacao: { tipo: "cafe", texto: "Espresso de Torra Média ou Cappuccino Cremoso." }
    },
    { 
        id: 7, 
        categoria: "doce", 
        secao: "doce", 
        nome: "Mini Red Velvet Velvet-Creme", 
        descricao: "Mini bolos individuais aveludados com creme leve de cream cheese e pérolas crocantes.", 
        preco: 175.00, 
        unidade: "/ 25 un",
        img: "./img/red.jpg",
        harmonizacao: { tipo: "espumante", texto: "Espumante Rosé Brut ou Vinho Frisante Suave." }
    },
    { 
        id: 8, 
        categoria: "doce", 
        secao: "doce", 
        nome: "Tartaletes au Citron et Meringue", 
        descricao: "Torta miniatura com curd de limão Taiti e merengue suíço suavemente maçaricado.", 
        preco: 165.00, 
        unidade: "/ 25 un",
        img: "./img/tlimao.jpg",
        harmonizacao: { tipo: "vinho", texto: "Vinho Colheita Tardiva ou Limoncello Gelado." }
    },
    { 
        id: 17, 
        categoria: "doce", 
        secao: "doce", 
        nome: "Le Camaïeu Royal aux Noix", 
        descricao: "Docinho refinado de nozes selecionadas com toque de fava de baunilha, coberto com delicada camada de fondant e decorado com noz imperial.", 
        preco: 210.00, 
        unidade: "/ 25 un",
        img: "./img/camafeu.jpg",
        harmonizacao: { tipo: "vinho", texto: "Vinho de Porto, Sauternes ou Licor de Avelãs." }
    },

    // 🎁 3. LES SOUVENIRS DE MARIAGE (Lembrancinhas)
    { 
        id: 9, 
        categoria: "lembrancinha", 
        secao: "lembrancinha", 
        nome: "Le Grand Bem-Marié Classique", 
        descricao: "Pão de ló leve selado com calda de açúcar e recheado com doce de leite de fava de baunilha.", 
        preco: 180.00, 
        unidade: "/ 25 un",
        img: "./img/bc.jpg",
        harmonizacao: { tipo: "cafe", texto: "Café Gourmet Passado ou Chá de Infusão de Flores." }
    },
    { 
        id: 10, 
        categoria: "lembrancinha", 
        secao: "lembrancinha", 
        nome: "Coffret de Calissons d'Aix", 
        descricao: "Caixinhas acrílicas com doces provençais tradicionais à base de amêndoas e mel.", 
        preco: 250.00, 
        unidade: "/ 25 un",
        img: "./img/calissons.jpg",
        harmonizacao: { tipo: "vinho", texto: "Vinho Branco Doce ou Licor Amaretto." }
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
    { 
        id: 18, 
        categoria: "lembrancinha", 
        secao: "lembrancinha", 
        nome: "Pain d'Épices & Miel Royal", 
        descricao: "Mini pães de mel artesanais recheados com doce de leite e cobertos com chocolate nobre e laço de cetim.", 
        preco: 195.00, 
        unidade: "/ 25 un",
        img: "./img/paomel.jpg",
        harmonizacao: { tipo: "cafe", texto: "Café Especial com Notas de Especiarias." }
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
    },
    { 
        id: 19, 
        categoria: "pet", 
        secao: "pet", 
        nome: "Biscuits Croquants d'Avoine et Pomme", 
        descricao: "Biscoitos artesanais crocantes para pets feitos com farinha de aveia, maçã e óleo de coco.", 
        preco: 95.00, 
        unidade: "/ 25 un",
        img: "./img/biscoidog.jpg" 
    }
];

// Renderiza a vitrine de produtos por seções organizadas
function renderizarProdutos() {
    const container = document.getElementById("produtos-container");
    if (!container) return;

    container.innerHTML = `
        <h3 id="catalogo" class="categoria-titulo">Les Gâteaux d'Exception</h3>
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
        
        // Selo de Harmonização discreto e chique (se houver indicação para o item)
        const badgeHarmonizacao = produto.harmonizacao ? `
            <button class="btn-badge-harmonizacao" onclick="abrirModalHarmonizacaoProduto(${produto.id})">
                🥂 Ver Harmonização
            </button>
        ` : '';

        const cardHTML = `
            <div class="card-produto">
                <img src="${produto.img}" alt="${produto.nome}" onclick="abrirZoomImagem('${produto.img}', '${nomeEscapado}')" style="cursor: zoom-in;">
                <div class="card-body">
                    <h4 class="card-title">${produto.nome}</h4>
                    <p class="card-description">${produto.descricao}</p>
                    ${badgeHarmonizacao}
                    <p class="card-price">
                        R$ ${produto.preco.toFixed(2).replace('.', ',')} 
                        <small style="font-size: 0.78rem; font-weight: 400; color: var(--text-muted);">${produto.unidade}</small>
                    </p>
                    <button class="btn-primary" onclick="adicionarAoCarrinho('${nomeEscapado}')">Reservar para o Evento</button>
                </div>
            </div>
        `;

        if (produto.secao === "bolo") gridBolo.innerHTML += cardHTML;
        else if (produto.secao === "doce") gridDoce.innerHTML += cardHTML;
        else if (produto.secao === "lembrancinha") gridLembrancinha.innerHTML += cardHTML;
        else if (produto.secao === "pet") gridPet.innerHTML += cardHTML;
    });
}

// Menu Mobile e Inicialização
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

// -------------------------------------------------------------
// 1. CALCULADORA DE EVENTO (Doces e Lembrancinhas Separados)
// -------------------------------------------------------------
let metaEvento = { boloKg: 0, docesUn: 0, lembrancasUn: 0, petsPorcoes: 0 };
let selecaoNoivos = { docesUn: 0, lembrancasUn: 0, petsPorcoes: 0, itens: {} };

window.definirMetasEvento = function (event) {
    event.preventDefault();

    const adultos = parseInt(document.getElementById("qtdAdultos").value) || 0;
    const criancas = parseInt(document.getElementById("qtdCriancas").value) || 0;
    const pets = parseInt(document.getElementById("qtdPets").value) || 0;

    // Cálculo das metas separadas
    metaEvento.boloKg = parseFloat(((adultos * 0.100) + (criancas * 0.050)).toFixed(1));
    metaEvento.docesUn = (adultos * 5) + (criancas * 3);          // Meta para Doces Finos
    metaEvento.lembrancasUn = (adultos * 1) + (criancas * 1);    // Meta para Lembrancinhas
    metaEvento.petsPorcoes = pets;

    document.getElementById("metaBoloTotal").innerText = metaEvento.boloKg;
    document.getElementById("metaDocesTotal").innerText = metaEvento.docesUn;
    if (document.getElementById("metaLembrancasTotal")) {
        document.getElementById("metaLembrancasTotal").innerText = metaEvento.lembrancasUn;
    }
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
    let acumuladoLembrancas = 0;
    let acumuladoPets = 0;

    produtos.forEach(prod => {
        const qtd = selecaoNoivos.itens[prod.id] || 0;
        if (prod.categoria === "doce") {
            acumuladoDoces += qtd * 25;
        } else if (prod.categoria === "lembrancinha") {
            acumuladoLembrancas += qtd * 25;
        } else if (prod.categoria === "pet") {
            acumuladoPets += qtd;
        }
    });

    selecaoNoivos.docesUn = acumuladoDoces;
    selecaoNoivos.lembrancasUn = acumuladoLembrancas;
    selecaoNoivos.petsPorcoes = acumuladoPets;

    document.getElementById("metaDocesAtual").innerText = selecaoNoivos.docesUn;
    if (document.getElementById("metaLembrancasAtual")) {
        document.getElementById("metaLembrancasAtual").innerText = selecaoNoivos.lembrancasUn;
    }
    document.getElementById("metaPetsAtual").innerText = selecaoNoivos.petsPorcoes;
}

// -------------------------------------------------------------
// 2. MODAL DE HARMONIZAÇÃO DO PRODUTO & GUIA "L'ART DE L'ACCORD"
// -------------------------------------------------------------

// Janela discreta e elegante ao clicar no selo do card
window.abrirModalHarmonizacaoProduto = function(idProduto) {
    const produto = produtos.find(p => p.id === idProduto);
    if (!produto || !produto.harmonizacao) return;

    const modal = document.getElementById("modalHarmonizacaoProduto");
    const container = document.getElementById("conteudoHarmonizacaoProduto");

    if (modal && container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 10px;">
                <h3 style="font-family: var(--font-heading); color: var(--accent-gold); margin-bottom: 10px;">${produto.nome}</h3>
                <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-dark); margin-bottom: 20px;">
                    🥂 <strong>Recomendação do Sommelier:</strong><br>${produto.harmonizacao.texto}
                </p>
                <button class="btn-primary" onclick="fecharModalHarmonizacaoProduto(); abrirGuiaHarmonizacaoCompleto('${produto.harmonizacao.tipo}')">
                    Ver Guia Completo de Harmonização 🍷
                </button>
            </div>
        `;
        modal.style.display = "flex";
    }
}

window.fecharModalHarmonizacaoProduto = function() {
    const modal = document.getElementById("modalHarmonizacaoProduto");
    if (modal) modal.style.display = "none";
}

// Abre o Guia Interativo L'Art de l'Accord (Visão por Bebida)
window.abrirGuiaHarmonizacaoCompleto = function(categoriaFiltroInicial = 'espumante') {
    const modal = document.getElementById("modalGuiaHarmonizacao");
    if (modal) {
        modal.style.display = "flex";
        filtrarHarmonizacaoPorBebida(categoriaFiltroInicial);
    }
}

window.fecharGuiaHarmonizacao = function() {
    const modal = document.getElementById("modalGuiaHarmonizacao");
    if (modal) modal.style.display = "none";
}

// Filtra produtos conforme o ícone de bebida clicado no modal
window.filtrarHarmonizacaoPorBebida = function(tipoBebida) {
    const containerResultados = document.getElementById("resultadosHarmonizacaoBebida");
    if (!containerResultados) return;

    // Atualiza botões ativos no modal
    document.querySelectorAll(".btn-bebida-filtro").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.bebida === tipoBebida);
    });

    const correspondentes = produtos.filter(p => p.harmonizacao && p.harmonizacao.tipo === tipoBebida);

    if (correspondentes.length === 0) {
        containerResultados.innerHTML = `<p style="text-align:center; color: var(--text-muted); width: 100%;">Nenhuma harmonização cadastrada para este tipo de bebida no momento.</p>`;
        return;
    }

    containerResultados.innerHTML = correspondentes.map(prod => `
        <div class="card-harmonizacao-item" style="border: 1px solid var(--border-color); padding: 12px; border-radius: 8px; margin-bottom: 10px; display: flex; gap: 12px; align-items: center;">
            <img src="${prod.img}" alt="${prod.nome}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px;">
            <div>
                <strong style="color: var(--accent-gold); display: block;">${prod.nome}</strong>
                <small style="color: var(--text-dark);">${prod.harmonizacao.texto}</small>
            </div>
        </div>
    `).join('');
}

// -------------------------------------------------------------
// MODAIS PADRÃO E UTILITÁRIOS
// -------------------------------------------------------------
window.finalizarSelecaoPersonalizada = function () {
    alert("Seleção do menu do casamento gravada com sucesso! O ateliê entrará em contato para os detalhes de degustação.");
    fecharCalculadora();
}

window.adicionarAoCarrinho = function (nomeProduto) {
    alert(`O item "${nomeProduto}" foi adicionado com sucesso à sua seleção de casamento!`);
}

window.abrirFAQ = () => document.getElementById("modalFAQ").style.display = "flex";
window.fecharFAQ = () => document.getElementById("modalFAQ").style.display = "none";
window.abrirCalculadora = () => document.getElementById("modalCalculadora").style.display = "flex";
window.fecharCalculadora = () => document.getElementById("modalCalculadora").style.display = "none";
window.abrirModalFrete = () => document.getElementById("modalFrete").style.display = "flex";
window.fecharModalFrete = () => document.getElementById("modalFrete").style.display = "none";

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