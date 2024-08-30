import "./pages/index.css"; // импорт главного файла стилей

import {getQuote, getData, getUserData, getCardsData, updateUserProfile} from './scripts/api.js'
import { addCard, handleDeleteCard, handleLikeCard } from "./scripts/card";
import { initialCards } from "./scripts/cards.js";
import { initializePopups, openPopup, closePopup } from "./scripts/modal.js";
import {
   enableValidation,
   clearValidation,
   validationData,
} from "./scripts/validation.js";
// import { getUserData, getCardsData } from './scripts/api.js';

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
// function renderCard(cards) {
//    cards.forEach((data) => {
//       const card = addCard(
//          data,
//          handleLikeCard,
//          handleDeleteCard,
//          handleImageClick
//       );
//       cardsList.append(card);
//    });
// }

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
   newPlaceForm.reset();
   clearValidation(validationData, newPlaceForm);
   openPopup(newCardPopup);
});

// Функция сохранения новых данных профиля
function saveProfile(evt) {
   evt.preventDefault();
 
   // Получаем данные из формы
   const name = editProfileForm.elements.name.value;
   const description = editProfileForm.elements.description.value;
 
   updateUserProfile(name, description)
     .then((userData) => {
       profileTitle.textContent = userData.name;
       profileDescription.textContent = userData.about;
 
       closePopup(editPopup);
     })
     .catch((err) => {
       console.error('Error updating profile:', err);
     });
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
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
function renderProfile(userData) {
   profileTitle.textContent = userData.name;
   profileDescription.textContent = userData.about;
   profileImage.src = userData.avatar;
   profileImage.alt = `Avatar of ${userData.name}`;
 }

 function renderCards(cards, userId) {
   const cardsList = document.querySelector('.places__list');
   cards.forEach(cardData => {
     const cardElement = addCard(cardData, userId, handleLikeCard, handleDeleteCard, handleImageClick);
     cardsList.append(cardElement);
   });
 }

 Promise.all([getUserData(), getCardsData()])
 .then(([userData, cards]) => {
   const userId = userData._id;
   renderProfile(userData);  // Обновляем данные профиля с сервекра
   renderCards(cards, userId);  // Обновляем данные карточек с сервера
 })
 .catch(err => console.error(err));

// Инициализация попапов
initializePopups(closePopup);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// getQuote()
getData()
// getUserInfo()
enableValidation(validationData);

export {profileTitle, profileDescription, profileImage};
