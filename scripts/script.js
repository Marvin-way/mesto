const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const closeButton = page.querySelector('.popup__close-button');
const closeButtonCard = page.querySelector('.popup__close-button_card');
const saveButton = page.querySelector('.popup__save-button');
const addButton = page.querySelector('.profile__add-button');
const elementsList = page.querySelector('.element');

const popupProfile = page.querySelector('.popup_profile');
const popupCard = page.querySelector('.popup_card');
const popupContainerProfile = page.querySelector('.popup__container_profile');
const popupContainerCard = page.querySelector('.popup__container_card');
const popupName = page.querySelector('.popup__field_name');
const popupJob = page.querySelector('.popup__field_job');
const popupPlace = page.querySelector('.popup__field_place');
const popupLink = page.querySelector('.popup__field_link');

const profileTitle = page.querySelector('.profile__title');
const profileSubTitle = page.querySelector('.profile__subtitle');

/////////////////////////////////////////////////////////////////////////
///////////////////      Основные скрипты тут     ///////////////////////
/////////////////////////////////////////////////////////////////////////
function addCard(name, link) {
  const createElement = document.querySelector('#create-element').content;
  const elementCard = createElement.querySelector('.element__card').cloneNode(true);
  console.log(elementCard);
  elementCard.querySelector('.element__name').textContent = name;
  elementCard.querySelector('.element__image').src = link;
  elementsList.prepend(elementCard);
}
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
  addCard(popupPlace.value, popupLink.value);
  evt.target.parentElement.classList.remove('popup_opened');
}
/////////////////////////////////////////////////////////////////////////
////////////      Устанавливаем слежку за событиями     /////////////////
/////////////////////////////////////////////////////////////////////////

editButton.addEventListener('click', () => openPopup(popupProfile));
addButton.addEventListener('click', () => openPopup(popupCard));
closeButton.addEventListener('click', () => closePopup(popupProfile));
closeButtonCard.addEventListener('click', () => closePopup(popupCard));
popupContainerProfile.addEventListener('submit', handleProfileFormSubmit);
popupContainerCard.addEventListener('submit', handleCardFormSubmit);

/////////////////////////////////////////////////////////////////////////
////////////   Стартовая загрузка страницы с карточками   ///////////////
/////////////////////////////////////////////////////////////////////////
function startPage () {
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
  initialCards.forEach(card => {
    addCard(card.name, card.link);
  })
};
startPage ();