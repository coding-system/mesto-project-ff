// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');//Темплейт
const cardImage = cardTemplate.querySelector('.card__image');//Картинка темплйте
const cardTitle = cardTemplate.querySelector('.card__title');//Заголовок темплейта
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');//Грид с карточками
const AddButton = document.querySelector('.profile__add-button');//Кнопка с плюсиком
const DeliteButton = cardTemplate.querySelector('.card__delete-button');//Иконка "удалить карточку"

const NewCard = document.querySelector('.popup_type_new-card');//Диалог с добавлением новой карточки
const NewCardTitle = NewCard.querySelector('.popup__input_type_card-name');//Инпут с названием карточки
const NewCardImage = NewCard.querySelector('.popup__input_type_url');//Инпут с ссылкой на картинку
const NewCardSubmit = NewCard.querySelector('.popup__button');//Кнопка сохранить

// @todo: Функция создания карточки
function addCard()

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// placesList.append(cardTemplate);