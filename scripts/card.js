import { openPopUp } from "./index.js";

export class Card {

  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _addRemoveLike() {
    this._like.classList.toggle('card__btn-like_status_active');
  }

  _openPopUpPicture() {
    const popUpPicture = document.querySelector('.popup_type_picture');
    const imagePopUp = popUpPicture.querySelector('.popup__image');
    const namePopUp = popUpPicture.querySelector('.popup__caption');
    imagePopUp.src = this._link;
    imagePopUp.alt = this._name;
    namePopUp.textContent = this._name;
    openPopUp(popUpPicture);
  }

  _setEventListeners() {
    this._like = this._cardElement.querySelector('.card__btn-like');
    this._like.addEventListener('click', () => {
      this._addRemoveLike();
    });
    this._cardElement.querySelector('.card__trash').addEventListener('click', () => {
      this._cardElement.remove();
    });
    this._cardElement.querySelector('.card__photo').addEventListener('click', () => {
      this._openPopUpPicture();
    })
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardElement.querySelector('.card__photo').src = this._link;
    this._cardElement.querySelector('.card__photo').alt = this._name;
    this._cardElement.querySelector('.card__title').textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
