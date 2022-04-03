const profileEdit = document.querySelector('.profile__redaction');              //buttons
const cardButtonAdd = document.querySelector('.profile__add-button');
const popUpAddCard = document.querySelector('.popup_type_add-card');            //popUps
const popUpEditProfile = document.querySelector('.popup_type_edit-profile');
const popUpPicture = document.querySelector('.popup_type_picture');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');
const formEditProfile = document.forms['profile-edit'];                         //forms
const formAddCard = document.forms['add-card'];
const templateCard = document.querySelector('#template__card').content;         //template
const cardsPlace = document.querySelector('.cards');
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.job;
const namePlace = formAddCard.place;
const linkPlace = formAddCard.link;
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

// func for open popUp

function openPopUp(popUp) {
  popUp.classList.add('popup_opened');
}

//func for close popUp

function closePopUp(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

//func for listen for close popup

function addEventOnClose(popUp) {
  const popUpExit = popUp.querySelector('.popup__exit');
  if (popUp) {
    popUpExit.addEventListener('click', closePopUp);
  }
}

//func for open and add value in formEditProfile

function fillFieldsAndOpenPopUp(popUp) {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  openPopUp(popUp);
  addEventOnClose(popUp);
}

//func for open and clean value in addCard

function cleanValueAndOpenPopUp(popUp) {
  linkPlace.value = "";
  namePlace.value = "";
  openPopUp(popUp);
  addEventOnClose(popUp);
}

//func for open popup picture

function openPopUpPicture(evt) {
  const image = document.querySelector('.popup__image');
  const name = document.querySelector('.popup__caption');
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  name.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
  openPopUp(popUpPicture);
  addEventOnClose(popUpPicture);
}

//func for edit profile

function formSubmitHandler(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileJob.textContent = job;
  closePopUp(evt);
}

//func for like

function addRemoveLike(evt) {
  evt.target.classList.toggle('card__btn-like_status_active');
}

//func for removeCard

function removeCard(evt) {
  const card = evt.target.closest('.card');
  if (card) {
    card.remove();
  };
}

//func addEventOnCard

function addEventOnCard(card) {
  const btnLike = card.querySelector('.card__btn-like');
  if (btnLike) {
    btnLike.addEventListener('click', addRemoveLike);
  };
  const trash = card.querySelector('.card__trash');
  if (trash) {
    trash.addEventListener('click', removeCard);
  };
  const image = card.querySelector('.card__photo');
  if (image) {
    image.addEventListener('click', openPopUpPicture);
  }
}

//func for addCards

function addCards(link, name) {
  const card = templateCard.querySelector('.card').cloneNode(true);
  card.querySelector('.card__photo').src = link;
  card.querySelector('.card__photo').alt = name;
  card.querySelector('.card__title').textContent = name;
  addEventOnCard(card);
  return card;
}

//func for add one card

function addOneCard(evt) {
  evt.preventDefault();
  const oneCard = addCards(linkPlace.value, namePlace.value);
  cardsPlace.prepend(oneCard);
  closePopUp(evt);
}

//func for add sixCards

function addSixCards() {
  for (let i = 0; i < initialCards.length; i++) {
    const sixCards = addCards(initialCards[i].link, initialCards[i].name);
    cardsPlace.append(sixCards);
  }
};

addSixCards();

//Listen for open/close popups

profileEdit.addEventListener('click', ()    => fillFieldsAndOpenPopUp(popUpEditProfile));
cardButtonAdd.addEventListener('click', ()  => cleanValueAndOpenPopUp(popUpAddCard));

//listen forms

formEditProfile.addEventListener('submit', formSubmitHandler);
formAddCard.addEventListener('submit', addOneCard);
