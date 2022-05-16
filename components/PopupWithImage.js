import { imagePopup, namePopup } from "../utils/constants.js";


import { Popup } from "./Popup.js";


class PopupWithImage extends Popup {
  constructor({ data }, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }

  openPopup() {
    imagePopup.src = this._link;
    imagePopup.alt = this._name;
    namePopup.alt = this._name;
    super.openPopup();
  }
}
