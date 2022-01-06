import { Page } from './page';
import { Categories } from './categories';
import { Results } from './results';

export class Settings extends Page {
  constructor() {
    super('div', ['settings-modal', 'modal-window']);
    this.categories = new Categories();
    this.results = new Results();
  }

  closeBtn() {
    const closeBtn = document.createElement('div');
    closeBtn.className = 'settings-close';
    closeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33.28 33.28"><rect x="-6.32" y="15.27" width="45.93" height="2.74" rx="1.37" transform="translate(40.17 16.65) rotate(135)" style="fill:#bbbaba"/><rect x="-6.32" y="15.27" width="45.93" height="2.74" rx="1.37" transform="translate(16.64 -6.9) rotate(45)" style="fill:#bbbaba"/></svg>
    `;
    this.container.append(closeBtn);
    closeBtn.onclick = () => {
      const modal = document.querySelector('.settings-modal');
      const overlay = document.querySelector('.overlay');
      overlay.classList.remove('on');
      overlay.classList.add('off');
      modal.classList.remove('on');
      return modal.classList.add('off');
    };
  }

  openSettings() {
    const settingsWindow = document.createElement('div');
    settingsWindow.className = 'settings-window';
    this.container.append(settingsWindow);
    this.addSettings(settingsWindow);
  }

  addSettings(settingsWindow) {
    const categories = document.createElement('div');
    categories.className = 'settings-categories';
    categories.innerHTML = 'round sets';
    settingsWindow.append(categories);
    const type = localStorage.getItem('type');
    categories.onclick = () => {
      const wrapper = document.querySelector('.wrapper');
      wrapper.innerHTML = '';
      wrapper.append(this.categories.render(type));
      const modal = document.querySelector('.settings-modal');
      modal.classList.remove('on');
      return modal.classList.add('off');
    };
    const results = document.createElement('div');
    results.className = 'settings-result';
    results.innerHTML = 'results';
    settingsWindow.append(results);
    results.onclick = () => {
      const wrapper = document.querySelector('.wrapper');
      wrapper.innerHTML = '';
      wrapper.append(this.results.render());
      const modal = document.querySelector('.settings-modal');
      modal.classList.remove('on');
      return modal.classList.add('off');
    };
    const sound = document.createElement('div');
    sound.className = 'settings-sound';
    settingsWindow.append(sound);
    Settings.setSound(settingsWindow);
    const timer = document.createElement('div');
    timer.className = 'settings-timer';
    settingsWindow.append(timer);
    this.setTimer(settingsWindow);
  }

  static setSound(settingsWindow) {
    const sound = document.createElement('div');
    sound.className = 'sound';
    sound.innerHTML = `
    <div class="sound-container">
      <h4>sound</h4>
      <div class="sound-settings">
        <div class="sound-on">
            <span>on</span>
            <label class="form-switch">
            <input class="volume-switch" type="checkbox">
            <i></i>
            </label>
            <span>off</span>
        </div>
        <div class="sound-vol">
            <span>-</span>
            <label class="form-volume">
            <input class="volume-bar" type="range">
            <i></i>
            </label>
            <span>+</span>
        </div>
        </div>
    </div>
`;
    settingsWindow.append(sound);
    const volume = sound.querySelector('.volume-bar');
    volume.addEventListener('input', (e) => Settings.setVolume(e));
    const volumeSwitch = sound.querySelector('.volume-switch');
    volumeSwitch.addEventListener('change', () => Settings.toggleVolume());
  }

  static toggleVolume() {
    const volume = document.querySelector('.volume-bar');
    const volumeSwitch = document.querySelector('.volume-switch');
    if (volumeSwitch.checked) {
      localStorage.setItem('volume', '0');
      volume.value = 0;
    } else {
      localStorage.setItem('volume', '0.5');
      volume.value = 0.5;
    }
  }

  static setVolume(e) {
    let audioVolume = localStorage.getItem('volume');
    audioVolume = e.target.value / 100;
    localStorage.setItem('volume', audioVolume);
  }

  setTimer(settingsWindow) {
    const timer = document.createElement('div');
    timer.className = 'timer';
    timer.innerHTML = `
    <div class="timer-container">
      <h4>timer</h4>
      <div class="timer-settings">
        <div class="timer-on">
            <span>on</span>
            <label class="form-switch">
            <input class="input-switch" type="checkbox">
            <i></i>
            </label>
            <span>off</span>
        </div>
        <div class="time">
            <div class="minus"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.17 150.68"><path d="M101.64,150.68c-4.71-.85-8.6-3.36-12.46-6q-40-27.42-80-54.78c-3.38-2.31-6.32-5-8-8.83C-1.31,75.28.17,68.69,5.09,64a31.78,31.78,0,0,1,4-3.21Q50.26,32.6,91.43,4.45c3-2,6.06-3.82,9.71-4.32C107-.67,111.25,2.22,112.51,8a28.59,28.59,0,0,1,.64,6.12q0,61.17,0,122.34a27.94,27.94,0,0,1-.79,6.69,9.78,9.78,0,0,1-7.76,7.54Z" style="fill:#36a9e1"/></svg></div>
            <label class="form-volume">
            <input type="number" class="timer-input" value="5" step="5" min="5" max="30" readonly>
            <i></i>
            </label>
            <div class="plus"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 113.17 150.68"><path d="M11.53,0C16.24.85,20.14,3.36,24,6q40,27.42,80,54.78c3.37,2.31,6.31,5,8,8.82,2.51,5.8,1,12.39-3.89,17.07a31.69,31.69,0,0,1-4,3.21q-41.14,28.2-82.32,56.35c-3,2-6.07,3.82-9.72,4.32-5.84.8-10.11-2.1-11.37-7.86A29.3,29.3,0,0,1,0,136.57Q0,75.4,0,14.23A28.34,28.34,0,0,1,.82,7.54,9.78,9.78,0,0,1,8.59,0Z" style="fill:#36a9e1"/></svg></div>
            <div>sec</div>
        </div>
      </div>
    </div>
`;
    settingsWindow.append(timer);
    const inputSwitch = timer.querySelector('.input-switch');
    const timerInput = timer.querySelector('.timer-input');
    const plus = timer.querySelector('.plus');
    const minus = timer.querySelector('.minus');
    plus.addEventListener('click', () => {
      timerInput.stepUp();
      Settings.getTimerValue();
    });
    minus.addEventListener('click', () => {
      timerInput.stepDown();
      Settings.getTimerValue();
    });
    inputSwitch.addEventListener('change', () => Settings.toggleTimer());
    timerInput.addEventListener('change', () => Settings.setTimerValue());
  }

  static toggleTimer() {
    const timerSwitch = document.querySelector('.input-switch');
    if (timerSwitch.checked) {
      localStorage.setItem('timer', 'off');
    } else {
      localStorage.setItem('timer', '5');
    }
  }

  static getTimerValue() {
    const timerInput = document.querySelector('.timer-input');
    localStorage.setItem('timer', timerInput.value);
  }

  static setTimerValue() {
    const timerInput = document.querySelector('.timer-input');
    const timer = localStorage.getItem('timer');
    timerInput.value = timer;
  }

  addLogo() {
    const logo = document.createElement('div');
    logo.className = 'logo-medium';
    logo.style.background = 'url("assets/svg/logo.svg") no-repeat center';
    logo.innerHTML = 'quiz';
    this.container.append(logo);
  }

  static setOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay off';
    document.body.append(overlay);
    overlay.addEventListener('click', () => Settings.handleClick());
  }

  static handleClick() {
    const modal = document.querySelector('.settings-modal');
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('on');
    overlay.classList.add('off');
    modal.classList.remove('on');
    modal.classList.add('off');
  }

  render() {
    localStorage.setItem('volume', '0.5');
    localStorage.setItem('timer', '5');
    this.container.innerHTML = '';
    this.closeBtn();
    this.openSettings();
    this.addLogo();
    Settings.setOverlay();
    return this.container;
  }
}
export default Settings;
