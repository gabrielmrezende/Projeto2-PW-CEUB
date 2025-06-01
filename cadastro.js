const senhaInput = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");

toggleSenha.addEventListener("click", () => {
  const tipo = senhaInput.type === "password" ? "text" : "password";
  senhaInput.type = tipo;

  // Alterna o ícone
  toggleSenha.classList.toggle("bx-show");
  toggleSenha.classList.toggle("bx-hide");
});
