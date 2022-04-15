//func for validation

function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(`${obj.formSelector}`));
  formList.forEach((formSelector) => {
    setEventListeners(formSelector, obj);
  });
}


function setEventListeners(formSelector, obj) {
  const inputList = Array.from(formSelector.querySelectorAll(`${obj.inputSelector}`));
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      checkInputValidity(formSelector, inputSelector, obj);
    });
  });
}

function checkInputValidity(formSelector, inputSelector, obj) {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, obj.inputErrorClass);
  } else {
    hideInputError(formSelector, inputSelector, obj.inputErrorClass);
  };
  toggleButtonState(formSelector, obj.submitButtonSelector, obj.inactiveButtonClass, obj)
}

function hasInvalidInput(formSelector, obj) {
  const inputList = Array.from(formSelector.querySelectorAll(obj.inputSelector));
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

function toggleButtonState(formSelector, submitButtonSelector, inactiveButtonClass, obj) {
  const buttonList = formSelector.querySelectorAll(submitButtonSelector);
  if (hasInvalidInput(formSelector, obj)) {
    buttonList.forEach((buttonSelector) => {
      buttonSelector.setAttribute("disabled", "true");
      buttonSelector.classList.add(inactiveButtonClass);
    });
  } else {
    buttonList.forEach((buttonSelector) => {
      buttonSelector.removeAttribute("disabled");
      buttonSelector.classList.remove(inactiveButtonClass);
    });
  }
}


function showInputError(formSelector, inputSelector, errorMessage, inputErrorClass) {
  const errorList = formSelector.querySelectorAll(`.${inputSelector.id}-error`);
  errorList.forEach((errorSelector) => {
    errorSelector.textContent = errorMessage;
    inputSelector.classList.add(inputErrorClass);
  });
}

function hideInputError(formSelector, inputSelector, inputErrorClass) {
  const errorList = formSelector.querySelectorAll(`.${inputSelector.id}-error`);
  errorList.forEach((errorSelector) => {
    errorSelector.textContent = "";
    inputSelector.classList.remove(inputErrorClass);
  });
}

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
