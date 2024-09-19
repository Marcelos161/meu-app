if(!localStorage.getItem('firstAccess_samira')) {
  window.location.href = 'primeiroAcesso.html';
}

// Verifica se o usuário está autenticado
if (localStorage.getItem('authenticated') !== 'true' || localStorage.getItem('usuario') !== 'samira') {
  window.location.href = 'index.html'; // Redireciona para a página de login
} 

// Adiciona funcionalidade de logout
document.getElementById('logoutButton')?.addEventListener('click', function() {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html'; // Redireciona para a página de login
});

// Lista de nomes para as seções
const sectionNames = ['Seção 1', 'Seção 2', 'Seção 3', 'Seção 4'];

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

// Função para buscar frases da API em português
async function getLoveQuote() {
  try {
    const response = await fetch('https://api.example.com/quotes?tags=love&lang=pt'); // Substitua pela URL da sua API
    const data = await response.json();
    return data.content; // Retorna a frase
  } catch (error) {
    console.error('Erro ao obter a frase:', error);
    return 'Não foi possível obter a frase.';
  }
}

// Adicionando evento de clique para gerar a frase
document.querySelectorAll('.swiper-slide').forEach((slide) => {
  slide.addEventListener('click', async () => {
    const page = slide.getAttribute('data-page');
    const messageDiv = document.getElementById(`message-${page}`);
    if (messageDiv) {
      messageDiv.textContent = 'Carregando...';
      const quote = await getLoveQuote();
      messageDiv.textContent = quote;
    }
  });
});

// Eventos de like e dislike
document.querySelectorAll('.like').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que o clique no botão também acione o clique na slide
    const page = e.target.getAttribute('data-page');
    alert(`Você curtiu a frase na página ${page}!`);
  });
});

document.querySelectorAll('.dislike').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que o clique no botão também acione o clique na slide
    const page = e.target.getAttribute('data-page');
    alert(`Você não curtiu a frase na página ${page}.`);
  });
});