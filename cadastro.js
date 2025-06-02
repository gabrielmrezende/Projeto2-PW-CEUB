const botaoTema = document.getElementById("botao-tema");
const icone = botaoTema.querySelector("i");
const body = document.body;
const logo = document.getElementById("logo-header");

// === FUNÇÃO: Alternar o tema ===
function alternarTema() {
  // Animação de saída
  icone.style.opacity = "0";
  icone.style.transform = "rotate(180deg)";

  setTimeout(() => {
    // Alterna o tema no body
    body.classList.toggle("dark-theme");

    // Atualiza ícone e logo
    if (body.classList.contains("dark-theme")) {
      icone.classList.replace("bx-moon", "bx-sun");
      logo.src = "imagens/logo/logo-black.png";
      localStorage.setItem("tema", "escuro");
    } else {
      icone.classList.replace("bx-sun", "bx-moon");
      logo.src = "imagens/logo/logo-white.png";
      localStorage.setItem("tema", "claro");
    }

    // Animação de entrada
    icone.style.opacity = "1";
    icone.style.transform = "rotate(0deg)";
  }, 150);
}

// === EVENTO: Clique no botão do tema ===
botaoTema.addEventListener("click", alternarTema);

// === CARREGAMENTO INICIAL: aplicar tema salvo ===
window.addEventListener("DOMContentLoaded", () => {
  const temaSalvo = localStorage.getItem("tema");

  if (temaSalvo === "escuro") {
    body.classList.add("dark-theme");
    icone.classList.replace("bx-moon", "bx-sun");
    logo.src = "imagens/logo/logo-black.png";
  } else {
    body.classList.remove("dark-theme");
    icone.classList.replace("bx-sun", "bx-moon");
    logo.src = "imagens/logo/logo-white.png";
  }
});

// ====== Alterna ícone de seta para cima/baixo nos menus dropdown ======
const menusComDropdown = document.querySelectorAll(".has-dropdown");

menusComDropdown.forEach((menu) => {
  const link = menu.querySelector("a");
  const iconeSeta = link.querySelector("i");

  menu.addEventListener("mouseenter", () => {
    iconeSeta.classList.replace("bx-chevron-down", "bx-chevron-up");
  });

  menu.addEventListener("mouseleave", () => {
    iconeSeta.classList.replace("bx-chevron-up", "bx-chevron-down");
  });
});

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
