import Popup from "./Popup.js";

export default class PopupWithDeleteCard extends Popup {
  constructor(popupSelector, deleteCard) {
    super(popupSelector);
    this._deleteCard = deleteCard;
    this._buttonSubmitText = this._popup.querySelector('.popup__submit-btn');
    this._defaultSubmitText = this._buttonSubmitText.textContent;
  }

  renderDeleting(isLoading, buttonText) {
    if (isLoading) {
      this._buttonSubmitText.textContent = buttonText;
    } else {
      this._buttonSubmitText.textContent = this._defaultSubmitText;
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

  openPopup(cardElement, cardId) {
    this._cardElement = cardElement;
    this._cardId = cardId;
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
    this.deleting = false;
  }
}
