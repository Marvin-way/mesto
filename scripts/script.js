let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__edit-button');
let closeButton = page.querySelector('.popup__close-button');
let saveButton = page.querySelector('.popup__save-button');


let popup = page.querySelector('.popup');
let popupContainer = page.querySelector('.popup__container');
let popupName = page.querySelector('.popup__field_name');
let popupJob = page.querySelector('.popup__field_job');

let profileTitle = page.querySelector('.profile__title');
let profileSubTitle = page.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  popupName.value = profileTitle.textContent;
  popupJob.value = profileSubTitle.textContent;
}
function closePopup(evt) {
  popup.classList.remove('popup_opened');
}
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = popupName.value;
    profileSubTitle.textContent = popupJob.value;
    closePopup();
}
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', handleProfileFormSubmit);