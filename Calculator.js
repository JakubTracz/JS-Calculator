class Calculator {
  constructor() {
    let view;
    this.currentContext = appContexts.initial;
    this.result;
    this.currentOperator;
    this.currentValue = 0;

    this.handleEvents = (element) => {
      let value = element.textContent;
      const context = this.currentContext;

      switch (this.currentContext) {
        case appContexts.initial:
          switch (element.id) {
            case 'erase-all-button':
            case 'compute-button':
            case 'negate-button':
            case 'erase-current-button':
              this.resetCalculator();
              return;
            case '':
            default:
              break;
          }
          if (element.classList.contains('writeable')) {
            this.currentContext = appContexts.firstOperand;
            this.#SetCurrentValue(value);
            break;
          }
          if (element.classList.contains('operation-button')) {
            this.currentContext = appContexts.operator;
            this.currentOperator = value;
            return;
          }
          break;
        case appContexts.firstOperand:
          switch (element.id) {
            case 'erase-all-button':
              this.resetCalculator();
              return;
            case 'compute-button':
              return;
            case 'negate-button':
              value = -Number.parseFloat(this.currentValue);
              this.#SetCurrentValue(value, true);
              view = this.writer.PopulateView(value, context, true);
              this.rendering.RenderView(view);
              return;
            case 'erase-current-button':
              this.resetCalculator();
              return;
            case '':
            default:
              break;
          }
          if (element.classList.contains('writeable')) {
            this.#SetCurrentValue(value);
            break;
          }
          if (element.classList.contains('operation-button')) {
            this.currentContext = appContexts.operator;
            this.currentOperator = value;
            return;
          }
          break;
        //   break;
        // case appContexts.operator:
        //   break;

        // case appContexts.secondOperand:
        //   break;
        // default:
        //   break;
      }
      view = this.writer.PopulateView(value, context);
      this.rendering.RenderView(view);
    };

    let result = 0;
    let currentOperator = '';
    this.currentValue = 0;
    this.compute = () => {
      let state = this.rendering.state;
      if (state === 'computed' || state === 'initial') return;
      var values = this.rendering
        .parseCalculation(currentOperator)
        .map((v) => Number.parseFloat(v));
      if (!values || !values[0] || !values[1]) return;
      switch (currentOperator) {
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
          return;
      }
      this.view.displayResult(result);
    };

    this.write = (element) => {
      this.rendering.write(element, currentOperator);
    };

    this.setCurrentOperator = (element) => {
      currentOperator = element.textContent;
    };

    this.getCurrentOperator = () => currentOperator;

    this.eraseCurrentValue = () => {
      this.rendering.clearCalculationsScreen();
    };

    this.revertValue = () => {
      // let result = this.view.revertValue(currentOperator);
    };

    this.resetCalculator = () => {
      this.result = 0;
      this.currentOperator = '';
      this.currentContext = appContexts.initial;
      this.currentValue = 0;
      view = this.writer.WriteInitialView();
      this.rendering.RenderView(view);
    };

    this.getResult = () => result;

    this.init = () => {
      this.writer = new Writer();
      const view = this.writer.WriteInitialView();
      this.rendering = new Rendering(view);
      this.resetCalculator();
    };
    this.init();
  }

  #SetCurrentValue(value, negation) {
    if (Number.parseFloat(value) !== NaN) {
      this.currentValue =
        this.currentValue !== 0 && !negation
          ? this.currentValue + value
          : value;
    }
  }
}
