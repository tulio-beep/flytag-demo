custom_console = document.getElementById('console')

var lastchar = new Array(10)

document.addEventListener('keydown', e =>{
    const key = e.key
    if(key=="Enter"){
        custom_console.innerHTML += "<br/>"
        window.electron.sendDataRequest(lastchar.join(''))
    }else if(key.length==1){
        lastchar.shift()
        lastchar.push(key)
        custom_console.innerHTML += key 
    }
})

var cur_local
var escaneados = {}

window.electron.onDataResponse((event, data_) => {  
    if(data_!=undefined){
        enderecar(data_)
    }
})

enderecar = (leitura) => {
    console.log(leitura)
    if(leitura.TIPO=="LOCAL"){
        if(cur_local!=undefined){
            document.getElementById(cur_local).style.backgroundColor = "#fff"
        }
        cur_local = leitura.NOME
        document.getElementById(cur_local).style.backgroundColor = "#b3ccff"
    }else{
        if(cur_local==undefined){
            alert("Primeiro escaneie uma localização")
        }else{
            if(escaneados[lastchar.join('')]==undefined){
                escaneados[lastchar.join('')] = cur_local;
                contagem(leitura.NOME)
            }else{
                limpar(escaneados[lastchar.join('')],leitura.NOME)
                escaneados[lastchar.join('')] = cur_local;
            }
            escrever(cur_local,leitura.NOME)
        }
    }
}

escrever = (local, nome) => {
    document.getElementById(local).innerHTML += `<span class="${nome}">${nome}</span><br/>`
}

var text;

limpar = (local,nome)=>{
    text = document.getElementById(local).innerHTML
    text = text.replace(`<span class="${nome}">${nome}</span><br>`,"")
    document.getElementById(local).innerHTML = text
}

contagem = (item) => {
    if(document.getElementById(item)!=undefined){
        cont = Number(document.getElementById(item).innerText)+1
        document.getElementById(item).innerText = cont
    }else{
        let item_span = document.createElement('p')
        item_span.innerHTML = `${item}:<span id="${item}">1</span>`
        document.getElementById('cont').appendChild(item_span)
    }
}

function highlightClasses() {
    const highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(el => {
      el.classList.remove('highlight');
    });

    const filtro = document.getElementById('filtro').value.trim();

    if (filtro) {
      const elementsToHighlight = document.querySelectorAll('.' + filtro);
      elementsToHighlight.forEach(el => {
        el.classList.add('highlight');
      });
    }
  }