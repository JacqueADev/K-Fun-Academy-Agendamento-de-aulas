// Abrir formulário de cadastro
document.getElementById('abrirFormCadastro').addEventListener('click', function(event) {
  event.preventDefault(); // Previne o comportamento do link
  var formulario = document.getElementById('formularioDeCadastro');
  formulario.classList.toggle('show'); // Alterna a classe 'show'
});

// Envio de dados de cadastro
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

// Função para buscar dados da planilha Google Sheets
function getSheetData() {
  var spreadsheetId = '18mK5b2F-WCk4ImuPzUhj6OO4HMNG_fHa71wlyVSGkiU'; // Substitua com o ID da sua planilha
  var range = "Dados!A1:C100"; // Defina o intervalo que você deseja buscar
  var apiKey = 'AIzaSyDt2KGKqEzruw2lqgL5BH58jH7NW55TAng'; // Substitua com sua API key

  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      const arrayDeObjetos = data.values.map((linha) => {
        const [name, link] = linha;
        return { name, link };
      });
      console.log(arrayDeObjetos); // Exibe os dados da planilha no console
    })
    .catch((error) => {
      console.error('Erro ao buscar dados da planilha:', error);
    });
}

// Evento de clique para o botão de login
document.getElementById('loginButton').addEventListener('click', function() {
  var emailLogin = document.getElementById('email-login').value;
  var senhaLogin = document.getElementById('senha-login').value;

  console.log('Email:', emailLogin);
  console.log('Senha:', senhaLogin);

  // Chama a função para buscar dados da planilha após a autenticação
  getSheetData();
});
