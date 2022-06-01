const profileEdit = document.querySelector('.profile__redaction');
const cardButtonAdd = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-button');
const avatar = document.querySelector('.profile__avatar');
const formEditProfile = document.forms['profile-edit'];
const formAddCard = document.forms['add-card'];
const formEditAvatar = document.forms['edit-avatar'];
const nameInput = formEditProfile.name;
const aboutInput = formEditProfile.about;
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
const objForValidity = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__error'
};

export { profileEdit,
         cardButtonAdd,
         avatarButton,
         avatar,
         formEditProfile,
         formAddCard,
         formEditAvatar,
         nameInput,
         aboutInput,
         initialCards,
         objForValidity
        };
