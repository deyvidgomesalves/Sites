document.addEventListener("DOMContentLoaded", function() {
    // Funções para exibir e gerenciar o menu de pizzas
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
                <p><strong>Ingredientes:</strong> ${pizza.ingredientes}</p>
                <p><strong>Preço:</strong> R$ ${pizza.preco}</p>
                <p><strong>Categoria:</strong> ${pizza.categoria}</p>
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
        document.getElementById("pizza-ingredientes").value = pizza.ingredientes;
        document.getElementById("pizza-preco").value = pizza.preco;
        document.getElementById("pizza-categoria").value = pizza.categoria;
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

    document.getElementById("menu-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let pizzaNome = document.getElementById("pizza-nome").value.trim();
        let pizzaDescricao = document.getElementById("pizza-descricao").value.trim();
        let pizzaIngredientes = document.getElementById("pizza-ingredientes").value.trim();
        let pizzaPreco = document.getElementById("pizza-preco").value.trim();
        let pizzaCategoria = document.getElementById("pizza-categoria").value.trim();
        let pizzaFoto = document.getElementById("pizza-foto").value.trim();

        let pizza = {
            nome: pizzaNome,
            descricao: pizzaDescricao,
            ingredientes: pizzaIngredientes,
            preco: pizzaPreco,
            categoria: pizzaCategoria,
            foto: pizzaFoto
        };

        let pizzas = JSON.parse(localStorage.getItem("pizzas")) || [];
        pizzas.push(pizza);
        localStorage.setItem("pizzas", JSON.stringify(pizzas));

        exibirPizzas();
        document.getElementById("menu-form").reset();
    });

    // Funções para exibir e gerenciar pedidos
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
                <p><strong>Itens:</strong> ${pedido.itens}</p>
                <p><strong>Total:</strong> R$ ${pedido.total}</p>
                <p><strong>Forma de Pagamento:</strong> ${pedido.pagamento}</p>
                <p><strong>Status:</strong> ${pedido.status}</p>
                <button class="atualizar-pedido" data-index="${index}">Atualizar</button>
                <button class="excluir-pedido" data-index="${index}">Excluir</button>
            `;

            pedidosLista.appendChild(pedidoDiv);
        });

        document.querySelectorAll(".atualizar-pedido").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                atualizarPedido(index);
            });
        });

        document.querySelectorAll(".excluir-pedido").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                excluirPedido(index);
            });
        });
    }

    function atualizarPedido(index) {
        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
        let pedido = pedidos[index];

        let status = ["Em preparo", "A caminho", "Entregue"];
        let currentStatusIndex = status.indexOf(pedido.status);
        let nextStatusIndex = (currentStatusIndex + 1) % status.length;
        pedido.status = status[nextStatusIndex];

        localStorage.setItem("pedidos", JSON.stringify(pedidos));
        exibirPedidos();
    }

    function excluirPedido(index) {
        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
        pedidos.splice(index, 1);
        localStorage.setItem("pedidos", JSON.stringify(pedidos));
        exibirPedidos();
    }

    document.getElementById("pedidos-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let pedidoCliente = document.getElementById("pedido-cliente").value.trim();
        let pedidoItens = document.getElementById("pedido-itens").value.trim();
        let pedidoTotal = document.getElementById("pedido-total").value.trim();
        let pedidoPagamento = document.getElementById("pedido-pagamento").value.trim();
        let pedidoStatus = document.getElementById("pedido-status").value.trim();

        let pedido = {
            cliente: pedidoCliente,
            itens: pedidoItens,
            total: pedidoTotal,
            pagamento: pedidoPagamento,
            status: pedidoStatus
        };

        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
        pedidos.push(pedido);
        localStorage.setItem("pedidos", JSON.stringify(pedidos));

        exibirPedidos();
        document.getElementById("pedidos-form").reset();
    });

    // Funções para exibir e gerenciar entregas
    function exibirEntregas() {
        let motoboys = JSON.parse(localStorage.getItem("motoboys")) || [];
        let entregasLista = document.getElementById("entregas-lista");
        entregasLista.innerHTML = "";

        motoboys.forEach((motoboy, index) => {
            let motoboyDiv = document.createElement("div");
            motoboyDiv.classList.add("motoboy-item");

            motoboyDiv.innerHTML = `
                <h3>${motoboy.nome}</h3>
                <p><strong>Telefone:</strong> ${motoboy.telefone}</p>
                <button class="excluir-motoboy" data-index="${index}">Excluir</button>
            `;

            entregasLista.appendChild(motoboyDiv);
        });

        document.querySelectorAll(".excluir-motoboy").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                excluirMotoboy(index);
            });
        });
    }

    function excluirMotoboy(index) {
        let motoboys = JSON.parse(localStorage.getItem("motoboys")) || [];
        motoboys.splice(index, 1);
        localStorage.setItem("motoboys", JSON.stringify(motoboys));
        exibirEntregas();
    }

    document.getElementById("entregas-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let motoboyNome = document.getElementById("motoboy-nome").value.trim();
        let motoboyTelefone = document.getElementById("motoboy-telefone").value.trim();

        let motoboy = {
            nome: motoboyNome,
            telefone: motoboyTelefone
        };

        let motoboys = JSON.parse(localStorage.getItem("motoboys")) || [];
        motoboys.push(motoboy);
        localStorage.setItem("motoboys", JSON.stringify(motoboys));

        exibirEntregas();
        document.getElementById("entregas-form").reset();
    });

    // Funções para exibir e gerenciar retiradas
    function exibirRetiradas() {
        let retiradas = JSON.parse(localStorage.getItem("retiradas")) || [];
        let retiradaLista = document.getElementById("retirada-lista");
        retiradaLista.innerHTML = "";

        retiradas.forEach((retirada, index) => {
            let retiradaDiv = document.createElement("div");
            retiradaDiv.classList.add("retirada-item");

            retiradaDiv.innerHTML = `
                <h3>${retirada.cliente}</h3>
                <button class="excluir-retirada" data-index="${index}">Excluir</button>
            `;

            retiradaLista.appendChild(retiradaDiv);
        });

        document.querySelectorAll(".excluir-retirada").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                excluirRetirada(index);
            });
        });
    }

    function excluirRetirada(index) {
        let retiradas = JSON.parse(localStorage.getItem("retiradas")) || [];
        retiradas.splice(index, 1);
        localStorage.setItem("retiradas", JSON.stringify(retiradas));
        exibirRetiradas();
    }

    document.getElementById("retirada-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let retiradaCliente = document.getElementById("retirada-cliente").value.trim();

        let retirada = {
            cliente: retiradaCliente
        };

        let retiradas = JSON.parse(localStorage.getItem("retiradas")) || [];
        retiradas.push(retirada);
        localStorage.setItem("retiradas", JSON.stringify(retiradas));

        exibirRetiradas();
        document.getElementById("retirada-form").reset();
    });

    // Funções para exibir relatórios e estatísticas
    function exibirRelatorios() {
        let vendas = JSON.parse(localStorage.getItem("vendas")) || [];
        let estatisticasVendasDiv = document.getElementById("estatisticas-vendas");
        let produtosMaisVendidosDiv = document.getElementById("produtos-mais-vendidos");
        let relatorioFaturamentoDiv = document.getElementById("relatorio-faturamento");

        estatisticasVendasDiv.innerHTML = `
            <p>Total de Vendas: ${vendas.length}</p>
            <p>Faturamento: R$ ${vendas.reduce((total, venda) => total + venda.valor, 0).toFixed(2)}</p>
        `;

        let produtos = {};
        vendas.forEach(venda => {
            venda.itens.forEach(item => {
                if (!produtos[item.nome]) {
                    produtos[item.nome] = 0;
                }
                produtos[item.nome]++;
            });
        });

        let produtosMaisVendidos = Object.entries(produtos).sort((a, b) => b[1] - a[1]).slice(0, 5);
        produtosMaisVendidosDiv.innerHTML = `
            <p>Produtos Mais Vendidos:</p>
            <ul>
                ${produtosMaisVendidos.map(produto => `<li>${produto[0]}: ${produto[1]}</li>`).join("")}
            </ul>
        `;

        relatorioFaturamentoDiv.innerHTML = `
            <p>Relatório de Faturamento:</p>
            <ul>
                ${vendas.map(venda => `<li>Venda #${venda.id}: R$ ${venda.valor.toFixed(2)}</li>`).join("")}
            </ul>
        `;
    }

    exibirRelatorios();

    // Inicializar todas as funções de exibição
    exibirPizzas();
    exibirPedidos();
    exibirEntregas();
    exibirRetiradas();
});