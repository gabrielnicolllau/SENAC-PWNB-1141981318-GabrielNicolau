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
        <button type="button" onclick="excluirClienteConsulta(${index})">Excluir</button><br><br>
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

// carregar cliente
window.onload = function () {
    carregarClientes(); // Carrega a lista de clientes quando a página é carregada
};