class Calculator {
  constructor() {
    let result = 0;
    this.compute = (value, operation) => {
      var data = this.view.parseCalculation();
      switch (operation) {
        case '+':
          result += value;
          break;
        case '-':
          result -= value;
          break;
        case '*':
          result *= value;
          break;
        case '/':
          result /= value;
          break;
        case '%':
          //TODO: implement percentage
          result *= value;
          break;
        default:
          break;
      }
      console.log(data);
      this.view.displayResult(result);
    };

    this.eraseCurrentValue = () => {
      this.view.clearCalculationsScreen();
    };
    this.eraseAll = () => {
      this.view = new View();
      result = 0;
    };
    this.getResult = () => result;
    this.eraseAll();
  }
}
