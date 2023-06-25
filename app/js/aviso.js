const Aviso = (function () {
  const Aviso = {};
  const $cartel = document.querySelector("#cartel");
  const $aviso = document.querySelector("#aviso");

  function animarCartel() {
    $cartel.classList.add("roll-down");
    setTimeout(() => {
      $cartel.classList.remove("roll-down");
    }, 3000);
  }

  function animarCartelBingo() {
    $cartel.classList.add("BINGO");
    setTimeout(() => {
      $cartel.classList.remove("BINGO");
    }, 3000);
  }

  Aviso.bingoCallerMode = function () {
    $aviso.innerHTML = "¡Ahora vos cantas los números!";
    animarCartel();
  };

  Aviso.playerMode = function () {
    $aviso.innerHTML = "¡Ahora NO cantas los números!";
    animarCartel();
  };

  Aviso.Bingo = function () {
    $aviso.innerHTML = "¡ ¡ ¡  B  I  N  G  O  ! ! !";
    animarCartelBingo();
  };

  Aviso.linea = function () {
    $aviso.innerHTML = "¡ L I N E A !";
    animarCartel();
  };

  Aviso.resetNumbers = function () {
    $aviso.innerHTML = "¡Comencemos de nuevo!";
    animarCartel();
  };

  return Aviso;
})();
