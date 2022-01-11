import  { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { config, initialCards } from "../utils/constants.js";
import { UserInfo } from "../components/UserInfo.js"; 

import {
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
} from "../utils/constants.js"

import './index.css';
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
console.log("lalalla")
const popupWithImage = new PopupWithImage('.popup-view');
const formCard = new PopupWithForm('.popup_card', config,  {data: null});
//создаем класс с данными юзера
const userInfo = new UserInfo(config);
//создаем класс с попапом редактирования юзера
const formProfile = new PopupWithForm('.popup_profile', config, { handleFormSubmit: (data) => userInfo.setUserInfo(data)});
