const BingoCaller = (function () {
  let Game;

  let numerosCantados = [];
  let $numberBallWrapper = document.querySelector("#numberBallWrapper");
  let $numbersHistory = document.querySelector("#numbersHistory");
  let $numbersContainer = $numbersHistory.querySelector("#numbersContainer");
  let $seeHistoryBallsBtn = document.querySelector("#seeHistoryBallsBtn");
  let $close_history_btn = document.querySelector("#close_history_btn");
  let $resetSection = document.querySelector("#reset");
  let $bingoCallerSection = document.querySelector("#bingo_caller");
  let $overlay = document.querySelector("#overlay");

  function drawNumeroCantado() {
    Sounds.play("new_ball");
    let randomNumber = generateRandomNumber(1, 91);

    while (!canAddNumero(randomNumber) && numerosCantados.length != 90) {
      randomNumber = generateRandomNumber(1, 91);
    }
    if (numerosCantados.length == 90) {
      $numberBallWrapper.innerHTML =
        "<div class='noMoreNumbers'><i class='fa-regular fa-face-smile'></i></div>";
    } else {
      numerosCantados.push(randomNumber);
      Game.addCalledBall(randomNumber);
      let newNumberBall = "<div class='numberBall'>" + randomNumber + "</div>";
      $numberBallWrapper.innerHTML = newNumberBall;
      $numbersContainer.innerHTML += newNumberBall;
      $numbersContainer.scrollTop = $numbersContainer.scrollHeight;
      socket.emit("newNumber", randomNumber);
    }
  }

  function canAddNumero(n) {
    return !numerosCantados.includes(n);
  }

  $overlay.addEventListener("pointerdown", backToGame);

  function backToGame() {
    if ($numbersHistory.classList.contains("roll-left")) {
      toggleOverlay();
      $numbersHistory.classList.toggle("roll-left");
    }
  }

  const cantarNum = document.querySelector(".newNumberBtn");
  cantarNum.addEventListener("click", drawNumeroCantado);

  const BingoCaller = {};

  BingoCaller.switchON = function () {
    if (
      $resetSection.classList.contains("hide") &&
      $bingoCallerSection.classList.contains("hide")
    ) {
      $resetSection.classList.remove("hide");
      $bingoCallerSection.classList.remove("hide");
    }
  };

  BingoCaller.switchOFF = function () {
    if (
      !$resetSection.classList.contains("hide") &&
      !$bingoCallerSection.classList.contains("hide")
    ) {
      $resetSection.classList.add("hide");
      $bingoCallerSection.classList.add("hide");
    }
  };

  BingoCaller.setup = function (_game) {
    this.switchON();
    Game = _game;
    $seeHistoryBallsBtn.addEventListener(
      "pointerdown",
      BingoCaller.toggleHistory
    );
    $close_history_btn.addEventListener(
      "pointerdown",
      BingoCaller.toggleHistory
    );
  };

  BingoCaller.resetNumbers = function () {
    Sounds.play("new_ball");
    numerosCantados = [];
    $numberBallWrapper.innerHTML = "";
    $numbersContainer.innerHTML = "";
  };

  BingoCaller.toggleHistory = function () {
    toggleOverlay();
    $numbersHistory.classList.toggle("roll-left");
  };

  BingoCaller.getNewNumber = drawNumeroCantado;

  return BingoCaller;
})();
