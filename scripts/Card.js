/////////////////////////////////////////////////////////////////////////
////////////    Находим все нужные для алгоритма узлы     ///////////////
/////////////////////////////////////////////////////////////////////////
const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const closeButtonProfile = page.querySelector('.popup__close-button_profile');
const closeButtonCard = page.querySelector('.popup__close-button_card');
const closeButtonView = page.querySelector('.popup__close-button_view');
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
const popupButtonCard = popupFormCard.querySelector('.popup__button');

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
  const card = new Card(name, link, '#create-element');
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
  popupButtonCard.disabled = true;
  popupButtonCard.classList.add('popup__button_disabled');
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
addButton.addEventListener('click', () => openPopup(popupCard));
closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));
closeButtonCard.addEventListener('click', () => closePopup(popupCard));
closeButtonView.addEventListener('click', () => closePopup(imageView));
popupFormProfile.addEventListener('submit', handleProfileFormSubmit);
popupFormCard.addEventListener('submit', handleCardFormSubmit);
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')){
      closePopup(popup);
    };
  })
})
class Card {
  constructor(name, link, cardTemplate){
    this._name = name,
    this._link = link,
    this._cardTemplate = cardTemplate
  }
  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardTemplate)
    .content
    .querySelector('.element__card')
    .cloneNode(true);
    return cardElement;
  }
  _setEventsListeners(){
    this._item.querySelector('.element__image').addEventListener('click', (evt) => this._showImage());
    this._item.querySelector('.element__button').addEventListener('click', (evt) => this._likeButton());
    this._item.querySelector('.element__button-delete').addEventListener('click', (evt) => this._deleteButton());
  }
  generateCard() { 
    this._item = this._getTemplate();
    this._setEventsListeners();
    this._item.querySelector('.element__image').src = this._link;
    this._item.querySelector('.element__name').textContent = this._name;
    this._item.querySelector('.element__name').alt = this._name;
    return this._item;
  }
  _showImage(){
    imageViewImg.src = this._link;
    imageViewImg.alt = `Картинка ${this._name}`;
    imageViewCaption.textContent = this._name;
    openPopup(imageView);
  }
  _likeButton(){
    this._item.querySelector('.element__button').classList.toggle('element__button_active');
  }
  _deleteButton(){
    this._item.remove();
  }
  
}
export  { Card };