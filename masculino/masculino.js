document.addEventListener("DOMContentLoaded", () => {
  const produtos = document.querySelectorAll(".produto-card");
  const checkboxes = document.querySelectorAll(
    ".filtros-laterais input[type='checkbox']"
  );
  const produtosGrid = document.querySelector(".produtos-grid");
  const btnFiltros = document.getElementById("toggle-filtros");

  const produtosDados = [
    {
      element: produtos[0],
      categoria: "camisetas",
      tamanho: ["P", "M", "G"],
      cor: ["preto"],
      preco: 49.9,
    },
    {
      element: produtos[1],
      categoria: "calças",
      tamanho: ["M", "G", "GG"],
      cor: ["azul"],
      preco: 119.9,
    },
    {
      element: produtos[2],
      categoria: "tênis",
      tamanho: ["42", "43"],
      cor: ["azul"],
      preco: 199.9,
    },
    {
      element: produtos[3],
      categoria: "tênis",
      tamanho: ["40", "41", "42"],
      cor: ["vermelho"],
      preco: 209.9,
    },
    {
      element: produtos[4],
      categoria: "tênis",
      tamanho: ["39", "40"],
      cor: ["preto"],
      preco: 189.9,
    },
    {
      element: produtos[5],
      categoria: "camisas",
      tamanho: ["P", "M", "G", "GG"],
      cor: ["branco", "azul", "preto"],
      preco: 89.9,
    },
    {
      element: produtos[6],
      categoria: "bermudas",
      tamanho: ["M", "G", "GG"],
      cor: ["azul"],
      preco: 79.9,
    },
    {
      element: produtos[7],
      categoria: "jaquetas",
      tamanho: ["M", "G", "GG"],
      cor: ["preto", "marrom"],
      preco: 299.9,
    },
    {
      element: produtos[8],
      categoria: "relógios",
      tamanho: ["único"],
      cor: ["preto", "prata"],
      preco: 249.9,
    },
  ];

  function aplicarFiltros() {
    const filtrosSelecionados = {
      categoria: [],
      tamanho: [],
      cor: [],
      preco: [],
    };

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const label = checkbox.parentElement.textContent.trim().toLowerCase();

        if (["camisetas", "calças", "tênis"].includes(label)) {
          filtrosSelecionados.categoria.push(label);
        } else if (["p", "m", "g", "gg", "42", "43"].includes(label)) {
          filtrosSelecionados.tamanho.push(label.toUpperCase());
        } else if (["preto", "azul", "branco"].includes(label)) {
          filtrosSelecionados.cor.push(label);
        } else if (label.includes("até r$ 50")) {
          filtrosSelecionados.preco.push("ate50");
        } else if (label.includes("r$ 51 - r$ 150")) {
          filtrosSelecionados.preco.push("51-150");
        } else if (label.includes("acima de r$ 150")) {
          filtrosSelecionados.preco.push("150+");
        }
      }
    });

    produtosDados.forEach(({ element, categoria, tamanho, cor, preco }) => {
      const catOK =
        filtrosSelecionados.categoria.length === 0 ||
        filtrosSelecionados.categoria.includes(categoria);

      const tamOK =
        filtrosSelecionados.tamanho.length === 0 ||
        filtrosSelecionados.tamanho.some((t) => tamanho.includes(t));

      const corOK =
        filtrosSelecionados.cor.length === 0 ||
        filtrosSelecionados.cor.some((c) => cor.includes(c));

      let precoOK = false;
      if (filtrosSelecionados.preco.length === 0) precoOK = true;
      else {
        for (const faixa of filtrosSelecionados.preco) {
          if (
            (faixa === "ate50" && preco <= 50) ||
            (faixa === "51-150" && preco > 50 && preco <= 150) ||
            (faixa === "150+" && preco > 150)
          ) {
            precoOK = true;
            break;
          }
        }
      }

      if (catOK && tamOK && corOK && precoOK) {
        element.style.display = "";
      } else {
        element.style.display = "none";
      }
    });
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", aplicarFiltros);
  });

  aplicarFiltros();

  // Alterna filtros, grid e botão
  btnFiltros.addEventListener("click", () => {
    const filtrosAtivo = document.body.classList.toggle("filtros-aberto");

    if (filtrosAtivo) {
      produtosGrid.classList.remove("filtros-fechados");
      btnFiltros.classList.add("filtros-abertos");
    } else {
      produtosGrid.classList.add("filtros-fechados");
      btnFiltros.classList.remove("filtros-abertos");
    }
  });
});

