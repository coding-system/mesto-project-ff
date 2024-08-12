import "./pages/index.css"; // импорт главного файла стилей

import { addCard, handleDeleteCard, handleLikeCard } from "./scripts/card";
import { initialCards } from "./scripts/cards.js";
import {
   initializePopups,
   openPopup,
   closePopup,
   submitForm,
} from "./scripts/modal.js";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardsList = document.querySelector(".places__list"); // Грид с карточками

const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];

// Обработчики для форм
// editProfileForm.addEventListener("submit", saveProfile);
// newPlaceForm.addEventListener("submit", saveCard);

// Функция вставки карточек по-умолчанию на страницу
function renderCard(cards) {
   cards.forEach((data) => {
      const card = addCard(data, handleLikeCard, handleDeleteCard);
      cardsList.append(card);
   });
}

renderCard(initialCards);

// Инициализация попапов
initializePopups(openPopup, closePopup, submitForm);

export {
   cardsList,
   editProfileForm,
   newPlaceForm,
   profileTitle,
   profileDescription,
};
