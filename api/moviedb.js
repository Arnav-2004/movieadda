import axios from "axios";
import { TMDB_API_KEY } from "@env";

const apiBaseURL = "https://api.themoviedb.org/3";

const trendingMoviesEndpoint = `${apiBaseURL}/trending/movie/day?api_key=${TMDB_API_KEY}`;
const upcomingMoviesEndpoint = `${apiBaseURL}/movie/upcoming?api_key=${TMDB_API_KEY}`;
const topRatedMoviesEndpoint = `${apiBaseURL}/movie/top_rated?api_key=${TMDB_API_KEY}`;

const searchMoviesEndpoint = `${apiBaseURL}/search/movie?api_key=${TMDB_API_KEY}`;

const movieDetailsEndpoint = (id) =>
  `${apiBaseURL}/movie/${id}?api_key=${TMDB_API_KEY}`;
const movieCreditsEndpoint = (id) =>
  `${apiBaseURL}/movie/${id}/credits?api_key=${TMDB_API_KEY}`;
const similarMoviesEndpoint = (id) =>
  `${apiBaseURL}/movie/${id}/similar?api_key=${TMDB_API_KEY}`;

const personDetailsEndpoint = (id) =>
  `${apiBaseURL}/person/${id}?api_key=${TMDB_API_KEY}`;
const personWorkedInEndpoint = (id) =>
  `${apiBaseURL}/person/${id}/movie_credits?api_key=${TMDB_API_KEY}`;

export const imgW500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;

export const imgW342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;

export const imgW185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};

export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonWorkedIn = (id) => {
  return apiCall(personWorkedInEndpoint(id));
};
