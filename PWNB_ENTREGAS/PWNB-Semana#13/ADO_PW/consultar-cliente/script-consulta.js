// Função para carregar os clientes ao carregar a página
function carregarClientes() {
    const listaClientes = document.getElementById("clientes");
    listaClientes.innerHTML = ""; // Limpa a lista antes de carregar os novos clientes

    let clientesSalvos = localStorage.getItem('clientes');
    if (!clientesSalvos) {
        clientesSalvos = [];
    } else {
        clientesSalvos = JSON.parse(clientesSalvos);
    }

    clientesSalvos.forEach((cliente, index) => {
        const itemLista = document.createElement("li");
        itemLista.innerHTML = `
        Nome: ${cliente.nome}<br>
        Sobrenome: ${cliente.sobrenome}<br>
        Tipo de Cliente: ${cliente.tipoCliente}<br>
        Data de Nascimento: ${cliente.dataNascimento}<br>
        CEP: ${cliente.cep}<br>
        Cidade: ${cliente.cidade}<br>
        Endereço: ${cliente.endereco}<br>
        Número: ${cliente.numero}<br>
        <button type="button" onclick="editarCliente(${index})">Editar</button>
        <button type="button" onclick="excluirClienteConsulta(${index})">Excluir</button>
      `;
        listaClientes.appendChild(itemLista);
    });
}


// Função para excluir um cliente da localStorage e atualizar a lista
function excluirClienteConsulta(index) {
    let clientesSalvos = localStorage.getItem('clientes');
    if (!clientesSalvos) {
        clientesSalvos = [];
    } else {
        clientesSalvos = JSON.parse(clientesSalvos);
    }

    clientesSalvos.splice(index, 1); // Remove o cliente da lista
    localStorage.setItem('clientes', JSON.stringify(clientesSalvos)); // Atualiza a lista na localStorage
    carregarClientes(); // Recarrega a lista na página
}

// Verifica se há um cliente para editar ao carregar a página
//window.onload = function () {
//   const clienteIndex = localStorage.getItem('clienteIndex');
//  if (clienteIndex !== null) {
//     localStorage.removeItem('clienteIndex'); // Remove o índice do cliente da localStorage
//    editarCliente(clienteIndex); // Redireciona para a página de cadastro com o índice do cliente a ser editado
//} else {
//    carregarClientes(); // Carrega a lista normalmente se não houver cliente para editar
//}
//};

function editarCliente(index) {
    if (clientes && clientes.length > index && index >= 0) {
        const cliente = clientes[index];
        const listaClientes = document.getElementById("clientes");

        // Criar campos de edição dinamicamente
        const camposEdicao = document.createElement("div");
        camposEdicao.innerHTML = `
            <input type="text" value="${cliente.nome}">
            <input type="text" value="${cliente.sobrenome}">
            <input type="text" value="${cliente.tipoCliente}">
            <input type="date" value="${cliente.dataNascimento}">
            <input type="text" value="${cliente.cep}">
            <input type="text" value="${cliente.cidade}">
            <input type="text" value="${cliente.endereco}">
            <input type="number" value="${cliente.numero}">
            <button onclick="salvarEdicao(${index})">Salvar</button>
            <button onclick="cancelarEdicao(${index})">Cancelar</button>
        `;

        // Substituir o item da lista pelo formulário de edição
        const itemLista = listaClientes.childNodes[index];
        itemLista.innerHTML = '';
        itemLista.appendChild(camposEdicao);
    } else {
        console.error('Índice do cliente fora do intervalo válido.');
    }
}


function salvarEdicao(index) {
    const listaClientes = document.getElementById("clientes");
    const camposEdicao = listaClientes.childNodes[index].querySelector('div');

    // Coletar os novos valores dos campos de edição
    const novoNome = camposEdicao.querySelector('input:nth-child(1)').value;
    const novoSobrenome = camposEdicao.querySelector('input:nth-child(2)').value;
    const novoTipoCliente = camposEdicao.querySelector('input:nth-child(3)').value;
    const novaDataNascimento = camposEdicao.querySelector('input:nth-child(4)').value;
    const novoCep = camposEdicao.querySelector('input:nth-child(5)').value;
    const novaCidade = camposEdicao.querySelector('input:nth-child(6)').value;
    const novoEndereco = camposEdicao.querySelector('input:nth-child(7)').value;
    const novoNumero = camposEdicao.querySelector('input:nth-child(8)').value;

    // Atualize os dados do cliente no array 'clientes'
    clientes[index].nome = novoNome;
    clientes[index].sobrenome = novoSobrenome;
    clientes[index].tipoCliente = novoTipoCliente;
    clientes[index].dataNascimento = novaDataNascimento;
    clientes[index].cep = novoCep;
    clientes[index].cidade = novaCidade;
    clientes[index].endereco = novoEndereco;
    clientes[index].numero = novoNumero;

    // Atualize visualmente a lista de clientes
    const novoItemLista = document.createElement("li");
    novoItemLista.innerHTML = `
        Nome: ${novoNome}<br>
        Sobrenome: ${novoSobrenome}<br>
        Tipo de Cliente: ${novoTipoCliente}<br>
        Data de Nascimento: ${novaDataNascimento}<br>
        CEP: ${novoCep}<br>
        Cidade: ${novaCidade}<br>
        Endereço: ${novoEndereco}<br>
        Número: ${novoNumero}<br>
        <button type="button" onclick="editarCliente(${index})">Editar</button>
        <button type="button" onclick="excluirCliente(${index})">Excluir</button>
    `;
    listaClientes.replaceChild(novoItemLista, camposEdicao);
}

// Verifica se há um cliente para editar ao carregar a página
window.onload = function () {
    const clienteIndex = localStorage.getItem('clienteIndex');
    if (clienteIndex !== null) {
        localStorage.removeItem('clienteIndex'); // Remove o índice do cliente da localStorage
        editarCliente(clienteIndex); // Redireciona para a página de cadastro com o índice do cliente a ser editado
    } else {
        carregarClientes(); // Carrega a lista normalmente se não houver cliente para editar
    }
};