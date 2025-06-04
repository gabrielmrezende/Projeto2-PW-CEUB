const botaoTema = document.getElementById("botao-tema");
const icone = botaoTema.querySelector("i");
const body = document.body;
const logo = document.getElementById("logo-header");

function aplicarTemaSalvo() {
  const temaSalvo = localStorage.getItem("tema");

  if (temaSalvo === "escuro") {
    body.classList.add("dark-theme");
    icone.classList.replace("bx-moon", "bx-sun");
    logo.src = "../assets/images/logo-black.png";
  } else {
    body.classList.remove("dark-theme");
    icone.classList.replace("bx-sun", "bx-moon");
    logo.src = "../assets/images/logo-white.png";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  aplicarTemaSalvo();

  // Alternar tema
  botaoTema.addEventListener("click", () => {
    icone.style.opacity = "0";
    icone.style.transform = "rotate(180deg)";

    setTimeout(() => {
      body.classList.toggle("dark-theme");

      if (body.classList.contains("dark-theme")) {
        icone.classList.replace("bx-moon", "bx-sun");
        logo.src = "../assets/images/logo-black.png";
        localStorage.setItem("tema", "escuro");
      } else {
        icone.classList.replace("bx-sun", "bx-moon");
        logo.src = "../assets/images/logo-white.png";
        localStorage.setItem("tema", "claro");
      }

      icone.style.opacity = "1";
      icone.style.transform = "rotate(0deg)";
    }, 150);
  });

  // Dropdowns de menus
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

  // Saudação com nome do usuário e dropdown
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const acoesHeader = document.querySelector(".acoes-header");

  if (usuarioLogado && usuarioLogado.nome && acoesHeader) {
    const primeiroNome = usuarioLogado.nome.trim().split(" ")[0];
    const nomeFormatado =
      primeiroNome.charAt(0).toUpperCase() +
      primeiroNome.slice(1).toLowerCase();

    const usuarioArea = document.createElement("div");
    usuarioArea.classList.add("usuario-area");

    const saudacao = document.createElement("div");
    saudacao.classList.add("usuario-nome-dropdown");
    saudacao.innerHTML = `
      <span class="usuario-nome">Olá, ${nomeFormatado}</span>
      <ul class="usuario-dropdown">
        <li id="logout-opcao">Sair</li>
      </ul>
    `;

    usuarioArea.appendChild(saudacao);

    const iconeLogin = acoesHeader.querySelector("a[href*='login']");
    if (iconeLogin) {
      iconeLogin.replaceWith(usuarioArea);
    } else {
      acoesHeader.insertBefore(usuarioArea, acoesHeader.firstChild);
    }

    // Evento de logout
    const logoutOpcao = saudacao.querySelector("#logout-opcao");
    logoutOpcao.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      location.reload();
    });
  }
});
