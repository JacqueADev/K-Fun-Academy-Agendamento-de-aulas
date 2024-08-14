document.getElementById('abrirFormCadastro').addEventListener('click', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do link
    var formulario = document.getElementById('formularioDeCadastro');
    formulario.classList.toggle('show'); // Alterna a classe 'show'
  });

  document.getElementById('formulario-cadastro').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
  
    var data = {
      "nome": nome,
      "email": email,
      "senha": senha
    };
  
    fetch('https://script.google.com/macros/s/AKfycbyqABS_UrtkHDOdDFmiZhUYl20fyWHm9TeKL3LeupgXjrUUBMLo_qX41gp440pj1P91/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log('Success:', response);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });