// Verifica se é o primeiro acesso
if (!localStorage.getItem('firstAccess_samira')) {
  window.location.href = 'primeiroAcesso.html';
}

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
    resizeObserver: true,
  });

  const fotosWrapper = document.getElementById('fotos-wrapper');

  const fotos = imagens;

  fotos.forEach(fotoUrl => {
    if(fotoUrl.public_id !== "znjcbsrd3f0jnjqtd7my") {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src = "${fotoUrl.url}" alt = "${fotoUrl.display_name}" id = "${fotoUrl.public_id}" class="fotos-swiper">`;
      fotosWrapper.appendChild(slide);
    }
  });
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
  .then(data => console.log(data))
  .catch(error => console.error('Erro ao adicionar foto:', error));
}


// listar imagens

// Função que faz requisição ao endpoint do Netlify

// funcao de listar imagen que ja esta disponivel

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
  listarImagens();  // Chama a função ao carregar a página
});

