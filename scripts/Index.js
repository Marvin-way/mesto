import  { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
/////////////////////////////////////////////////////////////////////////
////////////   Стартовая загрузка страницы с карточками   ///////////////
/////////////////////////////////////////////////////////////////////////
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const config = {
  formSelector: '.popup__form ',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
/////////////////////////////////////////////////////////////////////////
////////////    Находим все нужные для алгоритма узлы     ///////////////
/////////////////////////////////////////////////////////////////////////
const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const elementsList = page.querySelector('.element');
const imageView = page.querySelector('.popup-view');
const imageViewImg = page.querySelector('.popup-view__image');
const imageViewCaption = page.querySelector('.popup-view__caption');

const popups = page.querySelectorAll('.popup');
const popupProfile = page.querySelector('.popup_profile');
const popupCard = page.querySelector('.popup_card');
const popupFormProfile = page.querySelector('.popup__form_profile');
const popupFormCard = page.querySelector('.popup__form_card');
const popupName = page.querySelector('.popup__input_name');
const popupJob = page.querySelector('.popup__input_job');
const popupPlace = page.querySelector('.popup__input_place');
const popupLink = page.querySelector('.popup__input_link');

const profileTitle = page.querySelector('.profile__title');
const profileSubTitle = page.querySelector('.profile__subtitle');

const ESC_CODE = 'Escape';
/////////////////////////////////////////////////////////////////////////
///////////////////      Основные скрипты тут     ///////////////////////
/////////////////////////////////////////////////////////////////////////
function renderCard(name, link) {
  elementsList.prepend(addCard(name, link));
}
function addCard(name, link) {
  const card = new Card(name, link, '#create-element', handleCardClick);
  const elementCard = card.generateCard();
  return elementCard;
}
function openPopup(thisPopup) {
  thisPopup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}
function closePopup(thisPopup) {
  thisPopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}
function handleProfileFormOpen(popupProfile) {
  popupName.value = profileTitle.textContent;
  popupJob.value = profileSubTitle.textContent;
  openPopup(popupProfile);
  formValidators['edit-profile'].resetValidation();
  }
function handleCardFormOpen(popupCard) {
  popupPlace.value = "";
  popupLink.value = "";
  openPopup(popupCard);
  formValidators['edit-card'].resetValidation();
  }
function handleProfileFormSubmit(evt) {
  profileTitle.textContent = popupName.value;
  profileSubTitle.textContent = popupJob.value;
  closePopup(popupProfile);
}
function handleCardFormSubmit(evt) {
  renderCard(popupPlace.value, popupLink.value);
  closePopup(popupCard);
  popupPlace.value = "";
  popupLink.value = "";
}
function handleCardClick(name, link){
  imageViewImg.src = link;
  imageViewImg.alt = `Картинка ${name}`;
  imageViewCaption.textContent = name;
  openPopup(imageView);
}
function closePopupEscape(evt) {
  if(evt.key === ESC_CODE) {
    const openedPopup = page.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
/////////////////////////////////////////////////////////////////////////
////////////      Устанавливаем слежку за событиями    //////////////////
/////////////////////////////////////////////////////////////////////////
editButton.addEventListener('click', () => handleProfileFormOpen(popupProfile));
addButton.addEventListener('click', () => handleCardFormOpen(popupCard));
popupFormProfile.addEventListener('submit', handleProfileFormSubmit);
popupFormCard.addEventListener('submit', handleCardFormSubmit);
popups.forEach((popup) => {//cool
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')){
      closePopup(popup);
    };
    if (evt.target.classList.contains('popup__close-button')){
      closePopup(popup);
    };
  })
})
const startPage = (initialCards) => {
    initialCards.forEach(item => {
    const card = renderCard(item.name, item.link);
  })
};
const formValidators = {};
const startValidation = (config) => { 
  const formList = Array.from(document.querySelectorAll(config.formSelector)); 
  formList.forEach((formElement) => {
    const validateForm = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validateForm;
    validateForm.enableValidation();
  });
};
startPage(initialCards);
startValidation(config);