
let carrinho = [];
let total = 0;


// ABRIR E FECHAR CARRINHO
function toggleCarrinho() {
    const sidebar = document.getElementById('sidebar-carrinho');

    sidebar.classList.toggle('open');
}


// ADICIONAR PRODUTO AO CARRINHO
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });

    total += preco;

    atualizarInterfaceCarrinho();
}


// REMOVER PRODUTO DO CARRINHO
function removerDoCarrinho(index) {
    const produto = carrinho[index];

    total -= produto.preco;

    carrinho.splice(index, 1);

    atualizarInterfaceCarrinho();
}


// ATUALIZAR INTERFACE DO CARRINHO
function atualizarInterfaceCarrinho() {

    // Atualiza contador
    document.getElementById('cart-count').innerText =
        carrinho.length;

    // Lista de produtos
    const containerItens =
        document.getElementById('itens-carrinho');

    if (carrinho.length === 0) {

        containerItens.innerHTML =
            '<p style="padding: 20px; color: #777;">Seu carrinho está vazio.</p>';

    } else {

        containerItens.innerHTML = '';

        carrinho.forEach((item, index) => {

            const div = document.createElement('div');

            div.classList.add('cart-item');

            div.innerHTML = `
                <span>${item.nome}</span>

                <strong>
                    R$ ${item.preco.toFixed(2).replace('.', ',')}
                </strong>

                <button
                    onclick="removerDoCarrinho(${index})"
                    class="btn-remover">
                    Remover
                </button>
            `;

            containerItens.appendChild(div);
        });
    }

    // Atualiza valor total
    document.getElementById('total-carrinho').innerText =
        `R$ ${total.toFixed(2).replace('.', ',')}`;
}


// ABRIR FORMULÁRIO DE DOAÇÃO
function abrirFormularioDoacao() {

    if (carrinho.length === 0) {
        alert("Selecione uma peruca antes de continuar!");
        return;
    }

    // Esconde mensagem anterior
    document.getElementById('mensagem-doacao')
        .innerHTML = '';

    // Abre formulário
    document.getElementById('modal-doacao')
        .style.display = 'flex';

    // Fecha carrinho
    document.getElementById('sidebar-carrinho')
        .classList.remove('open');
}


// FECHAR FORMULÁRIO
function fecharFormularioDoacao() {

    document.getElementById('modal-doacao')
        .style.display = 'none';
}


// CONFIRMAR SOLICITAÇÃO DE DOAÇÃO
document.getElementById('form-doacao')
    .addEventListener('submit', function(event) {

        event.preventDefault();

        const nome =
            document.getElementById('nome').value;

        const contato =
            document.getElementById('contato').value;

        const entrega =
            document.getElementById('entrega').value;

        const localizacao =
            document.getElementById('localizacao').value;

        // Produtos escolhidos
        const produtos = carrinho
            .map(item => item.nome)
            .join(', ');

        // Mensagem de confirmação
        document.getElementById('mensagem-doacao')
            .innerHTML = `
                <strong>Solicitação realizada!</strong><br><br>

                Obrigado, ${nome}!<br>

                Perucas solicitadas: ${produtos}<br>

                Forma de recebimento:
                ${entrega === 'ponto'
                    ? 'Ponto de coleta'
                    : 'Entrega'}<br>

                Localização: ${localizacao}<br>

                Contato: ${contato}
            `;

        // Limpa carrinho
        carrinho = [];

        total = 0;

        atualizarInterfaceCarrinho();

        // Limpa campos
        this.reset();
    });

