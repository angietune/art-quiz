/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-named-as-default */
import Header from './modules/header';
import Main from './modules/main';
import Footer from './modules/footer';
import Settings from './modules/settings';

export class App {
  constructor() {
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
    this.settings = new Settings();
  }

  run() {
    const container = document.querySelector('.container');
    container.append(this.header.render());
    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';
    const main = this.main.render();
    wrapper.innerHTML = ' ';
    wrapper.append(main);
    container.append(wrapper);
    container.append(this.footer.render());
    document.body.append(this.settings.render());
  }
}
