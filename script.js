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

form.onsubmit = (event) => {
  event.preventDefault();

  if (inputNumber.value === 0 || inputMin.value === 0 || inputMax.value === 0) {
    alert("O número 0 não pode ser usado. Tente outro número.");
    return;
  }

  if (inputMin.value >= inputMax.value) {
    alert("O valor máximo tem que ser maior que o mínimo.");
    return;
  }

  showForm.classList.add("hidden");
  showResults.classList.remove("hidden");

  drawersNumbers();

  if (inputCheck.checked) {
    buttonReroll.addEventListener("click", () => {
      resultNumbers.replaceChildren();
      drawersNumbers();
    });
  }
};

function createRollNumbers() {
  const min = parseInt(inputMin.value);
  const max = parseInt(inputMax.value);

  const result = Math.ceil(Math.random() * (max - min - 1) + min);

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

function drawersNumbers() {
  let numberValue = inputNumber.value - 1;

  for (let step = 0; step <= numberValue; step++) {
    setTimeout(() => {
      const newNumber = createRollNumbers();

      resultNumbers.appendChild(newNumber);
    }, step * 3000);
  }
}
