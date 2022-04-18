//invalidInput

function hasInvalidInput(formSelector, selectors) {
  const inputList = Array.from(formSelector.querySelectorAll(selectors.inputSelector));
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

//button enable/disable

function toggleButtonState(formSelector, selectors) {
  const buttonSelector = formSelector.querySelector(selectors.submitButtonSelector);
  if (hasInvalidInput(formSelector, selectors)) {
    buttonSelector.setAttribute("disabled", "true");
    buttonSelector.classList.add(selectors.inactiveButtonClass);
  } else {
    buttonSelector.removeAttribute("disabled");
    buttonSelector.classList.remove(selectors.inactiveButtonClass);
  };
}

//showError

function showInputError(formSelector, inputSelector, selectors) {
  const errorMessage = inputSelector.validationMessage;
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  errorElement.textContent = errorMessage;
  inputSelector.classList.add(selectors.inputErrorClass);
}

//hideError

function hideInputError(formSelector, inputSelector, selectors) {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  errorElement.textContent = "";
  inputSelector.classList.remove(selectors.inputErrorClass);
};

//inputValidity

function checkInputValidity(formSelector, inputSelector, selectors) {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, selectors);
  } else {
    hideInputError(formSelector, inputSelector, selectors);
  };
  toggleButtonState(formSelector, selectors);
}

//setEventListener

function setEventListeners(formSelector, selectors) {
  const inputList = Array.from(formSelector.querySelectorAll(selectors.inputSelector));
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      checkInputValidity(formSelector, inputSelector, selectors);
    });
  });
  toggleButtonState(formSelector, selectors);
}

//func for validation

function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formSelector) => {
    setEventListeners(formSelector, selectors);
  });
}

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__error'
});
