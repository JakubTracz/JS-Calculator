class Writer {
  constructor() {
    this.currentView;
  }
  PopulateView(value, context, negation) {
    let view = this.currentView;

    switch (context) {
      case appContexts.initial:
        if (value !== '.') {
          view.currentValue = value;
          break;
        }
        if (!this.#IsDecimalNumber(this.currentView.currentValue)) {
          view.currentValue = this.currentView.currentValue + value;
        }
      case appContexts.firstOperand:
        if (value === '.') {
          if (this.#IsDecimalNumber(this.currentView.currentValue)) {
            view = this.currentView;
            break;
          }
        }
        if (negation) {
          view.currentValue = value;
          break;
        }
        view.currentValue = view.currentValue + value;

      //     break;
      //   case appContexts.operator:
      //     break;

      //   case appContexts.secondOperand:
      //     break;
      //   default:
      //     break;
    }
    return view;
  }
  WriteInitialView() {
    const view = new View();
    this.currentView = view;
    return view;
  }
  #TrimDecimalPoint(value) {
    return value.toString().endsWith('.') ? value.slice(0, -1) : value;
  }
  #IsDecimalNumber(value) {
    return value.toString().includes('.');
  }
}
