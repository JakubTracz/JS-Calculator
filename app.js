const calculator = new Calculator();

calculator.view.buttons.computeButton.addEventListener('click', function () {
  calculator.compute();
});
calculator.view.buttons.eraseAllButton.addEventListener(
  'click',
  calculator.eraseAll
);
calculator.view.buttons.eraseCurrentButton.addEventListener(
  'click',
  calculator.eraseCurrentValue
);

calculator.view.writeables.forEach((button) => {
  button.addEventListener('click', function () {
    calculator.view.write(this);
  });
});

calculator.view.buttons.operationButtons.forEach((button) => {
  button.addEventListener('click', function () {
    calculator.setLastOperator(this);
  });
});
