function abrirModal(){
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

function fecharModal(){
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

function buscarTarefas(){
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
    inserirTarefas(tarefasSalvas);
}


    function inserirTarefas(listaDeTarefas){
        if(listaDeTarefas.length > 0){
            lista.innerHTML = ""
            listaDeTarefas.map(tarefa => {
                lista.innerHTML += `
                <li>
                    <h5>${tarefa.titulo}</h5>
                    <p>${tarefa.descricao}</p>
                    <div class="t"> 
                        <box-icon name='trash-alt' onclick="deletarTarefa(${tarefa.id})"></box-icon> 
                    </div>
                </li>
                `
            })
        }
    }

function novaTarefa(){
    event.preventDefault();
    
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    
            document.querySelector("#criarTarefa form").reset();
}
    

function deletarTarefa(id){
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        tarefas = tarefas.filter(tarefa => tarefa.id !== id);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        buscarTarefas();
}
    

function pesquisarTarefa(){
    let lis = document.querySelectorAll("ul li");
    console.log(lis);
    if(busca.value.length > 0){
        lis.forEach(li => {
            if(!li.children[0].innerText.includes(busca.value)){
                li.classList.add('oculto');
            }else{
                li.classList.remove('oculto');
            }
        })   
    } else {
        lis.forEach(li => {
            li.classList.remove('oculto');
        })   
    }
}