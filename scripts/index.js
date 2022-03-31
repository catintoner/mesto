const profileEdit = document.querySelector('.profile__redaction');              //buttons
const addCardButton = document.querySelector('.profile__add-button');
const popUpAddCard = document.querySelector('.popup_type_add-card');            //popUps
const popUpEditProfile = document.querySelector('.popup_type_edit-profile');
const popUpExit = document.querySelectorAll('.popup__exit');                    //exitPopUps
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const formEditProfile = document.forms['profile-edit'];                         //forms
const formAddCard = document.forms['add-card'];
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.job;

//func for open and add value in formEditProfile

function fillFieldsAndOpenPopUp(popUp) {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  openPopUp(popUp);
}

// func for open

function openPopUp(popUp) {
  popUp.classList.add('popup_opened');
}

//func for close

function closePopUp(popUpClose) {
  popUpClose.classList.remove('popup_opened');
}

//Listen for open/close

profileEdit.addEventListener('click', () => fillFieldsAndOpenPopUp(popUpEditProfile));
addCardButton.addEventListener('click', () => openPopUp(popUpAddCard))
popUpExit[0].addEventListener('click', () => closePopUp(popUpEditProfile));
popUpExit[1].addEventListener('click', () => closePopUp(popUpAddCard));

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler(evt) {
  evt.preventDefault();
  let name = nameInput.value;
  let job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  closePopUp(popUpEditProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener('submit', formSubmitHandler);

