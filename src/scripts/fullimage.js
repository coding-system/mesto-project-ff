import { pageContent } from "./vars";

export function openFullImage() {
   const imagePopup = document.querySelector(".popup_type_image");

   function closePopup() {
      imagePopup.classList.remove("popup_is-opened");
      document.removeEventListener("keydown", handleEscClose);
      imagePopup.removeEventListener("click", handleOverlayClick);
   }

   function handleEscClose(event) {
      if (event.key === "Escape") {
         closePopup();
      }
   }

   function handleOverlayClick(event) {
      if (event.target === imagePopup) {
         closePopup();
      }
   }

   document.querySelectorAll(".card__image").forEach((image) => {
      image.addEventListener("click", (event) => {
         const imagePopup = pageContent.querySelector(".popup_type_image");
         const image = imagePopup.querySelector(".popup__image");
         const caption = imagePopup.querySelector(".popup__caption");
         const closeButton = imagePopup.querySelector(".popup__close");
         closeButton.addEventListener("click", function () {
            closePopup();
         });
         image.src = event.target.src; // Устанавливаем источник изображения
         caption.textContent = event.target.alt; // Устанавливаем подпись

         imagePopup.classList.add("popup_is-opened");
         // Добавляем обработчики нажатий клавиш и кликов на попап
         document.addEventListener("keydown", handleEscClose);
         imagePopup.addEventListener("click", handleOverlayClick);
      });
   });
}

openFullImage();
