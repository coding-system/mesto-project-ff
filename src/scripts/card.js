const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function addCard(data, userId, onLike, onDelete, onImageClick) {
   const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
   const cardTitle = cardItem.querySelector(".card__title");
   const cardImage = cardItem.querySelector(".card__image");
   const deleteButton = cardItem.querySelector(".card__delete-button");
   const likeButton = cardItem.querySelector(".card__like-button");
   const likeCount = cardItem.querySelector(".card__like-count");

   cardImage.src = data.link;
   cardImage.alt = `Превью карточки "${data.name}"`;
   cardTitle.textContent = data.name;
   likeCount.textContent = data.likes.length;

   if (userId !== data.owner._id) {
      deleteButton.classList.add("card__delete-button-disabled");
   } 
   // else {
   //    deleteButton.classList.remove("card__delete-button-disabled");
   // }

   if (data.likes.some((like) => like._id === userId)) {
      likeButton.classList.add("card__like-button_is-active");
   }

   likeButton.addEventListener("click", () => {
      onLike(cardItem);
   });

   deleteButton.addEventListener("click", () => {
      onDelete(cardItem);
   });

   cardImage.addEventListener("click", () => {
      onImageClick(data);
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
