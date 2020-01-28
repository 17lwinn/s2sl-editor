;(async function(){
var package = os.runningPackages[document.currentScript.id];
var mainWindowRaw = await package.resource("main.html");
var mainWindow = package.createWindow(atob(mainWindowRaw));

var calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null
};
var display = document.getElementById(`${package.name}Display`);
var performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '=': (firstOperand, secondOperand) => secondOperand
};

document.getElementById(`${mainWindow.id}Body`).onclick = function(e) {
  if (!e.target.matches("button")) return;
  if (e.target.id.includes("_N")) {
    if (calculator.waitingForSecondOperand === true) {
      calculator.displayValue = e.target.value;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue = calculator.displayValue === '0' ? e.target.value : calculator.displayValue + e.target.value;
    }
    return display.value = calculator.displayValue;
  }
  if (e.target.id.includes("_O")) {
    const inputValue = parseFloat(calculator.displayValue);
    if (calculator.firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (calculator.operator) {
      const result = performCalculation[calculator.operator](calculator.firstOperand, inputValue);
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = e.target.value;
    if (calculator.displayValue === "Infinity") {
      setTimeout(function(){mainWindow.minimize();setTimeout(function(){mainWindow.minimize();setTimeout(function(){mainWindow.minimize();setTimeout(function(){mainWindow.minimize);}, 250);}, 250);}, 250);}, 250);
      const html = document.getElementsByTagName('html')[0];
      const longcat_src = 'https://cdn.glitch.com/d350c9dc-f43b-434e-8886-3c62df1297b2%2Flongcat.png?v=1576790382865';
      const longcat_element = document.createElement('img');
      longcat_element.src = longcat_src;
      longcat_element.onload = () => {
        longcat_element.style = "position:fixed;bottom:-10px;left:0;"
        html.appendChild(longcat_element);
        html.addEventListener('mousemove', e => {
          longcat_element.style.left = `${e.clientX}px`;
          longcat_element.style.height = `${html.clientHeight - e.clientY}px`;
        });
      }
    }
    return display.value = calculator.displayValue;
  }
  if (e.target.id.includes("Decimal")) {
    if (!calculator.displayValue.includes(e.target.innerText)) {
      calculator.displayValue += e.target.innerText;
      return display.value = calculator.displayValue;
    }
  }
  if (e.target.id.includes("Clear")) {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    return display.value = calculator.displayValue;
  }
}
})()