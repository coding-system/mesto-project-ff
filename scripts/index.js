// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content; //Тэмплейт

// const cardTitle = cardItem.querySelector('.card__title');

// @todo: DOM узлы

const content = document.querySelector(".content"); //Тэг main
const cardsList = content.querySelector(".places__list"); //Грид с карточками

// @todo: Функция создания карточки

function addCard(deleteCard) {
   initialCards.forEach(function (item) {
      const cardItem = cardTemplate
         .querySelector(".places__item")
         .cloneNode(true); //Карточка списка
      const cardTitle = cardItem.querySelector(".card__title"); //Заголовок карточки
      const cardImage = cardItem.querySelector(".card__image"); //Картинка карточки
      const cardAlt = cardItem.querySelector(".card__title"); //Alt картинки
      const deleteButton = cardItem.querySelector(".card__delete-button"); //Кнопка удаления карточки

      cardImage.src = item.link;
      cardAlt.alt = item.name;
      cardTitle.textContent = item.name;
      cardsList.append(cardItem);

      deleteButton.addEventListener("click", () => {
         deleteCard(cardItem);
      });
   });
}
// @todo: Функция удаления карточки

function deleteCard(cardItem) {
   cardItem.remove();
}
// @todo: Вывести карточки на страницу

addCard(deleteCard);

// placesList.append(cardTemplate);

// Кнопки открытия и закрытия попапа
// const NewCard = document.querySelector(".popup_type_new-card"); //Диалог с добавлением новой карточки
// const NewCardSave = NewCard.querySelector(".popup__button"); //Кнопка сохранить
// const NewCardClose = NewCard.querySelector(".popup__close"); //Крестик чтобы закрыть
// const AddButton = content.querySelector(".profile__add-button"); //Кнопка с плюсиком

// AddButton.addEventListener("click", openPopup);
// NewCardClose.addEventListener("click", closePopup);

// function openPopup() {
//    NewCard.classList.add("popup_is-opened");
// }

// function closePopup() {
//    NewCard.classList.remove("popup_is-opened");
// }
// asdasdasdasdas
