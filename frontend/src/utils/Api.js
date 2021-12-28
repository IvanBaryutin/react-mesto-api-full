export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }



  _checkRequestResult = (res) => {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  getUserInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this._checkRequestResult(res))
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => this._checkRequestResult(res))
  }

  setUserInfo = (user) => {
    this._headers['Content-Type'] = 'application/json';
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about
      })
    })
      .then((res) => this._checkRequestResult(res))
  }

  addCard = (card) => {
    this._headers['Content-Type'] = 'application/json';
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then((res) => this._checkRequestResult(res))
  }

  deleteCard = (cardId) => {
    this._headers['Content-Type'] = 'application/json';
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._checkRequestResult(res))
  }

  updateAvatar = ({ avatar }) => {
    this._headers['Content-Type'] = 'application/json';
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._checkRequestResult(res))
  }

  setLike = (cardId) => {
    this._headers['Content-Type'] = 'application/json';
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => this._checkRequestResult(res))
  }

  unsetLike = (cardId) => {
    this._headers['Content-Type'] = 'application/json';
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._checkRequestResult(res))
  }

  changeLikeCardStatus = (cardId, isLiked) => {
    return isLiked ? this.setLike(cardId) : this.unsetLike(cardId);

  }

}

const api = new Api({
  baseUrl: 'api.the-mesto.students.nomoredomains.rocks',
  headers: {
    // authorization: '1e5c33de-1f37-4db9-b61a-be6eb6c35223',
    'Access-Control-Allow-Origin': 'origin-list',
  }
});

export default api;
