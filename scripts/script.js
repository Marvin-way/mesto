let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let closeButton = content.querySelector('.popup__close-button');
let saveButton = content.querySelector('.popup__save-button');


let popup = content.querySelector('.popup');
let popupContainer = content.querySelector('.popup__container');
let popupName = content.querySelector('.popup__name');
let popupJob = content.querySelector('.popup__job');

let profileTitle = content.querySelector('.profile__title');
let profileSubTitle = content.querySelector('.profile__subtitle');

function editWindow() {
  popup.classList.toggle('popup_opened');
  popupName.setAttribute('value',`${profileTitle.innerText}`);
  popupJob.setAttribute('value',`${profileSubTitle.innerText}`);
}
function closeWindow(evt) {
  evt.preventDefault();
  popup.classList.toggle('popup_opened');
}
function saveWindow (evt) {
    evt.preventDefault();
    profileTitle.textContent = popupName.value;
    profileSubTitle.textContent = popupJob.value;
    editWindow();
}
editButton.addEventListener('click', editWindow);
closeButton.addEventListener('click', closeWindow);
saveButton.addEventListener('click', saveWindow);