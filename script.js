//Referencia os elementos que serão manipulador no DOM no arquivo HTML
const html = document.querySelector("html");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnDescansoCurto = document.querySelector(".app__card-button--curto");
const btnDescansoLongo = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button"); //recupera mais de um elemento por vez.
const musicaFocoInput = document.querySelector("#alternar-musica");
const btnStartPause = document.querySelector("#start-pause");
const btnIniciarOuPausar = document.querySelector("#start-pause span");
const alteraIconePlayPause = document.querySelector("#start-pause img");
const tempoNaTela = document.querySelector("#timer");

// Objects
const musica = new Audio("./sons/luna-rise-part-one.mp3");
const audioPlay = new Audio("./sons/play.wav");
const audioPause = new Audio("./sons/pause.mp3");
const audioStopTemp = new Audio("./sons/beep.mp3");

//CRIANDO TEMPORIZADOR
let tempoDecorridoEmSegundos = 1500;
let intervalId = null;

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

//EVENTOS DE BOTÃO
btnFoco.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  btnFoco.classList.add("active");
});

btnDescansoCurto.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  btnDescansoCurto.classList.add("active");
});

btnDescansoLongo.addEventListener("click", function () {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  btnDescansoLongo.classList.add("active");
});

//FUNÇÕES
function alterarContexto(contexto) {
  mostrarTempo();
  //Remove os actives que não são relacionado ao contexto de enfoque.
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade, <br> <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;

    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada? <br> <strong class="app__title-strong">Faça uma pausa curta!.</strong>`;
      break;

    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superficie.<br> <strong class="app__title-strong">Faça uma pausa longa!.</strong>`;
      break;

    default:
      break;
  }
}

//Realiza a contagem regressiva do tempo declarado anteriomente
const contagemRegressiva = () => {
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();

  //Parada do temporizador
  if (tempoDecorridoEmSegundos <= 0) {
    audioStopTemp.play(); //som de play do temporizador
    zerar();
    alert("Temporizador finalizado");
    audioStopTemp.pause();
    return;
  }
};

//Inicia o temporizador através do setInterval
function iniciarOuPausar() {
  //Pausa o temporizador no meio da contagem caso seja diferente de null
  if (intervalId) {
    audioPause.play(); //som de pausa do temporizador
    zerar();
    return;
  }
  audioPlay.play();
  intervalId = setInterval(contagemRegressiva, 1000);
  btnIniciarOuPausar.textContent = "Pausar";
  alteraIconePlayPause.setAttribute("src", "./imagens/pause.png");
}

// Zera o intervalId, parando a contagem mesmo sendo menor que zero (contagemRegressica())
function zerar() {
  clearInterval(intervalId);
  btnIniciarOuPausar.textContent = "Começar";
  alteraIconePlayPause.setAttribute("src", "./imagens/play_arrow.png");
  intervalId = null;

}

function mostrarTempo() {
//O método setInterval sempre espera dois parametros, onde o primeiro é responsavel pelo método a sempre ser executado e o segundo valor representa quão quanto tempo vc deseja que seja executado.

  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

btnStartPause.addEventListener("click", iniciarOuPausar);
//Função no scopo global, para ser sempre exibida,
mostrarTempo();
