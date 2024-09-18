// Verifica se o usuário está autenticado
if (localStorage.getItem('authenticated') !== 'true' || localStorage.getItem('usuario') !== 'liriel') {
  window.location.href = 'login.html'; // Redireciona para a página de login
}

// Adiciona funcionalidade de logout se o botão existir
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
  logoutButton.addEventListener('click', function() {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html'; // Redireciona para a página de login
  });
}

// Lista de nomes para as seções
const sectionNames = ['Fotos', 'Chat', 'Adiconar Foto'];

// Inicializando o Swiper com a paginação personalizada
const swiper = new Swiper('.swiper-container', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      // Cria o HTML para cada bullet com o nome da seção
      return '<span class="' + className + '">' + sectionNames[index] + '</span>';
    },
  },
  resizeObserver: true, // Habilita o observer de redimensionamento para ajustar o layout
});
  
// Função para buscar frases da API
async function getLoveQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random?tags=love');
    const data = await response.json();
    return data.content; // Retorna a frase
  } catch (error) {
    return 'Não foi possível obter a frase.';
  }
}

// Adicionando evento de clique para gerar a frase
document.querySelectorAll('.swiper-slide').forEach((slide) => {
  slide.addEventListener('click', async () => {
    const page = slide.getAttribute('data-page');
    const messageDiv = document.getElementById(`message-${page}`);
    messageDiv.textContent = 'Carregando...';
    
    const quote = await getLoveQuote();
    messageDiv.textContent = quote;
  });
});

// Eventos de like e dislike
document.querySelectorAll('.like').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede a propagação do clique para o slide
    const page = e.target.getAttribute('data-page');
    alert(`Você curtiu a frase na página ${page}!`);
  });
});

document.querySelectorAll('.dislike').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede a propagação do clique para o slide
    const page = e.target.getAttribute('data-page');
    alert(`Você não curtiu a frase na página ${page}.`);
  });
});