// Função para redirecionar após um atraso
function redirectToLogin() {
    setTimeout(() => {
      window.location.href = 'login.html'; // Redireciona para a página de login após 3 segundos
    }, 3000); // 3000 milissegundos = 3 segundos
  }
  
  // Verifica se o usuário está autenticado
  if (localStorage.getItem('authenticated') !== 'true') {
    redirectToLogin(); // Redireciona para a página de login após o atraso
  }



