export class FormValidator {
  constructor(mestoSettings, form){
    this._config = mestoSettings,
    this._form = form, 
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector)),
    this._buttonSubmit = this._form.querySelector(this._config.submitButtonSelector)
  }
  _setSubmitHanldler(){
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }
  _toggleButtonState(){
    if(this._hasInvalidInput()){
      this._buttonSubmit.classList.add(this._config.inactiveButtonClass);
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.classList.remove(this._config.inactiveButtonClass);
      this._buttonSubmit.disabled = false;
    }
  }
  _showInputError(inputElement, errorMessage,){
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass); 
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };
  _hideInputError(inputElement){
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };
  _checkInputValidity(inputElement){
    if (!inputElement.validity.valid) { 
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _setEventListeners(){
    this._toggleButtonState();
   this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });
  }
  _hasInvalidInput(){
    return this._inputList.some((inputElement) => { 
    return !inputElement.validity.valid; 
  }); 
  }
  enableValidation(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    this._setSubmitHanldler();
    this._setEventListeners();
  }
  resetValidation(){
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    })
  }
}