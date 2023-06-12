const BingoCaller = (function () {
  let Game;

  let numerosCantados = [];
  let $numberBallWrapper = document.querySelector("#numberBallWrapper");
  let $numbersHistory = document.querySelector("#numbersHistory");
  let $numbersContainer = $numbersHistory.querySelector("#numbersContainer")
  let $seeHistoryBallsBtn = document.querySelector("#seeHistoryBallsBtn");
  let $close_history_btn = document.querySelector("#close_history_btn");

  function drawNumeroCantado() {
    Sounds.play("new_ball");
    let randomNumber = generateRandomNumber(1, 91);
    
    while (!canAddNumero(randomNumber) && numerosCantados.length != 90) {
      randomNumber = generateRandomNumber(1, 91);
    }
    if (numerosCantados.length == 90) {
      $numberBallWrapper.innerHTML = "<div class='noMoreNumbers'><i class='fa-regular fa-face-smile'></i></div>";
    } else {
      numerosCantados.push(randomNumber);
      Game.addCalledBall(randomNumber)
      let newNumberBall = "<div class='numberBall'>" + randomNumber + "</div>"
      $numberBallWrapper.innerHTML = newNumberBall;
      $numbersContainer.innerHTML += newNumberBall;
    }
  }
  
  function canAddNumero(n) {
    return !numerosCantados.includes(n);
  }

  const cantarNum = document.querySelector(".newNumberBtn");
  cantarNum.addEventListener("click", drawNumeroCantado);
  
  const BingoCaller = {}

  BingoCaller.setup = function (_game) {
    Game = _game
    document.querySelector("#bingo_caller").classList.remove('hide')

    $seeHistoryBallsBtn.addEventListener('pointerdown', BingoCaller.toggleHistory);
    $close_history_btn.addEventListener('pointerdown', BingoCaller.toggleHistory);
  }

  BingoCaller.toggleHistory = function () {
    toggleOverlay()
    $numbersHistory.classList.toggle('roll-left')
  }

  BingoCaller.getNewNumber = drawNumeroCantado

  return BingoCaller;
})()

