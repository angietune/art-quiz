/* eslint-disable import/no-cycle */
import { Page } from './page';
import { images } from '../images';
import { Game } from './game';
import shuffle from '../helpers/shuffle';
import { ART_NUMBERS, BY_ART, CATEGORY_SIZE } from './constants';

function getRandomArray() {
  const randomArray = [];
  for (let i = 0; i < CATEGORY_SIZE; i += 1) {
    randomArray.push(i);
  }
  return shuffle(randomArray);
}

export const randomArray = getRandomArray();

export class Categories extends Page {
  constructor() {
    super('div', ['categories']);
    this.game = new Game();
  }

  getCategories(type) {
    const categories = [];
    if (type === 'artist') {
      for (let i = 0; i < BY_ART; i += CATEGORY_SIZE) {
        categories.push(images[i]);
      }
    } else {
      for (let i = BY_ART; i < ART_NUMBERS; i += CATEGORY_SIZE) {
        categories.push(images[i]);
      }
    }
    this.addCategories(categories);
  }

  addTitle(type) {
    const title = document.createElement('h2');
    title.className = 'title';
    title.innerHTML = `round sets - by ${type}`;
    this.container.append(title);
  }

  async addCategories(items) {
    const categoriesContainer = document.createElement('div');
    categoriesContainer.className = 'categories-container';
    this.items = Array.from(items);
    this.items.forEach((item, id) => {
      let num = JSON.parse(localStorage.getItem(id));
      if (num === null) {
        num = [];
      }
      const categoryCard = document.createElement('div');
      categoryCard.className = 'category-card';
      categoryCard.innerHTML = `
      <div class="category-info-wrapper">
      <h2 class="category-num">${id + 1}</h2>
      <h4 class="category-progress">${num.length}/10</h4>
      </div>
      <img class="category-image fade-in-on-load" src="https://raw.githubusercontent.com/angietune/image-data/master/img/${
        item.imageNum
      }.jpg" alt="">
      `;
      categoriesContainer.append(categoryCard);
      categoryCard.onclick = () => this.startGame(item.imageNum);
      const svg = Categories.addRibbon(num);
      categoryCard.append(svg);
    });
    this.container.append(categoriesContainer);
  }

  static addRibbon(num) {
    const svg = document.createElement('div');
    svg.className = 'ribbon';
    svg.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225.71 290.31"><path d="M43.8,178.57C4.45,169.81,34.69,146.8,8.32,127-3.11,109.14,23.8,98.22,10.73,76.11,6.44,57.48,34.52,57.78,34.62,40.46c.6-9.85,5.81-19.66,16.87-19.87C69.4,24.27,74,6.06,87.48.1c12.72-1.41,23.14,12.36,35.81,4,27.83,12.62,50.6,35.27,61.18,64.24,19.56,48.94-2.26,114.75-51.27,136.05-24.39,22.72-26.26,2.18-48.59-1.92C53.78,211.09,60.74,192.51,43.8,178.57Zm55.12,1.63C190.81,197.06,223,63,133.36,36.37,35.33,11,.19,158.22,98.92,180.2Z" style="fill:#fcce66"/><path d="M140.32,202.37c74.57-47.84,64.93-164.28-17-198.31,12-8.58,24.07-1.93,30.68,9.55,10,12.45,35.12.33,37,22-2.32,21.34,30.7,21.52,24.27,42.88-5,11.15-2.85,22,4.37,31.64,9.43,18.1-20.44,25.36-14.24,43.93,1.46,10.95-2.59,17.42-13.11,20.91C164.85,181.26,177.37,213.94,140.32,202.37Z" style="fill:#f4b354"/><path d="M69.31,204.65c69.85-13.73,4,55.79-7.09,84-7,9.14-17.5-26.72-22.45-31.67Q54.53,230.8,69.31,204.65Z" style="fill:#ed5445"/><path d="M140.32,202.37c5.16,1.73,14.7-.27,17.4,3.94C167.32,223.19,177.1,240,186.4,257c-5.1,5.14-15.36,41.59-22.37,31.58q-21.54-37.66-43-75.35C127.13,208.87,132.42,203.07,140.32,202.37Z" style="fill:#fc705c"/><path d="M186.4,257c-9.13-17.68-20.52-34.51-29-52.32,15.36-1,13.79-19.67,25.1-26.11q21.51,37.71,43,75.42C228.83,264.59,193.74,254.73,186.4,257Z" style="fill:#ed5445"/><path d="M69.31,204.65C47.61,236,53,263.19,7.77,258.52c-3.3.31-10,.89-7-4.33,14.28-25.24,28.71-50.4,43-75.62C55.65,184.09,53.46,204.28,69.31,204.65Z" style="fill:#fc705c"/><path d="M98.92,180.2c-136.76-38.43-3.23-238.43,55.67-89.82-37.71,2.76-27.86-2.25-39.52-33.24-1.21-3.18-3.93-1-4.32,1.46-11.18,36.64-5.89,32.54-44,31.88-13.47.94,19.3,18.07,22.42,21.84,9.67,5.57-15.47,37.75-4.29,38.05,10-5.17,19.33-18,30-19.28,7.17,7.51,24.26,13.36,26.27,21.94C130.31,167.13,115.79,175.27,98.92,180.2Z" style="fill:#fc705c"/><path d="M154.59,90.38c-6.32-27.77-28.19-47.95-55.13-55.54C215.32,19.55,214.58,196.4,98.92,180.2c24.27-6.67,43.71-22.52,52.4-44.67,9.18-12.93-.86-32.93,11.1-41.5C166.2,89.43,157.1,90.52,154.59,90.38Z" style="fill:#ed5445"/><path d="M144.59,147.38c1.74,12.09-24.8-14.66-29.7-16.29C108,127.65,83.6,158.6,81.76,148c11.89-36.44,16.25-30.59-16.3-52.8-12.25-11.44,35,1.13,35.92-7.78,12.86-41.2,10.83-40.79,23.6.15,8.66,8.46,28-1.85,38.47,4.39C134.68,119.73,128,102.94,144.59,147.38Z" style="fill:#efeeee"/><path d="M144.59,147.38c-8.68-30.35-19.2-29.75,11.59-48.55C158.5,115.63,154.78,133.79,144.59,147.38Z" style="fill:#fc705d"/></svg>';
    if (num.length >= CATEGORY_SIZE) {
      svg.style.display = 'block';
    } else {
      svg.style.display = 'none';
    }
    return svg;
  }

  startGame(num, counter = 0) {
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '';
    wrapper.append(this.game.render(num, randomArray, counter));
    localStorage.setItem('category', Math.ceil(num / CATEGORY_SIZE));
  }

  render(type) {
    this.container.innerHTML = '';
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('on');
    overlay.classList.add('off');
    this.addTitle(type);
    this.getCategories(type);
    return this.container;
  }
}
export default Categories;
