class View {
  constructor() {
    this.buttons = {
      computeButton: document.getElementById('compute-button'),
      eraseCurrentButton: document.getElementById('erase-current-button'),
      eraseAllButton: document.getElementById('erase-all-button'),
    };
    this.windows = {
      resultWindow: document.getElementById('result-window'),
      calculationWindow: document.getElementById('calculations-window'),
    };
    this.writeables = document.querySelectorAll('.writeable');
    this.Write = (element) => {
      console.log(element.textContent);
    };
  }
}
