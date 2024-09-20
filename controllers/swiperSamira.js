// Verifica se é o primeiro acesso
if (!localStorage.getItem('firstAccess_samira')) {
  window.location.href = 'primeiroAcesso.html';
}

// Verifica se o usuário está autenticado
if (localStorage.getItem('authenticated') !== 'true' || localStorage.getItem('usuario') !== 'samira') {
  window.location.href = 'index.html'; // Redireciona para a página de login
}

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
    resizeObserver: true,
  });

  const fotosWrapper = document.getElementById('fotos-wrapper');

  const fotos = imagens;

  fotos.forEach(fotoUrl => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `<p>${fotoUrl}</p>`;
    fotosWrapper.appendChild(slide);
  });

}

// upload de imagens

const cloudName = 'dzgolou3t'; // Substitua pelo seu "Cloud Name" do dashboard do Cloudinary
const uploadPreset = 'semAuth'; // Crie um preset no Cloudinary sem necessidade de autenticação

function uploadImage() {
  console.log('chegou aqui')
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset); // Usar preset criado no dashboard do Cloudinary

  fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.secure_url;
      console.log('Imagem enviada com sucesso:', imageUrl);
    })
    .catch(error => console.error('Erro ao enviar a imagem:', error));
}


// listar imagens

const apiKey = '346449748872511';
const apiSecret = 'qehHw3EC7Mh1HimscOKq1_BqAfM';

// Endpoint para listar as imagens

function listarImagens() {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`;
  fetch(url, {
    headers: {
      Authorization: 'Basic ' + btoa(`${apiKey}:${apiSecret}`)
    }
  })
    .then(response => response.json())
    .then(data => {
      const images = data.resources;
      loadFotos(images);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  // Chame sua função aqui
  listarImagens();
});