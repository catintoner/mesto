export default class Card {

  constructor(dataCard, cardSelector, handleCardClick, openPopupDelete) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupDelete = openPopupDelete
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
      this._openPopupDelete();
      // this._cardElement.remove();
      // this._cardElement = null;
    });
    this._cardElement.addEventListener('click', (evt) => {
      this._handleCardClick(evt, { name: this._name, link: this._link });
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__photo');
    this._likesCounter = this._cardElement.querySelector('.card__likes-counter');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if (this._likes) {
      this._likesCounter.textContent = this._likes.length;
    } else {
      this._likesCounter.textContent = '0'
    }

    this._cardElement.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
