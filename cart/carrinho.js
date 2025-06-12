document.addEventListener("DOMContentLoaded", () => {
  const botoesAdicionar = document.querySelectorAll(".btn-adicionar");
  const contadorCarrinho = document.querySelector(".carrinho-count");
  const listaCarrinho = document.getElementById("lista-carrinho");
  const totalCarrinho = document.getElementById("total-carrinho");
  const botaoCarrinho = document.getElementById("btn-carrinho");
  const dropdown = document.getElementById("carrinho-dropdown");
  const fecharBtn = document.getElementById("btn-fechar-carrinho");

  // Inicializa carrinho
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  function atualizarContador() {
    const totalItens = carrinho.reduce(
      (soma, item) => soma + item.quantidade,
      0
    );
    contadorCarrinho.textContent = totalItens;
  }

  function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  function atualizarDropdown() {
    listaCarrinho.innerHTML = "";
    let total = 0;

    carrinho.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.nome} x${item.quantidade} - R$ ${(
        item.preco * item.quantidade
      ).toFixed(2)}`;
      listaCarrinho.appendChild(li);
      total += item.preco * item.quantidade;
    });

    totalCarrinho.textContent = total.toFixed(2);
  }

  botoesAdicionar.forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = botao.getAttribute("data-id");
      const nome = botao.getAttribute("data-nome");
      const preco = parseFloat(botao.getAttribute("data-preco"));

      const itemExistente = carrinho.find((prod) => prod.id === id);

      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        carrinho.push({ id, nome, preco, quantidade: 1 });
      }

      salvarCarrinho();
      atualizarContador();
      atualizarDropdown();
    });
  });

  // Inicialização
  atualizarContador();
  atualizarDropdown();

  // Mostrar/ocultar carrinho com animação
  botaoCarrinho.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("show");
  });

  fecharBtn.addEventListener("click", () => {
    dropdown.classList.remove("show");
  });
});

document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("carrinho-dropdown");
  const botaoCarrinho = document.getElementById("btn-carrinho");

  // Se o clique NÃO for dentro do dropdown nem no botão do carrinho
  if (
    !dropdown.contains(event.target) &&
    !botaoCarrinho.contains(event.target)
  ) {
    dropdown.classList.remove("show");
  }
});
