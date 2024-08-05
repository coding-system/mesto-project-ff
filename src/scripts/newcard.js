import { content, pageContent } from "./vars";
import { cardTemplate, cardsList } from "./vars";
// import { addCard, handleDeleteCard } from './rendercards'
import { openFullImage } from "./fullimage";

function openPopupNewCard() {

   const newPlaceForm = document.forms["new-place"];
   const addCardButton = content.querySelector(".profile__add-button"); // Кнопка добавления карточки
   const popupNewCard = pageContent.querySelector(".popup_type_new-card");
   const closeButton = popupNewCard.querySelector(".popup__close");
   popupNewCard.classList.add("popup_is-animated");

   // Открытие попапа
   addCardButton.addEventListener("click", function () {
      popupNewCard.classList.add("popup_is-opened");
      // Добавляем обработчики нажатий клавиш и кликов на попап
      document.addEventListener("keydown", handleEscClose);
      popupNewCard.addEventListener("mousedown", handleOverlayClick);
   });

   // Закрытие попапа по кнопке
   closeButton.addEventListener("click", function () {
      closePopup();
   });

   //////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////
   // Функция сохранения введенных данных

   function addCard(onLike, onDelete) {
      const cardItem = cardTemplate
         .querySelector(".places__item")
         .cloneNode(true);
      const cardTitle = cardItem.querySelector(".card__title"); //Заголовок карточки
      const cardImage = cardItem.querySelector(".card__image"); //Картинка карточки
      const deleteButton = cardItem.querySelector(".card__delete-button"); //Кнопка удаления карточки
      const likeCard = cardItem.querySelector(".card__like-button");
      //устанавливаем данные карточки и обработчик клика по корзинке удаления
      //...
      const newPlaceForm = document.forms["new-place"];
      const placeName = newPlaceForm.elements["place-name"].value;
      const link = newPlaceForm.elements.link.value;

      cardImage.src = link;
      cardImage.alt = placeName;
      cardTitle.textContent = placeName;

      likeCard.addEventListener("click", () => {
         onLike(cardItem);
      });

      deleteButton.addEventListener("click", () => {
         onDelete(cardItem);
      });

      return cardItem;
   }

   // @todo: Функция удаления карточки

   function handleLikeCard(cardItem) {
      const likeButton = cardItem.querySelector('.card__like-button');
      likeButton.classList.toggle('card__like-button_is-active');
   }

   function handleDeleteCard(cardItem) {
      cardItem.remove();
   }

   function addNewCard() {
      const card = addCard(handleLikeCard, handleDeleteCard);
      cardsList.prepend(card);
      openFullImage()
   }

   function saveCard(evt) {
      evt.preventDefault();
      addNewCard();
      closePopup();
   }

   // Сохранение и закрытие попапа
   newPlaceForm.addEventListener("submit", saveCard);

   //////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////

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

openPopupNewCard();
