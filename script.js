console.log("Hello World");

const form = document.querySelector("form");
const inputNumber = document.querySelector("#input-number");
const inputMin = document.querySelector("#input-min");
const inputMax = document.querySelector("#input-max");
const resultNumbers = document.querySelector(".result-numbers");

form.onsubmit = (event) => {
  event.preventDefault();

  if (
    parseInt(inputNumber.value) === 0 ||
    parseInt(inputMin.value) === 0 ||
    parseInt(inputMax.value) === 0
  ) {
    alert("O número 0 não pode ser usado. Tente outro número.");
    inputNumber.value = "";
    inputMin.value = "";
    inputMax.value = "";
    return;
  }

  if (inputMin.value >= inputMax.value) {
    alert("O valor máximo tem que ser maior que o mínimo.");
    return;
  }

  let numberValue = inputNumber.value - 1;

  for (step = 0; step <= numberValue; step++) {
    setTimeout(() => {
      const newNumber = createRollNumbers();

      resultNumbers.appendChild(newNumber);
    }, step * 3500);
  }

  console.log(numberValue);
};

function createRollNumbers() {
  const min = parseInt(inputMin.value);
  const max = parseInt(inputMax.value);

  const result = Math.ceil(Math.random() * (max - min + 1) + min);

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
