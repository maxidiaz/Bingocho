const Carton = (function () {
  let totalNumbers = 15;
  let rows = 3;
  let colums = 9;
  let numbersPerRow = totalNumbers / rows;
  let numerosCarton = [];
  let Game;
  let $carton;

  function addNumberToCarton(cellNumber, row) {
    let col = 0;
    if (cellNumber == 90) {
      col = 8;
    } else {
      col = Math.floor(cellNumber / 10);
    }
    let rowDiv = document.querySelector("#row" + (row + 1));
    let cell = rowDiv.children[col];
    let numero = document.createElement("div");
    numero.innerHTML = cellNumber;
    numero.classList.add("playable");
    numero.classList.add("numero");
    cell.classList.add("playable");
    cell.appendChild(numero);
  }

  function canAddToNumerosCarton(n) {
    let decena = 0;
    if (n == 90) {
      decena = 8;
    } else {
      decena = Math.floor(n / 10);
    }
    let currentRow = Math.floor(numerosCarton.length / numbersPerRow);
    let numerosDeLaDecena = numerosCarton.filter(function (numero) {
      if (decena == 8) {
        return Math.floor(numero / 10) == decena || numero == 90;
      } else {
        return Math.floor(numero / 10) == decena;
      }
    });

    for (
      let cell = currentRow * numbersPerRow;
      cell < numerosCarton.length;
      cell++
    ) {
      let cellDecena = 0;
      if (numerosCarton[cell] == 90) {
        cellDecena = 8;
      } else {
        cellDecena = Math.floor(numerosCarton[cell] / 10);
      }
      if (decena == cellDecena) {
        return false;
      }
    }

    for (let i = 0; i < numerosDeLaDecena.length; i++) {
      if (n < numerosDeLaDecena[i]) {
        return false;
      }
    }

    return !numerosCarton.includes(n) && numerosDeLaDecena.length <= 3;
  }

  function handleCartonClick(event) {
    let currentCell = event.target;
    let currentRow = currentCell.parentNode.parentElement;
    let rowsOfCarton = currentRow.parentElement;
    let rowschildrens = rowsOfCarton.children;
    if (currentCell.classList.contains("numero")) {
      currentCell.classList.toggle("marked");
      Sounds.play("btn_pressed");
    }
    if (
      currentCell.classList.contains("numero") &&
      currentCell.classList.contains("marked")
    ) {
      currentCell.style.backgroundColor = Game.Settings.getMarkerColor();
    } else if (currentCell.classList.contains("numero")) {
      currentCell.style.backgroundColor = "#ffffff";
    }

    if (getMarkedCellsOnLine(event.target) == 5) {
      if (!currentRow.classList.contains("linea")) {
        currentRow.classList.add("linea");
      }
      let bingocho = getFullLinesCount(rowschildrens);
      if (bingocho == 1) {
        Sounds.play("full_line");
        Aviso.linea();
      } else if (bingocho == 3) {
        Sounds.play("win");
        Aviso.Bingo();
        socket.emit("bingo");
      }
    } else if (getMarkedCellsOnLine(event.target) < 5) {
      currentRow.classList.remove("linea");
    }
  }

  function getMarkedCellsOnLine(currentCell) {
    let row = currentCell.parentElement.parentElement;
    let children = row.children;
    let numeros = [];
    for (let i = 0; i < children.length; i++) {
      let cell = children[i];
      let cellHijos = cell.children;
      for (let i = 0; i < cellHijos.length; i++) {
        if (cellHijos[i].classList.contains("marked"))
          numeros.push(cellHijos[i].classList);
      }
    }
    return numeros.length;
  }

  function getFullLinesCount(rowsOfCarton) {
    let completed = [];
    for (let i = 0; i < rowsOfCarton.length; i++) {
      if (rowsOfCarton[i].classList.contains("linea"))
        completed.push(rowsOfCarton[i].classList);
    }
    return completed.length;
  }

  const Carton = function (_Game) {
    Game = _Game;

    $carton = document.querySelector("#carton");
    $carton.addEventListener("pointerdown", handleCartonClick);
  };

  Carton.prototype.draw = function () {
    numerosCarton = [];

    this.reset();
    Sounds.play("shuffle");

    for (let i = 0; i < totalNumbers; i++) {
      let randomNumber = generateRandomNumber(1, 91);

      while (!canAddToNumerosCarton(randomNumber)) {
        randomNumber = generateRandomNumber(1, 91);
      }

      numerosCarton.push(randomNumber);
    }

    for (let row = 0; row < rows; row++) {
      for (let n = 0; n < numbersPerRow; n++) {
        let cellNumber = numerosCarton[row * numbersPerRow + n];
        addNumberToCarton(cellNumber, row);
      }
    }

    socket.emit("newCarton", {
      name: playerName.value,
      carton: numerosCarton,
    });
  };

  Carton.prototype.reset = function () {
    document.querySelectorAll(".casillero").forEach((cell) => {
      cell.innerHTML = "";
      cell.classList.remove(...cell.classList);
      cell.classList.add("casillero");
    });
    document.querySelectorAll(".fila").forEach((rows) => {
      rows.classList.remove("linea");
    });
  };

  Carton.prototype.setColor = function (_color) {
    $carton.style.backgroundColor = _color;
  };

  Carton.prototype.setMarkerColor = function (_color) {
    let markedCells = $carton.querySelectorAll(".casillero .marked");
    markedCells.forEach((c) => {
      c.style.backgroundColor = _color;
    });
  };

  return Carton;
})();
