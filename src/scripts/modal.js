// import { saveProfile, saveCard } from "./other";
import {editProfileForm} from '../index'
// Функция для открытия попапа
function openPopup(popup) {
   popup.classList.add("popup_is-opened");
   document.addEventListener("keydown", handleEscKey);
}

// Функция для закрытия попапа
function closePopup(popup) {
   popup.classList.remove("popup_is-opened");
   document.removeEventListener("keydown", handleEscKey);
}

// Закрытие попапа по нажатию на клавишу Esc
function handleEscKey(event) {
   if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
         closePopup(openedPopup);
      }
   }
}

// Функция сохранения новых данных профиля
function saveProfile(evt) {
   evt.preventDefault();
   // console.log("Работает");
   const name = editProfileForm.elements.name;
   const description = editProfileForm.elements.description;
   const profileTitle = document.querySelector(".profile__title");
   const profileDescription = document.querySelector(".profile__description");

   profileTitle.textContent =
      name.value.charAt(0).toUpperCase() + name.value.slice(1);
   profileDescription.textContent =
      description.value.charAt(0).toUpperCase() + description.value.slice(1);
   closePopup(editPopup);
}

const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
// Функция для инициализации попапов
function initializePopups() {
   // Получаем все попапы
   const popups = document.querySelectorAll(".popup");
   popups.forEach((popup) => {
      popup.classList.add("popup_is-animated");
   });

   // Открытие попапа редактирования профиля
   document
      .querySelector(".profile__edit-button")
      .addEventListener("click", () => {
         openPopup(editPopup);
      });

   // Открытие попапа добавления нового места
   document
      .querySelector(".profile__add-button")
      .addEventListener("click", () => {
         openPopup(newCardPopup);
      });

   // Открытие попапа изображения
   document.querySelectorAll(".card__image").forEach((image) => {
      image.addEventListener("click", (event) => {
         const imagePopup = document.querySelector(".popup_type_image");
         const img = imagePopup.querySelector(".popup__image");
         const caption = imagePopup.querySelector(".popup__caption");

         img.src = event.target.src; // Устанавливаем источник изображения
         caption.textContent = event.target.alt; // Устанавливаем подпись

         openPopup(imagePopup);
      });
   });

   // Закрытие попапа по кнопке закрытия
   popups.forEach((popup) => {
      const closeButton = popup.querySelector(".popup__close");
      if (closeButton) {
         closeButton.addEventListener("click", () => {
            closePopup(popup);
         });
      }
   });

   // Закрытие попапа при клике на оверлей
   document.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("popup_is-opened")) {
         closePopup(event.target);
      }
   });

   // Сохранение и закрытие попапа редактирования профиля
   // const editProfileForm = document.forms["edit-profile"];
   editProfileForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const editPopup = document.querySelector(".popup_type_edit");
      // closePopup(editPopup);
   });

   // Сохранение и закрытие попапа новой карточки
   const newPlaceForm = document.forms["new-place"];
   newPlaceForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newCardPopup = document.querySelector(".popup_type_new-card");
      // closePopup(newCardPopup);
   });
}

export {
   initializePopups,
   openPopup,
   closePopup,
   handleEscKey,
   newCardPopup,
   editPopup,
   saveProfile,
};
