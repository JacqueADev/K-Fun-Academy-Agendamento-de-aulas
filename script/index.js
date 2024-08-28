// Evento de clique para abrir o formulário de cadastro
document.getElementById('abrirFormCadastro').addEventListener('click', function(event) {
  event.preventDefault(); // Evita que o link execute a ação padrão de recarregar a página
  var formCadastro = document.getElementById('formularioDeCadastro');
  
  // Alterna entre mostrar e esconder o formulário de cadastro
  if (formCadastro.classList.contains('show')) {
    formCadastro.classList.remove('show');
  } else {
    formCadastro.classList.add('show');
  }
});


document.getElementById('formulario-cadastro').addEventListener('submit', function(e) {
  e.preventDefault();
  
  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;

  var data = {
    "nome": nome,
    "email": email,
    "senha": senha,
    "action": "store" // Adiciona um campo de ação para o Google Apps Script
  };

  fetch('https://script.google.com/macros/s/AKfycbwDCB2BT4EdB4YUw3Vz4SxNF1ba2WlAKyW1zL4_Igg7uZDPXuNN8iXldFv7K9fsgpTr/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      // Exibe o alerta se a resposta for certa
      alert('Cadastro realizado com sucesso!');
      document.getElementById('formulario-cadastro').reset(); // Limpa o formulário
    } else {
      // exibe um alerta de erro
      alert('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Ocorreu um erro ao realizar o cadastro. Tente novamente.');
  });
});





// Buscando dados da planilha
function getSheetData(emailLogin, senhaLogin) {
  var spreadsheetId = '18mK5b2F-WCk4ImuPzUhj6OO4HMNG_fHa71wlyVSGkiU'; //ID da planilha
  var range = "Dados!B1:C100"; // Defina o intervalo 
  var apiKey = 'AIzaSyDt2KGKqEzruw2lqgL5BH58jH7NW55TAng'; // Substituir com sua API key

  return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      const arrayDeObjetos = data.values.map((linha) => {
        const [ email, password] = linha;
        return { email, password };
      });
      return arrayDeObjetos;
    })
    .catch((error) => {
      console.error('Erro ao buscar dados da planilha:', error);
      return null;
    });
}

// clique para o botão de login
document.getElementById('loginButton').addEventListener('click', function() {
  var emailLogin = document.getElementById('email-login').value;
  var senhaLogin = document.getElementById('senha-login').value;

  if (emailLogin === "" || senhaLogin === "") {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  getSheetData(emailLogin, senhaLogin).then(arrayDeObjetos => {
    if (arrayDeObjetos) {
      // Verifica se os dados preenchidos com os da planilha
      const usuarioEncontrado = arrayDeObjetos.find(objeto => objeto.email === emailLogin && objeto.password === senhaLogin);

      if (usuarioEncontrado) {
        // Se tá certo exibe a seção "mural-aviso"
        document.querySelector('section.mural-aviso').style.display = 'block';

        // Oculta todas as outras seções, fora o header
        document.querySelectorAll('section:not(.mural-aviso), div.cadastro-link').forEach(section => {
          section.style.display = 'none';
        });

      } else {
        // Se tá errado
        alert('Email ou senha incorretos. Tente novamente.');
      }
    } else {
      alert('Erro ao verificar os dados. Tente novamente mais tarde.');
    }
  });
});

