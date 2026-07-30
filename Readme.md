# 🏰 Château des Douceurs — Haute Pâtisserie & Mariages

Bem-vindo ao repositório do **Château des Douceurs**, uma plataforma web exclusiva e elegante desenvolvida para apresentação de catálogo e simulação de orçamentos para eventos de alta confeitaria e casamentos.

---

## 🎨 Identidade Visual & Design System

O projeto foi desenhado para transmitir sofisticação, delicadeza e minimalismo refinado.

* **Paleta de Cores:**
  * **Dark Chocolate (`#2c2a29`):** Utilizado para títulos, textos principais e elementos de alto contraste.
  * **Ouro Velho / Champagne (`#c5a059`):** Cor de destaque (accent) aplicada em subtítulos, preços, links e detalhes ornamentais.
  * **Off-white / Creme Manteiga (`#fdfbf7`):** Fundo suave que traz acolhimento e sensação de ateliê.
* **Tipografia:**
  * **Títulos:** *Cormorant Garamond* (Serifada clássica e imponente).
  * **Corpo / Navegação:** *Montserrat* (Sem serifa, limpa e legível).

---

## 🚀 Funcionalidades Atuais

* **Cabeçalho Fixo (Sticky Header):**
  * Integração de logo/monograma alinhado perfeitamente ao título e subtítulo.
  * Navegação limpa com botões de acesso rápido à calculadora, FAQ e painel administrativo.
  * Layout responsivo que previne quebras indesejadas de texto.
* **Hero Banner Clean:** Apresentação elegante com tipografia centralizada e fundo suave.
* **Vitrine de Produtos:** Exibição em grid dinâmico com cards refinados e efeitos suaves de *hover*.
* **Calculadora de Eventos:** Modal interativo para estimativa de consumo de doces e montagem de cardápio.
* **Atendimento / FAQ:** Modal de dúvidas frequentes para suporte ao cliente.
* **Simulador de Frete:** Cálculo rápido via CEP na área do carrinho.

---

## 📋 Próximas Atualizações (Em Desenvolvimento)

- [ ] **Ajustes no Cabeçalho:** Adição da imagem de logo definitiva da marca.
- [ ] **Tipografia do Hero Banner:** Redução leve no tamanho do título central para melhor fluidez visual.
- [ ] **Elementos Ornamentais:** Adição de arabescos sutis (SVG/CSS) para emoldurar seções estratégicas.
- [ ] **Reorganização do Cardápio:** Mover o *Mini Red Velvet* da categoria de bolos para a de docinhos.
- [ ] **Nova Lógica de Consumo vs. Lembrancinhas:**
  * **Mesa do Evento:** Separação de doces para consumo imediato durante a festa.
  * **Lembrancinhas:** Categoria dedicada a mimos embalados (ex: bem-casados, trufas especiais).
  * **Linha Pet:** Separação entre produtos consumidos na festa e lembrancinhas pet para levar para casa.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica e acessível.
* **CSS3:** Variáveis nativas (`:root`), Flexbox, Grid Layout e animações suaves.
* **JavaScript (ES6+):** Lógica interativa da calculadora, manipulação de modais e simulação de frete.

---

## 📂 Estrutura de Arquivos

```text
/
├── index.html          # Página principal / Vitrine
├── admin.html          # Painel restrito de administração
├── css/
│   └── style.css       # Estilos globais e variáveis de design
├── js/
│   ├── app.js          # Lógica principal da vitrine e modais
│   └── calculadora.js  # Regras de negócio e cálculo de eventos
└── assets/             # Imagens, logos e ícones