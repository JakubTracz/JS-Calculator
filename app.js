const appContexts = {
  initial: 'initial',
  firstOperand: 'firstOperand',
  operator: 'operator',
  secondOperand: 'secondOperand',
  computed: 'computed',
};
const callers = {
  decimal: 'decimal-button',
  eraseAll: 'erase-all-button',
  eraseCurrent: 'erase-current-button',
  operator: 'operation-button',
  negate: 'negate-button',
  compute: 'compute-button',
  number: 'number',
};

const operators = ['%', '+', '-', '*', '/'];
const decimalPoint = '.';

const calculator = new Calculator();
const rendering = calculator.rendering;

window.onload = () => {
  rendering.ToogleDisplay(rendering.mainWrapper);
  rendering.buttons.history.addEventListener('click', function () {
    rendering.ToogleDisplay(rendering.historyWrapper);
  });
  rendering.buttons.compute.addEventListener('click', calculator.handleEvents);
  rendering.buttons.eraseAll.addEventListener('click', calculator.handleEvents);
  rendering.buttons.negate.addEventListener('click', calculator.handleEvents);
  rendering.buttons.eraseCurrent.addEventListener(
    'click',
    calculator.handleEvents
  );
  rendering.buttons.writeables.forEach((button) => {
    button.addEventListener('click', calculator.handleEvents);
  });
};

var target = rendering;

const handler = {};
const proxy = new Proxy(target, handler);

console.log(proxy.view);
