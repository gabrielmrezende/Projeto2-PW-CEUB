// masculino.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("masculino.js carregado");

  // Exemplo: lógica para filtros laterais
  const filtros = document.querySelectorAll(
    ".filtros-laterais input[type='checkbox']"
  );

  filtros.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      console.log("Filtro alterado:", checkbox.value);

      // Aqui você pode aplicar lógica de filtro nos produtos
      // Ex: filtrarProdutos();
    });
  });

  // Se você tiver lógica para carregar produtos dinamicamente, coloque aqui também.
});
