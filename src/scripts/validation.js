// Валидация профиля
// const formElement = document.querySelector('.popup__form')
// const formInput = formElement.querySelector('.popup__input')

// /////............... ТОКЕН ................. /////////
//          Токен: 1ca8a073-c9de-470b-a0ce-59e76a2f8b78
//          Идентификатор группы: wff-cohort-21
/////////////////////////////////////////////////////////

const validationData = {
   formSelector: ".popup__form",
   inputSelector: ".popup__input",
   submitButtonSelector: ".popup__button",
   inactiveButtonClass: "popup__button_disabled",
   inputErrorClass: "popup__input_type_error",
   errorClass: "popup__error_visible",
};

// Показать ошибку валидации
function showInputError(data, formElement, inputElement, errorMessage) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

   inputElement.classList.add(data.inputErrorClass);

   errorElement.textContent = errorMessage;
   errorElement.classList.add(data.errorClass);
}
// Убратьть ошибку валидации
function hideInputError(data, formElement, inputElement) {
   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

   inputElement.classList.remove(data.inputErrorClass);

   errorElement.classList.remove(data.errorClass);
   errorElement.textContent = "";
}
// Проверяем инпуты на валидность
function isValid(data, formElement, inputElement) {
   if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
   } else {
      inputElement.setCustomValidity("");
   }
   if (!inputElement.validity.valid) {
      showInputError(
         data,
         formElement,
         inputElement,
         inputElement.validationMessage
         
      );
   } else {
      hideInputError(data, formElement, inputElement);
   }
}

function setEventListeners(data, formElement) {
   const inputList = Array.from(
      formElement.querySelectorAll(data.inputSelector)
   );
   const buttonElement = formElement.querySelector(
      data.submitButtonSelector
   );
   toggleButtonState(data, inputList, buttonElement);
   inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
         // console.log(inputElement.validity.valid);
         isValid(data, formElement, inputElement);
         toggleButtonState(data, inputList, buttonElement);
      });
   });
}

function enableValidation(data) {
   const formList = Array.from(
      document.querySelectorAll(data.formSelector)
   );
   formList.forEach((formElement) => {
      setEventListeners(data, formElement);
   });
}

function hasInvalidInput(inputList) {
   return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
   });
}

// Переключение сабмита
function toggleButtonState(data, inputList, buttonElement) {
   if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(data.inactiveButtonClass);
   } else {
      buttonElement.classList.remove(data.inactiveButtonClass);
   }
}

function clearValidation(data, formElement) {
   const inputList = Array.from(
      formElement.querySelectorAll(data.inputSelector)
   );
   const buttonElement = formElement.querySelector(
      data.submitButtonSelector
   );
   toggleButtonState(data, inputList, buttonElement);
   inputList.forEach((inputElement) => {
      hideInputError(data, formElement, inputElement);
   });
}

export { enableValidation, clearValidation, validationData };
