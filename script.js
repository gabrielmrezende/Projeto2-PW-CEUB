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
