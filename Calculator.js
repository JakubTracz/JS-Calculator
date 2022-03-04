class Calculator {
  constructor() {
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
    this.clearCurrentValue = () => {};
    this.clearAll = () => {};
    this.getResult = () => result;
  }
}
