const totalNumbers = 15;
const rows = 3;
const colums = 9;
const numbersPerRow = totalNumbers / rows;
const $click = document.getElementById("clck");
const $linea = document.getElementById("fullLineAudio");
const $bingocho = document.getElementById("bingocho");
const $mezclar = document.getElementById("mezclar");
const $sacarNum = document.getElementById("sacarNum");
const numSection = document.querySelector(".numSection");

let numerosCantados = [];

const colorSelector = document.querySelector("#colorSelector");
colorSelector.addEventListener("change", handleChangeColor);

const colorMarker = document.querySelector("#colorSelectorMarker");
colorMarker.addEventListener("change", handleChangeColorMarker);

const carton = document.querySelector("#carton");
carton.addEventListener("click", handleCartonClick);

const reloadCartonBtn = document.querySelector("#reloadCartorBtn");
reloadCartonBtn.addEventListener("click", drawCarton);

const colorSection = document.querySelector(".colorSelectorSection");

const form = document.getElementById("form");
form.addEventListener("submit", ModalidadElegida);

const cantarNum = document.querySelector(".newNum");
cantarNum.addEventListener("click", drawNumeroCantado);

let numerosCarton = [];

function drawCarton() {
  numerosCarton = [];

  resetCarton();
  $mezclar.play();

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

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

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

function handleCartonClick(event) {
  let currentCell = event.target;
  let currentRow = currentCell.parentNode.parentElement;
  let rowsOfCarton = currentRow.parentElement;
  let rowschildrens = rowsOfCarton.children;
  if (currentCell.classList.contains("numero")) {
    currentCell.classList.toggle("marked");
    $click.play();
  }
  if (
    currentCell.classList.contains("numero") &&
    currentCell.classList.contains("marked")
  ) {
    currentCell.style.backgroundColor = colorMarker.value;
  } else if (currentCell.classList.contains("numero")) {
    currentCell.style.backgroundColor = "#ffffff";
  }

  if (doLinea(event.target) == 5) {
    if (!currentRow.classList.contains("linea")) {
      currentRow.classList.add("linea");
    }
    let bingocho = doBingo(rowschildrens);
    if (bingocho == 1) {
      $linea.play();
      alert("L I N E A");
    } else if (bingocho == 3) {
      $bingocho.play();
      alert("¡ ¡ B I N G O ! !");
    }
  } else if (doLinea(event.target) < 5) {
    currentRow.classList.remove("linea");
  }
}

function handleChangeColor(event) {
  let currentColor = event.target.value;
  carton.style.backgroundColor = currentColor;
  document.querySelector("#colorSelectorSection").classList.add("hide");
  carton.classList.remove("hide");
}

function handleChangeColorMarker(event) {
  let currentColor = event.target.value;
  let numero = document.querySelectorAll(".marked");
  numero.forEach((num) => {
    num.style.backgroundColor = currentColor;
  });
  document.querySelector("#colorSelectorSection").classList.add("hide");
  carton.classList.remove("hide");
}

function resetCarton() {
  document.querySelectorAll(".casillero").forEach((cell) => {
    cell.innerHTML = "";
    cell.classList.remove(...cell.classList);
    cell.classList.add("casillero");
  });
  document.querySelectorAll(".fila").forEach((rows) => {
    rows.classList.remove("linea");
  });
  let numList = document.querySelector(".numList");
  numList.innerHTML = "";
  numerosCantados = [];
}

function doLinea(currentCell) {
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

function doBingo(rowsOfCarton) {
  let completed = [];
  for (let i = 0; i < rowsOfCarton.length; i++) {
    if (rowsOfCarton[i].classList.contains("linea"))
      completed.push(rowsOfCarton[i].classList);
  }
  return completed.length;
}

function ModalidadElegida(event) {
  event.preventDefault();

  let submitButton = document.activeElement;

  if (submitButton && submitButton.value === "SI") {
    form.classList.add("hide");
    carton.classList.remove("hide");
    colorSection.classList.remove("hide");
    numSection.classList.remove("hide");
  } else if (submitButton && submitButton.value === "NO") {
    form.classList.add("hide");
    carton.classList.remove("hide");
    colorSection.classList.remove("hide");
  }
}

function drawNumeroCantado() {
  $sacarNum.play();
  let randomNumber = generateRandomNumber(1, 91);
  let numList = document.querySelector(".numList");
  while (!canAddNumero(randomNumber) && numerosCantados.length != 90) {
    randomNumber = generateRandomNumber(1, 91);
  }
  if (numerosCantados.length == 90) {
    numList.innerHTML += "¡No hay mas numeros!";
    numList.scrollTop = numList.scrollHeight;
  } else {
    numerosCantados.push(randomNumber);
    numList.innerHTML += "(" + randomNumber + ") ";
    numList.scrollTop = numList.scrollHeight;
  }
}

function canAddNumero(n) {
  return !numerosCantados.includes(n);
}

drawCarton();
