document.addEventListener("DOMContentLoaded", function () {
  const botoesAdicionar = document.querySelectorAll(".btn-adicionar");

  botoesAdicionar.forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = botao.dataset.id;
      const nome = botao.dataset.nome;
      const preco = parseFloat(botao.dataset.preco);

      const item = {
        id,
        nome,
        preco,
        quantidade: 1,
      };

      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

      const itemExistente = carrinho.find((produto) => produto.id === id);

      if (itemExistente) {
        itemExistente.quantidade += 1;
      } else {
        carrinho.push(item);
      }

      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      alert(`${nome} foi adicionado ao carrinho!`);
    });
  });
});
