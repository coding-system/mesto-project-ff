import "./pages/index.css"; // импорт главного файла стилей

import { addCard, handleDeleteCard, handleLikeCard } from "./scripts/card";
import { initialCards } from "./scripts/cards.js";
import { initializePopups, openPopup, closePopup } from "./scripts/modal.js";
import {
   enableValidation,
   clearValidation,
   validationData,
} from "./scripts/validation.js";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const cardsList = document.querySelector(".places__list"); // Грид с карточками
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];

// Инпуты попапов
const editProfileInputName = editProfileForm.elements.name;
const editProfileInputDescription = editProfileForm.elements.description;

const profileEditButton = document.querySelector(".profile__edit-button");
const newCardButton = document.querySelector(".profile__add-button");

const imagePopup = document.querySelector(".popup_type_image");
const img = imagePopup.querySelector(".popup__image");
const caption = imagePopup.querySelector(".popup__caption");

// Добавить начальные значения profile
// editProfileInputName.value = profileTitle.textContent;
// editProfileInputDescription.value = profileDescription.textContent;

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

// Обработчики для попапов
profileEditButton.addEventListener("click", () => {
   clearValidation(validationData, editProfileForm);
   editProfileForm.reset();
   editProfileInputName.value = profileTitle.textContent;
   editProfileInputDescription.value = profileDescription.textContent;
   openPopup(editPopup);
});

// Обработчик открытия попапа для добавления новой карточки
newCardButton.addEventListener("click", () => {
   newPlaceForm.reset(); // Сбрасываем форму
   clearValidation(validationData, newPlaceForm); // Очищаем валидацию
   openPopup(newCardPopup);
});

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
   const placeName = newPlaceForm.elements["place-name"].value;
   const link = newPlaceForm.elements["link"].value;
   const newCardData = { name: placeName, link: link };
   const card = addCard(
      newCardData,
      handleLikeCard,
      handleDeleteCard,
      handleImageClick
   );
   cardsList.prepend(card);
   newPlaceForm.reset();
   closePopup(newCardPopup);
}

function handleImageClick(data) {
   img.alt = `Полностью открытое изображение карточки "${data.name}"`;
   img.src = data.link;
   caption.textContent = data.name;

   openPopup(imagePopup);
}

renderCard(initialCards);

// Инициализация попапов
initializePopups(closePopup);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

enableValidation(validationData);

export // saveProfile,
// saveCard,
// cardsList,
// editProfileForm,
// newPlaceForm,
// profileTitle,
// profileDescription,
 {};
