export default class Card {

  constructor(dataCard, cardSelector, handleCardClick, openPopupDelete, classApi, userId) {
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this._ownerId = dataCard.owner._id;
    this._cardId = dataCard._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupDelete = openPopupDelete;
    this._userId = userId;
    this._classApi = classApi;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _findOwnLike() {
    for (let i = 0; i < this._likes.length; i++) {
      if (this._likes[i]._id === this._userId) {
        return true;
      }
    }
  }

  _addRemoveLike(evt) {
    if (evt.target.classList.contains('card__btn-like_status_active')) {
      this._classApi.removeLike(this._cardId)
        .then((modifiedCard) => {
          evt.target.classList.remove('card__btn-like_status_active');
          this._likesCounter.textContent = modifiedCard.likes.length;
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      this._classApi.addLike(this._cardId)
        .then((modifiedCard) => {
          evt.target.classList.add('card__btn-like_status_active');
          this._likesCounter.textContent = modifiedCard.likes.length;
        })
    }

  }

  _setEventListeners() {
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
    this._like = this._cardElement.querySelector('.card__btn-like');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector('.card__title').textContent = this._name;

    this._likesCounter.textContent = this._likes.length;

    if (this._findOwnLike()) {
      this._like.classList.add('card__btn-like_status_active');
    }

    if (!(this._ownerId === this._userId)) {
      this._buttonDelete.style.display = 'none';
    }


    this._setEventListeners();

    return this._cardElement;
  }
}


