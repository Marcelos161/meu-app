  // Verifica se o usuário está autenticado
  if (localStorage.getItem('authenticated') !== 'true') {
      window.location.href = 'login.html'; // Redireciona para a página de login
  }

  // Adiciona funcionalidade de logout
  document.getElementById('logoutButton').addEventListener('click', function() {
      localStorage.removeItem('authenticated');
      localStorage.removeItem('usuario');
      window.location.href = 'login.html'; // Redireciona para a página de login
  });




