document.addEventListener("DOMContentLoaded", () => {
  const botoesAdicionar = document.querySelectorAll(".btn-adicionar");
  const contadorCarrinho = document.querySelector(".carrinho-count");
  const listaCarrinho = document.getElementById("lista-carrinho");
  const totalCarrinho = document.getElementById("total-carrinho");
  const botaoCarrinho = document.getElementById("btn-carrinho");
  const dropdown = document.querySelector(".carrinho-dropdown");
  const fecharBtn = document.getElementById("btn-fechar-carrinho");

  // Carrega carrinho do localStorage ou inicia vazio
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Atualiza o contador de itens no carrinho
  function atualizarContador() {
    const totalItens = carrinho.reduce(
      (soma, item) => soma + item.quantidade,
      0
    );
    contadorCarrinho.textContent = totalItens;
  }

  // Salva o carrinho no localStorage
  function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  // Atualiza a lista no dropdown do carrinho e o total
  function atualizarDropdown() {
    listaCarrinho.innerHTML = ""; // limpa lista
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

  // Adiciona evento para todos botões "Adicionar"
  botoesAdicionar.forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = botao.getAttribute("data-id"); // ID como string
      const nome = botao.getAttribute("data-nome");
      const preco = parseFloat(botao.getAttribute("data-preco"));

      // Busca se produto já está no carrinho (compara string)
      const itemExistente = carrinho.find((prod) => prod.id === id);

      if (itemExistente) {
        itemExistente.quantidade += 1; // soma quantidade
      } else {
        // Insere novo produto
        carrinho.push({ id, nome, preco, quantidade: 1 });
      }

      salvarCarrinho();
      atualizarContador();
      atualizarDropdown();
    });
  });

  // Inicializa contador e dropdown ao carregar
  atualizarContador();
  atualizarDropdown();

  // Mostrar/ocultar dropdown carrinho
  botaoCarrinho.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("show");
  });

  fecharBtn.addEventListener("click", () => {
    dropdown.classList.remove("show");
  });

  // Fechar dropdown se clicar fora
  document.addEventListener("click", (event) => {
    if (
      !dropdown.contains(event.target) &&
      !botaoCarrinho.contains(event.target)
    ) {
      dropdown.classList.remove("show");
    }
  });
});
