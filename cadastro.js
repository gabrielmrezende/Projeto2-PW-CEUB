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
