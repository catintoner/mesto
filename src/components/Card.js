export default class Card {

  constructor(dataCard, cardSelector, handleCardClick, openPopupDelete) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this._ownerId = dataCard.owner._id;
    this._cardId = dataCard._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupDelete = openPopupDelete;
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
    this._cardElement.querySelector('.card__trash').addEventListener('click', (evt) => {
      this._openPopupDelete(evt, this._cardId);
    });
    this._cardElement.addEventListener('click', (evt) => {
      this._handleCardClick(evt, { name: this._name, link: this._link });
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector('.card__photo');
    this._likesCounter = this._cardElement.querySelector('.card__likes-counter');
    this._buttonDelete = this._cardElement.querySelector('.card__trash');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector('.card__title').textContent = this._name;

    this._likesCounter.textContent = this._likes.length;

    if (!(this._ownerId === 'e068e5b3c049f6c10743f57d')) {
      this._buttonDelete.style.display = 'none';
    }


    this._setEventListeners();

    return this._cardElement;
  }
}
