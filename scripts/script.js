let content = document.querySelector('.page');
let editButton = content.querySelector('.profile__edit-button');
let closeButton = content.querySelector('.popup__close-button');
let saveButton = content.querySelector('.popup__save-button');


let popup = content.querySelector('.popup');
let popupContainer = content.querySelector('.popup__container');
let popupName = content.querySelector('.popup__field_name');
let popupJob = content.querySelector('.popup__field_job');

let profileTitle = content.querySelector('.profile__title');
let profileSubTitle = content.querySelector('.profile__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  console.log(`open popup`);
  popupName.setAttribute('value',`${profileTitle.textContent}`);
  popupJob.setAttribute('value',`${profileSubTitle.textContent}`);
}
function closePopup(evt) {
  popup.classList.remove('popup_opened');
  console.log(`close popup`);
}
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    console.log(`OK`);
    profileTitle.textContent = popupName.value;
    profileSubTitle.textContent = popupJob.value;
    closePopup();
}
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', handleProfileFormSubmit);