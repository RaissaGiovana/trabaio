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

// Atualiza o contador de itens e a lista visual do carrinho
function atualizarInterfaceCarrinho() {
    // Atualiza contador do menu
    document.getElementById('cart-count').innerText = carrinho.length;

    // Atualiza lista de itens na sidebar
    const containerItens = document.getElementById('itens-carrinho');
    if (carrinho.length === 0) {
        containerItens.innerHTML = '<p style="padding: 20px; color: #777;">Seu carrinho está vazio.</p>';
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

    // Atualiza o valor total
    document.getElementById('total-carrinho').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}
