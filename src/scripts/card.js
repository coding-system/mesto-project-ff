import { newPlaceForm } from "../index.js";
import { openPopup } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const imagePopup = document.querySelector(".popup_type_image");
const img = imagePopup.querySelector(".popup__image");
const caption = imagePopup.querySelector(".popup__caption");

// @todo: Функция создания карточки
function addCard(data, onLike, onDelete) {
   const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
   const cardTitle = cardItem.querySelector(".card__title");
   const cardImage = cardItem.querySelector(".card__image");
   const deleteButton = cardItem.querySelector(".card__delete-button");
   const likeButton = cardItem.querySelector(".card__like-button");

   if (!data) {
      const placeName = newPlaceForm.elements["place-name"].value;
      const link = newPlaceForm.elements["link"].value;
      data = { name: placeName, link: link };
   }

   cardImage.src = data.link;
   cardImage.alt = `Превью карточки "${data.name}"`;
   cardTitle.textContent = data.name;

   likeButton.addEventListener("click", () => {
      onLike(cardItem);
   });

   deleteButton.addEventListener("click", () => {
      onDelete(cardItem);
   });

   // Добавление обработчика для открытия каротинки
   cardImage.addEventListener("click", () => {
      img.alt = `Полностью открытое изображение карточки "${data.name}"`;
      img.src = data.link;
      caption.textContent = data.name;

      openPopup(imagePopup);
   });

   return cardItem;
}

// Функция лайка
function handleLikeCard(cardItem) {
   const likeButton = cardItem.querySelector(".card__like-button");
   likeButton.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
function handleDeleteCard(cardItem) {
   cardItem.remove();
}

export { addCard, handleDeleteCard, handleLikeCard };
