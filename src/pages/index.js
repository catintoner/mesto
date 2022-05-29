//imports

import '../pages/index.css';

//const

import {
  profileEdit,
  cardButtonAdd,
  formEditProfile,
  formAddCard,
  nameInput,
  aboutInput,
  objForValidity
} from '../utils/constants.js';

//class

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


const formProfileEdit = new PopupWithForm('.popup_type_edit-profile', handleProfileFormSubmit);
formProfileEdit.setEventListeners();

const formAdd = new PopupWithForm('.popup_type_add-card', addCardFromForm);
formAdd.setEventListeners();

const formDelete = new PopupWithDeleteCard('.popup_type_delete-card')
formDelete.setEventListeners();

const handleCardClick = new PopupWithImage('.popup_type_picture');
handleCardClick.setEventListeners();


const userInfo = new UserInfo({ nameSelector: nameInput, aboutSelector: aboutInput });

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '1a2b710a-03a9-4348-9fbe-153973737ce6',
    'Content-Type': 'application/json'
  }
});
//func`s for open and add value in formEditProfile

function addUserInfoInForm({ name, about }) {
  nameInput.value = name;
  aboutInput.value = about;
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
  api.setInfoAboutUser(data);
}

function deleteCard() {

}

function openPopupDelete() {
  formDelete.openPopup();
}

//card from form

function addCardFromForm(data) {
  const oneCard = addOneCard(data);
  const addCard = new Section({items: oneCard, renderer: addOneCard}, '.cards');
  addCard.addItem(oneCard);
  api.addNewCard(data);
}



//func for add one card

function addOneCard(item) {
  const card = new Card(item, '#template__card', openPopupPicture, openPopupDelete);
  const cardElement = card.generateCard();
  return cardElement;
};

//Listen for open/close popups

profileEdit.addEventListener('click', openEditProfile);
cardButtonAdd.addEventListener('click', openAddCardForm);

//listen forms

const formEdit = new FormValidator(objForValidity, formEditProfile);

formEdit.enableValidation();

const cardAdd = new FormValidator(objForValidity, formAddCard);

cardAdd.enableValidation();


//test request





api.getInfoAboutUser()
  .then((userStats) => {
    userInfo.setUserInfo(userStats);
  })
  .catch((err) => {
    console.log(err);
  })

api.getInitialCards()
  .then((arrayCards) => {
    const addCards = new Section({ items: arrayCards, renderer: addOneCard }, '.cards');

    addCards.renderItems();
  })

  .catch((err) => {
    console.log(err);
  })

