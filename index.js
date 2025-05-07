// Seletores
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const lista = document.getElementById("lista");
const overlay = document.getElementById("overlay");
const criarTarefa = document.getElementById("criarTarefa");
const busca = document.getElementById("busca");

// Modal
function abrirModal() {
  overlay.classList.add("active");
  criarTarefa.classList.add("active");
}

function fecharModal() {
  overlay.classList.remove("active");
  criarTarefa.classList.remove("active");
}

// Buscar tarefas
function buscarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  inserirTarefas(tarefas);
}

// Inserir tarefas na tela
function inserirTarefas(tarefas) {
  lista.innerHTML = "";

  if (tarefas.length === 0) {
    lista.innerHTML = "<h6>Nenhuma tarefa registrada</h6>";
    return;
  }

  tarefas.forEach(tarefa => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h5>${tarefa.titulo}</h5>
      <p>${tarefa.descricao}</p>
      <div class="t">
        <box-icon name='trash-alt' onclick="deletarTarefa(${tarefa.id})"></box-icon>
      </div>
    `;
    lista.appendChild(li);
  });
}

// Criar nova tarefa
function novaTarefa(event) {
  event.preventDefault();

  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  const nova = {
    id: Date.now(),
    titulo: titulo.value.trim(),
    descricao: descricao.value.trim()
  };

  if (nova.titulo && nova.descricao) {
    tarefas.push(nova);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    fecharModal();
    buscarTarefas();
    document.querySelector("#criarTarefa form").reset();
  } else {
    alert("Preencha todos os campos!");
  }
}

// Deletar tarefa
function deletarTarefa(id) {
  let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas = tarefas.filter(t => t.id !== id);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  buscarTarefas();
}

// Pesquisar tarefas
function pesquisarTarefa() {
  const termo = busca.value.toLowerCase();
  const itens = document.querySelectorAll("#lista li");

  itens.forEach(item => {
    const titulo = item.querySelector("h5").innerText.toLowerCase();
    item.classList.toggle("oculto", !titulo.includes(termo));
  });
}

// Inicializar
buscarTarefas();
