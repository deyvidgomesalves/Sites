document.addEventListener("DOMContentLoaded", function() {
    let pizzariaNome = localStorage.getItem("pizzariaNome");
    let pizzariaEmail = localStorage.getItem("pizzariaEmail");
    let pizzariaTelefone = localStorage.getItem("pizzariaTelefone");

    document.getElementById("pizzaria-nome").textContent = pizzariaNome;
    document.getElementById("info-nome").textContent = pizzariaNome;
    document.getElementById("info-email").textContent = pizzariaEmail;
    document.getElementById("info-telefone").textContent = pizzariaTelefone;

    document.getElementById("menu-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let pizzaNome = document.getElementById("pizza-nome").value.trim();
        let pizzaDescricao = document.getElementById("pizza-descricao").value.trim();
        let pizzaPreco = document.getElementById("pizza-preco").value.trim();
        let pizzaTamanho = document.getElementById("pizza-tamanho").value.trim();
        let pizzaFoto = document.getElementById("pizza-foto").value.trim();

        let pizza = {
            nome: pizzaNome,
            descricao: pizzaDescricao,
            preco: pizzaPreco,
            tamanho: pizzaTamanho,
            foto: pizzaFoto
        };

        let pizzas = JSON.parse(localStorage.getItem("pizzas")) || [];
        pizzas.push(pizza);
        localStorage.setItem("pizzas", JSON.stringify(pizzas));

        exibirPizzas();
        document.getElementById("menu-form").reset();
    });

    function exibirPizzas() {
        let pizzas = JSON.parse(localStorage.getItem("pizzas")) || [];
        let menuLista = document.getElementById("menu-lista");
        menuLista.innerHTML = "";

        pizzas.forEach((pizza, index) => {
            let pizzaDiv = document.createElement("div");
            pizzaDiv.classList.add("pizza-item");

            pizzaDiv.innerHTML = `
                <img src="${pizza.foto}" alt="${pizza.nome}" class="pizza-foto">
                <h3>${pizza.nome}</h3>
                <p>${pizza.descricao}</p>
                <p><strong>Preço:</strong> R$ ${pizza.preco}</p>
                <p><strong>Tamanho:</strong> ${pizza.tamanho}</p>
                <button class="editar-pizza" data-index="${index}">Editar</button>
                <button class="excluir-pizza" data-index="${index}">Excluir</button>
            `;

            menuLista.appendChild(pizzaDiv);
        });

        document.querySelectorAll(".editar-pizza").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                editarPizza(index);
            });
        });

        document.querySelectorAll(".excluir-pizza").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                excluirPizza(index);
            });
        });
    }

    function editarPizza(index) {
        let pizzas = JSON.parse(localStorage.getItem("pizzas")) || [];
        let pizza = pizzas[index];

        document.getElementById("pizza-nome").value = pizza.nome;
        document.getElementById("pizza-descricao").value = pizza.descricao;
        document.getElementById("pizza-preco").value = pizza.preco;
        document.getElementById("pizza-tamanho").value = pizza.tamanho;
        document.getElementById("pizza-foto").value = pizza.foto;

        pizzas.splice(index, 1);
        localStorage.setItem("pizzas", JSON.stringify(pizzas));
        exibirPizzas();
    }

    function excluirPizza(index) {
        let pizzas = JSON.parse(localStorage.getItem("pizzas")) || [];
        pizzas.splice(index, 1);
        localStorage.setItem("pizzas", JSON.stringify(pizzas));
        exibirPizzas();
    }

    exibirPizzas();

    function exibirPedidos() {
        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
        let pedidosLista = document.getElementById("pedidos-lista");
        pedidosLista.innerHTML = "";

        pedidos.forEach((pedido, index) => {
            let pedidoDiv = document.createElement("div");
            pedidoDiv.classList.add("pedido-item");

            pedidoDiv.innerHTML = `
                <h3>Pedido #${index + 1}</h3>
                <p><strong>Cliente:</strong> ${pedido.cliente}</p>
                <p><strong>Endereço:</strong> ${pedido.endereco}</p>
                <p><strong>Itens:</strong> ${pedido.itens.map(item => `${item.nome} (${item.quantidade})`).join(", ")}</p>
                <p><strong>Status:</strong> ${pedido.status}</p>
                <button class="atualizar-status" data-index="${index}">Atualizar Status</button>
            `;

            pedidosLista.appendChild(pedidoDiv);
        });

        document.querySelectorAll(".atualizar-status").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                atualizarStatusPedido(index);
            });
        });
    }

    function atualizarStatusPedido(index) {
        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
        let pedido = pedidos[index];

        let status = ["Recebido", "Em preparo", "Saiu para entrega", "Entregue"];
        let currentStatusIndex = status.indexOf(pedido.status);
        let nextStatusIndex = (currentStatusIndex + 1) % status.length;
        pedido.status = status[nextStatusIndex];

        localStorage.setItem("pedidos", JSON.stringify(pedidos));
        exibirPedidos();
    }

    exibirPedidos();

    function exibirAvaliacoes() {
        let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
        let avaliacoesLista = document.getElementById("avaliacoes-lista");
        avaliacoesLista.innerHTML = "";

        avaliacoes.forEach((avaliacao, index) => {
            let avaliacaoDiv = document.createElement("div");
            avaliacaoDiv.classList.add("avaliacao-item");

            avaliacaoDiv.innerHTML = `
                <h3>Avaliação #${index + 1}</h3>
                <p><strong>Cliente:</strong> ${avaliacao.cliente}</p>
                <p><strong>Nota:</strong> ${avaliacao.nota}</p>
                <p><strong>Comentário:</strong> ${avaliacao.comentario}</p>
            `;

            avaliacoesLista.appendChild(avaliacaoDiv);
        });
    }

    exibirAvaliacoes();

    function exibirControleVendas() {
        let vendas = JSON.parse(localStorage.getItem("vendas")) || [];
        let controleVendasDiv = document.getElementById("controle-vendas");
        controleVendasDiv.innerHTML = `
            <p>Total de Vendas: ${vendas.length}</p>
            <p>Faturamento: R$ ${vendas.reduce((total, venda) => total + venda.valor, 0).toFixed(2)}</p>
        `;
    }

    exibirControleVendas();

    function exibirRelatoriosFaturamento() {
        let vendas = JSON.parse(localStorage.getItem("vendas")) || [];
        let relatoriosFaturamentoDiv = document.getElementById("relatorios-faturamento");
        relatoriosFaturamentoDiv.innerHTML = `
            <p>Relatório de Faturamento:</p>
            <ul>
                ${vendas.map(venda => `<li>Venda #${venda.id}: R$ ${venda.valor.toFixed(2)}</li>`).join("")}
            </ul>
        `;
    }

    exibirRelatoriosFaturamento();

    function exibirClientesCadastrados() {
        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        let clientesCadastradosDiv = document.getElementById("clientes-cadastrados");
        clientesCadastradosDiv.innerHTML = `
            <p>Clientes Cadastrados:</p>
            <ul>
                ${clientes.map(cliente => `<li>${cliente.nome} (${cliente.email})</li>`).join("")}
            </ul>
        `;
    }

    exibirClientesCadastrados();
});