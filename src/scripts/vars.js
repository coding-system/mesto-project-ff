const cardTemplate = document.querySelector("#card-template").content; //Тэмплейт

// @todo: DOM узлы

const content = document.querySelector(".content"); //Тэг main
const cardsList = content.querySelector(".places__list"); //Грид с карточками
const pageContent = document.querySelector(".page"); //Тэг body с классом pagepage

export { cardTemplate, content, cardsList, pageContent };
