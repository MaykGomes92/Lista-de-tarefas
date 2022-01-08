let lista = document.querySelector(".lista");
let inputLi = document.querySelector("#texto");
let btn = document.querySelector("#btn");

function criaLi() {
  const li = document.createElement('li');
  return li;
}

function toqueAdd(){
  let musica = new Audio('audio-adicionar.mp3')
  return musica.play();
}

function toqueApagar(){
  let musica = new Audio('audio-apagar.mp3')
  return musica.play();
}

function limparInput(){
  inputLi.value = '';
  inputLi.focus();
}
function criaBotaoApagar(li){
  li.innerHTML += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerHTML = 'Apagar';
  botaoApagar.setAttribute('class','apagar');
  li.appendChild(botaoApagar) 
}

function criarTarefa(textoInput){
    const li = criaLi();
    li.innerHTML = textoInput;
    lista.classList.add('active')
    lista.appendChild(li)
    criaBotaoApagar(li)
    limparInput()
    salvarTarefas()
}

function salvarTarefas(){
  const totalLi = lista.querySelectorAll('li');
  const arrayDasLi = [];
  console.log(arrayDasLi)
  for(let tarefa of totalLi){
    let textoDaLi = tarefa.innerText;
    textoDaLi = textoDaLi.replace('Apagar','').trim();
    arrayDasLi.push(textoDaLi)
  }
  const passarString = JSON.stringify(arrayDasLi)
  localStorage.setItem("tarefa", passarString)
}

function manterLista(){
  const listaDeTarefas = JSON.parse(localStorage.getItem("tarefa") || '[]')
  for(let tarefa of listaDeTarefas){
    criarTarefa(tarefa)
  }
}

manterLista()


inputLi.addEventListener('keypress',(e)=>{
  if(e.which == 13 && inputLi.value == ''){
    alert('Por favor, digite uma tarefa!')
  } else if (e.which == 13){
    criarTarefa(inputLi.value)
    toqueAdd()
  }
})

document.querySelector('body').addEventListener('click',e=>{
  const el = e.target;
  if(el.classList.contains('apagar')){
    el.parentElement.remove()
    toqueApagar()
    salvarTarefas()
  }
})

btn.addEventListener('click',function(){
  if(inputLi.value == ''){
    alert('Por favor, digite uma tarefa!')
    return;
  } else {
    criarTarefa(inputLi.value)
    toqueAdd()
  }
})
