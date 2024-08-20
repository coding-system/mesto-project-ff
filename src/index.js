import "./pages/index.css"; // импорт главного файла стилей

import { addCard, handleDeleteCard, handleLikeCard } from "./scripts/card";
import { initialCards } from "./scripts/cards.js";
import { initializePopups, openPopup, closePopup } from "./scripts/modal.js";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardsList = document.querySelector(".places__list"); // Грид с карточками
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];

const imagePopup = document.querySelector(".popup_type_image");
const img = imagePopup.querySelector(".popup__image");
const caption = imagePopup.querySelector(".popup__caption");

// editProfileForm.addEventListener("submit", saveProfile);
// newPlaceForm.addEventListener("submit", saveCard);

// Добавить начальные значения profile
editProfileForm.elements.name.value = profileTitle.textContent;
editProfileForm.elements.description.value = profileDescription.textContent;
// Функция вставки карточек по-умолчанию на страницу
function renderCard(cards) {
   cards.forEach((data) => {
      const card = addCard(
         data,
         handleLikeCard,
         handleDeleteCard,
         handleImageClick
      );
      cardsList.append(card);
   });
}

// Обработчики для форм
editProfileForm.addEventListener("submit", saveProfile);
newPlaceForm.addEventListener("submit", saveCard);

// Функция сохранения новых данных профиля
function saveProfile(evt) {
   evt.preventDefault();
   const name = editProfileForm.elements.name.value;
   const description = editProfileForm.elements.description.value;

   profileTitle.textContent = name.charAt(0).toUpperCase() + name.slice(1);
   profileDescription.textContent =
      description.charAt(0).toUpperCase() + description.slice(1);

   closePopup(editPopup);
}

//Функция создания и вывода карточки на страницу
function saveCard(evt) {
   evt.preventDefault();
   const card = addCard(
      null,
      handleLikeCard,
      handleDeleteCard,
      handleImageClick
   );
   cardsList.prepend(card);
   newPlaceForm.reset();
   closePopup(newCardPopup);
}

// New function to handle image click
function handleImageClick(data) {
   img.alt = `Полностью открытое изображение карточки "${data.name}"`;
   img.src = data.link;
   caption.textContent = data.name;

   openPopup(imagePopup);
}

renderCard(initialCards);

// Инициализация попапов
initializePopups(openPopup, closePopup);

export {
   saveProfile,
   saveCard,
   cardsList,
   editProfileForm,
   newPlaceForm,
   profileTitle,
   profileDescription,
};
