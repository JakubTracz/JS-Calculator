class Calculator {
  constructor() {
    let view;
    this.caller;
    this.currentContext = appContexts.initial;
    this.result;
    this.currentOperator;
    this.currentValue = 0;

    this.handleEvents = (element) => {
      let value = element.textContent;
      const context = this.currentContext;
      this.caller = element.id
        ? element.id
        : element.classList.contains('operation-button')
        ? 'operation-button'
        : element.classList.contains('decimal-button')
        ? 'decimal-button'
        : element.classList.contains('negate-button')
        ? 'negate-button'
        : element.classList.contains('compute-button')
        ? 'compute-button'
        : element.classList.contains('erase-all-button')
        ? 'erase-all-button'
        : element.classList.contains('erase-current-button')
        ? 'erase-current-button'
        : 'number';
      const caller = this.caller;

      if (caller === 'erase-all-button') {
        this.resetCalculator();
        return;
      }

      switch (this.currentContext) {
        case appContexts.initial:
          switch (caller) {
            case 'compute-button':
            case 'negate-button':
            case 'erase-current-button':
              this.resetCalculator();
              return;
            case '':
            default:
              break;
          }
          this.#SetCurrentValue(value);
          if (element.classList.contains('operation-button')) {
            this.currentContext = appContexts.operator;
            this.currentOperator = value;
            break;
          }
          this.currentContext = appContexts.firstOperand;
          break;
        case appContexts.firstOperand:
          switch (caller) {
            case 'compute-button':
              return;
            case 'negate-button':
              value = -Number.parseFloat(this.currentValue);
              if (isNaN(value)) return;
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
          if (element.classList.contains('operation-button')) {
            this.currentContext = appContexts.operator;
            this.currentOperator = value;
            break;
          }
          if (element.classList.contains('writeable')) {
            this.#SetCurrentValue(value);
            break;
          }
          break;
        case appContexts.operator:
          switch (caller) {
            case 'compute-button':
              return;
            case 'negate-button':
              value = -Number.parseFloat(this.currentValue);
              this.#SetCurrentValue(value, true);
              view = this.writer.PopulateView(value, context, true);
              this.rendering.RenderView(view);
              this.currentContext = appContexts.secondOperand;
              return;
            case 'erase-current-button':
              this.resetCalculator();
              return;
            case '':
            default:
              break;
          }
          if (element.classList.contains('operation-button')) {
            this.currentOperator = value;
            break;
          }
          if (element.classList.contains('writeable')) {
            this.#SetCurrentValue(value);
            this.currentContext = appContexts.secondOperand;
            break;
          }
          break;
        case appContexts.secondOperand:
          switch (caller) {
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
          if (element.classList.contains('operation-button')) {
            this.currentOperator = value;
            break;
          }
          if (element.classList.contains('writeable')) {
            this.#SetCurrentValue(value);
            break;
          }
          break;
        default:
          break;
      }
      view = this.writer.PopulateView(value, context, undefined, this.caller);
      this.rendering.RenderView(view);
    };

    this.resetCalculator = () => {
      this.result = 0;
      this.currentOperator = '';
      this.currentContext = appContexts.initial;
      this.currentValue = 0;
      view = this.writer.WriteInitialView();
      this.rendering.RenderView(view);
    };
    this.init = () => {
      this.writer = new Writer();
      const view = this.writer.WriteInitialView();
      this.rendering = new Rendering(view);
      this.resetCalculator();
    };
    this.init();
  }

  #SetCurrentValue(value, negation) {
    if (!isNaN(Number.parseFloat(value))) {
      this.currentValue =
        this.currentValue !== 0 && !negation
          ? this.currentValue + value
          : value;
    }
  }
}
