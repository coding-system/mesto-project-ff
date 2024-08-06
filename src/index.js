import "./pages/index.css"; // добавьте импорт главного файла стилей

import { saveCard, saveProfile } from "./scripts/other";
import { renderCard } from "./scripts/card";
import { initialCards } from "./scripts/cards";
import { initializePopups } from "./scripts/modal";

const cardTemplate = document.querySelector("#card-template").content; //Тэмплейт
const cardsList = document.querySelector(".places__list"); //Грид с карточками

const editProfileForm = document.forms["edit-profile"];
editProfileForm.addEventListener("submit", saveProfile);

const newPlaceForm = document.forms["new-place"];
newPlaceForm.addEventListener("submit", saveCard);

renderCard(initialCards);
initializePopups();
export { cardTemplate, cardsList, editProfileForm, newPlaceForm };
