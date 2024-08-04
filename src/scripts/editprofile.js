import { content, pageContent } from "./vars";

function openPopupEditProfile() {
   const editProfeleButton = content.querySelector(".profile__edit-button"); // Кнопка добавления карточки
   const popupTypeEdit = pageContent.querySelector(".popup_type_edit");
   const closeButton = popupTypeEdit.querySelector(".popup__close");

   // Открытие попапа
   editProfeleButton.addEventListener("click", function () {
      popupTypeEdit.classList.add("popup_is-opened");
      // Добавляем обработчики нажатий клавиш и кликов на попап
      document.addEventListener("keydown", handleEscClose);
      popupTypeEdit.addEventListener("click", handleOverlayClick);
   });

   // Закрытие попапа по кнопке
   closeButton.addEventListener("click", function () {
      closePopup();
   });

   // Обработчик нажатия клавиши ESC
   function handleEscClose(event) {
      if (event.key === "Escape") {
         closePopup();
      }
   }

   // Обработчик клика на попап (включая оверлей)
   function handleOverlayClick(event) {
      if (event.target === popupTypeEdit) {
         closePopup();
      }
   }

   // Функция для закрытия попапа и удаления обработчиков
   function closePopup() {
      popupTypeEdit.classList.remove("popup_is-opened");
      document.removeEventListener("keydown", handleEscClose);
      popupTypeEdit.removeEventListener("click", handleOverlayClick);
   }
}

openPopupEditProfile();
