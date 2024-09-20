// Verifica se o usuário está autenticado
if (localStorage.getItem('authenticated') !== 'true' || localStorage.getItem('usuario') !== 'liriel') {
  window.location.href = 'index.html'; // Redireciona para a página de login
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
const sectionNames = ['Fotos', 'Chat', 'Adicionar Foto'];

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
    if (page && page !== '2') return; // Ignora páginas que não são a segunda

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

// Funções para o chat
document.getElementById('sendMessageButton').addEventListener('click', () => {
  const messageInput = document.getElementById('messageInput');
  const chatMessages = document.getElementById('chatMessages');
  
  if (messageInput.value.trim()) {
    const message = document.createElement('div');
    message.textContent = messageInput.value;
    chatMessages.appendChild(message);
    // Salva a mensagem na Supabase
    saveMessageToSupabase(messageInput.value);

    messageInput.value = '';
  }
});

async function saveMessageToSupabase(message) {
  try {
    const response = await fetch('https://your-supabase-url/rest/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_SUPABASE_API_KEY`
      },
      body: JSON.stringify({ content: message })
    });
    
    if (!response.ok) throw new Error('Erro ao salvar a mensagem');
  } catch (error) {
    console.error('Erro ao salvar a mensagem:', error);
  }
}