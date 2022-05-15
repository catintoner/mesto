export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}


function addCards(name, link, cardSelector) {
  const card = new Card(name, link, cardSelector, openPopupPicture);
  const cardElement = card.generateCard();
  return cardElement;
};
