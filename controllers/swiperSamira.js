

// Verifica se é o primeiro acesso
if (!localStorage.getItem('firstAccess_samira')) {
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

// Função para carregar fotos no Swiper de fotos
function loadFotos() {
  new Swiper('.fotos-swiper', {
    loop: false,
    pagination: {
      el: '#swiper-dentro',
      clickable: true,
    },
    navigation: {
      nextEl: '.fotos-next',
      prevEl: '.fotos-prev',
    },
    resizeObserver: true, 
  });

  const fotosWrapper = document.getElementById('fotos-wrapper');

  // Exemplo de fotos - substitua por URLs reais
  const fotos = [
    'foto1.jpg',
    'foto2.jpg',
    'foto3.jpg',
  ];

  fotos.forEach(fotoUrl => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `<p>${fotoUrl}</p>`;
    fotosWrapper.appendChild(slide);
  });

}
document.addEventListener('DOMContentLoaded', loadFotos);