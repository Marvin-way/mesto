import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._imageLink = this._popup.querySelector('.popup-view__image') ;
    this._imageCaption = this._popup.querySelector('.popup-view__caption');
  }
  openPopup(name, link){
    super.openPopup();
    this._imageCaption.textContent = name;
    this._imageLink.alt = `Картинка ${name}`;
    this._imageLink.src = link;
  }
}