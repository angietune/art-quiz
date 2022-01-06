import { Page } from './page';
import { Main } from './main';

export class Header extends Page {
  constructor() {
    super('div', ['header']);
    this.main = new Main();
  }

  addHome() {
    const homeBtn = document.createElement('div');
    homeBtn.className = 'home';
    homeBtn.style.background = 'url("assets/svg/home.svg") no-repeat center';
    this.container.append(homeBtn);
    homeBtn.addEventListener('click', () => {
      const wrapper = document.querySelector('.wrapper');
      wrapper.innerHTML = '';
      wrapper.append(this.main.render(this.counter));
    });
  }

  addLogo() {
    const logo = document.createElement('div');
    logo.className = 'logo-small';
    logo.style.background = 'url("assets/svg/logo.svg") no-repeat center';
    logo.innerHTML = 'quiz';
    this.container.append(logo);
  }

  addSettings() {
    const settingsBtn = document.createElement('div');
    settingsBtn.className = 'settings';
    settingsBtn.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
    `;
    this.container.append(settingsBtn);
    settingsBtn.onclick = () => {
      const modal = document.querySelector('.settings-modal');
      const overlay = document.querySelector('.overlay');
      overlay.classList.add('on');
      modal.classList.add('on');
    };
  }

  render() {
    this.addHome();
    this.addLogo();
    this.addSettings();
    return this.container;
  }
}
export default Header;
