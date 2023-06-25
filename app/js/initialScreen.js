const InitialScreen = {
  init: (Game) => {
    const $yesBtn = document.querySelector("#initial_screen_yes_btn");
    const $noBtn = document.querySelector("#initial_screen_no_btn");
    $yesBtn.addEventListener("click", setGameMode.bind(null, true));
    $noBtn.addEventListener("click", setGameMode.bind(null, false));

    function setGameMode(isBingoCaller) {
      Game.setGameMode(
        isBingoCaller ? Game.MODE.BINGO_CALLER : Game.MODE.PLAYER
      );
      socket.emit("joinGame", playerName.value);
      Game.start();

      let logo = document.querySelector("#logo");
      logo.classList.add("logo");
    }
  },
};
