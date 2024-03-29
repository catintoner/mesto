import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = this._popup.querySelector('.popup__image');
    this._namePopup = this._popup.querySelector('.popup__caption');
  }

  openPopup(data) {
    this._imagePopup.src = data.link;
    this._imagePopup.alt = data.name;
    this._namePopup.textContent = data.name;
    super.openPopup();
  }
}
