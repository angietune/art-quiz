import { Page } from './page';
import { Result } from './result';

export class Results extends Page {
  constructor() {
    super('div', ['results']);
    this.result = new Result();
  }

  addTitle() {
    const result = document.createElement('div');
    result.className = 'result';
    const title = document.createElement('h2');
    title.className = 'title';
    title.innerHTML = 'results';
    result.append(title);
    this.container.append(result);
  }

  addType() {
    const btns = document.createElement('div');
    const byart = document.createElement('div');
    btns.className = 'btns-container';
    this.container.append(btns);
    const byartist = document.createElement('div');
    byartist.className = 'type-btn';
    byartist.innerHTML = 'by artist';
    btns.append(byartist);
    byartist.onclick = () => {
      this.addRoundsArtist();
      byartist.classList.add('btn-active');
      byart.classList.remove('btn-active');
    };
    byart.className = 'type-btn';
    byart.innerHTML = 'by art';
    btns.append(byart);
    byart.onclick = () => {
      this.addRoundsArt();
      byart.classList.add('btn-active');
      byartist.classList.remove('btn-active');
    };
  }

  addRoundsArtist() {
    const rounds = document.createElement('div');
    rounds.className = 'result-container';
    const container = document.querySelector('.result-container');
    if (container !== null) container.remove();
    this.container.append(rounds);
    for (let i = 0; i < 12; i += 1) {
      const round = document.createElement('div');
      round.className = 'results-round';
      round.innerHTML = `<svg class="circle-chart num${i}" viewbox="0 0 33.83098862 33.83098862" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
      <circle class="circle-chart__background" stroke="#efefef" stroke-width="4" fill="none" cx="16.91549431" cy="16.91549431" r="14" />
      <circle class="circle-chart__circle" id="num${i}" stroke-linecap="round" stroke="var(--purple)" stroke-width="4" stroke-dasharray="0,100" fill="none" cx="16.91549431" cy="16.91549431" r="14" />
      <g fill="var(--blue)" font-family: "Phosphate" font-size="7" font-weight="400"><text class="cat-text" x="17" y="13" style="text-anchor: middle;"> ${
        i + 1
      } </text>></g>
      <g fill="var(--orange)" font-family: "Phosphate" font-size="7" font-weight="400">
      <text class="svg-text" x="17" y="22" style="text-anchor: middle;"> 0/10 </text>
      </g>
      </svg>`;
      rounds.append(round);
      round.onclick = () => {
        this.container.innerHTML = '';
        this.container.append(this.result.render(i));
      };
      Results.getRes(i);
    }
    this.resetBtn();
  }

  addRoundsArt() {
    const rounds = document.createElement('div');
    rounds.className = 'result-container';
    const container = document.querySelector('.result-container');
    if (container !== null) container.remove();
    this.container.append(rounds);
    for (let i = 12; i < 24; i += 1) {
      const round = document.createElement('div');
      round.className = 'results-round';
      round.innerHTML = `<svg class="circle-chart num${i}" viewbox="0 0 33.83098862 33.83098862" width="140" height="140" xmlns="http://www.w3.org/2000/svg">
      <circle class="circle-chart__background" stroke="#efefef" stroke-width="4" fill="none" cx="16.91549431" cy="16.91549431" r="14" />
      <circle class="circle-chart__circle" id="num${i}" stroke="var(--purple)" stroke-width="4" stroke-dasharray="0,100" stroke-linecap="round" fill="none" cx="16.91549431" cy="16.91549431" r="14" />
      <g fill="var(--blue)" font-family: "Phosphate" font-size="7" font-weight="400"><text class="cat-text" x="17" y="13" style="text-anchor: middle;"> ${
        i - 11
      } </text>></g>
      <g fill="var(--orange)" font-family: "Phosphate" font-size="7" font-weight="400">
      <text class="svg-text" x="17" y="22" style="text-anchor: middle;"> 0/10 </text>
      </g>
      </svg>`;
      rounds.append(round);
      round.onclick = () => {
        this.container.innerHTML = '';
        this.container.append(this.result.render(i));
      };
      Results.getRes(i);
    }
    this.resetBtn();
  }

  static async getRes(i) {
    const num = await JSON.parse(localStorage.getItem(i));
    let numRes = null;
    if (num !== null) {
      numRes = num.length * 10;
    }
    if (numRes !== null) {
      const svg = document.querySelector(`.num${i}`);
      const circle = await svg.getElementById(`num${i}`);
      if (numRes / 10 === 10) {
        setTimeout(() => circle.setAttribute('stroke', 'var(--green)'), 1800);
      }
      const text = svg.querySelector('.svg-text');
      circle.setAttribute('stroke-dasharray', `${numRes - 5},100`);
      text.innerHTML = `${num.length}/10`;
    }
  }

  resetBtn() {
    const results = document.querySelector('.results');
    const center = document.querySelector('.center');
    if (center !== null) center.remove();
    const btn = document.createElement('div');
    btn.className = 'type-btn center';
    btn.innerHTML = 'reset results';
    results.append(btn);
    btn.onclick = () => {
      const sound = localStorage.getItem('volume');
      const timer = localStorage.getItem('timer');
      localStorage.clear();
      localStorage.setItem('volume', sound);
      localStorage.setItem('timer', timer);
      this.render();
    };
  }

  render() {
    this.container.innerHTML = '';
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('on');
    overlay.classList.add('off');

    this.addTitle();
    this.addType();
    return this.container;
  }
}
export default Results;
