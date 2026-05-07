const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');

let currentValue = '0';
let previousValue = '';
let operator = null;
let justCalculated = false;

function updateScreen() {
  expressionEl.textContent = previousValue + (operator ? ` ${operator} ` : '') + (currentValue === '0' && !previousValue ? '' : currentValue);
  resultEl.textContent = currentValue || '0';
}

function clearAll() {
  currentValue = '0';
  previousValue = '';
  operator = null;
  justCalculated = false;
  updateScreen();
}

function appendDigit(digit) {
  if (justCalculated) {
    currentValue = digit;
    justCalculated = false;
  } else if (currentValue === '0') {
    currentValue = digit;
  } else {
    currentValue += digit;
  }
  updateScreen();
}

function appendDecimal() {
  if (justCalculated) {
    currentValue = '0.';
    justCalculated = false;
  } else if (!currentValue.includes('.')) {
    currentValue += '.';
  }
  updateScreen();
}

function setOperator(selectedOperator) {
  if (operator && !justCalculated) {
    calculate();
  }
  previousValue = currentValue;
  currentValue = '0';
  operator = selectedOperator;
  justCalculated = false;
  updateScreen();
}

function calculate() {
  if (!operator || !previousValue) return;

  const a = parseFloat(previousValue.replace(/\./g, '').replace(',', '.'));
  const b = parseFloat(currentValue.replace(/\./g, '').replace(',', '.'));
  let result = 0;

  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '−':
      result = a - b;
      break;
    case '×':
      result = a * b;
      break;
    case '÷':
      result = b === 0 ? 'Erro' : a / b;
      break;
  }

  currentValue = result === 'Erro' ? result : String(result);
  previousValue = '';
  operator = null;
  justCalculated = true;
  updateScreen();
}

function toggleSign() {
  if (currentValue === '0') return;
  currentValue = currentValue.startsWith('-') ? currentValue.slice(1) : `-${currentValue}`;
  updateScreen();
}

function applyPercent() {
  const value = parseFloat(currentValue.replace(/\./g, '').replace(',', '.'));
  currentValue = String(value / 100);
  updateScreen();
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const buttonText = button.textContent.trim();

    if (action === 'digit') {
      appendDigit(buttonText);
    } else if (action === 'decimal') {
      appendDecimal();
    } else if (action === 'operator') {
      setOperator(buttonText);
    } else if (action === 'equal') {
      calculate();
    } else if (action === 'clear') {
      clearAll();
    } else if (action === 'toggle-sign') {
      toggleSign();
    } else if (action === 'percent') {
      applyPercent();
    }
  });
});

clearAll();
