import axios from 'axios';

const apiKey = "2bd31e8ea67a66eb002f59c0fa306f0c";
const baseURL = "https://api.themoviedb.org/3";
export const imageBaseURL = "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2";

export const getTrendingMovies = async () => await axios.get(`${baseURL}/trending/movie/week?api_key=${apiKey}`);

export const getGenreList = async () => await axios.get(`${baseURL}/genre/movie/list?api_key=${apiKey}&language=en-US`);

export const searchMovie = async (searchTerm) => await axios.get(`${baseURL}/search/multi?api_key=${apiKey}&query=${searchTerm}`);

export const getDirectorName = async (movieId, mediaType) => {
    const response = await axios.get(`${baseURL}/${mediaType}/${movieId}/credits?api_key=${apiKey}`);
    const director = response.data.crew.find(member => member.job === 'Director');
    return director ? director.name : '';
};

export const getStreamingServices = async (movieId, mediaType) => {
    const response = await axios.get(`${baseURL}/${mediaType}/${movieId}/watch/providers?api_key=${apiKey}`);
    const providers = response.data.results?.['IN']?.flatrate || [];
    return providers ? providers.map(provider => provider.provider_name).join(', ') : '';
};
