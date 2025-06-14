document.addEventListener("DOMContentLoaded", () => {
  console.log("masculino.js carregado");

  // Lógica para o botão de abrir/fechar filtros
  const toggleButton = document.getElementById("toggle-filtros");
  const body = document.body;
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      body.classList.toggle("filtros-aberto");
      toggleButton.classList.toggle("filtros-abertos");
    });
  }

  // --- LÓGICA DE FILTRAGEM DE PRODUTOS ATUALIZADA ---

  const checkboxes = document.querySelectorAll(
    ".filtros-laterais input[type='checkbox']"
  );
  const produtos = document.querySelectorAll(".produto-card");

  function aplicarFiltros() {
    const filtrosAtivos = {};

    // 1. Coleta todos os filtros que estão marcados
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const tipo = checkbox.getAttribute("data-tipo");
        const valor = checkbox.value;
        if (!filtrosAtivos[tipo]) {
          filtrosAtivos[tipo] = [];
        }
        filtrosAtivos[tipo].push(valor);
      }
    });

    // 2. Itera sobre cada produto para decidir se deve mostrá-lo ou escondê-lo
    produtos.forEach((produto) => {
      let mostrar = true;

      // Itera sobre cada TIPO de filtro ativo (ex: categoria, tamanho-roupa, cor...)
      for (const tipo in filtrosAtivos) {
        const valoresFiltro = filtrosAtivos[tipo];
        const valorProduto = produto.getAttribute(`data-${tipo}`);

        if (valoresFiltro.length > 0 && valorProduto) {
          if (tipo === "preco") {
            const precoProduto = parseFloat(valorProduto);
            let passouNoPreco = false;
            for (const range of valoresFiltro) {
              const [min, max] = range.split("-");
              if (
                precoProduto >= parseFloat(min) &&
                (max === "infinity" || precoProduto <= parseFloat(max))
              ) {
                passouNoPreco = true;
                break;
              }
            }
            if (!passouNoPreco) mostrar = false;

            // AJUSTE FINAL: Lógica para QUALQUER tipo de tamanho (tamanho-roupa, tamanho-sapato, etc.)
          } else if (tipo.startsWith("tamanho")) {
            // <-- MUDANÇA AQUI!
            const tamanhosDisponiveis = valorProduto.split(" ");
            const temTamanho = valoresFiltro.some((tamanho) =>
              tamanhosDisponiveis.includes(tamanho)
            );
            if (!temTamanho) mostrar = false;
          } else {
            // Lógica para outros filtros (categoria, cor)
            if (!valoresFiltro.includes(valorProduto)) {
              mostrar = false;
            }
          }
        }
        if (!mostrar) break;
      }

      produto.style.display = mostrar ? "block" : "none";
    });
  }

  // 4. Adiciona o evento de 'change' para todos os checkboxes
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", aplicarFiltros);
  });
});
