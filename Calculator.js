class Calculator {
  constructor() {
    this.view = new View();
    let result = 0;
    this.compute = (value, operation) => {
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
