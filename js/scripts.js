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
