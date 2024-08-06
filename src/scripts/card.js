import { cardTemplate, cardsList } from "./vars.js";
import { initialCards } from "./cards";
// @todo: Темплейт карточки

// @todo: Функция создания карточки
function addCard(data, onLike, onDelete) {
   const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
   const cardTitle = cardItem.querySelector(".card__title"); //Заголовок карточки
   const cardImage = cardItem.querySelector(".card__image"); //Картинка карточки
   const deleteButton = cardItem.querySelector(".card__delete-button"); //Кнопка удаления карточки
   const likeCard = cardItem.querySelector(".card__like-button");
   //устанавливаем данные карточки и обработчик клика по корзинке удаления
   //...

   if (!data) {
      const newPlaceForm = document.forms["new-place"];
      const placeName = newPlaceForm.elements["place-name"].value;
      const link = newPlaceForm.elements["link"].value;
      data = { name: placeName, link: link };
   }

   cardImage.src = data.link;
   cardImage.alt = data.name;
   cardTitle.textContent = data.name;

   likeCard.addEventListener("click", () => {
      onLike(cardItem);
   });

   deleteButton.addEventListener("click", () => {
      onDelete(cardItem);
      // console.log(data.name + " удален");
   });

   return cardItem;
}

// @todo: Функция удаления карточки

function handleLikeCard(cardItem) {
   const likeButton = cardItem.querySelector(".card__like-button");
   likeButton.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(cardItem) {
   cardItem.remove();
}

// @todo: функция вставки карточки на страницу

function renderCard(cards) {
   cards.forEach((data) => {
      const card = addCard(data, handleLikeCard, handleDeleteCard);
      cardsList.append(card);
   });
   //функционал вставки элемента карточки на страницу
}

// @todo: Вывести карточки на страницу, используем цикл forEach

renderCard(initialCards);

export { addCard, handleDeleteCard, handleLikeCard };
