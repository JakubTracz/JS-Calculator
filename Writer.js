class Writer {
  constructor() {
    this.currentView;
  }
  PopulateView(viewBag) {
    let view = this.currentView;
    switch (viewBag.context) {
      case appContexts.initial:
        switch (viewBag.caller) {
          case callers.operator:
            view.calculations = view.currentValue + viewBag.value;
            break;
          case callers.decimal:
            if (!this.#IsDecimalNumber(view.currentValue)) {
              view.currentValue = viewBag.firstOperand;
            }
            break;
          default:
            view.currentValue = viewBag.value;
            break;
        }
        break;
      case appContexts.firstOperand:
        switch (viewBag.caller) {
          case callers.decimal:
            if (!this.#IsDecimalNumber(view.currentValue)) {
              view.currentValue = viewBag.firstOperand;
            }
            break;
          case callers.operator:
            view.calculations = view.currentValue + viewBag.operator;
            break;
          default:
            view.currentValue = viewBag.firstOperand;
            break;
        }
        break;
      case appContexts.operator:
        switch (viewBag.caller) {
          case callers.negate:
            view.currentValue = viewBag.secondOperand;
            view.calculations =
              view.currentValue > 0
                ? (view.calculations += view.currentValue)
                : view.calculations + '(' + view.currentValue + ')';
            break;
          case callers.operator:
            view.calculations = viewBag.firstOperand + viewBag.operator;
            break;
          case callers.number:
            view.currentValue = viewBag.secondOperand;
            view.calculations = view.calculations + viewBag.secondOperand;
            break;
          default:
            break;
        }
        break;
      case appContexts.secondOperand:
        switch (viewBag.caller) {
          case callers.number:
            view.currentValue = viewBag.secondOperand;
            view.calculations =
              viewBag.secondOperand > 0
                ? viewBag.firstOperand +
                  viewBag.operator +
                  viewBag.secondOperand
                : viewBag.firstOperand +
                  viewBag.operator +
                  '(' +
                  viewBag.secondOperand +
                  ')';
            break;
          case callers.negate:
            view.currentValue = viewBag.secondOperand;
            view.calculations =
              view.currentValue > 0
                ? viewBag.firstOperand + viewBag.operator + view.currentValue
                : viewBag.firstOperand +
                  viewBag.operator +
                  '(' +
                  view.currentValue +
                  ')';
            break;
          case callers.decimal:
            view.currentValue = viewBag.secondOperand;
            view.calculations =
              viewBag.secondOperand > 0
                ? viewBag.firstOperand +
                  viewBag.operator +
                  viewBag.secondOperand
                : viewBag.firstOperand +
                  viewBag.operator +
                  '(' +
                  viewBag.secondOperand +
                  ')';
            break;
          case callers.operator:
            view.calculations =
              viewBag.secondOperand > 0
                ? viewBag.firstOperand +
                  viewBag.operator +
                  viewBag.secondOperand
                : viewBag.firstOperand +
                  viewBag.operator +
                  '(' +
                  view.currentValue +
                  ')';
            break;
          case callers.eraseCurrent:
            view.currentValue = '';
            view.calculations = viewBag.firstOperand + viewBag.operator;
            break;
          case callers.compute:
            view.currentValue = '';
            view.calculations = '';
            view.result = viewBag.result;
          default:
            break;
        }
        break;
      case appContexts.computed:
        switch (viewBag.caller) {
          case callers.number:
          case callers.negate:
            view.currentValue = viewBag.firstOperand;
            view.result = '';
            break;
          case callers.operator:
            view.currentValue = viewBag.firstOperand;
            view.calculations = view.currentValue + viewBag.operator;
            view.result = '';
            break;
          case callers.compute:
            view.currentValue = viewBag.secondOperand;
            view.calculations =
              viewBag.firstOperand + viewBag.operator + view.currentValue;
            view.result = viewBag.result;
            break;
          default:
            view.result = '';
            break;
        }
        break;
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
  #IsDecimalNumber(value) {
    return value.toString().includes('.');
  }
}
