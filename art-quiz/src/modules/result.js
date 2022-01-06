import { Page } from './page';
import { ModalInfo } from './modalInfo';
import { CATEGORY_SIZE } from './constants';

export class Result extends Page {
  constructor() {
    super('div', ['result']);
    this.modalInfo = new ModalInfo();
  }

  addTitle(num) {
    const result = document.createElement('div');
    result.className = 'result-title';
    const title = document.createElement('h2');
    const round = document.createElement('h2');
    round.className = 'round-number';
    round.innerHTML = `${Math.floor(num) + 1}`;
    title.className = 'title';
    title.innerHTML = 'round';
    result.append(title);
    result.append(round);
    this.container.append(result);
  }

  addResult(num) {
    const resultContainer = document.createElement('div');
    const rightAnswers = localStorage.getItem(num);
    resultContainer.className = 'round-result-container';
    for (let i = 0; i < 10; i += 1) {
      const resultCard = document.createElement('div');
      resultCard.className = 'result-card';
      if (rightAnswers !== null) {
        if (rightAnswers.includes(num * CATEGORY_SIZE + i)) {
          resultCard.classList.add('result-success');
        }
      }
      resultCard.innerHTML = `
      <img class="result-image fade-in-on-load" src="https://raw.githubusercontent.com/angietune/image-data/master/img/${
        num * 10 + i
      }.jpg" alt="">
      `;
      resultContainer.append(resultCard);
      resultCard.onclick = () => this.showPainting(num * CATEGORY_SIZE + i);
    }
    this.container.append(resultContainer);
  }

  showPainting(paintingNum) {
    this.container.append(this.modalInfo.render(paintingNum));
  }

  addRound(category) {
    const round = document.createElement('div');
    round.className = 'result-round';
    round.innerHTML = `<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" width="150" height="150" xmlns="http://www.w3.org/2000/svg">
      <circle class="circle-chart__background" stroke="#efefef" stroke-width="5" fill="none" cx="16.91549431" cy="16.91549431" r="14" />
      <circle class="circle-chart__circle" stroke="var(--purple)" stroke-linecap="round" stroke-width="5" stroke-dasharray="0,100" fill="none" cx="16.91549431" cy="16.91549431" r="14" />
      <g fill="var(--orange)" font-family="Verdana, serif" font-size="7" font-weight="400">
      <text class="svg-text" x="17" y="20" style="text-anchor: middle;"> 0/10 </text>
      </g>
      </svg>`;
    this.container.append(round);
    Result.getRes(category);
  }

  static async getRes(i) {
    const num = await JSON.parse(localStorage.getItem(i));
    let numRes = null;
    if (num !== null) {
      numRes = num.length * CATEGORY_SIZE;
    }
    const svg = document.querySelector('.circle-chart');
    const circle = svg.querySelector('.circle-chart__circle');
    if (numRes / CATEGORY_SIZE === CATEGORY_SIZE) {
      setTimeout(() => circle.setAttribute('stroke', 'var(--green)'), 1800);
    }
    const text = svg.querySelector('.svg-text');
    if (numRes !== null) {
      circle.setAttribute('stroke-dasharray', `${numRes - 5},100`);
      text.innerHTML = `${num.length}/10`;
    }
  }

  render(category) {
    this.container.innerHTML = '';
    this.addTitle(category);
    this.addRound(category);
    this.addResult(category);
    return this.container;
  }
}
export default Result;
