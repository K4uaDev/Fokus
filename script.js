const html = document.querySelector('html');
// botões 
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const startPauseBt = document.querySelector('#start-pause');
const botoes = document.querySelectorAll('.app__card-button');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
// textos
const titulo = document.querySelector('.app__title');
// imagens
const banner = document.querySelector('.app__image');
const imgBt = document.querySelector('.app__card-primary-butto-icon')
const pausarImg = "imagens/pause.png";
const iniciarImg = "imagens/play_arrow.png";
// musica
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somComecar = new Audio('/sons/play.wav');
const somPause = new Audio('/sons/pause.mp3');
const somFinish = new Audio('sons/beep.mp3');
// temporizador
let tempoNaTela = document.querySelector('.app__card-timer');
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true;
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused ) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto(`foco`);
    focoBt.classList.add('active');

});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto(`descanso-curto`);
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto(`descanso-longo`);
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostraTempo();
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML=`
             Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case "descanso-curto":
            titulo.innerHTML=`
             Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
             break;
        
        case "descanso-longo":
            titulo.innerHTML=`
             Hora de voltar para a superficie. <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {       
        // somFinish.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    } 
    tempoDecorridoEmSegundos -= 1;
    mostraTempo();
}
startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        imgBt.setAttribute('src', 'imagens/play_arrow.png');
        somPause.play();
        zerar();
        return;
    }
    somComecar.play();
    imgBt.setAttribute('src', 'imagens/pause.png');
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent='Pausar';
    imgBt.appendChild(pausarImagem);
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent='Começar';
    intervaloId = null;
    
}

function mostraTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}
mostraTempo();