let profileEdit = document.querySelector('.profile__redaction');
let popUpAddCard = document.querySelector('.popup_type_add-card');
let popUpEditProfile = document.querySelector('.popup_type_edit-profile');
let popUpExit = document.querySelectorAll('.popup__exit');
let addCardButton = document.querySelector('.profile__add-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
let formElement = document.forms['profile-edit'];
let nameInput = formElement.name;
let jobInput = formElement.job;

//func for open and add value in Input

function popUpOpen(popUp) {
  if (popUp === popUpEditProfile) {
    nameInput.value = profileName.textContent.trim();
    jobInput.value = profileJob.textContent.trim();
  }
  popUp.classList.add('popup_opened');
}

//func for close

function popUpClose(popUpClose) {
  popUpClose.classList.remove('popup_opened');
}

//Listen for open/close

profileEdit.addEventListener('click', () => { popUpOpen(popUpEditProfile) });
addCardButton.addEventListener('click', () => { popUpOpen(popUpAddCard) })
popUpExit[0].addEventListener('click', () => { popUpClose(popUpEditProfile) });
popUpExit[1].addEventListener('click', () => { popUpClose(popUpAddCard) });

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  popUpClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

