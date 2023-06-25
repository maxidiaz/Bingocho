const $logo = document.querySelector("#logo");

const playerName = document.querySelector("#playerName");


let contador = 0;

$logo.addEventListener("pointerdown", animar);

function animar() {
  if (contador === 19) {
    Sounds.play("easterEgg");
    $logo.classList.add("easterEgg");
    setTimeout(() => {
      $logo.classList.remove("easterEgg");
      contador = 0;
    }, 7500);
  }
  contador++;
}

function toggleOverlay(_show) {
  const $overlay = document.querySelector("#overlay");

  $overlay.classList.toggle("hide");
  $overlay.style.opacity = 1;
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const game = new Game();
Settings.setup(game);
Sounds.setup(game);
InitialScreen.init(game);

const socket = io();
socket.on("hola", function (data) {
  alert("Hola, desde el server " + data);
});

socket.on("newNumberFromBingoCaller", function (numero) {
 // alert("Se cantó " + numero);
});

socket.on("mentiroso", function(nombreMentiroso){
  alert(nombreMentiroso + " es un mentiroso, no hizo bingocho")
})