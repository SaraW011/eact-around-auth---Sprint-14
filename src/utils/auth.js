class Auth {
  constructor(objects) {
    this._BASE_URL = objects.BASE_URL;
  }

  checkResponse(res){
    if (res.ok) {
      return res.json();
    } else {
      return (
        Promise.reject(res),
        console.log("Error Type:", res.status, res.statusText)
      );
    }
  };

  signup(email, password) {
    const res = fetch(`${this._BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return this.checkResponse(res);
  }

   signin(email, password) {
    const res = fetch(`${this._BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    return this.checkResponse(res);
  }

  tokenCheck() {
    // if the user has a token in localStorage,
    // this function will check that the user has a valid token
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt')
      // we'll need to verify the token here
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      });
    }
  } 
  
   getContent(token){
    return fetch(`${this._BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(res => res.json())
      .then(data => data)
  } 
}

const auth = new Auth({
  BASE_URL: "https://register.nomoreparties.co",
});

export default auth;
