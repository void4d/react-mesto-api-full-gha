export default class Api {
  constructor(config) {
    this._url = config.url
    this._headers = config.headers
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getInitialCardsApi(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(this._handleResponse)
  }

  postCardApi(name, link, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleResponse)
  }

  getUserInfoApi(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(this._handleResponse)
  }

  setUserInfoApi(name, about, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse)
  }

  putLikeApi(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(this._handleResponse)
  }

  deleteLikeApi(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(this._handleResponse)
  }

  deleteCardApi(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(this._handleResponse)
  }

  changeAvatar(avatarLink, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._handleResponse)
  }


}

export const api = new Api({
  url: 'https://api.void4d-mesto.nomoredomainsicu.ru/',
})


