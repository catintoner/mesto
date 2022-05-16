export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.reverse().forEach(item => {
      this.addItem(this._renderer(item));
      // this._container.append(this._renderer(item));
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
