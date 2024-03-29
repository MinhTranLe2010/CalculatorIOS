// DOM element
let display = document.querySelector("#display");
const numbers = document.getElementsByClassName("number");
const operators = document.getElementsByClassName("operator");
const controls = document.getElementsByClassName("controls");
const decimal = document.getElementById(".");

// Save number and operators
let numberStorage = null;
let operatorStorage = null;

// Screen user input
const userInput = () => display.textContent.split(',').join('');

const getNumber = () => {
  return parseFloat(userInput());
};

// Check number and values in storage
const setDisplay = (input) => {
 
  if (input.length === 7){
    display.style.fontSize = "3.7rem";
  } else if (input.length === 8){
    display.style.fontSize = "3.3rem";
  } else if (input.length === 9){
    display.style.fontSize = "3rem";
    for(button of numbers){
      button.disabled = true;
    } 
  } else if (input.length >= 10 ){
    display.style.fontSize = "2.6rem";
  }else {
    display.style.fontSize = "4.5rem";
    for(button of numbers){
      button.disabled = false;
    }
  }

  if (input === "0") {
    controls[0].innerText = "AC";
  } else {
    controls[0].innerText = "C";
  }
  if (input[input.length - 1] === ".") {
    display.textContent += ".";
    return;
  }

  const [wholeNumber, decimal] = input.split(".");
  if (decimal) {
    display.textContent = parseFloat(wholeNumber).toLocaleString() + "." + decimal;
  } else {
    display.textContent = parseFloat(wholeNumber).toLocaleString();
  }
};


const numberSelect = (numStr) => {
  const displayString = userInput();
  if (displayString === "0") {
    setDisplay(numStr);
  } else {
    setDisplay(displayString + numStr);
  }
};

const calculateAndConvertToString = () => {

  const currentNumber = getNumber();
  const numberStored = parseFloat(numberStorage);
  let newNumber;
  if (operatorStorage === "+") {
    newNumber = numberStored + currentNumber;
  } else if (operatorStorage === "-") {
    newNumber = numberStored - currentNumber;
  } else if (operatorStorage === "*") {
    newNumber = numberStored * currentNumber;
  } else if (operatorStorage === "/") {
    if (currentNumber === 0){
      display.textContent="No value"
      return;
    }
    newNumber = numberStored / currentNumber;
  }

  if(newNumber.toString().length > 9){
    newNumber = Number.parseFloat(newNumber).toExponential(6);
  } 
  return newNumber.toString().replace("+","");
};



const operatorSelect = (operator) => {
  const currentNumber = getNumber();
  if (!numberStorage) { 
    numberStorage = currentNumber;
    operatorStorage = operator;
    setDisplay("0");
    return;
  }
  numberStorage = calculateAndConvertToString();
  operatorStorage = operator;
  setDisplay("0");
};


for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", (event) => {
    numberSelect(event.target.id.toString());
  });
}

decimal.addEventListener("click", () => {
  const displayString = userInput();
  if (!displayString.includes(".")) {
    setDisplay(displayString + ".");
  }
});

//Control buttons and event listeners

for (let i = 0; i < controls.length; i++) {
  controls[i].addEventListener("click", (event) => {
    if (event.target.id == "clear") {
      setDisplay("0");
      numberStorage = null;
      operatorStorage = null;
    } else if (event.target.id == "plus-or-minus") {
      const currentNumber = getNumber();
      const currentNumberStr = userInput();
      if (currentNumberStr === "-0") {
        setDisplay("0");
      } else if (currentNumber >= 0) {
        setDisplay("-" + currentNumber);
      } else {
        setDisplay(currentNumberStr.substring(1));
      }
    } else if (event.target.id == "percent") {
      const currentNumber = getNumber();
      const newNumber = currentNumber / 100;
      setDisplay(newNumber.toString());
      numberStorage = null;
      operatorStorage = null;
    }

  });
};

//Control operations and event listeners
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", (event) => {
    if (event.target.textContent == "+") {
      operatorSelect("+");

    } else if (event.target.textContent == "−") {
      operatorSelect("-");

    } else if (event.target.textContent == "*") {
      operatorSelect("*");

    } else if (event.target.textContent == "/") {
      operatorSelect("/");

    } else if (event.target.textContent == "=") {
      if (numberStorage) {
        setDisplay(calculateAndConvertToString());
        numberStorage = null;
        operatorStorage = null;

      }

    }

  });
}