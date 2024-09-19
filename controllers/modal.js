if (localStorage.getItem('authenticated') !== 'true' || localStorage.getItem('usuario') !== 'samira') {
    window.location.href = 'index.html'; // Redireciona para a página de login
  } 

// Verifica se o usuário já acessou a página antes
const usuarioAtual = localStorage.getItem('usuario') || 'anonimo'; // Ajuste para o usuário autenticado
const firstAccessKey = `firstAccess_${usuarioAtual}`; // Chave personalizada para o usuário

const firstAccessScreen = document.getElementById('firstAccessScreen');

if (!localStorage.getItem(firstAccessKey)) {
  // Primeiro acesso: exibe o modal
  firstAccessScreen.classList.remove('hidden');
} else {
  // Acessos subsequentes: redireciona direto para a página principal
  window.location.href = 'main.html';
}

// Adiciona o evento ao botão de continuar
document.getElementById('continueButton').addEventListener('click', function() {
  // Marca que o usuário já acessou
  localStorage.setItem(firstAccessKey, 'true');
  
  // Redireciona para a página principal
  window.location.href = 'swiperSamira.html';
});