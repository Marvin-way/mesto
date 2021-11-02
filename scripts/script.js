/////////////////////////////////////////////////////////////////////////
////////////    Находим все нужные для алгоритма узлы     ///////////////
/////////////////////////////////////////////////////////////////////////
const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const closeButtonProfile = page.querySelector('.popup__close-button');
const closeButtonCard = page.querySelector('.popup__close-button_card');
const closeButtonView = page.querySelector('.popup__close-button_view');
const saveButton = page.querySelector('.popup__save-button');
const addButton = page.querySelector('.profile__add-button');
const elementsList = page.querySelector('.element');
const imageView = page.querySelector('.popup-view');
const imageViewImg = page.querySelector('.popup-view__image');
const imageViewCaption = page.querySelector('.popup-view__caption');

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


startPage ();
/////////////////////////////////////////////////////////////////////////
///////////////////      Основные скрипты тут     ///////////////////////
/////////////////////////////////////////////////////////////////////////
function addCard(name, link) {
  const createElement = document.querySelector('#create-element').content; //Копируем нужный узел из шаблона в HTML
  const elementCard = createElement.querySelector('.element__card').cloneNode(true); //Создаем в переменной конкретный узел, добавляемый на страницу
  elementCard.querySelector('.element__name').textContent = name; //Вставляем в название карточки имя из массива
  elementCard.querySelector('.element__image').src = link; //и ссылку таким же образом
  elementCard.querySelector('.element__image').alt = `Картинка ${name}`;
  const buttonLike = elementCard.querySelector('.element__button'); // Создаем переменную кнопки, потом на нее и повесим слушателя
  buttonLike.addEventListener('click', () => { //вешаем, если так это можно назвать, сразу на колбэк
    buttonLike.classList.toggle('element__button_active');
  });
  const deleteButton = elementCard.querySelector('.element__button-delete'); // аналогично вешаем, для удаления всего узла при нажатии кнопки
  deleteButton.addEventListener('click', () => {
    deleteButton.parentNode.remove(deleteButton);
  });
  elementCard.querySelector('.element__image').addEventListener('click', () => showImage(name, link));
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
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupName.value;
    profileSubTitle.textContent = popupJob.value;
    closePopup(popupProfile);
}
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  addCard(popupPlace.value, popupLink.value);
  evt.target.parentElement.classList.remove('popup_opened');
  popupPlace.value = "";
  popupLink.value = "";
}
function showImage(name, link) {
  imageView.classList.add('popup_opened');
  imageViewImg.src = link;
  imageViewImg.alt = `Картинка ${name}`;
  closeButtonView.addEventListener('click', () => closePopup(imageView));
  imageViewCaption.textContent = name;
}
/////////////////////////////////////////////////////////////////////////
////////////      Устанавливаем слежку за событиями =)    ///////////////
/////////////////////////////////////////////////////////////////////////
editButton.addEventListener('click', () => openPopup(popupProfile));
addButton.addEventListener('click', () => openPopup(popupCard));
closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));
closeButtonCard.addEventListener('click', () => closePopup(popupCard));
popupContainerProfile.addEventListener('submit', handleProfileFormSubmit);
popupContainerCard.addEventListener('submit', handleCardFormSubmit);
