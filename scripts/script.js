let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__edit-button');
let closeButton = page.querySelector('.popup__close-button');
let closeButtonCard = page.querySelector('.popup__close-button_card');
let saveButton = page.querySelector('.popup__save-button');
let addButton = page.querySelector('.profile__add-button');

let popupProfile = page.querySelector('.popup_profile');
let popupCard = page.querySelector('.popup_card');
let popupContainerProfile = page.querySelector('.popup__container_profile');
let popupContainerCard = page.querySelector('.popup__container_card');
let popupName = page.querySelector('.popup__field_name');
let popupJob = page.querySelector('.popup__field_job');
let popupPlace = page.querySelector('.popup__field_place');
let popupLink = page.querySelector('.popup__field_link');

let profileTitle = page.querySelector('.profile__title');
let profileSubTitle = page.querySelector('.profile__subtitle');

function openPopup(thisPopup) {
  thisPopup.classList.add('popup_opened');
  popupName.value = profileTitle.textContent;
  popupJob.value = profileSubTitle.textContent;
}
function closePopup(thisPopup) {
  thisPopup.classList.remove('popup_opened');
}
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = popupName.value;
    profileSubTitle.textContent = popupJob.value;
    closePopup(popupProfile);
}
function handleCardFormSubmit (evt) {
    evt.preventDefault();
    evt.target.parentElement.classList.remove('popup_opened');
}
editButton.addEventListener('click', () => openPopup(popupProfile));
addButton.addEventListener('click', () => openPopup(popupCard));
closeButton.addEventListener('click', () => closePopup(popupProfile));
closeButtonCard.addEventListener('click', () => closePopup(popupCard));
popupContainerProfile.addEventListener('submit', handleProfileFormSubmit);
popupContainerCard.addEventListener('submit', handleCardFormSubmit);

// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];