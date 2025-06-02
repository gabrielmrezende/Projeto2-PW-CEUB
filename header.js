const botaoTema = document.getElementById("botao-tema");
const icone = botaoTema.querySelector("i");
const body = document.body;
const logo = document.getElementById("logo-header");

// Função para aplicar o tema salvo no carregamento da página
function aplicarTemaSalvo() {
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
}

// Executa ao carregar a página
window.addEventListener("DOMContentLoaded", aplicarTemaSalvo);

// Alteração de Tema
botaoTema.addEventListener("click", () => {
  // Animação de saída (fade out)
  icone.style.opacity = "0";
  icone.style.transform = "rotate(180deg)";

  setTimeout(() => {
    // Alterna classe do body
    body.classList.toggle("dark-theme");

    // Alterna ícone e logo + salva o tema no localStorage
    if (body.classList.contains("dark-theme")) {
      icone.classList.replace("bx-moon", "bx-sun");
      logo.src = "imagens/logo/logo-black.png";
      localStorage.setItem("tema", "escuro");
    } else {
      icone.classList.replace("bx-sun", "bx-moon");
      logo.src = "imagens/logo/logo-white.png";
      localStorage.setItem("tema", "claro");
    }

    // Animação de entrada (fade in)
    icone.style.opacity = "1";
    icone.style.transform = "rotate(0deg)";
  }, 150); // tempo curto para parecer fluido
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