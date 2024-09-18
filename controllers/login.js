document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const passwordInput = document.getElementById('password').value;
        const predefinedPassword = 'samira'; // Substitua pela sua senha predefinida

        if (passwordInput === predefinedPassword) {
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('usuario', 'samira');
            window.location.href = 'swiper.html'; // Redireciona para a página protegida
        } else {
            alert('Senha incorreta');
        }
    });
});