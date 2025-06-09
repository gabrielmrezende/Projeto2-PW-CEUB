document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("header");
  if (!placeholder) return;

  // 1) Carrega o HTML do header
  fetch("header.html")
    .then((response) => response.text())
    .then((html) => {
      placeholder.innerHTML = html;


      // 2) Busca elementos dentro do header inserido
      const botaoTema = document.getElementById("botao-tema");
      const icone = botaoTema.querySelector("i");
      const body = document.body;
      const logo = document.getElementById("logo-header");

      // Função para aplicar o tema salvo no localStorage
      function aplicarTemaSalvo() {
        const temaSalvo = localStorage.getItem("tema");
        if (temaSalvo === "escuro") {
          body.classList.add("dark-theme");
          icone.classList.replace("bx-moon", "bx-sun");
          logo.src = "assets/images/logo-black.png";
        } else {
          body.classList.remove("dark-theme");
          icone.classList.replace("bx-sun", "bx-moon");
          logo.src = "assets/images/logo-white.png";
          localStorage.setItem("tema", "claro");
        }
      }

      aplicarTemaSalvo();

      // 3) Listener para alternar o tema ao clicar
      botaoTema.addEventListener("click", () => {
        icone.style.opacity = "0";
        icone.style.transform = "rotate(180deg)";

        setTimeout(() => {
          body.classList.toggle("dark-theme");

          if (body.classList.contains("dark-theme")) {
            icone.classList.replace("bx-moon", "bx-sun");
            logo.src = "assets/images/logo-black.png";
            localStorage.setItem("tema", "escuro");
          } else {
            icone.classList.replace("bx-sun", "bx-moon");
            logo.src = "assets/images/logo-white.png";
            localStorage.setItem("tema", "claro");
          }

          icone.style.opacity = "1";
          icone.style.transform = "rotate(0deg)";
        }, 150);
      });

      // 4) Dropdowns de menu (hover)
      document.querySelectorAll(".has-dropdown").forEach((menu) => {
        const link = menu.querySelector("a");
        const iconeSeta = link.querySelector("i");

        menu.addEventListener("mouseenter", () => {
          iconeSeta.classList.replace("bx-chevron-down", "bx-chevron-up");
        });

        menu.addEventListener("mouseleave", () => {
          iconeSeta.classList.replace("bx-chevron-up", "bx-chevron-down");
        });
      });

      // 5) Saudação e dropdown de usuário
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

        const logoutOpcao = saudacao.querySelector("#logout-opcao");
        logoutOpcao.addEventListener("click", () => {
          localStorage.removeItem("usuarioLogado");
          location.reload();
        });
      }

      // 6) Dispara evento customizado para inicializar o carrinho
      document.dispatchEvent(new Event("header-carrinho-injected"));
    })
    .catch((error) => console.error("Erro ao carregar header:", error));
});
