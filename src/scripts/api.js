const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
  headers: {
    authorization: 'bc2ce78d-34d2-4241-b368-48a3d909e567',
    'Content-Type': 'application/json'
  }
}

// получение данных пользователя

export const getUserProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

// получение данных cards

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export function editedUserProfile(newProfile){
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newProfile.name,
      about: newProfile.about,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function editedUserAvatar(newAvatar){
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatar.avatar
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


export function addInitialCards(newCard){
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers:
    config.headers,
    body: JSON.stringify({
      name: newCard.name,
      link: newCard.link,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function delInitialCards(cardId){
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers:
    config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function updateCardLike(cardId){
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
    body: JSON.stringify({
      likes: []
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}



// function createPost(newPost) {
//   fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: 'POST',
//     body: JSON.stringify({
//       title: newPost.title,
//       body: newPost.body
//     }),
//     headers:{
//       'Content-Type': 'application/json; charset=UTF-8'
//     }
//   })
//   .then(res=>res.json())
//   .then ((post) => {
//   addPostToDOM(document.querySelector('.container'), createPostMarkup(post));
//   })
// }

// // обработчик сабмита формы
// document.forms.post.addEventListener('submit', function (event) {
//   event.preventDefault();

//   const { title, text } = event.currentTarget.elements;

//   createPost({
//     title: title.value,
//     body: text.value
//   });
// });
