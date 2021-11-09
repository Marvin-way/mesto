const mestoSettings = {
  formSelector: '.popup__form ',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
const showInputError = (formElement, inputElement, errorMessage, OurProject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);// находим нужный нам спан, под конкретным инпутом
  inputElement.classList.add(OurProject.inputErrorClass); // добавляем к инпуту красное подчеркивание
  errorElement.textContent = errorMessage; // вставляем текст ошибки в спан подсказку
  errorElement.classList.add(OurProject.errorClass); // показываем элемент пользователю, который изначално скрыт
};

const hideInputError = (formElement, inputElement, OurProject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(OurProject.inputErrorClass);
  errorElement.classList.remove(OurProject.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, OurProject) => { // получаем конкретный инпут и его форму
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, OurProject);
  } else {
    hideInputError(formElement, inputElement, OurProject);
  }
};
const setEventListeners = (fieldset, formElement, OurProject) => {
  const inputList = Array.from(formElement.querySelectorAll(OurProject.inputSelector)); //из полученной формы берем все поля инпутов
  const buttonElement = formElement.querySelector(OurProject.submitButtonSelector); // в форме находим кнопку сабмита
  toggleButtonState(inputList, buttonElement, OurProject);// запускаем переключаель активности кнопки - проверяем все ли инпуты корректные
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () { // теперь каждый ввод\удаление символов в инпут будет проверятся
      
      checkInputValidity(formElement, inputElement, OurProject);
      toggleButtonState(inputList, buttonElement, OurProject);
    });
  });
}
const enableValidation = (OurProject) => { // 1) запускаем наш проект 
  const formList = Array.from(document.querySelectorAll(OurProject.formSelector)); // 2)создаем массив из форм (пока что 2 формы)
  formList.forEach((formElement) => { // 3) проходимся по каждой форме
    formElement.addEventListener('submit', function (evt) { // 4) убираем у каждой формы стандартную отправку
      evt.preventDefault();
    });
    const fieldsetList = Array.from(formElement.querySelectorAll(OurProject.inputSelector)); // 5) создаем массив из инпутов формы
    fieldsetList.forEach((fieldset) => {
    setEventListeners(fieldset, formElement, OurProject); // 6) к каждому инпуту в формах применяем проверку валидации путем установки слушателей
  });
  });
};
function hasInvalidInput(inputList){
  return inputList.some((inputElement) => { //ищем хотя бы один кривой инпут
  return !inputElement.validity.valid; // если все инпуты корректные, то вернется false
}); 
}
function toggleButtonState(inputList, buttonElement, OurProject){ //тут мы получаем массив инпутов и кнопку отправки формы
  if(hasInvalidInput(inputList)){ // если хоть один инпут некорректный - кнопка не работает
    buttonElement.classList.add(OurProject.inactiveButtonClass); // стиль неработающей кнопки
  } else buttonElement.classList.remove(OurProject.inactiveButtonClass);
}
enableValidation(mestoSettings); // 1)запуск валидации формы