// Lógica para o dropdown do carrinho e adição de itens (funciona em todas as páginas)
document.addEventListener("DOMContentLoaded", () => {
  const botoesAdicionar = document.querySelectorAll(".btn-adicionar");
  const contadorCarrinho = document.querySelector(".carrinho-count");
  const listaCarrinho = document.getElementById("lista-carrinho");
  const totalCarrinho = document.getElementById("total-carrinho");
  const botaoCarrinho = document.getElementById("btn-carrinho");
  const dropdown = document.getElementById("carrinho-dropdown");
  const fecharBtn = document.getElementById("btn-fechar-carrinho");

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  function atualizarContador() {
    if (!contadorCarrinho) return;
    const totalItens = carrinho.reduce(
      (soma, item) => soma + item.quantidade,
      0
    );
    contadorCarrinho.textContent = totalItens;
  }

  function atualizarDropdown() {
    if (!listaCarrinho || !totalCarrinho) return;

    listaCarrinho.innerHTML = "";
    let total = 0;

    carrinho.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${item.nome} (x${
        item.quantidade
      })</span> <strong>R$ ${(item.preco * item.quantidade).toFixed(
        2
      )}</strong>`;
      listaCarrinho.appendChild(li);
      total += item.preco * item.quantidade;
    });

    totalCarrinho.textContent = total.toFixed(2);
  }

  // Bloco de adição ao carrinho MODIFICADO para incluir a imagem
  botoesAdicionar.forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = botao.getAttribute("data-id");
      const nome = botao.getAttribute("data-nome");
      const preco = parseFloat(botao.getAttribute("data-preco"));

      // --- LINHA ADICIONADA ---
      // Captura o 'src' da imagem mais próxima dentro do 'produto-card'
      const imagem = botao.closest(".produto-card").querySelector("img").src;

      const itemExistente = carrinho.find((prod) => prod.id === id);

      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        // --- LINHA MODIFICADA ---
        // Adiciona o objeto completo com a imagem ao carrinho
        carrinho.push({ id, nome, preco, imagem, quantidade: 1 });
      }

      salvarCarrinho();
      atualizarContador();
      atualizarDropdown();
    });
  });

  if (botaoCarrinho) {
    botaoCarrinho.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("show");
    });
  }

  if (fecharBtn) {
    fecharBtn.addEventListener("click", () => {
      dropdown.classList.remove("show");
    });
  }

  document.addEventListener("click", function (event) {
    if (
      dropdown &&
      !dropdown.contains(event.target) &&
      botaoCarrinho &&
      !botaoCarrinho.contains(event.target)
    ) {
      dropdown.classList.remove("show");
    }
  });

  // Atualiza o estado inicial do dropdown e contador
  atualizarContador();
  atualizarDropdown();

  // --- LÓGICA PARA A PÁGINA carrinho.html (permanece a mesma, mas agora usará a imagem salva) ---

  // Verifica se estamos na página principal do carrinho
  if (document.querySelector(".pagina-carrinho")) {
    renderizarPaginaCarrinho();
  }

  function renderizarPaginaCarrinho() {
    const containerItens = document.getElementById("itens-carrinho");
    const resumoSubtotal = document.querySelector(
      ".resumo-detalhes p:nth-child(1) strong"
    );
    const resumoTotal = document.querySelector(
      ".resumo-detalhes .total strong"
    );
    const btnFinalizar = document.querySelector(".btn-finalizar");

    containerItens.innerHTML = "";
    let subtotal = 0;

    if (carrinho.length === 0) {
      containerItens.innerHTML = `
        <div class="carrinho-vazio">
          <i class="bx bx-shopping-bag"></i>
          <p>Seu carrinho está vazio no momento.</p>
          <a href="../index.html" class="btn-voltar">Explorar Produtos</a>
        </div>
      `;
      btnFinalizar.setAttribute("disabled", true);
      btnFinalizar.classList.remove("ativo");
    } else {
      carrinho.forEach((item) => {
        const itemHtml = `
          <div class="item-carrinho" data-id="${item.id}">
            <img src="${item.imagem}" alt="${item.nome}" class="item-imagem">
            <div class="item-info">
              <h4>${item.nome}</h4>
              <p>Preço: R$ ${item.preco.toFixed(2)}</p>
            </div>
            <div class="item-quantidade">
              <button class="btn-qtd" data-action="diminuir">-</button>
              <input type="number" value="${item.quantidade}" min="1" readonly>
              <button class="btn-qtd" data-action="aumentar">+</button>
            </div>
            <p class="item-subtotal">R$ ${(
              item.preco * item.quantidade
            ).toFixed(2)}</p>
            <button class="btn-remover"><i class='bx bx-trash'></i></button>
          </div>
        `;
        containerItens.innerHTML += itemHtml;
        subtotal += item.preco * item.quantidade;
      });
      btnFinalizar.removeAttribute("disabled");
      btnFinalizar.classList.add("ativo");
    }

    resumoSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
    resumoTotal.textContent = `R$ ${subtotal.toFixed(2)}`;
  }

  const containerItens = document.getElementById("itens-carrinho");
  if (containerItens) {
    containerItens.addEventListener("click", (e) => {
      const target = e.target;
      const itemDiv = target.closest(".item-carrinho");
      if (!itemDiv) return;

      const id = itemDiv.getAttribute("data-id");

      if (target.closest(".btn-remover")) {
        carrinho = carrinho.filter((item) => item.id !== id);
        salvarCarrinho();
        renderizarPaginaCarrinho();
        atualizarContador();
        atualizarDropdown();
      }

      if (target.classList.contains("btn-qtd")) {
        const action = target.getAttribute("data-action");
        const itemNoCarrinho = carrinho.find((item) => item.id === id);

        if (action === "aumentar") {
          itemNoCarrinho.quantidade++;
        } else if (action === "diminuir") {
          if (itemNoCarrinho.quantidade > 1) {
            itemNoCarrinho.quantidade--;
          } else {
            carrinho = carrinho.filter((item) => item.id !== id);
          }
        }
        salvarCarrinho();
        renderizarPaginaCarrinho();
        atualizarContador();
        atualizarDropdown();
      }
    });
  }
});
