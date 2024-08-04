import { initialCards } from "./cards";
import { cardTemplate, cardsList } from "./vars";
// @todo: Темплейт карточки

// @todo: Функция создания карточки
function addCard(data, onDelete) {
   const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
   const cardTitle = cardItem.querySelector(".card__title"); //Заголовок карточки
   const cardImage = cardItem.querySelector(".card__image"); //Картинка карточки
   const deleteButton = cardItem.querySelector(".card__delete-button"); //Кнопка удаления карточки
   //устанавливаем данные карточки и обработчик клика по корзинке удаления
   //...

   cardImage.src = data.link;
   cardImage.alt = data.name;
   cardTitle.textContent = data.name;

   deleteButton.addEventListener("click", () => {
      onDelete(cardItem);
      // console.log(data.name + " удален");
   });

   return cardItem;
}

// @todo: Функция удаления карточки

function handleDeleteCard(cardItem) {
   cardItem.remove();
}

// @todo: функция вставки карточки на страницу

function renderCard(cards) {
   cards.forEach((data) => {
      const card = addCard(data, handleDeleteCard);
      cardsList.append(card);
   });
   //функционал вставки элемента карточки на страницу
}

// @todo: Вывести карточки на страницу, используем цикл forEach

renderCard(initialCards);

console.log("1212");
