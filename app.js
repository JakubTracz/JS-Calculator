const appContexts = {
  initial: 'initial',
  computing: 'computing',
  computed: 'computed',
  invalid: 'invalid',
  operator: 'operator',
  firstOperand: 'firstOperand',
  secondOperand: 'secondOperand',
};

const calculator = new Calculator();
const rendering = calculator.rendering;

// rendering.buttons.compute.addEventListener('click', function () {
//   calculator.compute();
// });
// rendering.buttons.eraseAll.addEventListener('click', calculator.eraseAll);
// rendering.buttons.eraseCurrent.addEventListener(
//   'click',
//   calculator.eraseCurrentValue
// );
// rendering.buttons.negate.addEventListener('click', calculator.revertValue);
// rendering.buttons.writeables.forEach((button) => {
//   button.addEventListener('click', function () {
//     calculator.write(this);
//   });
// });

// rendering.buttons.operation.forEach((button) => {
//   button.addEventListener('click', function () {
//     calculator.setCurrentOperator(this);
//   });
// });

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
