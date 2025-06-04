document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const nomeInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const confirmarSenhaInput = document.getElementById("confirmar-senha");
  const mensagemErro = document.getElementById("mensagem-erro");

  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;

    mensagemErro.textContent = "";

    if (!nome || !email || !senha || !confirmarSenha) {
      mensagemErro.textContent = "Por favor, preencha todos os campos.";
      return;
    }

    if (!validarEmail(email)) {
      mensagemErro.textContent = "Formato de e-mail inválido.";
      return;
    }

    if (senha !== confirmarSenha) {
      mensagemErro.textContent = "As senhas não coincidem.";
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const emailExiste = usuarios.some((u) => u.email.toLowerCase() === email);

    if (emailExiste) {
      mensagemErro.textContent = "Este e-mail já está cadastrado.";
      return;
    }

    const novoUsuario = { nome, email, senha };
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
    window.location.href = "../index.html";
  });

  // Toggle senha
  const toggleSenha = document.getElementById("toggleSenha");
  const toggleConfirmarSenha = document.getElementById("toggleConfirmarSenha");

  if (toggleSenha) {
    toggleSenha.addEventListener("click", function () {
      const type =
        senhaInput.getAttribute("type") === "password" ? "text" : "password";
      senhaInput.setAttribute("type", type);
      this.classList.toggle("bx-show");
      this.classList.toggle("bx-hide");
    });
  }

  if (toggleConfirmarSenha) {
    toggleConfirmarSenha.addEventListener("click", function () {
      const type =
        confirmarSenhaInput.getAttribute("type") === "password"
          ? "text"
          : "password";
      confirmarSenhaInput.setAttribute("type", type);
      this.classList.toggle("bx-show");
      this.classList.toggle("bx-hide");
    });
  }
});
