import { saveProfile, saveCard } from "./other";

// Функция для инициализации попапов
function initializePopups() {
   // Получаем все попапы
   const popups = document.querySelectorAll(".popup");
   popups.forEach((popup) => {
      popup.classList.add("popup_is-animated");
   });

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

   // Открытие попапа редактирования профиля
   document
      .querySelector(".profile__edit-button")
      .addEventListener("click", () => {
         const editPopup = document.querySelector(".popup_type_edit");
         openPopup(editPopup);
      });

   // Открытие попапа добавления нового места
   document
      .querySelector(".profile__add-button")
      .addEventListener("click", () => {
         const newCardPopup = document.querySelector(".popup_type_new-card");
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

   // Закрытие попапа при клике вне его содержимого
   document.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("popup_is-opened")) {
         closePopup(event.target);
      }
   });

   // Сохранение и закрытие попапа редактирования профиля
   const editProfileForm = document.forms["edit-profile"];
   editProfileForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const editPopup = document.querySelector(".popup_type_edit");
      closePopup(editPopup);
   });

   // Сохранение и закрытие попапа новой карточки
   const newPlaceForm = document.forms["new-place"];
   newPlaceForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const newCardPopup = document.querySelector(".popup_type_new-card");
      initializePopups();
      closePopup(newCardPopup);
   });
}

initializePopups();
