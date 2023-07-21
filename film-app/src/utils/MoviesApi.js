export default class MoviesApi {
  
    constructor(config) {
      this.url = config.baseUrl;
    }
  
    _handleResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Произошла ошибка ${res.status}`))
  
    }
  
    getMovies() {
  
      return fetch(`${this.url}/beatfilm-movies`, {
      })
        .then(res => this._handleResponse(res))
        .catch(err => {
          console.log(err);
          throw err;
        });
    }

  }
  
  export const moviesApi = new MoviesApi(
    {
      baseUrl: 'https://api.nomoreparties.co'
    });
