// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content; //Тэмплейт

// @todo: DOM узлы

const content = document.querySelector(".content"); //Тэг main
const cardsList = content.querySelector(".places__list"); //Грид с карточками

// @todo: Функция создания карточки
function addCard(cardData, onDelete){
   const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true); 
   const cardTitle = cardItem.querySelector(".card__title"); //Заголовок карточки
   const cardImage = cardItem.querySelector(".card__image"); //Картинка карточки
   const cardAlt = cardItem.querySelector(".card__title"); //Alt картинки
   const deleteButton = cardItem.querySelector(".card__delete-button"); //Кнопка удаления карточки
   //устанавливаем данные карточки и обработчик клика по корзинке удаления
   //...

   cardImage.src = cardData.link;
   cardAlt.alt = cardData.name;
   cardTitle.textContent = cardData.name;

   deleteButton.addEventListener("click", () => {
      onDelete(cardItem);
   });

   return cardItem;
}

// @todo: Функция удаления карточки

function deleteCard(delcard) {
   delcard.remove;
}

// @todo: функция вставки карточки на страницу

function outputInitialCards(cards) {
   cards.forEach((data) => {
      const card = addCard(data, deleteCard);
      cardsList.append(card);
   })
   //функционал вставки элемента карточки на страницу
}

// @todo: Вывести карточки на страницу, используем цикл forEach

// initialCards.forEach((cards) => { 
//    outputInitialCards(addCard(data, deleteCard)) 
//    cardsList.append(card);
// });  

outputInitialCards(initialCards)