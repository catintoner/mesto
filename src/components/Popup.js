export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
    this._popup.removeEventListener('mousedown', this._handleCallbackClick);
    document.removeEventListener('keydown', this._handleCallback);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._handleCallbackClick = (evt) => {
      if (evt.target === this._popup || (evt.target.classList.contains('popup__exit'))) {
        this.closePopup();
      };
    };
    this._popup.addEventListener('mousedown', this._handleCallbackClick);
    this._handleCallback = (evt) => {
      this._handleEscClose(evt);
    }
    document.addEventListener('keydown', this._handleCallback);
  }
}
