document.addEventListener("DOMContentLoaded", function() {
    // Função para exibir o menu de pizzas
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
                <p><strong>Tipo de Massa:</strong> ${pizza.tipoMassa}</p>
                <p><strong>Tamanho:</strong> ${pizza.tamanho}</p>
                <p><strong>Calorias:</strong> ${pizza.calorias}</p>
                <p><strong>Data de Criação:</strong> ${pizza.dataCriacao}</p>
                <p><strong>Controle de Estoque de Ingredientes:</strong> ${pizza.estoqueIngredientes}</p>
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

    // Função para editar uma pizza
    function editarPizza(index) {
        let pizzas = JSON.parse(localStorage.getItem("pizzas")) || [];
        let pizza = pizzas[index];

        document.getElementById("pizza-nome").value = pizza.nome;
        document.getElementById("pizza-descricao").value = pizza.descricao;
        document.getElementById("pizza-ingredientes").value = pizza.ingredientes;
        document.getElementById("pizza-preco").value = pizza.preco;
        document.getElementById("pizza-categoria").value = pizza.categoria;
        document.getElementById("pizza-foto").value = pizza.foto;
        document.getElementById("pizza-tipo-massa").value = pizza.tipoMassa;
        document.getElementById("pizza-tamanho").value = pizza.tamanho;
        document.getElementById("pizza-calorias").value = pizza.calorias;
        document.getElementById("pizza-data-criacao").value = pizza.dataCriacao;
        document.getElementById("pizza-estoque-ingredientes").value = pizza.estoqueIngredientes;

        pizzas.splice(index, 1);
        localStorage.setItem("pizzas", JSON.stringify(pizzas));
        exibirPizzas();
    }

    // Função para excluir uma pizza
    function excluirPizza(index) {
        let pizzas = JSON.parse(localStorage.getItem("pizzas")) || [];
        pizzas.splice(index, 1);
        localStorage.setItem("pizzas", JSON.stringify(pizzas));
        exibirPizzas();
    }

    // Função para adicionar uma nova pizza
    document.getElementById("menu-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let pizzaNome = document.getElementById("pizza-nome").value.trim();
        let pizzaDescricao = document.getElementById("pizza-descricao").value.trim();
        let pizzaIngredientes = document.getElementById("pizza-ingredientes").value.trim();
        let pizzaPreco = document.getElementById("pizza-preco").value.trim();
        let pizzaCategoria = document.getElementById("pizza-categoria").value.trim();
        let pizzaFoto = document.getElementById("pizza-foto").value.trim();
        let pizzaTipoMassa = document.getElementById("pizza-tipo-massa").value.trim();
        let pizzaTamanho = document.getElementById("pizza-tamanho").value.trim();
        let pizzaCalorias = document.getElementById("pizza-calorias").value.trim();
        let pizzaDataCriacao = document.getElementById("pizza-data-criacao").value.trim();
        let pizzaEstoqueIngredientes = document.getElementById("pizza-estoque-ingredientes").value.trim();

        let pizza = {
            nome: pizzaNome,
            descricao: pizzaDescricao,
            ingredientes: pizzaIngredientes,
            preco: pizzaPreco,
            categoria: pizzaCategoria,
            foto: pizzaFoto,
            tipoMassa: pizzaTipoMassa,
            tamanho: pizzaTamanho,
            calorias: pizzaCalorias,
            dataCriacao: pizzaDataCriacao,
            estoqueIngredientes: pizzaEstoqueIngredientes
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
                    <h3>Pedido #${pedido.id}</h3>
                    <p><strong>Cliente:</strong> ${pedido.cliente}</p>
                    <p><strong>Itens:</strong> ${pedido.itens}</p>
                    <p><strong>Total:</strong> R$ ${pedido.total}</p>
                    <p><strong>Forma de Pagamento:</strong> ${pedido.pagamento}</p>
                    <p><strong>Status:</strong> ${pedido.status}</p>
                    <p><strong>Endereço de Entrega:</strong> ${pedido.endereco}</p>
                    <p><strong>Comentários do Cliente:</strong> ${pedido.comentarios}</p>
                    <p><strong>Observações do Sistema:</strong> ${pedido.observacoes}</p>
                    <p><strong>Método de Pagamento:</strong> ${pedido.metodoPagamento}</p>
                    <button class="atualizar-pedido" data-index="${index}">Atualizar Estado de Entrega</button>
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
            let pedidoEndereco = document.getElementById("pedido-endereco").value.trim();
            let pedidoComentarios = document.getElementById("pedido-comentarios").value.trim();
            let pedidoObservacoes = document.getElementById("pedido-observacoes").value.trim();
            let pedidoMetodoPagamento = document.getElementById("pedido-metodo-pagamento").value.trim();
    
            let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
            let pedidoId = pedidos.length + 1; // ID do pedido gerado automaticamente
    
            let pedido = {
                id: pedidoId,
                cliente: pedidoCliente,
                itens: pedidoItens,
                total: pedidoTotal,
                pagamento: pedidoPagamento,
                status: pedidoStatus,
                endereco: pedidoEndereco,
                comentarios: pedidoComentarios,
                observacoes: pedidoObservacoes,
                metodoPagamento: pedidoMetodoPagamento
            };
    
            pedidos.push(pedido);
            localStorage.setItem("pedidos", JSON.stringify(pedidos));
    
            exibirPedidos();
            document.getElementById("pedidos-form").reset();
        });
    
        // Funções para exibir e gerenciar motoboys
        function exibirMotoboys() {
            let motoboys = JSON.parse(localStorage.getItem("motoboys")) || [];
            let motoboysLista = document.getElementById("motoboys-lista");
            motoboysLista.innerHTML = "";
    
            motoboys.forEach((motoboy, index) => {
                let motoboyDiv = document.createElement("div");
                motoboyDiv.classList.add("motoboy-item");
    
                motoboyDiv.innerHTML = `
                    <h3>${motoboy.nome}</h3>
                    <p><strong>Telefone:</strong> ${motoboy.telefone}</p>
                    <p><strong>Placa da Moto:</strong> ${motoboy.placa}</p>
                    <p><strong>Status:</strong> ${motoboy.status}</p>
                    <p><strong>Pedidos Atribuídos:</strong> ${motoboy.pedidos}</p>
                    <p><strong>Avaliação do Cliente:</strong> ${motoboy.avaliacao}</p>
                    <button class="excluir-motoboy" data-index="${index}">Excluir</button>
                `;
    
                motoboysLista.appendChild(motoboyDiv);
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
            exibirMotoboys();
        }
    
        document.getElementById("motoboys-form").addEventListener("submit", function(event) {
            event.preventDefault();
    
            let motoboyNome = document.getElementById("motoboy-nome").value.trim();
            let motoboyTelefone = document.getElementById("motoboy-telefone").value.trim();
            let motoboyPlaca = document.getElementById("motoboy-placa").value.trim();
            let motoboyStatus = document.getElementById("motoboy-status").value.trim();
            let motoboyPedidos = document.getElementById("motoboy-pedidos").value.trim();
            let motoboyAvaliacao = document.getElementById("motoboy-avaliacao").value.trim();
    
            let motoboy = {
                nome: motoboyNome,
                telefone: motoboyTelefone,
                placa: motoboyPlaca,
                status: motoboyStatus,
                pedidos: motoboyPedidos,
                avaliacao: motoboyAvaliacao
            };
    
            let motoboys = JSON.parse(localStorage.getItem("motoboys")) || [];
            motoboys.push(motoboy);
            localStorage.setItem("motoboys", JSON.stringify(motoboys));
    
            exibirMotoboys();
            document.getElementById("motoboys-form").reset();
        });
            // Funções para exibir e gerenciar clientes
    function exibirClientes() {
        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        let clientesLista = document.getElementById("clientes-lista");
        clientesLista.innerHTML = "";

        clientes.forEach((cliente, index) => {
            let clienteDiv = document.createElement("div");
            clienteDiv.classList.add("cliente-item");

            clienteDiv.innerHTML = `
                <h3>${cliente.nome}</h3>
                <p><strong>Endereço:</strong> ${cliente.endereco}</p>
                <p><strong>Telefone:</strong> ${cliente.telefone}</p>
                <p><strong>E-mail:</strong> ${cliente.email}</p>
                <p><strong>Preferências de Pizza:</strong> ${cliente.preferencias}</p>
                <p><strong>Histórico de Pedidos:</strong> ${cliente.historicoPedidos}</p>
                <p><strong>Cartões de Fidelidade:</strong> ${cliente.cartoesFidelidade}</p>
                <p><strong>Histórico de Avaliações:</strong> ${cliente.historicoAvaliacoes}</p>
                <button class="excluir-cliente" data-index="${index}">Excluir</button>
            `;

            clientesLista.appendChild(clienteDiv);
        });

        document.querySelectorAll(".excluir-cliente").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                excluirCliente(index);
            });
        });
    }

    function excluirCliente(index) {
        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        clientes.splice(index, 1);
        localStorage.setItem("clientes", JSON.stringify(clientes));
        exibirClientes();
    }

    document.getElementById("clientes-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let clienteNome = document.getElementById("cliente-nome").value.trim();
        let clienteEndereco = document.getElementById("cliente-endereco").value.trim();
        let clienteTelefone = document.getElementById("cliente-telefone").value.trim();
        let clienteEmail = document.getElementById("cliente-email").value.trim();
        let clientePreferencias = document.getElementById("cliente-preferencias").value.trim();
        let clienteHistoricoPedidos = document.getElementById("cliente-historico-pedidos").value.trim();
        let clienteCartoesFidelidade = document.getElementById("cliente-cartoes-fidelidade").value.trim();
        let clienteHistoricoAvaliacoes = document.getElementById("cliente-historico-avaliacoes").value.trim();

        let cliente = {
            nome: clienteNome,
            endereco: clienteEndereco,
            telefone: clienteTelefone,
            email: clienteEmail,
            preferencias: clientePreferencias,
            historicoPedidos: clienteHistoricoPedidos,
            cartoesFidelidade: clienteCartoesFidelidade,
            historicoAvaliacoes: clienteHistoricoAvaliacoes
        };

        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        clientes.push(cliente);
        localStorage.setItem("clientes", JSON.stringify(clientes));

        exibirClientes();
        document.getElementById("clientes-form").reset();
    });

    // Funções para exibir e gerenciar estoque
    function exibirEstoque() {
        let ingredientes = JSON.parse(localStorage.getItem("ingredientes")) || [];
        let estoqueLista = document.getElementById("estoque-lista");
        estoqueLista.innerHTML = "";

        ingredientes.forEach((ingrediente, index) => {
            let ingredienteDiv = document.createElement("div");
            ingredienteDiv.classList.add("ingrediente-item");

            ingredienteDiv.innerHTML = `
                <h3>${ingrediente.nome}</h3>
                <p><strong>Quantidade:</strong> ${ingrediente.quantidade}</p>
                <p><strong>Preço:</strong> R$ ${ingrediente.preco}</p>
                <p><strong>Fornecedor:</strong> ${ingrediente.fornecedor}</p>
                <p><strong>Validade:</strong> ${ingrediente.validade}</p>
                <p><strong>Relatório de Utilização:</strong> ${ingrediente.relatorio}</p>
                <button class="excluir-ingrediente" data-index="${index}">Excluir</button>
            `;

            estoqueLista.appendChild(ingredienteDiv);
        });

        document.querySelectorAll(".excluir-ingrediente").forEach(button => {
            button.addEventListener("click", function() {
                let index = this.getAttribute("data-index");
                excluirIngrediente(index);
            });
        });
    }

    function excluirIngrediente(index) {
        let ingredientes = JSON.parse(localStorage.getItem("ingredientes")) || [];
        ingredientes.splice(index, 1);
        localStorage.setItem("ingredientes", JSON.stringify(ingredientes));
        exibirEstoque();
    }

    document.getElementById("estoque-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let ingredienteNome = document.getElementById("estoque-ingrediente").value.trim();
        let ingredienteQuantidade = document.getElementById("estoque-quantidade").value.trim();
        let ingredientePreco = document.getElementById("estoque-preco").value.trim();
        let ingredienteFornecedor = document.getElementById("estoque-fornecedor").value.trim();
        let ingredienteValidade = document.getElementById("estoque-validade").value.trim();
        let ingredienteRelatorio = document.getElementById("estoque-relatorio").value.trim();

        let ingrediente = {
            nome: ingredienteNome,
            quantidade: ingredienteQuantidade,
            preco: ingredientePreco,
            fornecedor: ingredienteFornecedor,
            validade: ingredienteValidade,
            relatorio: ingredienteRelatorio
        };

        let ingredientes = JSON.parse(localStorage.getItem("ingredientes")) || [];
        ingredientes.push(ingrediente);
        localStorage.setItem("ingredientes", JSON.stringify(ingredientes));

        exibirEstoque();
        document.getElementById("estoque-form").reset();
    });
        // Funções para exibir e gerenciar promoções
        function exibirPromocoes() {
            let promocoes = JSON.parse(localStorage.getItem("promocoes")) || [];
            let promocoesLista = document.getElementById("promocoes-lista");
            promocoesLista.innerHTML = "";
    
            promocoes.forEach((promocao, index) => {
                let promocaoDiv = document.createElement("div");
                promocaoDiv.classList.add("promocao-item");
    
                promocaoDiv.innerHTML = `
                    <h3>${promocao.nome}</h3>
                    <p><strong>Descrição:</strong> ${promocao.descricao}</p>
                    <p><strong>Desconto:</strong> ${promocao.desconto}%</p>
                    <p><strong>Data de Início:</strong> ${promocao.dataInicio}</p>
                    <p><strong>Data de Fim:</strong> ${promocao.dataFim}</p>
                    <p><strong>Código de Cupom:</strong> ${promocao.codigoCupom}</p>
                    <p><strong>Limitações:</strong> ${promocao.limite}</p>
                    <button class="excluir-promocao" data-index="${index}">Excluir</button>
                `;
    
                promocoesLista.appendChild(promocaoDiv);
            });
    
            document.querySelectorAll(".excluir-promocao").forEach(button => {
                button.addEventListener("click", function() {
                    let index = this.getAttribute("data-index");
                    excluirPromocao(index);
                });
            });
        }
    
        function excluirPromocao(index) {
            let promocoes = JSON.parse(localStorage.getItem("promocoes")) || [];
            promocoes.splice(index, 1);
            localStorage.setItem("promocoes", JSON.stringify(promocoes));
            exibirPromocoes();
        }
    
        document.getElementById("promocoes-form").addEventListener("submit", function(event) {
            event.preventDefault();
    
            let promocaoNome = document.getElementById("promocao-nome").value.trim();
            let promocaoDescricao = document.getElementById("promocao-descricao").value.trim();
            let promocaoDesconto = document.getElementById("promocao-desconto").value.trim();
            let promocaoDataInicio = document.getElementById("promocao-data-inicio").value.trim();
            let promocaoDataFim = document.getElementById("promocao-data-fim").value.trim();
            let promocaoCodigoCupom = document.getElementById("promocao-codigo-cupom").value.trim();
            let promocaoLimite = document.getElementById("promocao-limite").value.trim();
    
            let promocao = {
                nome: promocaoNome,
                descricao: promocaoDescricao,
                desconto: promocaoDesconto,
                dataInicio: promocaoDataInicio,
                dataFim: promocaoDataFim,
                codigoCupom: promocaoCodigoCupom,
                limite: promocaoLimite
            };
    
            let promocoes = JSON.parse(localStorage.getItem("promocoes")) || [];
            promocoes.push(promocao);
            localStorage.setItem("promocoes", JSON.stringify(promocoes));
    
            exibirPromocoes();
            document.getElementById("promocoes-form").reset();
        });
    
        // Funções para exibir e gerenciar avaliações
        function exibirAvaliacoes() {
            let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
            let avaliacoesLista = document.getElementById("avaliacoes-lista");
            avaliacoesLista.innerHTML = "";
    
            avaliacoes.forEach((avaliacao, index) => {
                let avaliacaoDiv = document.createElement("div");
                avaliacaoDiv.classList.add("avaliacao-item");
    
                avaliacaoDiv.innerHTML = `
                    <h3>Avaliação #${index + 1}</h3>
                    <p><strong>Nota da Pizza:</strong> ${avaliacao.pizza}</p>
                    <p><strong>Comentário:</strong> ${avaliacao.comentario}</p>
                    <p><strong>Nota do Motoboy:</strong> ${avaliacao.motoboy}</p>
                    <p><strong>Nota de Atendimento:</strong> ${avaliacao.atendimento}</p>
                    <button class="excluir-avaliacao" data-index="${index}">Excluir</button>
                `;
    
                avaliacoesLista.appendChild(avaliacaoDiv);
            });
    
            document.querySelectorAll(".excluir-avaliacao").forEach(button => {
                button.addEventListener("click", function() {
                    let index = this.getAttribute("data-index");
                    excluirAvaliacao(index);
                });
            });
        }
    
        function excluirAvaliacao(index) {
            let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
            avaliacoes.splice(index, 1);
            localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
            exibirAvaliacoes();
        }
    
        document.getElementById("avaliacoes-form").addEventListener("submit", function(event) {
            event.preventDefault();
    
            let avaliacaoPizza = document.getElementById("avaliacao-pizza").value.trim();
            let avaliacaoComentario = document.getElementById("avaliacao-comentario").value.trim();
            let avaliacaoMotoboy = document.getElementById("avaliacao-motoboy").value.trim();
            let avaliacaoAtendimento = document.getElementById("avaliacao-atendimento").value.trim();
    
            let avaliacao = {
                pizza: avaliacaoPizza,
                comentario: avaliacaoComentario,
                motoboy: avaliacaoMotoboy,
                atendimento: avaliacaoAtendimento
            };
    
            let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
            avaliacoes.push(avaliacao);
            localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
    
            exibirAvaliacoes();
            document.getElementById("avaliacoes-form").reset();
        });
    
        // Funções para exibir e gerenciar relatórios
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
    
        // Inicializar todas as funções de exibição
        exibirPizzas();
        exibirPedidos();
        exibirMotoboys();
        exibirClientes();
        exibirEstoque();
        exibirPromocoes();
        exibirAvaliacoes();
        exibirRelatorios();
    });