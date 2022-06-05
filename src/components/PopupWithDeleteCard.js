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
      this._deleteCard(this._cardId, this._deleteRenderCard);
    })

    super.setEventListeners();
  }

  openPopup(cardId, deleteRenderCard) {
    this._deleteRenderCard = deleteRenderCard;
    this._cardId = cardId;
    super.openPopup();
  }

  closePopup() {
    super.closePopup();
    this.deleting = false;
  }
}
