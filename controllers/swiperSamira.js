const usuarioLogado = localStorage.getItem('usuario');

// Verifica se o usuário está autenticado
if (localStorage.getItem('authenticated') !== 'true' || localStorage.getItem('usuario') !== 'samira') {
  window.location.href = 'index.html'; // Redireciona para a página de login
}

 const urlTeste = 'http://localhost:8888/.netlify/functions/cloudinary';
 const urlProduct = 'https://api-marcelo.netlify.app/.netlify/functions/cloudinary';

// Função para carregar fotos no Swiper de fotos
function loadFotos(imagens) {
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
    spaceBetween: 25, // Ajuste o valor conforme necessário
  });

  const fotosWrapper = document.getElementById('fotos-wrapper');

  const fotos = imagens;

  fotos.forEach(fotoUrl => {
    if(fotoUrl.public_id !== "znjcbsrd3f0jnjqtd7my") {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
      <img src="${fotoUrl.url}" alt="${fotoUrl.display_name}" id="${fotoUrl.public_id}" class="fotos-swiper">
      <div class="comentarios-list" id="comentarios-list-${fotoUrl.public_id}"></div>
      <textarea placeholder="Adicione um comentário" class="comentario" id="comentario-${fotoUrl.public_id}"></textarea>
      <button class="enviar-comentario" data-id="${fotoUrl.public_id}">Enviar</button>`;
      fotosWrapper.appendChild(slide);
    }
  });

  buscarComentarios(); 
}

async function buscarComentarios() {
  try {
    const response = await fetch('https://api-marcelo.netlify.app/.netlify/functions/cloudinary/comentarios');
    const comentarios = await response.json();
    console.log(comentarios);

    // Mapeia os comentários para cada foto
    const fotosIds = new Set(comentarios.map(comentario => comentario.ID_foto)); // Conjunto de IDs de fotos

    fotosIds.forEach(fotoId => {
      const comentariosList = document.getElementById(`comentarios-list-${fotoId}`);
      if (comentariosList) {
        // Limpa a lista de comentários antes de adicionar novos
        comentariosList.innerHTML = '';

        // Filtra os comentários da foto atual
        const comentariosFiltrados = comentarios.filter(comentario => comentario.ID_foto === fotoId);
        
        // Adiciona os comentários filtrados à lista
        comentariosFiltrados.forEach(comentario => {
          const comentarioDiv = document.createElement('div');
          comentarioDiv.classList.add('comentario-item');

          // Inserindo o nome do usuário, a data e o texto do comentário
          comentarioDiv.innerHTML = `
            <div class="comentario-header">
              <span class="comentario-usuario">${comentario.usuario}</span>
              <span class="comentario-data">${new Date(comentario.created_at).toLocaleDateString()}</span>
            </div>
            <div class="comentario-texto">${comentario.comentario}</div>
          `;

          // Adicionar o comentário na lista de comentários correspondente à foto
          comentariosList.appendChild(comentarioDiv);
        });

        comentariosList.scrollTop = comentariosList.scrollHeight;
      }
    });
  } catch (error) {
    console.error('Erro ao buscar comentários', error);
  }
}


async function enviarComentario(fotoId, comentario) {
  try {
    const response = await fetch('https://api-marcelo.netlify.app/.netlify/functions/cloudinary/comentarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID_foto: fotoId,
        comentario: comentario,
        usuario: usuarioLogado,
      }),
    });

    if (response.ok) {
      console.log('deu certo');
      buscarComentarios();
    } else {
      console.error('Erro ao enviar o comentário');
    }
  } catch (error) {
    console.error('Erro ao enviar o comentário', error);
  }
}

// upload de imagens

const cloudName = 'dzgolou3t'; // Substitua pelo seu "Cloud Name" do dashboard do Cloudinary
const uploadPreset = 'semAuth'; // Crie um preset no Cloudinary sem necessidade de autenticação

function uploadImage() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'semAuth');

  fetch('https://api.cloudinary.com/v1_1/dzgolou3t/image/upload', {
    method: 'POST',
    body: formData, // Remova o cabeçalho 'Content-Type'
  })
  .then(response => response.json())
  .then()
  .catch(error => console.error('Erro ao adicionar foto:', error));
  
}

function listarImagens() {
  fetch(urlProduct)
    .then(response => response.json())
    .then(data => {
      const images = data.resources;  // Pega as imagens da resposta JSON
      loadFotos(images);  // Chama a função para carregar as fotos no Swiper
    })
    .catch(error => {
      console.error('Erro ao listar imagens do Cloudinary:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  listarImagens();
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('enviar-comentario')) {
    const fotoId = event.target.dataset.id;
    const comentarioInput = document.getElementById(`comentario-${fotoId}`);
    const textoComentario = comentarioInput.value.trim();

    if (textoComentario) {
      enviarComentario(fotoId, textoComentario);
      comentarioInput.value = '';  // Limpar o campo de comentário após enviar
    } else {
      alert('Por favor, escreva um comentário antes de enviar.');
    }
  }
});

