document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const passwordInput = document.getElementById('password').value;
        const predefinedPasswordSamira = 'samira'; // Substitua pela sua senha predefinida
        const predefinePasswordsLiriel = 'liriel';

        if (passwordInput === predefinedPasswordSamira) {
            fetch('https://api-marcelo.netlify.app/.netlify/functions/cloudinary/eventos') {
                
            }
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('usuario', 'samira');
            window.location.href = 'swiperSamira.html';
        } else if(passwordInput === predefinePasswordsLiriel) {
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('usuario', 'liriel');
            window.location.href = 'swiperLiriel.html'; // Redireciona para a página protegida
        } else {
            alert('Senha incorreta');
        }
        

    });
});