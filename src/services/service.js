import axios from "axios";

const API_KEY = "37662c76ffc19e5cd1b95f37d77155fc";

export const searchMovies = (searchValue, year) => {
    const yearParam = year ? `&year=${year}` : '';
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ru-RU&query=${searchValue}&page=1&include_adult=false` + yearParam);
}