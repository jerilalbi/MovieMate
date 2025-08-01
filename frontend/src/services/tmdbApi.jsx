import axios from 'axios';

const apiKey = "2bd31e8ea67a66eb002f59c0fa306f0c";
const baseURL = "https://api.themoviedb.org/3";
export const imageBaseURL = "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2";

export const getTrendingMovies = async () => await axios.get(`${baseURL}/trending/movie/week?api_key=${apiKey}`);

export const getGenreList = async () => await axios.get(`${baseURL}/genre/movie/list?api_key=${apiKey}&language=en-US`);

export const searchMovie = async (searchTerm) => await axios.get(`${baseURL}/search/movie?api_key=${apiKey}&query=${searchTerm}`);