import { Page } from './page';
import { Categories } from './categories';

export class Main extends Page {
  constructor() {
    super('div', ['main']);
    this.categories = new Categories();
  }

  addLogo() {
    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.style.background = 'url("assets/svg/logo.svg") no-repeat center';
    logo.innerHTML = 'quiz';
    this.container.append(logo);
  }

  addArtistBtn(counter) {
    const artist = document.createElement('div');
    artist.className = 'artist';
    artist.innerHTML = 'Artists';
    this.container.append(artist);
    artist.onclick = () => {
      localStorage.setItem('type', 'artist');
      const wrapper = document.querySelector('.wrapper');
      wrapper.innerHTML = '';
      wrapper.append(this.categories.render('artist', counter));
    };
  }

  addArtistBtn2(counter) {
    const artist2 = document.createElement('div');
    artist2.className = 'artist';
    artist2.innerHTML = 'Arts';
    this.container.append(artist2);
    artist2.onclick = () => {
      localStorage.setItem('type', 'art');
      const wrapper = document.querySelector('.wrapper');
      wrapper.innerHTML = '';
      wrapper.append(this.categories.render('art', counter));
    };
  }

  render(counter) {
    this.container.innerHTML = '';
    this.addLogo();
    this.addArtistBtn(counter);
    this.addArtistBtn2(counter);
    return this.container;
  }
}
export default Main;
