// Função para redirecionar após um atraso
function redirectToLogin() {
    setTimeout(() => {
      window.location.href = 'login.html'; // Redireciona para a página de login após 3 segundos
    }, 1000); // 3000 milissegundos = 3 segundos
  }
  
  // Verifica se o usuário está autenticado
  if (localStorage.getItem('authenticated') !== 'true') {
    redirectToLogin(); // Redireciona para a página de login após o atraso
  }

  if(localStorage.getItem('usuario') == 'samira') {
    redirectToSwiperSamira(); // Redireciona para a página de samira
  }

  if(localStorage.getItem('usuario') == 'liriel') {
    redirectToSwiperLiriel(); // Redireciona para a página de samira
  }

  function redirectToSwiperLiriel() {
    setTimeout(() => {
      window.location.href = 'swiperLiriel.html'; // Redireciona para a página de login após 3 segundos
    }, 1000); // 3000 milissegundos = 3 segundos
  }

  function redirectToSwiperSamira() {
    setTimeout(() => {
      window.location.href = 'swiperSamira.html'; // Redireciona para a página de login após 3 segundos
    }, 1000); // 3000 milissegundos = 3 segundos
  }

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(reg) {
        console.log('Service Worker registrado com sucesso', reg);
  
        return reg.pushManager.getSubscription().then(function(sub) {
          if (sub === null) {
            // O usuário ainda não está inscrito
            return reg.pushManager.subscribe({
              userVisibleOnly: true, 
              applicationServerKey: '<YOUR_PUBLIC_VAPID_KEY>'
            });
          } else {
            // Usuário já está inscrito
            return sub;
          }
        });
      })
      .then(function(subscription) {
        // Enviar essa subscrição para o seu backend
        fetch('/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subscription)
        });
      })
      .catch(function(error) {
        console.error('Erro ao registrar Service Worker ou Push:', error);
      });
  }



