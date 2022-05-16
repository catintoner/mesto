import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);
    this._formSubmit = formSubmitHandler;
  }

  _getInputValues() {
    this._values = Array.from(this._popup.querySelectorAll('.popup__input'));
  }
}
