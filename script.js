console.log("Hello World");

const form = document.querySelector("form");
const inputNumber = document.querySelector("#input-number");
const inputMin = document.querySelector("#input-min");
const inputMax = document.querySelector("#input-max");
const resultNumbers = document.querySelector(".result-numbers");
const showForm = document.querySelector(".content-form");
const showResults = document.querySelector(".content");
const showRerollButton = document.querySelector(".reroll");
const inputCheck = document.querySelector("#toggle-wrapper");
const buttonReroll = document.querySelector(".reroll");
const titleResult = document.querySelector(".title-results p");

let timeouts = [];
let lastResults = [];
let resultCount = 1;

function clearTimeouts() {
  timeouts.forEach((timeout) => clearTimeout(timeout));
  timeouts = [];
}

form.onsubmit = (event) => {
  event.preventDefault();

  if (Number(inputNumber.value) === 0 || Number(inputMin.value) === 0 || Number(inputMax.value) === 0) {
    alert("O número 0 não pode ser usado. Tente outro número.");
    return;
  }

  if (Number(inputMin.value) >= Number(inputMax.value)) {
    alert("O valor máximo tem que ser maior que o mínimo.");
    return;
  }

  lastResults = [];
  resultCount = 1;
  titleResult.textContent = "1° Resultado";
  showForm.classList.add("hidden");
  showResults.classList.remove("hidden");

  drawNumbers();
};

buttonReroll.addEventListener("click", () => {
  clearTimeouts();

  if (inputCheck.checked) {
    resultCount++;
    titleResult.textContent = `${resultCount}° Resultado`;
    resultNumbers.replaceChildren();
    replayNumbers();
  } else {
    showForm.classList.remove("hidden");
    showResults.classList.add("hidden");

    resultNumbers.replaceChildren();
    lastResults = [];
    resultCount = 1;
    titleResult.textContent = "1° Resultado";

    inputNumber.value = "";
    inputMin.value = "";
    inputMax.value = "";
  }
});

function createRollNumbers() {
  const min = parseInt(inputMin.value);
  const max = parseInt(inputMax.value);

  const result = Math.floor(Math.random() * (max - min + 1) + min);

  lastResults.push(result);

  const divWrapper = document.createElement("div");
  divWrapper.classList.add("number-wrapper");

  const numberBox = document.createElement("div");
  numberBox.classList.add("number-box");

  const numberSpan = document.createElement("span");
  numberSpan.classList.add("number");
  numberSpan.textContent = result;

  divWrapper.append(numberBox, numberSpan);

  return divWrapper;
}

function replayNumbers() {
  const min = parseInt(inputMin.value);
  const max = parseInt(inputMax.value);
  const quantity = parseInt(inputNumber.value);

  for (let i = 0; i < quantity; i++) {
    const timeout = setTimeout(() => {
      const result = Math.floor(Math.random() * (max - min + 1) + min);
      lastResults.push(result);

      const divWrapper = document.createElement("div");
      divWrapper.classList.add("number-wrapper");

      const numberBox = document.createElement("div");
      numberBox.classList.add("number-box");

      const numberSpan = document.createElement("span");
      numberSpan.classList.add("number");
      numberSpan.textContent = result;

      divWrapper.append(numberBox, numberSpan);
      resultNumbers.appendChild(divWrapper);
    }, i * 3000);
    timeouts.push(timeout);
  }
}

function drawNumbers() {
  let numberValue = inputNumber.value - 1;

  for (let step = 0; step <= numberValue; step++) {
    const timeout = setTimeout(() => {
      const newNumber = createRollNumbers();

      resultNumbers.appendChild(newNumber);
    }, step * 3000);
    timeouts.push(timeout);
  }
}
