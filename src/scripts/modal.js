// Import necessary modules
import { editProfileForm, profileTitle, profileDescription } from "../index.js";
import { saveProfile, saveCard } from "../index.js";

// Функция для открытия попапа
function openPopup(popup) {
   popup.classList.add("popup_is-opened");
   document.addEventListener("keydown", handleEscKey);

   // Вставка начальных данных профиля
   // if (popup === editPopup) {
   //    editProfileForm.elements.name.value = profileTitle.textContent;
   //    editProfileForm.elements.description.value =
   //       profileDescription.textContent;
   // }
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
// function saveProfile(evt) {
//    evt.preventDefault();
//    const name = editProfileForm.elements.name.value;
//    const description = editProfileForm.elements.description.value;

//    profileTitle.textContent = name.charAt(0).toUpperCase() + name.slice(1);
//    profileDescription.textContent =
//       description.charAt(0).toUpperCase() + description.slice(1);

//    // closePopup(editPopup);
// }

const editPopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");

// Функция сабмита формы
function submitForm() {
   document.addEventListener("submit", (event) => {
      event.preventDefault();

      const activePopup = document.querySelector(".popup_is-opened");
      if (!activePopup) return;

      if (activePopup === editPopup) {
         saveProfile(event);
      } else if (activePopup === newCardPopup) {
         saveCard(event);
      }
      closePopup(activePopup);
   });
}

// Функция для инициализации попапов
function initializePopups(onOpen, onClose, onSubmit) {
   // Добавляем обработчики

   // Получаем все попапы
   const popups = document.querySelectorAll(".popup");
   popups.forEach((popup) => {
      popup.classList.add("popup_is-animated");
   });

   // Открытие попапа редактирования профиля
   document
      .querySelector(".profile__edit-button")
      .addEventListener("click", () => {
         onOpen(editPopup);
      });

   // Открытие попапа добавления нового места
   document
      .querySelector(".profile__add-button")
      .addEventListener("click", () => {
         onOpen(newCardPopup);
      });

   // Открытие попапа изображения
   // document.querySelectorAll(".card__image").forEach((image) => {
   //    image.addEventListener("click", (event) => {
   //       const imagePopup = document.querySelector(".popup_type_image");
   //       const img = imagePopup.querySelector(".popup__image");
   //       const caption = imagePopup.querySelector(".popup__caption");

   //       img.alt = event.target.alt;
   //       img.src = event.target.src; // Set image source
   //       caption.textContent = event.target.alt; // Set caption

   //       onOpen(imagePopup);
   //    });
   // });

   // Закрытие попапа по кнопке закрытия
   popups.forEach((popup) => {
      const closeButton = popup.querySelector(".popup__close");
      if (closeButton) {
         closeButton.addEventListener("click", () => {
            onClose(popup);
         });
      }
   });

   // Закрытие попапа при клике на оверлей
   document.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("popup_is-opened")) {
         onClose(event.target);
      }
   });

   submitForm(onSubmit);
}

export {
   initializePopups,
   openPopup,
   closePopup,
   submitForm,
   handleEscKey,
   newCardPopup,
   editPopup,
   saveProfile,
};
