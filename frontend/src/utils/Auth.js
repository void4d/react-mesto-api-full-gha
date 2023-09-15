export default class Auth {
  constructor(config) {
    this._url = config.url
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json() 
    } else {
      return Promise.reject(`Ошибка ${res.status}`)
    }
  }

  register(email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(this._checkResponse);
  }

  authorize(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(this._checkResponse);
  }
 
  getContent(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers:
      {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    }).then(this._checkResponse);
  }

}

export const auth = new Auth({
  url: 'https://api.void4d-mesto.nomoredomainsicu.ru/'
})
