import Popup from "./Popup.js";
import { formAddCard } from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, addCardFromForm) {
    super(popupSelector);
    this._formSubmit = addCardFromForm;
  }

  _getInputValues() {
    this._values = {};
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
  }

  setEventListeners() {
    this._handleCallbackSubmit = (evt) => {
      this._formSubmit(evt);
      this.closePopup();
    };
    this._getInputValues();
    this._popup.addEventListener('submit', this._handleCallbackSubmit);
    super.setEventListeners();
  }

  closePopup() {
    this._popup.removeEventListener('submit', this._handleCallbackSubmit);
    super.closePopup();
    formAddCard.reset();
  }
}
