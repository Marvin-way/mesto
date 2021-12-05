const mestoSettings = {
  formSelector: '.popup__form ',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
class FormValidator {
  constructor(mestoSettings, form){
    this._OurProject = mestoSettings,
    this._form = form
  }
  _deleteSubmit(){
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }
  _toggleButtonState(inputList, buttonElement){
    if(this._hasInvalidInput(inputList)){
      buttonElement.classList.add(this._OurProject.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._OurProject.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  _showInputError(inputElement, errorMessage,){
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._OurProject.inputErrorClass); 
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._OurProject.errorClass);
  };
  _hideInputError(inputElement){
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._OurProject.inputErrorClass);
    errorElement.classList.remove(this._OurProject.errorClass);
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
    const inputList = Array.from(this._form.querySelectorAll(this._OurProject.inputSelector));
    const buttonElement = this._form.querySelector(this._OurProject.submitButtonSelector);
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
    this._deleteSubmit();
    this._setEventListeners();
  }
}
const start = (OurProject) => { 
  const formList = Array.from(document.querySelectorAll(OurProject.formSelector)); 
  formList.forEach((formElement) => {
    let form = new FormValidator(OurProject, formElement);
    form.enableValidation();
  });
};
start(mestoSettings);