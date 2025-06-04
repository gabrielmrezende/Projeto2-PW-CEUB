// === MOSTRAR / ESCONDER SENHA ===
const toggleSenha = document.getElementById("toggleSenha");
const campoSenha = document.getElementById("senha");

toggleSenha.addEventListener("click", () => {
  const tipo =
    campoSenha.getAttribute("type") === "password" ? "text" : "password";
  campoSenha.setAttribute("type", tipo);

  toggleSenha.classList.toggle("bx-show");
  toggleSenha.classList.toggle("bx-hide");
});

// API GOOGLE OAUTH2
const CLIENT_ID = "SEU_CLIENT_ID"; // substitua pelo seu Client ID

document.querySelector(".btn-google").addEventListener("click", () => {
  google.accounts.oauth2
    .initTokenClient({
      client_id: CLIENT_ID,
      scope: "openid profile email",
      callback: (tokenResponse) => {
        getUserInfo(tokenResponse.access_token);
      },
    })
    .requestAccessToken();
});

function getUserInfo(accessToken) {
  fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((user) => {
      console.log("Usuário:", user);
      alert(`Bem-vindo(a), ${user.name}`);
      // Exemplo: salvar no localStorage e redirecionar
      // localStorage.setItem("usuario", JSON.stringify(user));
      // window.location.href = "index.html";
    })
    .catch((err) => {
      console.error("Erro ao obter dados do usuário:", err);
    });
}

// === VALIDAÇÃO DE USUÁRIO LOCAL ===
document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const btnLogin = document.querySelector(".btn-login");
  const mensagemErro = document.getElementById("mensagem-erro");

  btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value;

    if (!email || !senha) {
      mensagemErro.textContent = "Por favor, preencha todos os campos.";
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuario) {
      mensagemErro.textContent = "Usuário não cadastrado ou senha incorreta.";
      return;
    }

    // Captura o primeiro nome do usuário e formata (primeira letra maiúscula)
    const primeiroNome = usuario.nome.split(" ")[0];
    const nomeFormatado =
      primeiroNome.charAt(0).toUpperCase() +
      primeiroNome.slice(1).toLowerCase();

    // Salva o nome formatado do usuário logado
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    // Redireciona para a página inicial
    window.location.href = "../index.html";
  });
});
