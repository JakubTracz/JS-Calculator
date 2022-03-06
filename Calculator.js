class Calculator {
  constructor() {
    let view;
    this.caller;
    this.currentContext = appContexts.initial;
    this.result;
    this.currentOperator;
    this.firstOperand = 0;
    this.secondOperand;

    this.handleEvents = (event) => {
      let element = event.target;
      let value = element.textContent;
      const context = this.currentContext;
      this.caller = element.id
        ? element.id
        : element.classList.contains(callers.operator)
        ? callers.operator
        : element.classList.contains(callers.decimal)
        ? callers.decimal
        : element.classList.contains(callers.negate)
        ? callers.negate
        : element.classList.contains(callers.compute)
        ? callers.compute
        : element.classList.contains(callers.eraseAll)
        ? callers.eraseAll
        : element.classList.contains(callers.eraseCurrent)
        ? callers.eraseCurrent
        : callers.number;
      const caller = this.caller;

      if (caller === callers.eraseAll) {
        this.resetCalculator();
        return;
      }

      this.#SetCurrentValue(value);

      switch (this.currentContext) {
        case appContexts.initial:
          switch (caller) {
            case callers.compute:
            case callers.negate:
            case callers.eraseCurrent:
              this.resetCalculator();
              return;
            default:
              if (element.classList.contains(callers.operator)) {
                this.currentContext = appContexts.operator;
                this.currentOperator = value;
                break;
              }
              this.currentContext = appContexts.firstOperand;
          }
          break;
        case appContexts.firstOperand:
          switch (caller) {
            case callers.eraseAll:
            case callers.eraseCurrent:
              this.resetCalculator();
              return;
            case callers.operator:
              this.currentContext = appContexts.operator;
              this.currentOperator = value;
              break;
            default:
              break;
          }
          break;
        case appContexts.operator:
          switch (caller) {
            case callers.eraseAll:
            case callers.eraseCurrent:
              this.resetCalculator();
              return;
            case callers.number:
              this.secondOperand = value;
              this.currentContext = appContexts.secondOperand;
              break;
            case callers.operator:
              this.currentOperator = value;
              break;
            case callers.negate:
              this.currentContext = appContexts.secondOperand;
            default:
              break;
          }
          break;
        case appContexts.secondOperand:
          switch (caller) {
            case callers.compute:
              this.currentContext = appContexts.computed;
              this.result = this.compute();
              break;
            case callers.operator:
              this.currentOperator = value;
              break;
            default:
              break;
          }
        case appContexts.computed:

        default:
          break;
      }
      const viewBag = {
        value,
        firstOperand: this.firstOperand,
        secondOperand: this.secondOperand,
        operator: this.currentOperator,
        result: this.result,
        context,
        caller,
      };
      view = this.writer.PopulateView(viewBag);
      this.rendering.RenderView(view);
    };

    this.compute = () => {
      const firstOperand = Number.parseFloat(this.firstOperand);
      const secondOperand = Number.parseFloat(this.secondOperand);

      switch (this.currentOperator) {
        case '+':
          return firstOperand + secondOperand;
        case '-':
          return firstOperand - secondOperand;
        case '*':
          return firstOperand * secondOperand;
        case '/':
          return firstOperand / secondOperand;
        default:
          return;
      }
    };

    this.resetCalculator = () => {
      this.result = 0;
      this.currentOperator = '';
      this.currentContext = appContexts.initial;
      this.firstOperand = 0;
      this.secondOperand = undefined;
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

  #SetCurrentValue(value) {
    switch (this.currentContext) {
      case appContexts.initial:
        switch (this.caller) {
          case callers.decimal:
            this.firstOperand += value;
            return;
          case callers.number:
            this.firstOperand = value;
            return;
          default:
            return;
        }
      case appContexts.firstOperand:
        switch (this.caller) {
          case callers.decimal:
            if (this.firstOperand.toString().includes(decimalPoint)) {
              return;
            }
            this.firstOperand += value;
            return;
          case callers.negate:
            const parsed = -Number.parseFloat(this.firstOperand);
            if (isNaN(parsed)) {
              return;
            }
            this.firstOperand = parsed;
            return;
          case callers.number:
            if (this.firstOperand !== 0 && this.firstOperand !== -0) {
              this.firstOperand += value;
              return;
            }
            this.firstOperand = value;
            return;
          default:
            return;
        }
      case appContexts.operator:
        switch (this.caller) {
          case callers.number:
            this.secondOperand = value;
            return;
          case callers.negate:
            const parsed = -Number.parseFloat(this.firstOperand);
            if (isNaN(parsed)) {
              return;
            }
            this.secondOperand = parsed;
          default:
            return;
        }
      case appContexts.secondOperand:
        switch (this.caller) {
          case callers.number:
            if (this.secondOperand) {
              this.secondOperand += value;
              return;
            }
            this.secondOperand = value;
            return;
          case callers.negate:
            const parsed = -Number.parseFloat(this.secondOperand);
            if (isNaN(parsed)) {
              return;
            }
            this.secondOperand = parsed;
            return;
          case callers.decimal:
            if (this.secondOperand.toString().includes(decimalPoint)) {
              return;
            }
            this.secondOperand += value;
            return;
          default:
            return;
        }
    }
  }
}
