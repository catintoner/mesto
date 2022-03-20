// Реализация открытия/закрытия popUp

let redact = document.querySelector('.profile__redaction');
let popUp = document.querySelector('.popup');
let popUpExit = document.querySelector('.popup__exit');

function PopUp() {
  nameInput.value = profileName.textContent.trim();
  jobInput.value = profileJob.textContent.trim();
  popUp.classList.toggle('popup_opened');
}

redact.addEventListener('click', PopUp);
popUpExit.addEventListener('click', PopUp);

// Реализация отображения и изменения данных в профиле

let formElement = document.forms['profile-edit'];
let nameInput = formElement.name;
let jobInput = formElement.job;
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  let name = nameInput.value;
  let job = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileName.textContent = name;
  profileJob.textContent = job;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

