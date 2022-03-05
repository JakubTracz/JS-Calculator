class View {
  constructor() {
    const appStates = {
      initial: 'initial',
      computing: 'computing',
      computed: 'computed',
      invalid: 'invalid',
    };
    this.operators = ['%', '+', '-', '*', '/'];
    this.decimalPoint = '.';

    let state = appStates.initial;

    this.buttons = {
      computeButton: document.getElementById('compute-button'),
      eraseCurrentButton: document.getElementById('erase-current-button'),
      eraseAllButton: document.getElementById('erase-all-button'),
      operationButtons: document.querySelectorAll('.operation-button'),
    };
    this.screens = {
      resultScreen: document.getElementById('result-screen'),
      calculationsScreen: document.getElementById('calculations-screen'),
    };
    this.writeables = document.querySelectorAll('.writeable');
    this.getState = state;
    this.resetState = () => {
      state = appStates.initial;
    };

    this.containsOperator = (value, operators = this.operators) => {
      for (let i = 0; i < operators.length; i++) {
        const operator = operators[i];
        if (value.includes(operator)) {
          return true;
        }
      }
      return false;
    };

    this.getLastValue = () => {
      const currentValue = this.screens.calculationsScreen.textContent;
      return currentValue.charAt(currentValue.length - 1);
    };

    this.write = (element) => {
      const value = element.textContent;
      const screen = this.screens.calculationsScreen;
      const currentValue = screen.textContent;

      if (!this.canWrite(value, currentValue)) return;

      if (state === appStates.initial && value !== this.decimalPoint) {
        screen.textContent = value;
        state = appStates.computing;
        return;
      }
      screen.textContent = currentValue + value;
      state = appStates.computing;
    };

    this.canWrite = (value, currentValue) => {
      const lastValue = this.getLastValue();

      //if any operator already written
      if (this.operators.includes(value) && this.containsOperator(currentValue))
        return false;

      //if is in initial state for operators
      if (this.operators.includes(value) && state === appStates.initial)
        return false;

      //prevent two decimal points in a row
      if (
        value === this.decimalPoint &&
        currentValue.includes(this.decimalPoint)
      )
        return false;

      //if value is an operator or decimal point and so is the last value
      if (
        (value === this.decimalPoint || this.operators.includes(value)) &&
        (this.operators.includes(lastValue) || lastValue === this.decimalPoint)
      )
        return false;
      return true;
    };

    this.clearAllScreens = () => {
      this.clearCalculationsScreen();
      this.clearResultScreen();
      this.resetState();
    };
    this.clearCalculationsScreen = () => {
      this.screens.calculationsScreen.textContent = 0;
    };
    this.clearResultScreen = () => {
      this.screens.resultScreen.textContent = '';
    };
    this.displayResult = (result) => {
      this.screens.resultScreen.textContent = result;
    };
    this.parseCalculation = () => {
      const value = this.screens.calculationsScreen.textContent;
      const array = value.split(/[\D]/);
      return array;
    };
    this.init = () => {
      this.clearAllScreens();
      this.resetState();
    };
    this.init();
  }
}
