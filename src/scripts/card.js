import { cardsList, newPlaceForm } from "../index.js";
import { closePopup, openPopup, submitForm, initializePopups } from "./modal";
import { newCardPopup } from "./modal"; // Import the newCardPopup for closePopup

// @todo: Template for card
const cardTemplate = document.querySelector("#card-template").content; // Template for the card

// @todo: Function to create a card
function addCard(data, onLike, onDelete) {
   const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
   const cardTitle = cardItem.querySelector(".card__title"); // Card title
   const cardImage = cardItem.querySelector(".card__image"); // Card image
   const deleteButton = cardItem.querySelector(".card__delete-button"); // Delete button
   const likeButton = cardItem.querySelector(".card__like-button"); // Like button

   if (!data) {
      const placeName = newPlaceForm.elements["place-name"].value;
      const link = newPlaceForm.elements["link"].value;
      data = { name: placeName, link: link };
   }

   cardImage.src = data.link;
   cardImage.alt = data.name;
   cardTitle.textContent = data.name;

   likeButton.addEventListener("click", () => {
      onLike(cardItem);
   });

   deleteButton.addEventListener("click", () => {
      onDelete(cardItem);
   });

   return cardItem;
}

// Function to handle card liking
function handleLikeCard(cardItem) {
   const likeButton = cardItem.querySelector(".card__like-button");
   likeButton.classList.toggle("card__like-button_is-active");
}

// Function to handle card deletion
function handleDeleteCard(cardItem) {
   cardItem.remove();
}

// Function to save card data from the form
function saveCard(evt) {
   evt.preventDefault();
   const card = addCard(null, handleLikeCard, handleDeleteCard);
   cardsList.prepend(card);
   newPlaceForm.reset();
   closePopup(newCardPopup);

   // Reinitialize popups with updated arguments
   initializePopups(openPopup, closePopup, submitForm);
}

export { addCard, handleDeleteCard, handleLikeCard, newPlaceForm, saveCard };
