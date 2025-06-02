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

// ========== CARROSSEL ==========
let indiceAtual = 0;
const slides = document.querySelectorAll(".slide");
const indicadores = document.querySelectorAll(".indicador");
const btnAnterior = document.querySelector(".btn.anterior");
const btnProximo = document.querySelector(".btn.proximo");

function mostrarSlide(indice) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("ativo", i === indice);
    indicadores[i].classList.toggle("ativo", i === indice);
  });
  indiceAtual = indice;
}

// === Controle do temporizador ===
let intervaloCarrossel = setInterval(proximoSlide, 5000);

function reiniciarIntervalo() {
  clearInterval(intervaloCarrossel);
  intervaloCarrossel = setInterval(proximoSlide, 5000);
}

function proximoSlide() {
  const novoIndice = (indiceAtual + 1) % slides.length;
  mostrarSlide(novoIndice);
}

function slideAnterior() {
  const novoIndice = (indiceAtual - 1 + slides.length) % slides.length;
  mostrarSlide(novoIndice);
}

// Botões de navegação
btnProximo.addEventListener("click", () => {
  proximoSlide();
  reiniciarIntervalo();
});

btnAnterior.addEventListener("click", () => {
  slideAnterior();
  reiniciarIntervalo();
});

// Indicadores clicáveis
indicadores.forEach((indicador, i) => {
  indicador.addEventListener("click", () => {
    mostrarSlide(i);
    reiniciarIntervalo();
  });
});
