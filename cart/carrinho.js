// cart/carrinho.js
document.addEventListener("header-carrinho-injected", () => {
  const cartPlaceholder = document.getElementById("cart-placeholder");

  // 1) Carrega o HTML do carrinho
  fetch("cart/carrinho.html")
    .then(res => res.text())
    .then(html => {
      cartPlaceholder.innerHTML = html;

      // 2) Agora todos os elementos do carrinho (btns, lista, total) existem no DOM
      const botoesAdicionar   = document.querySelectorAll(".btn-adicionar");
      const contadorCarrinho  = document.querySelector(".carrinho-count");
      const listaCarrinho     = document.getElementById("lista-carrinho");
      const totalCarrinho     = document.getElementById("total-carrinho");
      let   carrinho          = JSON.parse(localStorage.getItem("carrinho")) || [];

      // 3) Funções de estado
      function atualizarContador() {
        const totalItens = carrinho.reduce((s, i) => s + i.quantidade, 0);
        contadorCarrinho.textContent = totalItens;
      }
      function salvarCarrinho() {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
      }
      function atualizarDropdown() {
        listaCarrinho.innerHTML = "";
        let total = 0;
        carrinho.forEach(item => {
          const li = document.createElement("li");
          li.textContent = `${item.nome} x${item.quantidade} – R$ ${(item.preco * item.quantidade).toFixed(2)}`;
          listaCarrinho.appendChild(li);
          total += item.preco * item.quantidade;
        });
        totalCarrinho.textContent = total.toFixed(2);
      }

      // 4) Listener “Adicionar ao carrinho” com checagem de usuário
      botoesAdicionar.forEach(btn => {
        btn.addEventListener("click", () => {
          const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
          if (!usuario || !usuario.nome) {
            window.location.href = "./authentication/login.html";
            return;
          }
          const { id, nome, preco } = btn.dataset;
          const precoNum = parseFloat(preco);
          const existente = carrinho.find(p => p.id === id);
          if (existente) existente.quantidade++;
          else carrinho.push({ id, nome, preco: precoNum, quantidade: 1 });

          salvarCarrinho();
          atualizarContador();
          atualizarDropdown();
        });
      });

      // 5) Inicializa contador e dropdown
      atualizarContador();
      atualizarDropdown();
      const botaoCarrinho = document.getElementById("btn-carrinho");
      const dropdown      = document.getElementById("carrinho-dropdown");
      const fecharBtn     = document.getElementById("btn-fechar-carrinho");
      botaoCarrinho.addEventListener("click", e => {
        e.preventDefault();
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
      });
      fecharBtn.addEventListener("click", () => dropdown.style.display = "none");
    })
    .catch(console.error);
});
