import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, addCardFromForm) {
    super(popupSelector);
    this._formSubmit = addCardFromForm;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._form = this._popup.querySelector('.popup__container');
    this._buttonSubmitText = this._popup.querySelector('.popup__submit-btn');
    this._defaultSubmitText = this._buttonSubmitText.textContent;
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  renderLoading(isLoading, buttonText) {
    if (isLoading) {
      this._buttonSubmitText.textContent = buttonText;
    } else {
      this._buttonSubmitText.textContent = this._defaultSubmitText;
    }
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (this.loading) {
        return;
      }
      this.loading = true;
      this._formSubmit(this._getInputValues())
    });
    super.setEventListeners();
  }

  closePopup() {
    super.closePopup();
    this.loading = false;
    this._form.reset();
  }
}
