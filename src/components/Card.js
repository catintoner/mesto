export default class Card {

  constructor(dataCard, cardSelector, handleCardClick, openPopupDelete, handleLikeClick, userId) {
    this._dataCard = dataCard;
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._ownerId = dataCard.owner._id;
    this._cardId = dataCard._id;
    this._statusLikeClass = 'card__btn-like_status_active';
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupDelete = openPopupDelete;
    this._userId = userId;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _countLikes(cardInfo) {
    this._likes = cardInfo.likes;
    this._likesCounter.textContent = cardInfo.likes.length;
  }

  _findOwnLike() {
    return Boolean(this._likes.find(item => item._id === this._userId));
  }


  _addLike(modifiedCard) {
    this._countLikes(modifiedCard);
    this._like.classList.add(this._statusLikeClass);

  }

  _removeLike(modifiedCard) {
    this._countLikes(modifiedCard);
    this._like.classList.remove(this._statusLikeClass);
  }

  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLikeClick({
        like: this._addLike.bind(this),
        dislike: this._removeLike.bind(this)
      }, this._findOwnLike(), this._cardId);
    });
    this._cardElement.querySelector('.card__trash').addEventListener('click', (() => {
      this._openPopupDelete(this._cardId, this._deleteCard.bind(this));
    }));
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
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

    this._countLikes(this._dataCard);

    if (this._findOwnLike()) {
      this._like.classList.add(this._statusLikeClass);
    }

    if (!(this._ownerId === this._userId)) {
      this._buttonDelete.classList.add('card__trash_type_hidden');
    }

    this._setEventListeners();

    return this._cardElement;
  }
}


