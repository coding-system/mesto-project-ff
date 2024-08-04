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

   // Функция сохранения введенных данных
   function saveProfile(evt) {
      evt.preventDefault();
      console.log("Работает");
      const name = editProfileForm.elements.name;
      const description = editProfileForm.elements.description;
      const profileTitle = pageContent.querySelector(".profile__title");
      const profileDescription = pageContent.querySelector(
         ".profile__description"
      );
      profileTitle.textContent =
         name.value.charAt(0).toUpperCase() + name.value.slice(1);
      profileDescription.textContent =
         description.value.charAt(0).toUpperCase() + description.value.slice(1);
      // profileTitle.textContent = name.value;
      // profileDescription.textContent = description.value;
      ///////////////////////////////////////////////////////////////
      // console.log(name.value);
      // console.log(description.value);
      closePopup();
   }
   // Сохранение и закрытие попапа
   const editProfileForm = document.forms["edit-profile"];

   editProfileForm.addEventListener("submit", saveProfile);

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
