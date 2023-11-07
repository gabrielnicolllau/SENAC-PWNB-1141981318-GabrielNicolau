// Declaração de variáveis
const nome = document.querySelector("#nome");
const sobrenome = document.querySelector("#sobrenome");
const tipoCliente = document.querySelector("#tipo-cliente");
const dataNascimento = document.querySelector("#data-nascimento");
const cep = document.querySelector("#cep");
const cidade = document.querySelector("#cidade");
const endereco = document.querySelector("#endereco");
const numero = document.querySelector("#numero");

// Regex para validar o nome
const regNome = new RegExp("[A-z ]{6,100}");

// Regex para validar o sobrenome
const regSobrenome = new RegExp("[A-z ]{2,100}");

// Regex para validar o CEP
const regCep = new RegExp("[0-9]{5}-[0-9]{3}");

// Regex para validar o tipo de cliente
const regTipoCliente = new RegExp("^(ouro|prata|bronze)$");

// Regex para validar a data de nascimento
const regDataNascimento = /^(19\d{2}|20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

// Função para validar o formulário
function validar() {
    // Valida o nome
    if (!regNome.test(nome.value)) {
        alert("Informe um nome completo!");
        nome.focus();
        return false;
    }

    // Valida o sobrenome
    if (!regSobrenome.test(sobrenome.value)) {
        alert("Informe um sobrenome!");
        sobrenome.focus();
        return false;
    }

    // Valida o CEP
    if (!regCep.test(cep.value)) {
        alert("Informe um CEP válido!");
        cep.focus();
        return false;
    }

    // Valida o tipo de cliente
    if (!regTipoCliente.test(tipoCliente.value)) {
        alert("Selecione um tipo de cliente válido!");
        tipoCliente.focus();
        return false;
    }

    // Valida a data de nascimento
    if (!regDataNascimento.test(dataNascimento.value)) {
        alert("Informe uma data de nascimento válida: AAAA-MM-DD!");
        dataNascimento.focus();
        return false;
    }

    // Se todas as validações forem aprovadas, retorna true
    return true;
}

// Array para armazenar os clientes cadastrados
const clientes = [];
let clienteIndex = -1;

// Função para adicionar um cliente à lista
function adicionarCliente(cliente) {
  if (clienteIndex === -1) {
    clientes.push(cliente);
  } else {
    clientes[clienteIndex] = cliente;
    clienteIndex = -1;
    document.getElementById("alterar").style.display = "none";
    document.getElementById("salvar").style.display = "block";
  }
  atualizarListaClientes();
}

// Função para criar e adicionar um botão "Excluir" a um cliente na lista
function adicionarBotaoExcluir(cliente, index) {
  const listaClientes = document.getElementById("clientes");
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
    <button type="button" onclick="preencherFormulario(${index})">Editar</button>
    <button type="button" onclick="excluirCliente(${index})">Excluir</button>
  `;
  listaClientes.appendChild(itemLista);
}

// Função para excluir um cliente da lista
function excluirCliente(index) {
  clientes.splice(index, 1);
  atualizarListaClientes();
}

// Função para preencher o formulário com os dados de um cliente
function preencherFormulario(index) {
  const cliente = clientes[index];
  document.getElementById("nome").value = cliente.nome;
  document.getElementById("sobrenome").value = cliente.sobrenome;
  document.getElementById("tipo-cliente").value = cliente.tipoCliente;
  document.getElementById("data-nascimento").value = cliente.dataNascimento;
  document.getElementById("cep").value = cliente.cep;
  document.getElementById("cidade").value = cliente.cidade;
  document.getElementById("endereco").value = cliente.endereco;
  document.getElementById("numero").value = cliente.numero;
  clienteIndex = index;
  document.getElementById("alterar").style.display = "block";
  document.getElementById("salvar").style.display = "none";
}

// Função para atualizar a lista de clientes na página
function atualizarListaClientes() {
  const listaClientes = document.getElementById("clientes");
  listaClientes.innerHTML = "";
  clientes.forEach((cliente, index) => {
    adicionarBotaoExcluir(cliente, index);
  });
}

// Função para salvar um cliente
function salvarCliente() {
  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const tipoCliente = document.getElementById("tipo-cliente").value;
  const dataNascimento = document.getElementById("data-nascimento").value;
  const cep = document.getElementById("cep").value;
  const cidade = document.getElementById("cidade").value;
  const endereco = document.getElementById("endereco").value;
  const numero = document.getElementById("numero").value;

  if (nome && sobrenome && tipoCliente && dataNascimento && cep && cidade && endereco && numero) {
    adicionarCliente({
      nome,
      sobrenome,
      tipoCliente,
      dataNascimento,
      cep,
      cidade,
      endereco,
      numero,
    });
    document.getElementById("cliente-form").reset();
  } else {
    alert("Preencha todos os campos corretamente.");
  }
}

// Função para alterar um cliente
function alterarCliente() {
  const nome = document.getElementById("nome").value;
  const sobrenome = document.getElementById("sobrenome").value;
  const tipoCliente = document.getElementById("tipo-cliente").value;
  const dataNascimento = document.getElementById("data-nascimento").value;
  const cep = document.getElementById("cep").value;
  const cidade = document.getElementById("cidade").value;
  const endereco = document.getElementById("endereco").value;
  const numero = document.getElementById("numero").value;

  if (nome && sobrenome && tipoCliente && dataNascimento && cep && cidade && endereco && numero) {
    adicionarCliente({
      nome,
      sobrenome,
      tipoCliente,
      dataNascimento,
      cep,
      cidade,
      endereco,
      numero,
    });
    document.getElementById("cliente-form").reset();
  } else {
    alert("Preencha todos os campos corretamente.");
  }
}

function limparCampos() {
  document.getElementById("cliente-form").reset();
  clienteIndex = -1;
  document.getElementById("alterar").style.display = "none";
  document.getElementById("salvar").style.display = "block";
}

document.getElementById("limpar").addEventListener("click", limparCampos);
