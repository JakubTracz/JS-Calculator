class Calculator {
  constructor() {
    let result = 0;
    let lastOperator = '';
    this.compute = () => {
      var values = this.view.parseCalculation();
      switch (lastOperator) {
        case '+':
          result = values[0] + values[1];
          break;
        case '-':
          result = values[0] - values[1];
          break;
        case '*':
          result = values[0] * values[1];
          break;
        case '/':
          result = values[0] / values[1];
          break;
        case '%':
          //TODO: implement percentage
          result = values[0] + values[1];
          break;
        default:
          break;
      }
      this.view.displayResult(result);
    };

    this.setLastOperator = (element) => {
      lastOperator = element.textContent;
    };
    this.eraseCurrentValue = () => {
      this.view.clearCalculationsScreen();
      this.view.resetState();
    };
    this.eraseAll = () => {
      this.view = new View();
      result = 0;
    };
    this.getResult = () => result;
    this.eraseAll();
  }
}
