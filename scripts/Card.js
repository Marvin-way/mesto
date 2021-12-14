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
    this._image.addEventListener('click', (evt) => this._showImage());
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
  _showImage(){ // убрал жесткое связываение, у нас осталась функция openPopup, кажется так тоже хорошо
    this._cardImage.src = this._link;
    this._cardImage.alt = `Картинка ${this._name}`;
    this._cardCaption.textContent = this._name;
    this._cardPopup(this._cardView);
  }
  _likeButton(){
    this._button.classList.toggle('element__button_active');
  }
  _deleteButton(){
    this._item.remove();
  }
  
}
export  { Card };