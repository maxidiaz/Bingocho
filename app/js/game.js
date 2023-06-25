const Game = (function () {

  let calledBalls = [];

  const Game = function () {
    this.currentMode;
  };

  Game.prototype.MODE = {
    BINGO_CALLER: "bingo_caller",
    PLAYER: "player",
  };

  Game.prototype.setGameMode = function (mode) {
    this.currentMode = mode;
  };

  Game.prototype.setSettings = function (_settings) {
    this.Settings = _settings;
  };

  Game.prototype.start = function () {
    this.carton = new Carton(this);
    this.carton.draw();

    if (this.currentMode == this.MODE.PLAYER) {
      BingoCaller.switchOFF()
    }

    if (this.currentMode == this.MODE.BINGO_CALLER) {
      BingoCaller.setup(this);
    }
    this.goTo("game_screen");
  };

  Game.prototype.newCarton = function () {
    this.carton = new Carton(this);
    this.carton.draw();
  };

  Game.prototype.goTo = function (screen, animationClass) {
    document.querySelectorAll("[data-role='screen']").forEach(($screen) => {
      $screen.classList.add("hide");
    });

    let screenToNavigate = document.querySelector("#" + screen);
    screenToNavigate.classList.remove("hide");

    if (animationClass) {
      screenToNavigate.classList.add(animationClass);
    }
  };

  Game.prototype.showSettings = function () {
    this.Settings.show();
  };

  Game.prototype.getCarton = function () {
    return this.carton;
  };

  Game.prototype.addCalledBall = function (_number) {
    calledBalls.push(_number);
  };

  Game.prototype.getCalledBalls = function () {
    return calledBalls;
  };

  return Game;
})();
