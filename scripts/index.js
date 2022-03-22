let profileEdit = document.querySelector('.profile__redaction');
let popup = document.querySelector('.popup');
let popUpExit = document.querySelector('.popup__exit');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
let formElement = document.forms['profile-edit'];
let nameInput = formElement.name;
let jobInput = formElement.job;

//func for open and add value in Input

function popupOpen() {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  popup.classList.add('popup_opened');
}

//func for close

function popupClose() {
  popup.classList.remove('popup_opened');
}

//Listen for open/close

profileEdit.addEventListener('click', popupOpen);
popUpExit.addEventListener('click', popupClose);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

