export const BASE_URL = 'http://api.the-mesto.students.nomoredomains.rocks';


const checkRequestResult = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(err => {throw err;});
  // если ошибка, отклоняем промис
  //return Promise.reject(`Ошибка: ${res.status}`);
}

export const  register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
    .then((res) => checkRequestResult(res))
}

export const  authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then((res) => checkRequestResult(res))
    .then((data) => {
      console.log(data);
    })
}

export const  getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((res) => checkRequestResult(res))
}
