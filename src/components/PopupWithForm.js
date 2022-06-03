import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, addCardFromForm) {
    super(popupSelector);
    this._formSubmit = addCardFromForm;
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._form = this._popup.querySelector('.popup__container');
    this._buttonSubmitText = this._popup.querySelector('.popup__submit-btn');
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  _renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmitText.textContent = 'Сохранение...';
    } else {
      this._buttonSubmitText.textContent = 'Сохранить';
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
      this._renderLoading(true);
    });
    super.setEventListeners();
  }

  closePopup() {
    this._renderLoading(false);
    super.closePopup();
    this.loading = false;
    this._form.reset();
  }
}
