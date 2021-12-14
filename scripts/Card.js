class Card {
  constructor(name, link, cardTemplate, imageView,imageViewImg, imageViewCaption, openPopup){
    this._name = name,
    this._link = link,
    this._cardTemplate = cardTemplate, 
    this._cardView = imageView,
    this._cardImage = imageViewImg, 
    this._cardCaption = imageViewCaption,
    this._cardPopup = openPopup
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
    this._item.querySelector('.element__image').alt = this._name;
    return this._item;
  }
  _showImage(){
    this._cardImage.src = this._link;
    this._cardImage.alt = `Картинка ${this._name}`;
    this._cardCaption.textContent = this._name;
    this._cardPopup(this._cardView);
  }
  _likeButton(){
    this._item.querySelector('.element__button').classList.toggle('element__button_active');
  }
  _deleteButton(){
    this._item.remove();
  }
  
}
export  { Card };