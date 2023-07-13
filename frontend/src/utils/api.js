class Api {
  constructor(config) {
    this._url = config.url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res.status)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  setUserInfo(formData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      })
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  updateAvatar(formData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  getInitialCard() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  postNewCard(cardInfo) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(cardInfo)
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    })
      .then((res) => {
        return this._checkResponse(res);
      });
  }
}

const api = new Api({
  url: 'https://backend.nomoredomains.work',
})

export default api;