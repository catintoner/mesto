//imports

import '../pages/index.css';

//const

import {
  profileEdit,
  cardButtonAdd,
  formEditProfile,
  formAddCard,
  nameInput,
  jobInput,
  namePlace,
  linkPlace,
  initialCards,
  objForValidity
} from '../utils/constants.js';

//class

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo({ nameSelector: nameInput, jobSelector: jobInput });

//func for open and add value in formEditProfile

function openEditProfile() {
  const profileEdit = new PopupWithForm('.popup_type_edit-profile', formSubmitHandler);
  profileEdit.setEventListeners();
  profileEdit.openPopup();
  userInfo.getUserInfo();
  formEdit.resetValidation();

}

//func for open addCardForm

function openAddCardForm() {
  const formAdd = new PopupWithForm('.popup_type_add-card', addCardFromForm);
  formAdd.setEventListeners();
  formAdd.openPopup();
  cardAdd.resetValidation();
}

//func for edit profile

function formSubmitHandler(evt) {
  evt.preventDefault();
  userInfo.setUserInfo();
}

//card from form

function addCardFromForm(evt) {
  evt.preventDefault();
  const newCardValues = { name: namePlace.value, link: linkPlace.value };
  const oneCard = addOneCard(newCardValues);
  addCards.addItem(oneCard);
}

//func for add one card

function addOneCard(item) {
  const card = new Card(item, '#template__card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

//func for addCards from Array

const addCards = new Section({ items: initialCards, renderer: addOneCard }, '.cards');

addCards.renderItems();

//Listen for open/close popups

profileEdit.addEventListener('click', openEditProfile);
cardButtonAdd.addEventListener('click', openAddCardForm);

//listen forms

const formEdit = new FormValidator(objForValidity, formEditProfile);

formEdit.enableValidation();

const cardAdd = new FormValidator(objForValidity, formAddCard);

cardAdd.enableValidation();


function handleCardClick(evt, data) {
  if (evt.target.classList.contains('card__photo')) {
    const handleCardClick = new PopupWithImage(data, '.popup_type_picture');
    handleCardClick.openPopup();
    handleCardClick.setEventListeners();
  }
}
