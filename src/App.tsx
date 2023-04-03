import {useEffect, useState} from 'react';
import './App.css'
import Contacts from './components/Contacts/Contacts';
export default function App() {
  
    return (
    <div>
        <Contacts />
    </div>
  );
}

// 1. получить данные 
// 2. отрисовать списком
// 2.2 "name", "email", "phone"
// 3. add input, search name


// стилизовать красиво + 
// избавиться от  any +-
// реализовать удаление контакта +
// реализовать добавление нового пользователя (модальное окно с 3 полями, есть 2 кнопки сохранить и отменить) +




// https://jsonplaceholder.typicode.com/users
// [
//   {
//     "id": 1,
//     "name": "Leanne Graham",
//     "username": "Bret",
  //     "email": "Sincere@april.biz",
//     "address": {
//       "street": "Kulas Light",
//       "suite": "Apt. 556",
//       "city": "Gwenborough",
//       "zipcode": "92998-3874",
//       "geo": {
//         "lat": "-37.3159",
//         "lng": "81.1496"
//       }
//     },
//     "phone": "1-770-736-8031 x56442",
//     "website": "hildegard.org",
//     "company": {
//       "name": "Romaguera-Crona",
//       "catchPhrase": "Multi-layered client-server neural-net",
//       "bs": "harness real-time e-markets"
//     }
//   },
//   {},
//   ]