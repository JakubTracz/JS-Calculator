class Rendering {
  constructor(view) {
    const viewStates = {
      initial: 'initial',
      computing: 'computing',
      computed: 'computed',
      invalid: 'invalid',
    };
    this.operators = ['%', '+', '-', '*', '/'];
    this.decimalPoint = '.';

    this.state = viewStates.initial;
    this.setState = (state) => (this.state = state);
    this.resetState = () => {
      this.state = this.setState(viewStates.initial);
      this.RenderView(view);
    };
    this.buttons = {
      compute: document.getElementById('compute-button'),
      eraseCurrent: document.getElementById('erase-current-button'),
      eraseAll: document.getElementById('erase-all-button'),
      operation: document.querySelectorAll('.operation-button'),
      negate: document.getElementById('negate-button'),
      writeables: document.querySelectorAll('.writeable'),
    };
    this.screens = {
      resultScreen: document.getElementById('result-screen'),
      calculationsScreen: document.getElementById('calculations-screen'),
      currentValueScreen: document.getElementById('current-value-screen'),
    };
    this.writeables = document.querySelectorAll('.writeable');

    this.RenderView = (view) => {
      this.screens.calculationsScreen.textContent = view.calculations;
      this.screens.currentValueScreen.textContent = view.currentValue;
      this.screens.resultScreen.textContent = view.result;
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

    this.write = (element, currentOperator) => {
      const value = element.textContent;
      const currentValueScreen = this.screens.currentValueScreen;
      const calculationsScreen = this.screens.calculationsScreen;
      const currentValue = currentValueScreen.textContent;

      if (!this.canWrite(value, currentValue)) return;

      if (currentOperator) {
        calculationsScreen.textContent =
          currentValueScreen.textContent + currentOperator + value;
      }

      if (
        (this.state === viewStates.initial && value !== this.decimalPoint) ||
        currentOperator
      ) {
        currentValueScreen.textContent = value;
        this.state = viewStates.computing;
        return;
      }
      currentValueScreen.textContent = currentValue + value;
      this.state = viewStates.computing;
    };

    this.canWrite = (value, currentValue) => {
      // if any operator already written
      if (this.operators.includes(value)) return false;

      //if is in initial state for operators
      // if (this.operators.includes(value) && this.state === viewStates.initial)
      //   return false;

      //prevent two decimal points in a row
      if (
        value === this.decimalPoint &&
        currentValue.includes(this.decimalPoint)
      )
        return false;

      //if the value is an operator or decimal point and so is the last value
      // if (
      //   (value === this.decimalPoint || this.operators.includes(value)) &&
      //   (this.operators.includes(lastValue) || lastValue === this.decimalPoint)
      // )
      //   return false;
      return true;
    };

    this.revertValue = (lastOperator) => {
      const values = this.parseCalculation(lastOperator);
      const valuesCount = values.length;

      switch (valuesCount) {
        case 0:
          return;
        case 1:
          values[0] = -values[0];
          this.screens.calculationsScreen.textContent =
            '(' + values[0] + ')' + lastOperator;
          break;
        case 2:
          values[1] = -values[1];
          this.screens.calculationsScreen.textContent =
            values[0] + lastOperator + '(' + values[1] + ')';
          break;
        default:
          break;
      }
    };

    //#region screens

    this.clearAllScreens = () => {
      this.clearCalculationsScreen();
      this.clearResultScreen();
      this.clearCurrentValueScreen();
      this.resetState();
    };
    this.clearCalculationsScreen = () => {
      switch (this.state) {
        case viewStates.computed:
          break;
        case viewStates.computing:
          this.screens.calculationsScreen.textContent =
            this.screens.resultScreen.textContent;
          break;
        default:
          break;
      }
      this.screens.calculationsScreen.textContent = '';
    };
    this.clearResultScreen = () => {
      this.screens.resultScreen.textContent = '';
    };
    this.clearCurrentValueScreen = () => {
      this.screens.currentValueScreen.textContent = 0;
    };
    this.displayResult = (result) => {
      this.screens.resultScreen.textContent = result;
      this.screens.calculationsScreen.textContent =
        this.screens.calculationsScreen.textContent + '=';
      // this.copyResultToCalculationsScreen(result);
      this.state = viewStates.computed;
    };

    this.copyResultToCalculationsScreen = (result) => {
      this.screens.calculationsScreen.textContent = result;
    };

    //#endregion
    this.parseCalculation = (lastOperator) => {
      const value = this.screens.calculationsScreen.textContent;
      return value.split(lastOperator);
    };
    this.RenderView(view);
  }
}
