// /////............... ТОКЕН ................. /////////
//          Токен: 1ca8a073-c9de-470b-a0ce-59e76a2f8b78
//          Идентификатор группы: wff-cohort-21
/////////////////////////////////////////////////////////
import {profileTitle, profileDescription, profileImage} from '../index.js'
const config = {
   baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-21",
   headers: {
      authorization: "1ca8a073-c9de-470b-a0ce-59e76a2f8b78",
      "Content-Type": "application/json",
   },
};

export function getQuote() {
   fetch('https://api.kanye.rest')
  .then(res => res.json())
  .then((data) => {
      console.log(data.quote); // если мы попали в этот then, data — это объект
  });
}

export function getData() {
   return fetch(`${config.baseUrl}/cards`, {
      headers: {
        authorization: '1ca8a073-c9de-470b-a0ce-59e76a2f8b78',
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
      }); 
}
//////////////////////
//////////////////////
//////////////////////
///////////////////////

 export function getUserInfo() {
   return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-21/users/me', {
     method: 'GET',
     headers: {
       authorization: '1ca8a073-c9de-470b-a0ce-59e76a2f8b78',
       'Content-Type': 'application/json'
     }
   })
   .then(getResponseData)
   .then(userData => {
      // console.log('Ссылка на аватар:', userData.avatar);
     // Меняем данные профиля на сарверные
     profileTitle.textContent = userData.name;
     profileDescription.textContent = userData.about;
     profileImage.style.backgroundImage = `url(${userData.avatar})`;
 
     return userData;
   })
   .catch(err => {
     console.error(`Ошибка при загрузке информации о пользователе: ${err}`);
   });
 }