import {addCard, handleDeleteCard, handleLikeCard} from './cards'
// import { closePopup } from './modal';
// Функция сохранения новых данных профиля
function saveProfile(evt) {
   evt.preventDefault();
   console.log("Работает");
   const name = editProfileForm.elements.name;
   const description = editProfileForm.elements.description;
   const profileTitle = document.querySelector(".profile__title");
   const profileDescription = document.querySelector(".profile__description");

   profileTitle.textContent =
      name.value.charAt(0).toUpperCase() + name.value.slice(1);
   profileDescription.textContent =
      description.value.charAt(0).toUpperCase() + description.value.slice(1);
}

const editProfileForm = document.forms["edit-profile"];
editProfileForm.addEventListener("submit", saveProfile);

//Функция создания и вывода карточки из формы
function saveCard(event) {
   event.preventDefault();
   const card = addCard(null, handleLikeCard, handleDeleteCard);
   document.querySelector(".places__list").prepend(card);
   
   // Очистить форму после добавления карточки
   
}
const newPlaceForm = document.forms["new-place"];
newPlaceForm.addEventListener("submit", saveCard);

export { saveProfile, saveCard };
