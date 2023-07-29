export default class Api {

  constructor(config) {
    this.url = config.baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Произошла ошибка ${res.status}`))

  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      // .then(data => {return data})
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });

  }

  getSavedMovies() {

    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/movies`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  updateUserInfo(userData) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email
      })
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  createMovie(movieData) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        nameRU: movieData.nameRU,
    
        movieId: movieData.movieId,
        trailerLink: movieData.trailerLink,
        image: movieData.image,
        duration: movieData.duration,
        country: movieData.country,
        director: movieData.director,
        year: movieData.year,
        description: movieData.description,
        thumbnail: movieData.thumbnail,
        nameEN: movieData.nameEN

      })
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  deleteMovie(idMovie) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/movies/${idMovie}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  updateUserAvatar(userAvatar) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: userAvatar
      })
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  changeLikeCardStatus(idMovie, isLike) {
    // console.log(isLike8)
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/movies/${idMovie}`, {
      method: isLike ? 'DELETE' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });

  }

  register(email, password, name) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        // headers: this.headers,
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`

      },
      body: JSON.stringify({ email, password, name }),
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });

  };

  authorize(email, password) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });

  };

  checkToken = () => {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me`, {

      headers: {
        authorization: `Bearer ${token}`
      }
    })
      // .then(data => {return data})
      .then(res => this._handleResponse(res))
      .catch(err => {
        console.log(err);
        throw err;
      });

  }
}

export const api = new Api(
  {
    // baseUrl: 'http://localhost:3000'
    baseUrl: 'https://api.eilyina.nomoredomains.rocks'
    // ,
    // headers: {
    //   // authorization: 'e09a1222-df71-4836-98f4-17c2724f4e45',
    //   'Content-Type': 'application/json'
    // }
  });

//   export const apiAuth = new Api(
//     {
//       // baseUrl: 'http://localhost:3000'
//       baseUrl: 'https://api.eilyina.nomoredomains.rocks'
//       // ,
//       // headers: {
//       //   "Content-Type": "application/json"
//       // }
//     });