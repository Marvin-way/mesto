export const mestoSettings = {
  formSelector: '.popup__form ',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
class FormValidator {
  constructor(mestoSettings, form){
    this._config = mestoSettings,
    this._form = form
  }
  _setSubmitHanldler(){
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }
  _toggleButtonState(inputList, buttonElement){
    if(this._hasInvalidInput(inputList)){
      buttonElement.classList.add(this._config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
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
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
   inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(inputList, buttonElement);
    });
  });
  }
  _hasInvalidInput(inputList){
    return inputList.some((inputElement) => { 
    return !inputElement.validity.valid; 
  }); 
  }
  enableValidation(){
    this._setSubmitHanldler();
    this._setEventListeners();
  }
}
export const startValidation = (config) => { 
  const formList = Array.from(document.querySelectorAll(config.formSelector)); 
  formList.forEach((formElement) => {
    const form = new FormValidator(config, formElement);
    form.enableValidation();
  });
};