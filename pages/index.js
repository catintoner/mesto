//imports

//const

import { profileEdit,
  cardButtonAdd,
  popups,
  popupAddCard,
  popupEditProfile,
  popupPicture,
  imagePopup,
  namePopup,
  profileName,
  profileJob,
  cardsPlace,
  formEditProfile,
  formAddCard,
  nameInput,
  jobInput,
  namePlace,
  linkPlace,
  initialCards,
  objForValidity } from '../utils/constants.js';

  //class

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from '../components/Section.js';

// func for open popUp

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEsc);
}

//func for open Popup Picture

function openPopupPicture(name, link) {
  imagePopup.src = link;
  imagePopup.alt = name;
  namePopup.textContent = name;
  openPopup(popupPicture);
}

//func for close popUp

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEsc);
}

//func for close popup on ESC

function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//func for close popup on Overlay and Btn Exit

function closeOnOverlayAndBtnExit(popup) {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup || (evt.target.classList.contains('popup__exit'))) {
      closePopup(popup);
    }
  });
}

//func for open and add value in formEditProfile

function fillFieldsAndOpenPopup(popup) {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  formEdit.resetValidation();
  openPopup(popup);
}

//func for open and clean value in addCard

function cleanValueAndOpenPopup(popup) {
  formAddCard.reset();
  cardAdd.resetValidation();
  openPopup(popup);
}

//func for edit profile

function formSubmitHandler(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  closePopup(popupEditProfile);
}

//func for addCards

function addCards(name, link, cardSelector) {
  const card = new Card(name, link, cardSelector, openPopupPicture);
  const cardElement = card.generateCard();
  return cardElement;
};

//func for add arrayCards

function addArrayCards(object) {
  object.forEach(item => {
    const card = addCards(item.name, item.link, '#template__card');
    cardsPlace.append(card);
  });
}

// function renderer( { name, link }, cardSelector ) {
//   const card = new Card(name, link, cardSelector)


addArrayCards(initialCards);

//func for add one card

function addOneCard(evt) {
  evt.preventDefault();
  const oneCard = addCards(namePlace.value, linkPlace.value, '#template__card');
  cardsPlace.prepend(oneCard);
  closePopup(popupAddCard);
}

//Listen for open/close popups

profileEdit.addEventListener('click', () => fillFieldsAndOpenPopup(popupEditProfile));
cardButtonAdd.addEventListener('click', () => cleanValueAndOpenPopup(popupAddCard));

//listen forms

formEditProfile.addEventListener('submit', formSubmitHandler);
formAddCard.addEventListener('submit', addOneCard);

popups.forEach((popup) => {
  closeOnOverlayAndBtnExit(popup);
})


const formEdit = new FormValidator(objForValidity, formEditProfile);

formEdit.enableValidation();

const cardAdd = new FormValidator(objForValidity, formAddCard);

cardAdd.enableValidation();

