const appContexts = {
  initial: 'initial',
  firstOperand: 'firstOperand',
  operator: 'operator',
  secondOperand: 'secondOperand',
  computed: 'computed',
};
const operators = ['%', '+', '-', '*', '/'];
const decimalPoint = '.';

const calculator = new Calculator();
const rendering = calculator.rendering;

rendering.buttons.compute.addEventListener('click', function () {
  calculator.handleEvents(this);
});
rendering.buttons.eraseAll.addEventListener('click', function () {
  calculator.handleEvents(this);
});
rendering.buttons.eraseCurrent.addEventListener('click', function () {
  calculator.handleEvents(this);
});
rendering.buttons.negate.addEventListener('click', function () {
  calculator.handleEvents(this);
});
rendering.buttons.writeables.forEach((button) => {
  button.addEventListener('click', function () {
    calculator.handleEvents(this);
  });
});
