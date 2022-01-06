import { Page } from './page';

export class Footer extends Page {
  constructor() {
    super('div', ['footer']);
  }

  addCredit() {
    const credit = document.createElement('a');
    credit.href = 'https://github.com/angietune';
    credit.className = 'credit';
    credit.style.background = 'url("assets/svg/gh.svg") no-repeat';
    credit.innerHTML = 'angietune';
    this.container.append(credit);
  }

  addCopywrite() {
    const copywrite = document.createElement('a');
    copywrite.href = 'https://rs.school';
    copywrite.className = 'copywrite';
    copywrite.style.background = 'url("assets/svg/rs.svg") no-repeat';
    this.container.append(copywrite);
  }

  render() {
    this.addCredit();
    this.addCopywrite();
    return this.container;
  }
}
export default Footer;
