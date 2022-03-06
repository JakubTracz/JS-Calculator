class Writer {
  constructor() {
    this.currentView;
  }
  PopulateView(value, context, negation, caller) {
    let view = this.currentView;
    value = this.#TrimDecimalPoint(value);
    switch (context) {
      case appContexts.initial:
        switch (caller) {
          case 'operation-button':
            view.calculations = view.currentValue + value;
            break;
          case 'decimal-button':
            if (!this.#IsDecimalNumber(this.currentView.currentValue)) {
              view.currentValue = this.currentView.currentValue + value;
            }
            break;
          case 'number':
            view.currentValue = value;
            break;
        }
      case appContexts.firstOperand:
        if (value === decimalPoint) {
          if (this.#IsDecimalNumber(this.currentView.currentValue)) {
            view = this.currentView;
            break;
          }
        }
        if (negation) {
          view.currentValue = value;
          break;
        }
        if (this.#IsOperator(value)) {
          view.calculations = view.currentValue + value;
          break;
        }
        view.currentValue = view.currentValue + value;
      case appContexts.operator:
        if (this.#IsOperator(value)) {
          view.calculations = view.calculations.replace(
            view.calculations.charAt(view.calculations.length - 1),
            value
          );
          break;
        }
        if (negation) {
          view.calculations =
            value > 0
              ? (view.calculations = view.calculations + value)
              : view.calculations + '(' + value + ')';
          view.currentValue = value;
          break;
        }
        view.currentValue = value;
        view.calculations = view.calculations + value;
      case appContexts.secondOperand:
        if (this.#IsOperator(value)) {
          view.calculations = view.calculations.replace(
            view.calculations.charAt(view.calculations.length - 1),
            value
          );
          break;
        }
      default:
        break;
    }
    return view;
  }
  WriteInitialView() {
    const view = new View();
    this.currentView = view;
    return view;
  }
  #TrimDecimalPoint(value) {
    return value.toString().endsWith('.') && value !== '.'
      ? value.slice(0, -1)
      : value;
  }
  #IsDecimalNumber(value) {
    return value.toString().includes('.');
  }
  #IsOperator(value) {
    return operators.includes(value);
  }
}
