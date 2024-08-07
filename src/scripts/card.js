import { cardTemplate, cardsList } from "../index.js";
import { initializePopups, newCardPopup } from "./modal";
import { closePopup} from "./modal";
// @todo: Темплейт карточки
const newPlaceForm = document.forms["new-place"];

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

//Функция создания и вывода карточки из формы
function saveCard(evt) {
   evt.preventDefault();
   const card = addCard(null, handleLikeCard, handleDeleteCard);
   document.querySelector(".places__list").prepend(card);
   newPlaceForm.reset();
   initializePopups();
   closePopup(newCardPopup);
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

export {
   addCard,
   handleDeleteCard,
   handleLikeCard,
   renderCard,
   newPlaceForm,
   saveCard,
};
