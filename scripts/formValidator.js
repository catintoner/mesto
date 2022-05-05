export class FormValidator {
  constructor(obj, formSelector) {

    this._input = obj.inputSelector;
    this._submitButton = obj.submitButtonSelector;
    this._inactiveButton = obj.inactiveButtonClass;
    this._inputError = obj.inputErrorClass;
    this._error = obj.errorClass;

    this._form = document.querySelector(formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._buttonElement = this._form.querySelector(this._submitButton);
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', 'true');
      this._buttonElement.classList.add(this._inactiveButton);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButton);
    };
  }

  _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.textContent = "";
    input.classList.remove(this._inputError);
  }

  _showInputError(input) {
    const errorMessage = input.validationMessage;
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.textContent = errorMessage;
    input.classList.add(this._inputError);
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _setEventListeners() {
    this._inputList.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      })
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
