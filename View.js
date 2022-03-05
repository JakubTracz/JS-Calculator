class View {
  constructor() {
    const initialState = 'initial';
    const calculationState = 'calculating';
    this.states = ['initial', 'running'];
    this.operators = ['%', '+', '-', '*', '/'];
    this.decimalPoint = '.';
    let state = initialState;
    this.buttons = {
      computeButton: document.getElementById('compute-button'),
      eraseCurrentButton: document.getElementById('erase-current-button'),
      eraseAllButton: document.getElementById('erase-all-button'),
    };
    this.screens = {
      resultScreen: document.getElementById('result-screen'),
      calculationsScreen: document.getElementById('calculations-screen'),
    };
    this.writeables = document.querySelectorAll('.writeable');
    this.getState = state;
    this.resetState = () => {
      state = initialState;
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

      //if any operator already written
      if (this.operators.includes(value) && this.containsOperator(currentValue))
        return;

      //if initial state for operators
      if (this.operators.includes(value) && state === initialState) return;

      //   decimal point
      if (
        value === this.decimalPoint &&
        currentValue.includes(this.decimalPoint)
      )
        return;

      let lastValue = this.getLastValue();
      if (this.containsOperator(lastValue)) {
      }

      if (state === initialState && value !== this.decimalPoint) {
        screen.textContent = value;
        state = calculationState;
        return;
      }
      screen.textContent = screen.textContent + value;
      state = calculationState;
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
