import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, addCardFromForm) {
    super(popupSelector);
    this._formSubmit = addCardFromForm;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._form = this._popup.querySelector('.popup__container');
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.closePopup();
    });
    super.setEventListeners();
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
