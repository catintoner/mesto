//imports

import '../pages/index.css';

//const

import {
  profileEdit,
  cardButtonAdd,
  avatarButton,
  formEditProfile,
  formAddCard,
  formEditAvatar,
  nameInput,
  aboutInput,
  objForValidity
} from '../utils/constants.js';

//classes

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithDeleteCard from '../components/PopupWithDeleteCard.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// popup classes

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

const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__about', avatar: '.profile__avatar' });

// rendering cards

const renderCards = new Section({ renderer: addOneCard }, '.cards');

// api requests

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '1a2b710a-03a9-4348-9fbe-153973737ce6',
    'Content-Type': 'application/json'
  }
});

//listen forms

const formEdit = new FormValidator(objForValidity, formEditProfile);
formEdit.enableValidation();

const cardAdd = new FormValidator(objForValidity, formAddCard);
cardAdd.enableValidation();

const formAvatarValidity = new FormValidator(objForValidity, formEditAvatar);
formAvatarValidity.enableValidation();

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

function openPopupDelete(cardId, deleteRenderCard) {
  formDelete.openPopup(cardId, deleteRenderCard);
}

function handleProfileFormSubmit(data) {
  formProfileEdit.renderLoading(true, 'Сохранение...');
  api.setInfoAboutUser(data)

    .then((userStats) => {
      userInfo.setUserInfo(userStats);
      formProfileEdit.closePopup();
    })

    .catch(err => {
      console.log(err);
    })

    .finally(() => {
      formProfileEdit.renderLoading(false, '');
    })
}

function handleAvatarSubmit(avatarLink) {
  formAvatarEdit.renderLoading(true, 'Сохранение...');
  api.editAvatar(avatarLink)

    .then(userStats => {
      userInfo.setUserInfo(userStats);
      formAvatarEdit.closePopup();
    })

    .catch(err => {
      console.log(err);
    })

    .finally(() => {
      formAvatarEdit.renderLoading(false, '')
    })
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

function handleLikeClick({ like, dislike }, ownLike, cardId) {
  if (ownLike) {
    api.removeLike(cardId)

      .then((modifiedCard) => {
        dislike(modifiedCard);
      })

      .catch((err) => {
        console.log(err);
      })
  } else {
    api.addLike(cardId)

      .then((modifiedCard) => {
        like(modifiedCard);
      })

      .catch((err) => {
        console.log(err);
      })
  }
}

function addOneCard(item) {
  const card = new Card(item, '#template__card', openPopupPicture, openPopupDelete, handleLikeClick, userId);
  const cardElement = card.generateCard();
  return cardElement;
};

function deleteCard(cardId, deleteRenderCard) {
  formDelete.renderDeleting(true, 'Удаление...');
  api.deleteCard(cardId)

    .then(() => {
      deleteRenderCard();
      formDelete.closePopup();
    })

    .catch(err => {
      console.log(err);
    })

    .finally(() => {
      formDelete.renderDeleting(false, '');
    })
}

//Listen for open/close popups

profileEdit.addEventListener('click', openEditProfile);
cardButtonAdd.addEventListener('click', openAddCardForm);
avatarButton.addEventListener('click', openPopupEditAvatar);

let userId;

Promise.all([
  api.getInfoAboutUser(),
  api.getInitialCards()
])
  .then((values) => {
    const userStats = values[0];
    const arrayCards = values[1];

    userInfo.setUserInfo(userStats);
    userId = userStats._id;

    renderCards.renderItems(arrayCards);
  })

  .catch((err) => {
    console.log(err);
  })

