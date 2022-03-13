let redact = document.querySelector('.profile__redaction');
let popUp = document.querySelector('.popup');

function openPopup() {
  popUp.classList.add('popup_opened');
}

redact.addEventListener('click', openPopup);
