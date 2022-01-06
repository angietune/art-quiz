/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { images } from '../images';
import { Page } from './page';
import { Game } from './game';
import { Result } from './result';
import { randomArray } from './categories';
import { CATEGORY_SIZE } from './constants';

export class Modal extends Page {
  constructor() {
    super('div', ['modal', 'modal-window']);
    this.result = new Result();
  }

  addAnswer(right, mode) {
    const icon = document.createElement('div');
    icon.className = 'icon';
    if (mode) {
      icon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.58 51.2"><path d="M18,39.49c.05-.06.1-.1.11-.15.11-.37.19-.75.31-1.11s.29-.72.44-1.08A.5.5,0,0,0,19,37c.2-.6.39-1.2.59-1.8s.33-1,.52-1.51a6.37,6.37,0,0,1,.39-.73.5.5,0,0,0,.08-.2,2.94,2.94,0,0,1,.45-1.1c.13-.29.23-.59.34-.88s.22-.56.34-.84l.45-1c.11-.25.2-.52.32-.77s.3-.55.42-.83.2-.59.32-.88.23-.44.34-.67l.42-.87c.09-.18.18-.36.26-.54.3-.6.61-1.19.89-1.8s.45-1,.69-1.54c.18-.36.4-.69.59-1s.46-.91.7-1.36.47-.82.7-1.24.39-.76.6-1.13.49-.83.73-1.26.55-1.06.84-1.59c.19-.32.41-.62.59-.94s.29-.57.44-.84.39-.63.58-.94.48-.79.73-1.18.4-.6.59-.9.47-.79.71-1.19l.55-.84,1-1.51c.35-.52.66-1.07,1-1.57a5.57,5.57,0,0,1,1.65-1.7c.5-.27,1-.53,1.54-.78.33-.16.67-.31,1-.45.09,0,.2,0,.29,0l.67-.2a1.15,1.15,0,0,1,.17-.06C42.47.2,43.44.1,44.42,0,45,0,45.48.07,46,0A5,5,0,0,1,47.64.3a1.51,1.51,0,0,1,.91,1.62,4.34,4.34,0,0,1-1.06,1.64,9.78,9.78,0,0,0-.75.95c-.29.38-.58.76-.84,1.15s-.47.78-.72,1.16C44.79,7.4,44.37,8,44,8.54c-.23.35-.41.72-.63,1.08-.06.11-.15.2-.22.31-.27.44-.53.9-.81,1.33s-.46.64-.66,1-.41.72-.62,1.08c-.36.62-.71,1.25-1.08,1.86s-.65,1-1,1.48-.38.75-.59,1.11-.61,1-.9,1.47c-.15.25-.24.53-.39.78s-.39.63-.58,1-.47.82-.7,1.23-.41.77-.63,1.15l-.37.66c-.53,1-1.06,1.91-1.56,2.88-.31.6-.56,1.23-.87,1.83s-.65,1.19-1,1.79-.71,1.43-1,2.16c-.22.49-.39,1-.6,1.48-.09.22-.22.43-.33.64a3.9,3.9,0,0,0-.39.76,9.46,9.46,0,0,1-.76,1.72c-.24.5-.41,1-.61,1.55-.08.22-.18.43-.27.64-.23.48-.47,1-.68,1.45-.14.33-.22.68-.35,1s-.29.65-.43,1-.2.44-.28.67c-.2.58-.38,1.18-.6,1.76s-.47,1.06-.69,1.6c-.1.23-.17.48-.25.72a7.93,7.93,0,0,0-.33,1,2.19,2.19,0,0,1-.93,1.46,10.43,10.43,0,0,1-1.53.77,1.58,1.58,0,0,1-.32,0l-1.19.21a3.62,3.62,0,0,1-.46.06H17.65A2.18,2.18,0,0,1,16.42,51,.64.64,0,0,0,16,51a2.75,2.75,0,0,1-2.23-1.16A12.75,12.75,0,0,1,13,48.47l-1.15-1.71c-.3-.45-.59-.92-.89-1.37s-.51-.66-.74-1-.56-.91-.86-1.35-.72-1-1.08-1.44S7.41,40.45,7,39.89s-.72-.8-1.08-1.2a19.14,19.14,0,0,1-1.63-1.87A15.88,15.88,0,0,0,2.63,35c-.7-.77-1.42-1.52-2.07-2.33A2.59,2.59,0,0,1,0,31.24a1.62,1.62,0,0,1,.65-1.31c.47-.44,1-.84,1.47-1.24a2.46,2.46,0,0,1,.59-.28c.35-.12.7-.21,1-.31.51-.16,1-.33,1.53-.48a1.76,1.76,0,0,1,.46,0H7.31a3.89,3.89,0,0,1,2.07.7,7,7,0,0,1,1.79,1.77c.47.57,1,1.06,1.5,1.62s1,1.32,1.55,2,.83,1,1.22,1.56c.24.34.4.73.63,1.08s.46.62.67.95a4.54,4.54,0,0,1,.32.62c.2.42.38.86.6,1.27C17.73,39.29,17.9,39.37,18,39.49Z" style="fill:#fff"/></svg>';
      icon.style.backgroundColor = '#3aaa35';
      const audio = new Audio('assets/sounds/success.mp3');
      audio.volume = localStorage.getItem('volume');

      audio.play();
    } else {
      icon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.3 52.28"><path d="M27.2,27.2c-1.79,1.75-3.48,3.36-5.11,5A76.14,76.14,0,0,0,11.18,46.86c-.65,1.09-1.33,2.16-2,3.26-1.44,2.49-3.59,2.53-5.67,1.59a5.88,5.88,0,0,1-3.5-5.07A12.9,12.9,0,0,1,2,39a41.18,41.18,0,0,1,7.4-9.27A132.84,132.84,0,0,1,19.68,20.9l.71-.58a3.62,3.62,0,0,1-.66-.36A93.21,93.21,0,0,0,2.34,7.81,4.12,4.12,0,0,1,.11,3.13,4.06,4.06,0,0,1,4.15,0,12.87,12.87,0,0,1,10.26,1.5,45.56,45.56,0,0,1,20.69,8.68c2.18,1.92,4.27,4,6.37,6a.61.61,0,0,0,.94.09A87.61,87.61,0,0,1,40,7.62,34.5,34.5,0,0,1,47.88,4.7a26,26,0,0,1,3.31-.34,1.56,1.56,0,0,1,.55.12c.63.2.74.46.28.91-1.37,1.34-2.74,2.67-4.18,3.91-4.64,4-9.31,8-14,11.94l-.46.42,1.34,1.75a50.08,50.08,0,0,1,7,12,17.36,17.36,0,0,1,1.48,6.77,3.8,3.8,0,0,1-.16,1c-.11.41-.42.56-.78.33a8,8,0,0,1-1.55-1.13q-2.76-2.93-5.45-5.92c-2.57-2.88-5.1-5.79-7.65-8.68C27.47,27.6,27.37,27.44,27.2,27.2Z" style="fill:#fff"/></svg>';
      icon.style.backgroundColor = '#e6332a';
      const audio = new Audio('assets/sounds/failure.mp3');
      audio.volume = localStorage.getItem('volume');

      audio.play();
    }
    this.container.append(icon);
    const painting = document.createElement('div');
    painting.className = 'painting-right';
    painting.innerHTML = `<img class="modal-image fade-in-on-load" src=https://raw.githubusercontent.com/angietune/image-data/master/full/${right}full.jpg alt="">;`;
    this.container.append(painting);
    const author = document.createElement('div');
    author.className = 'painting-data';
    author.innerHTML = `
      <p>${images[right].name}</p>
      <p>${images[right].year}</p>
      <p>${images[right].author}</p>
    `;
    this.container.append(author);
  }

  addNext(counter) {
    const nextBtn = document.createElement('div');
    nextBtn.className = 'next';
    nextBtn.innerHTML = 'next';
    this.container.append(nextBtn);
    if (counter === CATEGORY_SIZE - 1) {
      nextBtn.onclick = () => this.addFinish();
    } else {
      counter += 1;
      nextBtn.onclick = () => Modal.nextQuestion(counter);
    }
  }

  static nextQuestion(counter) {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('on');
    overlay.classList.add('off');
    modal.innerHTML = '';
    const game = new Game();
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '';
    const category = localStorage.getItem('category');
    wrapper.append(game.render(category * 10, randomArray, counter));
  }

  addFinish() {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('on');
    overlay.classList.add('off');
    if (modal !== null) modal.remove();
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '';
    const category = localStorage.getItem('category');
    wrapper.append(this.result.render(category));
    const audio = new Audio('assets/sounds/success-fanfare.mp3');
    audio.volume = localStorage.getItem('volume');
    audio.play();
  }

  render(right, mode, counter) {
    this.container.innerHTML = '';
    this.addAnswer(right, mode);
    this.addNext(counter);
    return this.container;
  }
}
export default Modal;
