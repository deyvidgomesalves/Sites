document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let endereco = document.getElementById("endereco").value.trim();
    let telefone = document.getElementById("telefone").value.trim();
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value.trim();
    
    let mensagemDiv = document.getElementById("mensagem");

    if (!validarCampos(nome, endereco, telefone, email, senha)) {
        mensagemDiv.innerHTML = "⚠️ Preencha todos os campos corretamente!";
        mensagemDiv.style.color = "yellow";
        return;
    }

    localStorage.setItem("pizzariaNome", nome);
    localStorage.setItem("pizzariaEmail", email);
    localStorage.setItem("pizzariaSenha", senha);
    localStorage.setItem("pizzariaTelefone", telefone);

    mensagemDiv.innerHTML = "✅ Pizzaria cadastrada com sucesso!";
    mensagemDiv.style.color = "lightgreen";
    
    document.getElementById("form").reset();
});

function validarCampos(nome, endereco, telefone, email, senha) {
    let telefoneValido = /^\d{11}$/;
    let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nome === "" || endereco === "" || telefone === "" || email === "" || senha === "") {
        return false;
    }

    if (!telefone.match(telefoneValido)) {
        alert("⚠️ O telefone deve estar no formato: 21999999999");
        return false;
    }

    if (!email.match(emailValido)) {
        alert("⚠️ Digite um e-mail válido!");
        return false;
    }

    return true;
}

document.getElementById("login-button").addEventListener("click", function() {
    window.location.href = "login.html";
});