export const initialCards = [
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
export const config = {
  formSelector: '.popup__form ',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  profileTitle: '.profile__title',
  profileSubTitle: '.profile__subtitle'
}

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const elementsList = page.querySelector('.element');
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

export {page,
  editButton,
  addButton,
  elementsList,
  popupProfile,
  popupCard,
  popupFormProfile,
  popupFormCard,
  popupName, 
  popupJob, 
  popupPlace, 
  popupLink, 
  profileTitle, 
  profileSubTitle
}