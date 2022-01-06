/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { Page } from './page';
import { Game } from './game';
import { Result } from './result';
import { randomArray } from './categories';

export class ModalTimer extends Page {
  constructor() {
    super('div', ['modal-timer', 'modal-window']);
    this.result = new Result();
  }

  addMessage(counter) {
    const message = document.createElement('h2');
    message.className = 'modal-message';
    message.innerHTML = 'Time is up!';
    this.container.append(message);
    const nextBtn = document.createElement('div');
    nextBtn.className = 'next';
    nextBtn.innerHTML = 'next';
    this.container.append(nextBtn);
    if (counter === 9) {
      nextBtn.onclick = () => {
        this.addFinish();
      };
    } else {
      counter += 1;
      nextBtn.onclick = () => {
        ModalTimer.nextQuestion(counter);
      };
    }
  }

  static nextQuestion(counter) {
    const modal = document.querySelector('.modal-timer');
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
    const modal = document.querySelector('.modal-timer');
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('on');
    overlay.classList.add('off');
    if (modal !== null) modal.remove();
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '';
    const category = localStorage.getItem('category');
    wrapper.append(this.result.render(category));
    const audio = new Audio('images/sounds/success-fanfare.mp3');
    audio.volume = localStorage.getItem('volume');
    audio.play();
  }

  render(counter) {
    this.container.innerHTML = '';
    this.addMessage(counter);
    return this.container;
  }
}
export default ModalTimer;
