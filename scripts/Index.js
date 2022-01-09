import  { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { config, initialCards } from "./constants.js";
import { UserInfo } from "./UserInfo.js"; 

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

/////////////////////////////////////////////////////////////////////////
///////////////////        Основные скрипты       ///////////////////////
/////////////////////////////////////////////////////////////////////////
function renderCard(name, link) { 
  elementsList.prepend(addCard(name, link)); 
} 
function addCard(name, link) { 
  const card = new Card(name, link, '#create-element', handleCardClick); 
  const elementCard = card.generateCard(); 
  return elementCard; 
}

function handleProfileFormOpen() {
  const data = userInfo.getUserInfo();
  popupName.value = data.name;
  popupJob.value = data.job;
  formProfile.openPopup();
  formValidators['edit-profile'].resetValidation();
}
function handleCardFormOpen() {
  popupPlace.value = "";
  popupLink.value = "";
  formCard.openPopup();
  formValidators['edit-card'].resetValidation();
  }

function handleCardFormSubmit(evt) {
  renderCard(popupPlace.value, popupLink.value);
  formCard.closePopup(popupCard);
  popupPlace.value = "";
  popupLink.value = "";
}
function handleCardClick(name, link){
  popupWithImage.openPopup(name, link);
}

/////////////////////////////////////////////////////////////////////////
////////////      Устанавливаем слежку за событиями    //////////////////
/////////////////////////////////////////////////////////////////////////
editButton.addEventListener('click', () => handleProfileFormOpen());
addButton.addEventListener('click', () => handleCardFormOpen());
popupFormCard.addEventListener('submit', (evt) => handleCardFormSubmit(evt));
const formCard = new PopupWithForm('.popup_card', config,  {data: null});

//создаем массив всех форм на странице
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
const popupWithImage = new PopupWithImage('.popup-view');
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '#create-element', handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, '.element');
cardList.renderItems();
//включаем валидацию форм
startValidation(config);

//создаем класс с данными юзера
const userInfo = new UserInfo(config);
//создаем класс с попапом юзера
const formProfile = new PopupWithForm('.popup_profile', config, { handleFormSubmit: (data) => userInfo.setUserInfo(data)});
// formProfile.setEventListeners();
// formCard.setEventListeners();
