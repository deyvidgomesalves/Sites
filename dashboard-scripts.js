document.addEventListener('DOMContentLoaded', function() {
    // Funções do dashboard
    function adicionarPizza(event) {
        event.preventDefault();
        // Implementação da adição de pizza
    }

    function adicionarPedido(event) {
        event.preventDefault();
        // Implementação da adição de pedido
    }

    function cadastrarMotoboy(event) {
        event.preventDefault();
        // Implementação do cadastro de motoboy
    }

    function cadastrarCliente(event) {
        event.preventDefault();
        // Implementação do cadastro de cliente
    }

    function adicionarIngrediente(event) {
        event.preventDefault();
        // Implementação da adição de ingrediente no estoque
    }

    function adicionarPromocao(event) {
        event.preventDefault();
        // Implementação da adição de promoção
    }

    function adicionarAvaliacao(event) {
        event.preventDefault();
        // Implementação da adição de avaliação
    }

    // Adicionar event listeners aos formulários
    document.getElementById('menu-form').addEventListener('submit', adicionarPizza);
    document.getElementById('pedidos-form').addEventListener('submit', adicionarPedido);
    document.getElementById('motoboys-form').addEventListener('submit', cadastrarMotoboy);
    document.getElementById('clientes-form').addEventListener('submit', cadastrarCliente);
    document.getElementById('estoque-form').addEventListener('submit', adicionarIngrediente);
    document.getElementById('promocoes-form').addEventListener('submit', adicionarPromocao);
    document.getElementById('avaliacoes-form').addEventListener('submit', adicionarAvaliacao);
});
