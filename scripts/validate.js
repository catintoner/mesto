//invalidInput

function hasInvalidInput(formSelector, selectors) {
  const inputList = Array.from(formSelector.querySelectorAll(selectors.inputSelector));
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
  });
}

//button enable/disable

function toggleButtonState(formSelector, selectors) {
  const buttonList = formSelector.querySelectorAll(selectors.submitButtonSelector);
  if (hasInvalidInput(formSelector, selectors)) {
    buttonList.forEach((buttonSelector) => {
      buttonSelector.setAttribute("disabled", "true");
      buttonSelector.classList.add(selectors.inactiveButtonClass);
    });
  } else {
    buttonList.forEach((buttonSelector) => {
      buttonSelector.removeAttribute("disabled");
      buttonSelector.classList.remove(selectors.inactiveButtonClass);
    });
  }
}

//showError

function showInputError(formSelector, inputSelector, selectors) {
  const errorMessage = inputSelector.validationMessage;
  const errorList = formSelector.querySelectorAll(`.${inputSelector.id}-error`);
  errorList.forEach((errorSelector) => {
    errorSelector.textContent = errorMessage;
    inputSelector.classList.add(selectors.inputErrorClass);
  });
}

//hideError

function hideInputError(formSelector, inputSelector, selectors) {
  const errorList = formSelector.querySelectorAll(`.${inputSelector.id}-error`);
  errorList.forEach((errorSelector) => {
    errorSelector.textContent = "";
    inputSelector.classList.remove(selectors.inputErrorClass);
  });
}

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
  let inputList = Array.from(formSelector.querySelectorAll(selectors.inputSelector));
  if (!inputList || !inputList.length) {
    return;
  }
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', () => {
      checkInputValidity(formSelector, inputSelector, selectors);
    });
    hideInputError(formSelector, inputSelector, selectors);
  });
  toggleButtonState(formSelector, selectors);
}

//func for validation

function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(".popup_opened " + selectors.formSelector));
  formList.forEach((formSelector) => {
    setEventListeners(formSelector, selectors);
  });
}
