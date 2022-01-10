import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, config, {handleFormSubmit = null}){
    super(popupSelector);
    this._config = config;
    this._form = this._popup.querySelector(this._config.formSelector);
    this._submitCallback = handleFormSubmit;
  }

  reset(){
    this._form.reset();
  }
  _getInputValues(){
    const inputs = [...this._form.querySelectorAll(this._config.inputSelector)];
    const values = {};
    inputs.forEach(input => {
      values[input.name] = input.value;
    });   
    return values;
  }
  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const data = this._getInputValues();
      if (this._submitCallback){this._submitCallback(data)}
      super.closePopup()
    });
  }

  // openPopup(){
  //   super.openPopup();
  // }
  closePopup(){
    super.closePopup();
    this.reset();
  }
}