// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content; //Тэмплейт

// @todo: DOM узлы

const content = document.querySelector(".content"); //Тэг main
const cardsList = content.querySelector(".places__list"); //Грид с карточками
const pageContent = document.querySelector(".page"); //Тэг body с классом pagepage

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

function openPopupNewCard() {
   const addCardButton = content.querySelector(".profile__add-button"); //Кнопка добавления карточки
   const popupNewCard = pageContent.querySelector(".popup_type_new-card");
   const popupNewCardCloseButton = popupNewCard.querySelector(".popup__close");

   // Открытие попапа
   addCardButton.addEventListener("click", function () {
      popupNewCard.classList.add("popup_is-opened");
      document.addEventListener("keydown", closeNewCardPopup);
   });

   // Закрытие на крестик
   popupNewCardCloseButton.addEventListener("click", function () {
      popupNewCard.classList.remove("popup_is-opened");
      document.removeEventListener("keydown", closeNewCardPopup);
   });

   // Функция закрытия попапа
   // Закрытие на ESC
   function closeNewCardPopup(evt) {
      if (evt.key === "Escape") {
         popupNewCard.classList.remove("popup_is-opened");
         document.removeEventListener("keydown", closeNewCardPopup);
      }
   }
}

openPopupNewCard();

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
