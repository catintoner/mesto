const profileEdit = document.querySelector('.profile__redaction');              //buttons
const addCardButton = document.querySelector('.profile__add-button');
const deleteCardButton = document.querySelectorAll('.card__trash');
const popUpAddCard = document.querySelector('.popup_type_add-card');            //popUps
const popUpEditProfile = document.querySelector('.popup_type_edit-profile');
const popUpExit = document.querySelectorAll('.popup__exit');                    //exitPopUps
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const formEditProfile = document.forms['profile-edit'];                         //forms
const formAddCard = document.forms['add-card'];
const templateCard = document.querySelector('#template__card').content;         //template
const cardsPlace = document.querySelector('.cards');
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.job;
const initialCards = [
  {
    name: 'Роза Хутор',
    link: 'https://images.unsplash.com/photo-1617117833203-c91b04e0431f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLWxpa2VkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    name: 'Цимлянское водохранилище',
    link: 'https://images.unsplash.com/photo-1628087971949-ed115ca66db7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Г. Волгоград',
    link: 'https://images.unsplash.com/photo-1613863501971-ccb1757e40ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
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
    link: 'https://images.unsplash.com/photo-1625729273155-25ed107d68be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
];

addSixCards();

//func for add sixCards

function addSixCards() {
  for (let i = 0; i < initialCards.length; i++) {
    let card = templateCard.querySelector('.card').cloneNode(true);
    card.querySelector('.card__photo').src = initialCards[i].link;
    card.querySelector('.card__title').textContent = initialCards[i].name;
    card.querySelector('.card__trash').addEventListener('click', deleteCard);
    cardsPlace.append(card);
  }
};

//func for deleteCard

function deleteCard(i) {
  let card = document.querySelector('.card');
  card.remove();
}


// deleteCardButton.addEventListener('click', deleteCard);
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

