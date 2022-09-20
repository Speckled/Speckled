const jogadas = document.getElementById('jogadas')
const tempo = document.getElementById('tempo')
const iniciar = document.getElementById('iniciar')
const tabuleiro = document.querySelector('.tabuleiroFrente')
const tabuleiroTela = document.querySelector('.tabuleiro')
const tabuleiroVerso = document.querySelectorAll('.tabuleiroVerso')
const entrada = document.querySelector('.inicial')
const tela = document.querySelector('.tela')
let cartas
let intervalo
let carta1 = false
let carta1Val = ""
let carta2 = false
let carta2Val = ""

//cartas do jogo
var matrizCartas = []
const cartasVal = [
    {valor:'desenvolvimento', imagem:'desenvolvimento_bonatto.jpg'},
    {valor:'educacao', imagem:'educacao_bonatto.jpg'},
    {valor:'bonatto', imagem:'bonatto.jpg'},
    {valor:'saude', imagem:'saude_bonatto.jpg'},
    {valor:'seguranca', imagem:'seguranca_bonatto.jpg'},
    {valor:'transporte', imagem:'transporte_bonatto.jpg'}
]
//timer
let segundos = 0,
    minutos = 0;
const timer = () => {
    segundos += 1;
    //minutos
    if (segundos >= 60) {
        minutos += 1;
        segundos = 0;
    }
    //formatação das cartas
    let segundosVal = segundos < 10 ? `0${segundos}` : segundos;
    let minutoVal = minutos < 10 ? `0${minutos}` : minutos;
    tempo.innerHTML = `<span>Tempo: </span>${minutoVal}:${segundosVal}`;
}

// //jogadas
// let jogadasCount = 0,
//     acertosCount = 0
// const contadorJogadas = () => {
//     jogadasCount +=1
//     jogadas.innerHTML = `<span>Jogadas: </span>${jogadasCount}`
// }

const inicioJogo = ()=>{
    //matriz de cartas
    tabuleiro.innerHTML=""
    matrizCartas=[...cartasVal,...cartasVal]
    //embaralhando
    matrizCartas.sort(()=>Math.random()-0.5)
    //colocando as cartas no tabuleiro
    for(let i=0;i<12;i++){
        tabuleiro.innerHTML+=`
        <div class="carta" value="${matrizCartas[i].valor}">
            <div class="frente">
                <img src="logo_bonatto.jpg" height=100% alt="" />
            </div>
            <div class="verso">
                <img class="logo" src="${matrizCartas[i].imagem}" height=100% alt="" />
            </div>
        </div>
        ` 
    }
    tabuleiro.style.gridTemplateColumns = `repeat(3,auto)`;
    //objetos cartas e logicas
    cartas = document.querySelectorAll(".carta")
    cartas.forEach((e)=>{
        e.addEventListener("click",()=>{
            //se já estiver certa ignora tudo
            if(!e.classList.contains("correta")){
                e.classList.add("virada")
                //valor padrão primeira carta é falso 
                if(!carta1){
                    carta1 = e
                    carta1Val = e.getAttribute("value")
                }else{//segunda carta
                    // contadorJogadas()
                    carta2 = e
                    carta2Val = e.getAttribute("value")
                    //cartas iguais
                    if(carta1Val==carta2Val){
                        document.querySelector(`.${carta1Val}`).classList.remove('hide')
                        let delay = setTimeout(()=>{
                            tabuleiroTela.classList.add('virado')                        
                        },900)
                        carta1.classList.add('correta')
                        carta2.classList.add('correta')
                        acertosCount+=1
                        carta1 = false
                        carta2 = false  
                        if(acertosCount==6){
                            console.log('fim do jogo');
                            // fimJogo()
                        }
                    }else{//cartas diferentes
                        let [carta1Temp, carta2Temp] = [carta1,carta2]
                        let delay = setTimeout(()=>{
                            carta1Temp.classList.remove('virada')
                            carta2Temp.classList.remove('virada')
                        },900)
                        carta1 = false
                        carta2 = false                    
                    }
                }
            }
        })
    })
}
//evento de retorno do verso do tabuleiro
tabuleiroVerso.forEach((e)=>{
    e.addEventListener('click',()=>{
        let delay = setTimeout(()=>{
            e.classList.add('hide')
        },100)
        tabuleiroTela.classList.remove('virado')
    })
})


iniciar.addEventListener('click',()=>{
    segundos = 0
    minutos = 0
    jogadasCount = 0
    acertosCount = 0 
    entrada.classList.add('hide')
    tela.classList.remove('hide')
    // jogadas.innerHTML = `<span>Jogadas: <span/>${jogadasCount}`
    inicioJogo()
})



;

