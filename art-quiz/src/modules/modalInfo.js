import { Page } from './page';
import { images } from '../images';

export class ModalInfo extends Page {
  constructor() {
    super('div', ['modal-info', 'modal-window']);
  }

  addInfo(paintingNum) {
    const painting = document.createElement('div');
    painting.className = 'painting-right';
    painting.innerHTML = `<img class="modal-image fade-in-on-load" src=https://raw.githubusercontent.com/angietune/image-data/master/full/${paintingNum}full.jpg alt="">;`;
    this.container.append(painting);
    const author = document.createElement('div');
    author.className = 'painting-data';
    author.innerHTML = `
      <p>${images[paintingNum].name}</p>
      <p>${images[paintingNum].year}</p>
      <p>${images[paintingNum].author}</p>
    `;
    this.container.append(author);
    const ok = document.createElement('div');
    ok.className = 'ok-btn';
    ok.innerHTML = 'ok';
    this.container.append(ok);
    ok.onclick = () => {
      ModalInfo.closeModal();
    };
  }

  static closeModal() {
    const modal = document.querySelector('.modal-info');
    modal.remove();
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('on');
    overlay.classList.add('off');
  }

  render(paintingNum) {
    this.container.innerHTML = '';
    this.addInfo(paintingNum);
    return this.container;
  }
}
export default ModalInfo;
