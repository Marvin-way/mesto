const mestoSettings = {
  formSelector: '.popup__container',
  // errorClass: '.error',
  // formSelector: '.popup__form',
  // inputSelector: '.popup__input',
  // submitButtonSelector: '.popup__button',
  // inactiveButtonClass: 'popup__button_disabled',
  // inputErrorClass: 'popup__input_type_error',
  // errorClass: 'popup__error_visible'
}
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => { // получаем конкретный инпут и его форму
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};
const setEventListeners = (fieldset, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field')); //из полученной формы берем все поля инпутов
  const buttonElement = formElement.querySelector('.popup__save-button'); // в форме находим кнопку сабмита
  toggleButtonState(inputList, buttonElement);// запускаем переключаель активности кнопки - проверяем все ли инпуты корректные
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () { // теперь каждый ввод\удаление символов в инпут будет проверятся
      
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}
const enableValidation = (formsElement) => {
  const formList = Array.from(document.querySelectorAll(formsElement.formSelector)); // 2)создаем массив из форм (пока что 2 формы)
  formList.forEach((formElement) => { // 3) проходимся по каждой форме
    formElement.addEventListener('submit', function (evt) { // 4) убираем у каждой формы стандартную отправку
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__field')); // 5) создаем массив из инпутов формы
    fieldsetList.forEach((fieldset) => {
    setEventListeners(fieldset, formElement); // 6) к каждому инпуту в формах применяем проверку валидации путем установки слушателей
  });
  });
};
function hasInvalidInput(inputList){
  return inputList.some((inputElement) => { //ищем хотя бы один кривой инпут
  return !inputElement.validity.valid; // если все инпуты корректные, то вернется false
}); 
}
function toggleButtonState(inputList, buttonElement){ //тут мы получаем массив инпутов и кнопку отправки формы
  if(hasInvalidInput(inputList)){ // если хоть один инпут некорректный - кнопка не работает
    buttonElement.classList.add('popup__save-button_inactive'); // стиль неработающей кнопки
  } else buttonElement.classList.remove('popup__save-button_inactive');
}
enableValidation(mestoSettings); // 1)запуск валидации формы