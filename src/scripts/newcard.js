import { content, pageContent } from "./vars";

function openPopupNewCard() {
   const addCardButton = content.querySelector(".profile__add-button"); // Кнопка добавления карточки
   const popupNewCard = pageContent.querySelector(".popup_type_new-card");
   const closeButton = popupNewCard.querySelector(".popup__close");

   // Открытие попапа
   addCardButton.addEventListener("click", function () {
      popupNewCard.classList.add("popup_is-opened");
      // Добавляем обработчики нажатий клавиш и кликов на попап
      document.addEventListener("keydown", handleEscClose);
      popupNewCard.addEventListener("click", handleOverlayClick);
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
      if (event.target === popupNewCard) {
         closePopup();
      }
   }

   // Функция для закрытия попапа и удаления обработчиков
   function closePopup() {
      popupNewCard.classList.remove("popup_is-opened");
      document.removeEventListener("keydown", handleEscClose);
      popupNewCard.removeEventListener("click", handleOverlayClick);
   }
}

openPopupNewCard()
