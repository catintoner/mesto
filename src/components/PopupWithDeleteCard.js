import Popup from "./Popup.js";

export default class PopupWithDeleteCard extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._deleteCard = deleteCard;
    this._buttonSubmitText = this._popup.querySelector('.popup__submit-btn');
  }

  isDeleting(isDeleting) {
    if (isDeleting) {
      this._buttonSubmitText.textContent = 'Удаление...';
    } else {
      this._buttonSubmitText.textContent = 'Удалить';
    }
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (this.deleting) {
        return;
      }
      this.deleting = true;
      this._deleteCard(this._cardElement, this._cardId);
    })

    super.setEventListeners();
  }

  openPopup(evt, cardId) {
    this._cardElement = evt.target.closest('.card');
    this._cardId = cardId;
    super.openPopup();
  }

  closePopup() {
    this.isDeleting(false);
    super.closePopup();
    this.deleting = false;
  }
}
