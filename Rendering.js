class Rendering {
  constructor(view) {
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
    this.RenderView(view);
  }
}
