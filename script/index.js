document.getElementById('abrirFormCadastro').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    var formulario = document.getElementById('formularioDeCadastro');
    formulario.classList.toggle('show'); // Alterna a classe 'show'
  });