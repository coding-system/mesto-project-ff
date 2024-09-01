import "./pages/index.css"; // импорт главного файла стилей

import {
   getQuote,
   getData,
   getUserData,
   getCardsData,
   updateUserProfile,
   saveNewCard,
   // deleteCardFromServer
   updateAvatarOnServer,
} from "./scripts/api.js";
import { addCard, handleDeleteCard, handleLikeCard } from "./scripts/card";
// import { initialCards } from "./scripts/cards.js";
import { initializePopups, openPopup, closePopup } from "./scripts/modal.js";
import {
   enableValidation,
   clearValidation,
   validationData,
} from "./scripts/validation.js";
// import { getUserData, getCardsData } from './scripts/api.js';

let userId;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const cardsList = document.querySelector(".places__list"); // Грид с карточками
const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const avatarPopup = document.querySelector(".popup_type_avatar");
const editProfileForm = document.forms["edit-profile"];
const newPlaceForm = document.forms["new-place"];
const avatarForm = document.forms["avatar"];

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
avatarForm.addEventListener("submit", saveAvatar);

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

profileImage.addEventListener("click", () => {
   avatarForm.reset();
   clearValidation(validationData, avatarForm);
   openPopup(avatarPopup);
});

//////////////////////////////////////////////
//////////////////////////////////////////////
// Сохранение............Функция смены загрузки кнопки сабмита Сохранение...
function switchLoadingStatus(submitButton, isLoading) {
   if (isLoading) {
      submitButton.textContent = "Сохранение...";
   } else {
      submitButton.textContent = "Сохранить";
   }
}

// Функция сохранения новых данных профиля
function saveProfile(evt) {
   evt.preventDefault();

   switchLoadingStatus(evt.submitter, true);

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
         console.error(err);
      })
      .finally(() => {
         switchLoadingStatus(evt.submitter, false);
      });
}

//Функция создания и вывода карточки на страницу
function saveCard(evt) {
   evt.preventDefault();

   switchLoadingStatus(evt.submitter, true);

   const placeName = newPlaceForm.elements["place-name"].value;
   const link = newPlaceForm.elements["link"].value;

   saveNewCard(placeName, link)
      .then((cardData) => {
         const card = addCard(
            cardData,
            userId,
            handleLikeCard,
            handleDeleteCard,
            handleImageClick
         );
         cardsList.prepend(card);
         newPlaceForm.reset();
         closePopup(newCardPopup);
      })
      .catch((err) => {
         console.error(err);
      })
      .finally(() => {
         switchLoadingStatus(evt.submitter, false);
      });
}

// Функция обновления аватара
function saveAvatar(evt) {
   evt.preventDefault();

   switchLoadingStatus(evt.submitter, true);

   const avatarLink = avatarForm.elements["avatar-link"].value;

   updateAvatarOnServer(avatarLink)
      .then((userData) => {
         profileImage.style.backgroundImage = `url('${userData.avatar}')`;

         avatarForm.reset();

         closePopup(avatarPopup);
      })
      .catch((err) => {
         console.error(err);
      })
      .finally(() => {
         switchLoadingStatus(evt.submitter, false);
      });
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
// Загрузка профиля с сервера
function renderProfile(userData) {
   profileTitle.textContent = userData.name;
   profileDescription.textContent = userData.about;
   profileImage.style.backgroundImage = `url('${userData.avatar}')`;
   profileImage.alt = `Аватар пользователя: ${userData.name}`;
}

// Вывод загруженных карточек
function renderCards(cards, userId) {
   const cardsList = document.querySelector(".places__list");
   cards.forEach((cardData) => {
      const cardElement = addCard(
         cardData,
         userId,
         handleLikeCard,
         handleDeleteCard,
         handleImageClick
      );
      cardsList.append(cardElement);
   });
}

Promise.all([getUserData(), getCardsData()])
   .then(([userData, cards]) => {
      userId = userData._id;
      renderProfile(userData); // Обновляем данные профиля с сервекра
      renderCards(cards, userId); // Обновляем данные карточек с сервера
   })
   .catch((err) => console.error(err));

// Promise.all([getUserData(), getCardsData()])
//    .then(([userData, cards]) => {
//       const userId = userData._id;
//       renderProfile(userData); // Обновляем данные профиля с сервекра
//       renderCards(cards, userId); // Обновляем данные карточек с сервера
//    })
//    .catch((err) => console.error(err));
// Инициализация попапов
initializePopups(closePopup);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

// getQuote()
getData();
// getUserInfo()
enableValidation(validationData);

export { profileTitle, profileDescription, profileImage };
