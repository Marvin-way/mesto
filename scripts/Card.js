class Card {
  constructor(name, link, cardTemplate, handleCardClick){
    this._name = name,
    this._link = link,
    this._cardTemplate = cardTemplate, 
    this._handleCardClick = handleCardClick
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
    this._image.addEventListener('click', (evt) => this._handleCardClick(this._name, this._link));
    this._button.addEventListener('click', (evt) => this._likeButton());
    this._item.querySelector('.element__button-delete').addEventListener('click', (evt) => this._deleteButton());
  }
  generateCard() { 
    this._item = this._getTemplate();
    this._image = this._item.querySelector('.element__image');
    this._image.src = this._link;
    this._item.querySelector('.element__name').textContent = this._name;
    this._image.alt = this._name;
    this._button = this._item.querySelector('.element__button');
    this._setEventsListeners();
    return this._item;
  }
  _likeButton(){
    this._button.classList.toggle('element__button_active');
  }
  _deleteButton(){
    this._item.remove();
  }
  
}
export  { Card };