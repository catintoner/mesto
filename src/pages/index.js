//imports

import '../pages/index.css';

//const

import {
  profileEdit,
  cardButtonAdd,
  avatarButton,
  avatar,
  formEditProfile,
  formAddCard,
  formEditAvatar,
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

const formAvatarEdit = new PopupWithForm('.popup_type_edit-avatar', handleAvatarSubmit);
formAvatarEdit.setEventListeners();

const formDelete = new PopupWithDeleteCard('.popup_type_delete-card', deleteCard)
formDelete.setEventListeners();

const handleCardClick = new PopupWithImage('.popup_type_picture');
handleCardClick.setEventListeners();


const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__about' });

const renderCards = new Section({ renderer: addOneCard }, '.cards');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '1a2b710a-03a9-4348-9fbe-153973737ce6',
    'Content-Type': 'application/json'
  }
});

let userId;

function addUserInfoInForm({ name, about }) {
  nameInput.value = name;
  aboutInput.value = about;
}

function openEditProfile() {
  formProfileEdit.openPopup();
  addUserInfoInForm(userInfo.getUserInfo());
  formEdit.resetValidation();

}

function openAddCardForm() {
  formAdd.openPopup();
  cardAdd.resetValidation();
}

function openPopupPicture(data) {
  handleCardClick.openPopup(data);
}

function openPopupEditAvatar() {
  formAvatarEdit.openPopup();
  formAvatarValidity.resetValidation();
}

function handleProfileFormSubmit(data) {
  formProfileEdit.renderLoading(true, 'Сохранение...');
  api.setInfoAboutUser(data)
    .then(() => {
      userInfo.setUserInfo(data);
      formProfileEdit.closePopup();
    })

    .catch(err => {
      console.log(err);
    })

    .finally(() => {
      formProfileEdit.renderLoading(false, '');
    })
}

function handleLikeClick({ like, dislike }, ownLike, cardId) {
  if (ownLike) {
    api.removeLike(cardId)
      .then((modifiedCard) => {
        dislike(modifiedCard);
      })
  } else {

    api.addLike(cardId)
      .then((modifiedCard) => {
        like(modifiedCard);
      })
  }
}

function handleAvatarSubmit(avatarLink) {
  formAvatarEdit.renderLoading(true, 'Сохранение...');
  api.editAvatar(avatarLink)
    .then(userInfo => {
      avatar.src = userInfo.avatar;
      formAvatarEdit.closePopup();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      formAvatarEdit.renderLoading(false, '')
    })
}

function deleteCard(cardElement, cardId) {
  formDelete.renderDeleting(true, 'Удаление...');
  api.deleteCard(cardId)
    .then(() => {
      cardElement.remove();
      cardElement = null;
      formDelete.closePopup();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      formDelete.renderDeleting(false, '');
    })
}

function openPopupDelete(cardElement, cardId) {
  formDelete.openPopup(cardElement, cardId);
}

function addCardFromForm(data) {
  formAdd.renderLoading(true, 'Сохранение...');
  api.addNewCard(data)
    .then((cardInfo) => {
      const card = [cardInfo];
      renderCards.renderItems(card);
      formAdd.closePopup();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      formAdd.renderLoading(false, '');
    })
}

function addOneCard(item) {
  const card = new Card(item, '#template__card', openPopupPicture, openPopupDelete, handleLikeClick, userId);
  const cardElement = card.generateCard();
  return cardElement;
};

//Listen for open/close popups

profileEdit.addEventListener('click', openEditProfile);
cardButtonAdd.addEventListener('click', openAddCardForm);
avatarButton.addEventListener('click', openPopupEditAvatar);

//listen forms

const formEdit = new FormValidator(objForValidity, formEditProfile);
formEdit.enableValidation();

const cardAdd = new FormValidator(objForValidity, formAddCard);
cardAdd.enableValidation();

const formAvatarValidity = new FormValidator(objForValidity, formEditAvatar);
formAvatarValidity.enableValidation();

api.getInfoAboutUser()
  .then((userStats) => {
    userInfo.setUserInfo(userStats);
    userId = userStats._id;
    avatar.src = userStats.avatar;
  })
  .catch((err) => {
    console.log(err);
  })



api.getInitialCards()
  .then((arrayCards) => {
    renderCards.renderItems(arrayCards);
  })

  .catch((err) => {
    console.log(err);
  })

