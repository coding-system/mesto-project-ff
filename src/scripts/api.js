// /////............... ТОКЕН ................. /////////
//          Токен: 1ca8a073-c9de-470b-a0ce-59e76a2f8b78
//          Идентификатор группы: wff-cohort-21
/////////////////////////////////////////////////////////
// import {profileTitle, profileDescription, profileImage} from '../index.js'
const config = {
   baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-21",
   headers: {
      authorization: "1ca8a073-c9de-470b-a0ce-59e76a2f8b78",
      "Content-Type": "application/json",
   },
};

// export function getQuote() {
//    fetch('https://api.kanye.rest')
//   .then(res => res.json())
//   .then((data) => {
//       console.log(data.quote); // если мы попали в этот then, data — это объект
//   });
// }

// Выводим массив с карточками в консоль
export function getData() {
   return fetch(`${config.baseUrl}/cards`, {
      headers: {
         authorization: "1ca8a073-c9de-470b-a0ce-59e76a2f8b78",
         "Content-Type": "application/json",
      },
   })
      .then((res) => res.json())
      .then((result) => {
         console.log(result);
      });
}
//////////////////////////////
/////////////////////////////
//////////////ЗАПРОСЫ///////
///////////////////////////
//////////////////////////
function getResponse(res) {
   if (res.ok) {
      return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status}`);
}

// Данные профиля
export function getUserData() {
   return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
   }).then(getResponse);
}
// Обноляем данные профиля
export function updateUserProfile(name, about) {
   return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
         name: name,
         about: about,
      }),
   }).then(getResponse);
}

export function getCardsData() {
   return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
   }).then(getResponse);
}

export function saveNewCard(name, link) {
   return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({ name, link }),
   }).then(getResponse);
}

export function deleteCardFromServer(cardId) {
   return fetch(`${config.baseUrl}/cards/${cardId}`, {
     method: 'DELETE',
     headers: config.headers,
   })
   .then(getResponse);
 }