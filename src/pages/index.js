//imports

// import '../pages/index.css';

//const

import {
  profileEdit,
  cardButtonAdd,
  formEditProfile,
  formAddCard,
  nameInput,
  jobInput,
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


const formProfileEdit = new PopupWithForm('.popup_type_edit-profile', handleProfileFormSubmit);
formProfileEdit.setEventListeners();

const formAdd = new PopupWithForm('.popup_type_add-card', addCardFromForm);
formAdd.setEventListeners();

const handleCardClick = new PopupWithImage('.popup_type_picture');
handleCardClick.setEventListeners();


const userInfo = new UserInfo({ nameSelector: nameInput, jobSelector: jobInput });

//func`s for open and add value in formEditProfile

function addUserInfoInForm({ name, job }) {
  nameInput.value = name;
  jobInput.value = job;
}

function openEditProfile() {
  formProfileEdit.openPopup();
  addUserInfoInForm(userInfo.getUserInfo());
  formEdit.resetValidation();

}

//func for open addCardForm

function openAddCardForm() {
  formAdd.openPopup();
  cardAdd.resetValidation();
}

// func for open popup picture

function openPopupPicture(evt, data) {
  if (evt.target.classList.contains('card__photo')) {
    handleCardClick.openPopup(data);
  }
}

//func for edit profile

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
}

//card from form

function addCardFromForm(data) {
  const oneCard = addOneCard(data);
  addCards.addItem(oneCard);
}



//func for add one card

function addOneCard(item) {
  const card = new Card(item, '#template__card', openPopupPicture);
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
