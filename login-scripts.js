document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("login-email").value.trim();
    let senha = document.getElementById("login-password").value.trim();
    
    let loginMensagemDiv = document.getElementById("login-mensagem");

    let storedEmail = localStorage.getItem("pizzariaEmail");
    let storedSenha = localStorage.getItem("pizzariaSenha");

    if (email === storedEmail && senha === storedSenha) {
        loginMensagemDiv.innerHTML = "✅ Login realizado com sucesso!";
        loginMensagemDiv.style.color = "lightgreen";
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    } else {
        loginMensagemDiv.innerHTML = "❌ E-mail ou senha incorretos!";
        loginMensagemDiv.style.color = "red";
    }
});

document.getElementById("register-button").addEventListener("click", function() {
    window.location.href = "index.html";
});

document.getElementById("forgot-password-button").addEventListener("click", function() {
    window.location.href = "recover-password.html";
});