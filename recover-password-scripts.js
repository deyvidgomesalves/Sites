document.getElementById("recover-password-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("recover-email").value.trim();
    let recoverMensagemDiv = document.getElementById("recover-mensagem");

    let storedEmail = localStorage.getItem("pizzariaEmail");

    if (email === storedEmail) {
        recoverMensagemDiv.innerHTML = "✅ Um e-mail de recuperação foi enviado!";
        recoverMensagemDiv.style.color = "lightgreen";
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    } else {
        recoverMensagemDiv.innerHTML = "❌ E-mail não encontrado!";
        recoverMensagemDiv.style.color = "red";
    }
});