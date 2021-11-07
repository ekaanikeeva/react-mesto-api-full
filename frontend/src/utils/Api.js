class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    else return Promise.reject(res.status);
  }

  // получение карточек с сервера
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      credentials: 'include',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  // получить информацию пользователя с сервера
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me `, {
      method: "GET",
      credentials: 'include',
      headers: this.headers, 
    }).then(this._checkResponse);
  }

  //отправить новую информацию пользователя
  setUserInform({ name, about }) {
    return fetch(`${this.baseUrl}/users/me `, {
      method: "PATCH",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  // отправить добавленную карточку на сервер
  addCard({ title, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  // отправить лайк карточки на сервер
  postLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  // удалить лайк карточки с сервера
  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  // удалить карточку с сервера
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  // сменить аватар
  changeAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
    baseUrl: "https://ekaanikeeva.backend.nomoredomains.rocks",
    headers: {
    "Content-Type": "application/json",
    },
  });