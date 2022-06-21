class Auth {
  constructor(objects) {
    this._BASE_URL = objects.BASE_URL;
  }

  checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error Type: 
    ${res.status} ${res.statusText}`);
    }
  }

  signup({email, password}) {
    return fetch(`${this._BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then(this.checkResponse);
  }

  signin({email, password}) {
    return fetch(`${this._BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(this.checkResponse)
      // .then((data) => {
        // if (data.jwt) {
        //   localStorage.setItem("jwt", data.jwt);
        //   return data;
        // }
      // });
  }

  getToken(token) {
    return fetch(`${this._BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this.checkResponse)
      .then((data) => data);
  }
}

const auth = new Auth({ BASE_URL: "https://register.nomoreparties.co" });

export default auth;
