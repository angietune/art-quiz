export class Page {
  container;

  constructor(tag, styles) {
    this.container = document.createElement(tag);
    this.container.classList.add(...styles);
  }

  render() {
    return this.container;
  }
}
export default Page;
