export default class Card {

  constructor(dataCard, cardSelector, handleCardClick) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._likesCounter = dataCard.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _addRemoveLike(evt) {
    evt.target.classList.toggle('card__btn-like_status_active');
  }

  _setEventListeners() {
    this._like = this._cardElement.querySelector('.card__btn-like');
    this._like.addEventListener('click', this._addRemoveLike.bind(this));
    this._cardElement.querySelector('.card__trash').addEventListener('click', () => {
      this._cardElement.remove();
      this._cardElement = null;
    });
    this._cardElement.addEventListener('click', (evt) => {
      this._handleCardClick(evt, { name: this._name, link: this._link });
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__photo');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector('.card__likes-counter').textContent = this._likesCounter.length;
    this._cardElement.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
