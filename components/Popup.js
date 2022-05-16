export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
      document.removeEventListener('keydown', this._handleEscClose);
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popup || (evt.target.classList.contains('popup__exit'))) {
        this.closePopup();
      }
    });
    this._popup.addEventListener('keydown', this._handleEscClose);
  }
}
