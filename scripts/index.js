const profileEdit = document.querySelector('.profile__redaction');              //buttons
const cardButtonAdd = document.querySelector('.profile__add-button');
const popUpAddCard = document.querySelector('.popup_type_add-card');            //popUps
const popUpEditProfile = document.querySelector('.popup_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const formEditProfile = document.forms['profile-edit'];                         //forms
const formAddCard = document.forms['add-card'];
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.job;
const namePlace = formAddCard.place;
const linkPlace = formAddCard.link;
const popUps = Array.from(document.querySelectorAll('.popup'));
const initialCards = [
  {
    name: 'Роза Хутор',
    link: 'https://images.unsplash.com/photo-1617117833203-c91b04e0431f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1744&q=80'
  },
  {
    name: 'Цимлянское водохранилище',
    link: 'https://images.unsplash.com/photo-1628087971949-ed115ca66db7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Г. Волгоград',
    link: 'https://images.unsplash.com/photo-1613863501971-ccb1757e40ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80'
  },
  {
    name: 'Кабардино-Балкарская Республика',
    link: 'https://images.unsplash.com/photo-1621244249243-436b79b5eea8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
  },
  {
    name: 'Река Волга',
    link: 'https://images.unsplash.com/photo-1628848376440-4ebc6dc3e735?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Река Учма',
    link: 'https://images.unsplash.com/photo-1625729273155-25ed107d68be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80'
  },
];

import { Card } from "./card.js";

// func for open popUp

export function openPopUp(popUp) {
  popUp.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc);
}

//func for close popUp

function closePopUp(popUp) {
  popUp.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
}

//func for close popup on ESC

function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popUpOpened = document.querySelector('.popup_opened');
    closePopUp(popUpOpened);
  }
}

//func for close popup on Overlay

function closeOnOverlayClick(popUp) {
  popUp.addEventListener('mousedown', (evt) => {
    if (evt.target === popUp) {
      closePopUp(popUp);
    }
  });
}

//func for listen for close popup

function addEventOnClose(popUp) {
  const popUpExit = popUp.querySelector('.popup__exit');
  popUpExit.addEventListener('click', () => closePopUp(popUp));
}

//func for open and add value in formEditProfile

function fillFieldsAndOpenPopUp(popUp) {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  enableButtonState(popUp);
  openPopUp(popUp);
}

//disable submit-button

function disableButtonState(popUp) {
  const buttonState = popUp.querySelector('.popup__submit-btn');
  buttonState.setAttribute('disabled', 'true');
  buttonState.classList.add('popup__submit-btn_disabled');
}

// enable submit-button

function enableButtonState(popUp) {
  const buttonState = popUp.querySelector('.popup__submit-btn');
  buttonState.removeAttribute('disabled');
  buttonState.classList.remove('popup__submit-btn_disabled');
}

//func for open and clean value in addCard

function cleanValueAndOpenPopUp(popUp) {
  formAddCard.reset();
  disableButtonState(popUp);
  openPopUp(popUp);
}

//func for edit profile

function formSubmitHandler(evt) {
  evt.preventDefault();
  const popUpOpened = document.querySelector('.popup_opened');
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  closePopUp(popUpOpened);
}

//func for addCards

function addCards(name, link, cardSelector) {
  const card = new Card(name, link, cardSelector);
  const cardElement = card.generateCard();
  return cardElement;
};

//func for add arrayCards

function addArrayCards(object) {
  const cardsPlace = document.querySelector('.cards');
  object.forEach(item => {
    const card = addCards(item.name, item.link, '#template__card');
    cardsPlace.append(card);
  });
}

addArrayCards(initialCards);

//func for add one card

function addOneCard(evt) {
  evt.preventDefault();
  const cardsPlace = document.querySelector('.cards');
  const oneCard = addCards(namePlace.value, linkPlace.value);
  const popUpOpened = document.querySelector('.popup_opened');
  cardsPlace.prepend(oneCard);
  closePopUp(popUpOpened);
}

//Listen for open/close popups

profileEdit.addEventListener('click',   () => fillFieldsAndOpenPopUp(popUpEditProfile));
cardButtonAdd.addEventListener('click', () => cleanValueAndOpenPopUp(popUpAddCard));

//listen forms

formEditProfile.addEventListener('submit', formSubmitHandler);
formAddCard.addEventListener('submit', addOneCard);

popUps.forEach((popUp) => {
  addEventOnClose(popUp);
  closeOnOverlayClick(popUp);
})
