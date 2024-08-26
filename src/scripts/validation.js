// Валидация профиля
// const formElement = document.querySelector('.popup__form')
// const formInput = formElement.querySelector('.popup__input')

const validationData = {
   formSelector: ".popup__form",
   inputSelector: ".popup__input",
   submitButtonSelector: ".popup__button",
   inactiveButtonClass: "popup__button_disabled",
   inputErrorClass: "popup__input_type_error",
   errorClass: "popup__error_visible",
};

function showInputError(
   formElement,
   inputElement,
   errorMessage,
   data
) {
   const errorElement = formElement.querySelector(`.${inputSelector.id}-error`);

   inputElement.classList.add(data.inputErrorClass);
   errorElement.classList.add(data.errorClass);
   errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, data) {
   const errorElement = formElement.querySelector(`.${inputSelector.id}-error`);

   inputElement.classList.remove(data.inputErrorClass);
   errorElement.classList.remove(data.errorClass);
   errorElement.textContent = "";
}

function enableValidation(data) {}

function clearValidation() {}

export { enableValidation, clearValidation, validationData };
