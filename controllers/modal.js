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
window.location.href = 'index.html';
}

// Adiciona o evento ao botão de continuar
document.getElementById('continueButton').addEventListener('click', function() {

const { jsPDF } = window.jspdf; // Acesse a biblioteca jsPDF
const doc = new jsPDF();

// Adicione conteúdo ao PDF
doc.setFontSize(16);
doc.text("Contrato de Aceitação", 20, 20);
doc.text("Bem-vindo ao seu primeiro acesso, Samira!", 20, 30);
doc.text("Estamos felizes que você tenha aberto isso!", 20, 40);
doc.text("No dia 11 de outubro de 2025, teremos um encontro.", 20, 50);
doc.text("Este é um contrato totalmente opcional.", 20, 60);
doc.text("Caso deseje desistir, não há problema algum.", 20, 70);
doc.text("*Peço apenas que me comunique.", 20, 80);
doc.text("*para voltar para a pagina, clique no link enviado pelo wpp novamente Liriel, AMEM???.", 20, 80);

// Salvar o PDF
doc.save("contratoEncontro.pdf");
localStorage.setItem(firstAccessKey, 'true');

  setTimeout(() => {
    alert('contrato sendo baixado');
    window.location.href = 'swiperSamira.html';
  }, 1000); // 500 milissegundos (0.5 segundos)
});