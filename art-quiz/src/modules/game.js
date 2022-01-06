/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-expressions */
import { Page } from './page';
import { images } from '../images';
import { Modal } from './modal';
import { ModalTimer } from './modalTimer';
import { BY_ART } from './constants';
import getRandomNum from '../helpers/getRandomNum';
import shuffle from '../helpers/shuffle';

let id = null;

export class Game extends Page {
  constructor() {
    super('div', ['game']);
  }

  getQuestion(num, randomArray, counter) {
    const roundNum = Number(num);
    const countNum = Number(counter);
    const paintingNum = randomArray[countNum] + roundNum;
    const paintingUrl = `https://raw.githubusercontent.com/angietune/image-data/master/full/${paintingNum}full.jpg`;
    this.addPainting(paintingUrl);
    this.addAnswers(paintingNum, num, counter);
  }

  getPaintingQuestion(num, randomArray, counter) {
    const roundNum = Number(num);
    const countNum = Number(counter);
    const paintingNum = randomArray[countNum] + roundNum;
    const question = document.createElement('h4');
    question.className = 'question';
    question.innerHTML = `What painting was written by ${images[paintingNum].author}?`;
    this.container.append(question);
    this.addPaintingAnswers(paintingNum, num, counter);
  }

  addQuestion(num, randomArray, counter) {
    const question = document.createElement('h4');
    question.className = 'question';
    question.innerHTML = 'Who is the author of this painting?';
    this.container.append(question);
    this.getQuestion(num, randomArray, counter);
  }

  addPainting(paintingUrl) {
    const painting = document.createElement('div');
    painting.className = 'painting';
    painting.innerHTML = `<img class="game-image fade-in-on-load" src=${paintingUrl} alt="">`;
    this.container.append(painting);
  }

  addPaintingAnswers(paintingNum, num, counter) {
    const answersAll = new Set();
    const right = images[paintingNum].imageNum;
    answersAll.add(right);
    for (let i = 0; answersAll.size <= 3; i += 1) {
      const wrong = Math.abs(getRandomNum()) + Number(num);
      answersAll.add(images[wrong].imageNum);
    }
    const newArr = shuffle(Array.from(answersAll));
    const answers = document.createElement('div');
    answers.className = 'paint-answers';
    newArr.forEach((ans) => {
      const answer = document.createElement('div');
      answer.className = 'answers-container';
      answer.innerHTML = `<img class="answer-image fade-in-on-load" src="https://raw.githubusercontent.com/angietune/image-data/master/img/${ans}.jpg" alt="">`;
      answers.append(answer);
      answer.onclick = () => {
        Game.checkAnswer(right, ans, counter);
        Game.setOverlay();
      };
    });
    this.container.append(answers);
  }

  addAnswers(paintingNum, num, counter) {
    const answersAll = new Set();
    const right = images[paintingNum].imageNum;
    answersAll.add(right);
    for (let i = 0; answersAll.size <= 3; i += 1) {
      const wrong = Math.abs(getRandomNum()) + Number(num);
      answersAll.add(images[wrong].imageNum);
    }
    const newArr = shuffle(Array.from(answersAll));
    const answers = document.createElement('div');
    answers.className = 'answers';
    newArr.forEach((ans) => {
      const answer = document.createElement('div');
      answer.className = 'answer';
      answer.innerHTML = `${images[ans].author}`;
      answers.append(answer);
      answer.onclick = () => {
        Game.checkAnswer(right, ans, counter);
        Game.setOverlay();
      };
    });
    this.container.append(answers);
  }

  static setOverlay() {
    const overlay = document.querySelector('.overlay');
    overlay.className = 'overlay on';
    overlay.onclick = () => overlay.classList.remove('off');
  }

  static async checkAnswer(right, ans, counter) {
    clearTimeout(id);
    const timerBar = document.querySelector('.timer-bar');
    if (timerBar) timerBar.remove();
    const round = JSON.parse(localStorage.getItem('category'));
    if (right === ans) {
      const modal = new Modal();
      const wrapper = document.querySelector('.wrapper');
      wrapper.append(modal.render(right, true, counter));
      const values = (await JSON.parse(localStorage.getItem(round))) || [];
      values.push(ans);
      const newSet = new Set(values);
      localStorage.setItem(round, JSON.stringify(Array.from(newSet)));
    } else {
      const modal = new Modal();
      const wrapper = document.querySelector('.wrapper');
      wrapper.append(modal.render(right, false, counter));
    }
  }

  addTimer(sec, counter) {
    this.modalTimer = new ModalTimer();
    const timer = document.createElement('div');
    timer.className = 'timer-bar';
    timer.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(100%)' }], {
      duration: Number(sec),
      fill: 'forwards',
    });
    this.container.append(timer);
    id = setTimeout(() => {
      this.container.append(this.modalTimer.render(counter));
      Game.setOverlay();
    }, sec);
  }

  render(num, randomArray, counter) {
    this.container.innerHTML = '';
    const timerOn = localStorage.getItem('timer');
    timerOn === 'off' ? null : this.addTimer(timerOn * 1000, counter);
    num < BY_ART ? this.addQuestion(num, randomArray, counter) : this.getPaintingQuestion(num, randomArray, counter);
    return this.container;
  }
}
export default Game;
