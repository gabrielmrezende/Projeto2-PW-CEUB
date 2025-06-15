document.addEventListener("DOMContentLoaded", () => {
  const botoesAdicionar = document.querySelectorAll(".btn-adicionar");
  const contadorCarrinho = document.querySelector(".carrinho-count");
  const listaCarrinho = document.getElementById("lista-carrinho");
  const totalCarrinhoSpan = document.getElementById("total-carrinho");
  const botaoCarrinho = document.getElementById("btn-carrinho");
  const dropdown = document.getElementById("carrinho-dropdown");

  if (dropdown && !dropdown.querySelector(".carrinho-botoes-footer")) {
    const botoesFooter = document.createElement("div");
    botoesFooter.className = "carrinho-botoes-footer";

    const linkCarrinho = document.createElement("a");

    // --- LÓGICA DE CAMINHO CORRIGIDA ---
    let carrinhoPath = "cart/carrinho.html";

    // Adicionada a verificação para a pasta /cart/
    if (
      window.location.pathname.includes("/masculino/") ||
      window.location.pathname.includes("/feminino/") ||
      window.location.pathname.includes("/infantil/") ||
      window.location.pathname.includes("/cart/")
    ) {
      // <-- CONDIÇÃO ADICIONADA AQUI
      carrinhoPath = "../cart/carrinho.html";
    }

    linkCarrinho.href = carrinhoPath;
    linkCarrinho.className = "btn-dropdown-estilizado";
    linkCarrinho.textContent = "Ver Carrinho";

    const fecharBtnNovo = document.createElement("button");
    fecharBtnNovo.type = "button";
    fecharBtnNovo.className = "btn-dropdown-estilizado";
    fecharBtnNovo.id = "btn-fechar-carrinho-novo";
    fecharBtnNovo.textContent = "Fechar";

    botoesFooter.appendChild(linkCarrinho);
    botoesFooter.appendChild(fecharBtnNovo);

    dropdown.appendChild(botoesFooter);
  }

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
    if (!listaCarrinho || !totalCarrinhoSpan) return;
    listaCarrinho.innerHTML = "";
    let total = 0;
    if (carrinho.length === 0) {
      listaCarrinho.innerHTML =
        '<li class="dropdown-vazio">Seu carrinho está vazio.</li>';
    } else {
      carrinho.forEach((item) => {
        const li = document.createElement("li");
        li.className = "dropdown-item";
        li.innerHTML = `<img src="${item.imagem}" alt="${
          item.nome
        }" class="dropdown-item-img"><div class="dropdown-item-info"><span class="dropdown-item-nome">${
          item.nome
        }</span><span class="dropdown-item-preco">${
          item.quantidade
        } x R$ ${item.preco.toFixed(
          2
        )}</span></div><strong class="dropdown-item-total">R$ ${(
          item.preco * item.quantidade
        ).toFixed(2)}</strong>`;
        listaCarrinho.appendChild(li);
        total += item.preco * item.quantidade;
      });
    }
    totalCarrinhoSpan.textContent = total.toFixed(2);
  }

  botoesAdicionar.forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = botao.getAttribute("data-id");
      const nome = botao.getAttribute("data-nome");
      const preco = parseFloat(botao.getAttribute("data-preco"));
      const imagem = botao.closest(".produto-card").querySelector("img").src;
      const itemExistente = carrinho.find((prod) => prod.id === id);
      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
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
      atualizarDropdown();
      dropdown.classList.toggle("show");
    });
  }

  const fecharDropdownBtn = document.getElementById("btn-fechar-carrinho-novo");
  if (fecharDropdownBtn) {
    fecharDropdownBtn.addEventListener("click", () => {
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

  atualizarContador();
  atualizarDropdown();

  if (document.querySelector(".pagina-carrinho")) {
    const cuponsValidos = { CEUB10: 0.1, CEUB50: 0.5 };
    const cupomInput = document.getElementById("cupom-input");
    const btnAplicarCupom = document.getElementById("btn-aplicar-cupom");
    const cupomMensagem = document.getElementById("cupom-mensagem");
    const btnFinalizar = document.querySelector(".btn-finalizar");
    const modalSucesso = document.getElementById("modal-compra-sucesso");

    btnFinalizar.addEventListener("click", () => {
      if (carrinho.length === 0) return;
      modalSucesso.style.display = "flex";
      setTimeout(() => {
        modalSucesso.classList.add("visivel");
      }, 10);
      carrinho = [];
      localStorage.removeItem("carrinho");
      localStorage.removeItem("cupomAplicado");
      atualizarContador();
      atualizarDropdown();
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 4000);
    });

    btnAplicarCupom.addEventListener("click", () => {
      const codigo = cupomInput.value.trim().toUpperCase();
      if (cuponsValidos[codigo]) {
        const cupom = { codigo: codigo, desconto: cuponsValidos[codigo] };
        localStorage.setItem("cupomAplicado", JSON.stringify(cupom));
        cupomMensagem.textContent = `Cupom "${codigo}" aplicado!`;
        cupomMensagem.className = "sucesso";
        renderizarPaginaCarrinho();
      } else {
        localStorage.removeItem("cupomAplicado");
        cupomMensagem.textContent = "Cupom inválido.";
        cupomMensagem.className = "erro";
        renderizarPaginaCarrinho();
      }
    });

    renderizarPaginaCarrinho();
  }

  function renderizarPaginaCarrinho() {
    const containerItens = document.getElementById("itens-carrinho");
    const resumoSubtotalEl = document.getElementById("resumo-subtotal");
    const resumoTotalEl = document.getElementById("resumo-total");
    const linhaDescontoEl = document.getElementById("linha-desconto");
    const valorDescontoEl = document.getElementById("valor-desconto");
    const cupomInput = document.getElementById("cupom-input");
    const btnFinalizar = document.querySelector(".btn-finalizar");

    let subtotal = 0;

    containerItens.innerHTML = "";
    if (carrinho.length === 0) {
      containerItens.innerHTML = `<div class="carrinho-vazio"><i class="bx bx-shopping-bag"></i><p>Seu carrinho está vazio.</p><a href="../index.html" class="btn-voltar">Explorar Produtos</a></div>`;
      btnFinalizar.setAttribute("disabled", true);
      btnFinalizar.classList.remove("ativo");
      if (linhaDescontoEl) linhaDescontoEl.style.display = "none";
    } else {
      carrinho.forEach((item) => {
        const itemHtml = `<div class="item-carrinho" data-id="${
          item.id
        }"><img src="${item.imagem}" alt="${
          item.nome
        }" class="item-imagem"><div class="item-info"><h4>${
          item.nome
        }</h4><p>Preço: R$ ${item.preco.toFixed(
          2
        )}</p></div><div class="item-quantidade"><button class="btn-qtd" data-action="diminuir">-</button><input type="number" value="${
          item.quantidade
        }" min="1" readonly><button class="btn-qtd" data-action="aumentar">+</button></div><p class="item-subtotal">R$ ${(
          item.preco * item.quantidade
        ).toFixed(
          2
        )}</p><button class="btn-remover"><i class='bx bx-trash'></i></button></div>`;
        containerItens.innerHTML += itemHtml;
        subtotal += item.preco * item.quantidade;
      });
      btnFinalizar.removeAttribute("disabled");
      btnFinalizar.classList.add("ativo");
    }

    const cupomAplicado = JSON.parse(localStorage.getItem("cupomAplicado"));
    let totalFinal = subtotal;

    if (cupomAplicado && subtotal > 0) {
      const valorDoDesconto = subtotal * cupomAplicado.desconto;
      totalFinal = subtotal - valorDoDesconto;
      valorDescontoEl.textContent = `- R$ ${valorDoDesconto.toFixed(2)}`;
      linhaDescontoEl.style.display = "flex";
      if (cupomInput) cupomInput.value = cupomAplicado.codigo;
    } else {
      if (linhaDescontoEl) linhaDescontoEl.style.display = "none";
    }

    if (resumoSubtotalEl)
      resumoSubtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (resumoTotalEl)
      resumoTotalEl.textContent = `R$ ${totalFinal.toFixed(2)}`;
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
      } else if (target.classList.contains("btn-qtd")) {
        const action = target.getAttribute("data-action");
        const itemNoCarrinho = carrinho.find((item) => item.id === id);
        if (itemNoCarrinho) {
          if (action === "aumentar") {
            itemNoCarrinho.quantidade++;
          } else if (action === "diminuir") {
            if (itemNoCarrinho.quantidade > 1) {
              itemNoCarrinho.quantidade--;
            } else {
              carrinho = carrinho.filter((item) => item.id !== id);
            }
          }
        }
      } else {
        return;
      }
      salvarCarrinho();
      renderizarPaginaCarrinho();
      atualizarContador();
      atualizarDropdown();
    });
  }
});
