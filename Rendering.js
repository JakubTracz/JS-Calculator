class Rendering {
  constructor(view) {
    this.view;
    this.buttons = {
      compute: document.getElementById('compute-button'),
      eraseCurrent: document.getElementById('erase-current-button'),
      eraseAll: document.getElementById('erase-all-button'),
      operation: document.querySelectorAll('.operation-button'),
      negate: document.getElementById('negate-button'),
      history: document.getElementById('history-button'),
      writeables: document.querySelectorAll('.writeable'),
    };
    (this.historyWrapper = document.getElementById('history-wrapper')),
      (this.screens = {
        resultScreen: document.getElementById('result-screen'),
        calculationsScreen: document.getElementById('calculations-screen'),
        currentValueScreen: document.getElementById('current-value-screen'),
        historyScreen: document.getElementById('history-screen'),
      });
    this.writeables = document.querySelectorAll('.writeable');
    this.mainWrapper = document.getElementById('wrapper');

    this.RenderView = (view) => {
      this.screens.calculationsScreen.textContent = view.calculations;
      this.screens.currentValueScreen.textContent = view.currentValue;
      this.screens.resultScreen.textContent = view.result;
      this.view = view;
    };

    this.AddCalculationHistory = (calculation) => {
      let newElement = document.createElement('p');
      newElement.textContent = '2*4=16';
      newElement.classList.add('calculation-history-item');
      this.screens.historyScreen.appendChild(newElement);
    };

    this.ToogleDisplay = (element) => {
      if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        element.classList.add('visible');
        return;
      }
      element.classList.remove('visible');
      element.classList.add('hidden');
    };
    this.RenderView(view);
  }
}
