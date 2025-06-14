(function(){
  const script = document.currentScript;
  const basePath = script.src.substring(0, script.src.lastIndexOf('/') + 1);
  const rootPrefix = basePath.replace(/header\/$/, '');
  fetch(basePath + 'header.html')
    .then(resp => resp.text())
    .then(html => {
      html = html.replace(/{{root}}/g, rootPrefix);
      const placeholder = document.getElementById('header-placeholder');
      if (placeholder) {
        placeholder.innerHTML = html;
      } else {
        document.body.insertAdjacentHTML('afterbegin', html);
      }
      const js = document.createElement('script');
      js.src = basePath + 'header.js';
      document.body.appendChild(js);
    })
    .catch(err => {
      console.error('Erro ao carregar header:', err);
    });
})();
