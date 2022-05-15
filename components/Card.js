export class Card {

  constructor(name, link, cardSelector, openPopupPicture) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._openPopupPicture = openPopupPicture
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _addRemoveLike() {
    this._like.classList.toggle('card__btn-like_status_active');
  }

  _setEventListeners() {
    this._like = this._cardElement.querySelector('.card__btn-like');
    this._like.addEventListener('click', () => {
      this._addRemoveLike();
    });
    this._cardElement.querySelector('.card__trash').addEventListener('click', () => {
      this._cardElement.remove();
      this._cardElement = null;
    });
    this._cardImage.addEventListener('click', () => {
      this._openPopupPicture(this._name, this._link);
    })
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__photo');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
