
let carrinho = [];
let total = 0;

// Abre e fecha a barra lateral do carrinho
function toggleCarrinho() {
    const sidebar = document.getElementById('sidebar-carrinho');
    sidebar.classList.toggle('open');
}

// Adiciona o produto selecionado ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;
    atualizarInterfaceCarrinho();
}

// Atualiza o contador e a lista do carrinho
function atualizarInterfaceCarrinho() {
    document.getElementById('cart-count').innerText =
        carrinho.length;

    const containerItens =
        document.getElementById('itens-carrinho');

    if (carrinho.length === 0) {
        containerItens.innerHTML =
            '<p style="padding: 20px; color: #777;">Seu carrinho está vazio.</p>';
    } else {
        containerItens.innerHTML = '';

        carrinho.forEach((item) => {
            const div = document.createElement('div');
            div.classList.add('cart-item');

            div.innerHTML = `
                <span>${item.nome}</span>
                <strong>R$ ${item.preco.toFixed(2).replace('.', ',')}</strong>
            `;

            containerItens.appendChild(div);
        });
    }

    document.getElementById('total-carrinho').innerText =
        `R$ ${total.toFixed(2).replace('.', ',')}`;
}


// ABRIR FORMULÁRIO DE DOAÇÃO

function abrirFormularioDoacao() {

    if (carrinho.length === 0) {
        alert("Selecione uma peruca antes de continuar!");
        return;
    }

    // Esconde a mensagem da solicitação anterior
    document.getElementById('mensagem-doacao')
        .innerHTML = '';

    // Abre o formulário
    document.getElementById('modal-doacao')
        .style.display = 'flex';

    // Fecha o carrinho
    document.getElementById('sidebar-carrinho')
        .classList.remove('open');
}



// FECHAR FORMULÁRIO
function fecharFormularioDoacao() {
    document.getElementById('modal-doacao').style.display = 'none';
}


// CONFIRMAR SOLICITAÇÃO
document.getElementById('form-doacao')
    .addEventListener('submit', function(event) {

        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const contato = document.getElementById('contato').value;
        const entrega = document.getElementById('entrega').value;
        const localizacao = document.getElementById('localizacao').value;

        // Lista das perucas escolhidas
        const produtos = carrinho.map(item => item.nome).join(', ');

        const mensagem = document.getElementById('mensagem-doacao');

        mensagem.innerHTML = `
            <strong>Solicitação realizada!</strong><br><br>
            Obrigado, ${nome}!<br>
            Perucas solicitadas: ${produtos}<br>
            Forma de recebimento: ${entrega === 'ponto' ? 'Ponto de coleta' : 'Entrega'}<br>
            Localização: ${localizacao}<br>
            Contato: ${contato}
        `;

        // Limpa o carrinho
        carrinho = [];
        total = 0;
        atualizarInterfaceCarrinho();

        // Limpa o formulário
        this.reset();
    });
