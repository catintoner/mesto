import Popup from "./Popup.js";

export default class PopupWithDeleteCard extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._deleteCard = deleteCard;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteCard(this._cardElement, this._cardId);
      this.closePopup();
    })

    super.setEventListeners();
  }

  openPopup(evt, cardId) {
    this._cardElement = evt.target.closest('.card');
    this._cardId = cardId;
    super.openPopup();
  }
}
