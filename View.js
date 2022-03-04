class View {
  constructor() {
    this.states = ['initial', 'running'];
    let state = this.states[0];
    this.buttons = {
      computeButton: document.getElementById('compute-button'),
      eraseCurrentButton: document.getElementById('erase-current-button'),
      eraseAllButton: document.getElementById('erase-all-button'),
    };
    this.screens = {
      resultScreen: document.getElementById('result-screen'),
      calculationsScreen: document.getElementById('calculations-screen'),
    };
    this.writeables = document.querySelectorAll('.writeable');
    this.getState = state;
    this.resetState = () => {
      state = this.states[0];
    };
    this.write = (element) => {
      const value = element.textContent;
      const screen = this.screens.calculationsScreen;
      if (state === this.states[0]) {
        screen.textContent = value;
        state = this.states[1];
        return;
      }
      screen.textContent = screen.textContent + value;
    };
    this.clearAllScreens = () => {
      this.clearScreen(this.screens.resultScreen);
      this.clearScreen(this.screens.calculationsScreen);
      this.resetState();
    };
    this.clearCalculationsScreen = () => {
      this.clearScreen(this.screens.calculationsScreen);
    };
    this.clearScreen = (screen) => {
      screen.textContent = 0;
    };
    this.init = () => {
      this.clearAllScreens();
      this.resetState();
    };
    this.init();
  }
}
