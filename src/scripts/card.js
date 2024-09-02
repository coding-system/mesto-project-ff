import {
   deleteCardFromServer,
   likeCardOnServer,
   unlikeCardOnServer,
} from "../scripts/api.js";
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
   } else {
      deleteButton.classList.remove("card__delete-button-disabled");
      deleteButton.addEventListener("click", () => {
         onDelete(cardItem, data._id);
      });
   }

   const isLiked = data.likes.some((like) => like._id === userId);
   if (isLiked) {
      likeButton.classList.add("card__like-button_is-active");
   }

   likeButton.addEventListener("click", () => {
      onLike(cardItem, data._id, isLiked);
   });

   cardImage.addEventListener("click", () => {
      onImageClick(data);
   });

   return cardItem;
}

// Функция лайка
function handleLikeCard(cardItem, cardId) {
   const likeButton = cardItem.querySelector(".card__like-button");
   const likeCount = cardItem.querySelector(".card__like-count");
   const likeStatus = likeButton.classList.contains(
      "card__like-button_is-active"
   );

   const likeRequest = likeStatus ? unlikeCardOnServer : likeCardOnServer;

   likeRequest(cardId)
      .then((updatedCardData) => {
         // Update the like button state
         if (likeStatus) {
            likeButton.classList.remove("card__like-button_is-active");
         } else {
            likeButton.classList.add("card__like-button_is-active");
         }

         likeCount.textContent = updatedCardData.likes.length;
      })
      .catch((err) => {
         console.error(err);
      });
}

// @todo: Функция удаления карточки
function handleDeleteCard(cardItem, cardId) {
   deleteCardFromServer(cardId)
      .then(() => {
         cardItem.remove();
      })
      .catch((err) => {
         console.error(err);
      });
}

export { addCard, handleDeleteCard, handleLikeCard };
