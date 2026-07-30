// Importações modularizadas do Firebase v10+ para autenticação e banco de dados
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDl_8Y9-9Ga9B0zGBRhqV_4ar0wuOM0DSg",
    authDomain: "chateaudesdouceursdocesbolos.firebaseapp.com",
    projectId: "chateaudesdouceursdocesbolos",
    storageBucket: "chateaudesdouceursdocesbolos.firebasestorage.app",
    messagingSenderId: "359953974692",
    appId: "1:359953974692:web:32f549b3f4c3159f152d31"
};

// Inicializa a aplicação e serviços do Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Mapeamento dos elementos da interface administrativa
const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const loginForm = document.getElementById("loginForm");
const authError = document.getElementById("authError");
const faqList = document.getElementById("faqList");
const btnLogout = document.getElementById("btnLogout");

// Monitoramento do estado de autenticação
onAuthStateChanged(auth, (user) => {
    if (user) {
        loginSection.classList.add("hidden");
        dashboardSection.classList.remove("hidden");
        carregarFeedbacks();
    } else {
        loginSection.classList.remove("hidden");
        dashboardSection.classList.add("hidden");
    }
});

// Autenticação
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value;
    const senha = document.getElementById("adminPassword").value;
    authError.innerText = "";

    try {
        await signInWithEmailAndPassword(auth, email, senha);
    } catch (error) {
        authError.innerText = "Acesso negado: E-mail ou senha inválidos.";
        console.error("Erro na autenticação: ", error.code);
    }
});

// Logout
btnLogout.addEventListener("click", () => {
    signOut(auth);
});

// Busca mensagens no Firestore
async function carregarFeedbacks() {
    faqList.innerHTML = "<p>Buscando mensagens no banco de dados...</p>";

    try {
        const q = query(collection(db, "faq"), orderBy("data", "desc"));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            faqList.innerHTML = "<p>Nenhuma mensagem recebida até o momento.</p>";
            return;
        }

        faqList.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            const dataFormatada = item.data ? new Date(item.data.toDate()).toLocaleString('pt-BR') : 'Data não informada';

            const itemHTML = `
                <div class="faq-card-item">
                    <p><strong>Tipo de Assunto:</strong> <span style="text-transform: uppercase; color: var(--primary-color); font-weight: 600;">${item.tipo}</span></p>
                    <p><strong>Mensagem do Cliente:</strong> ${item.mensagem}</p>
                    <p><small><strong>Data de Recebimento:</strong> ${dataFormatada}</small></p>
                </div>
            `;
            faqList.innerHTML += itemHTML;
        });

    } catch (error) {
        console.error("Erro ao obter mensagens do Firestore: ", error);
        faqList.innerHTML = "<p>Ocorreu uma falha ao ler os dados do banco.</p>";
    }
}