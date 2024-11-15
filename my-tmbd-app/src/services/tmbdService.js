// src/services/tmdbService.js
import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/popular`, {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'es-ES',
        page, // Este parámetro es clave para la paginación
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener películas populares:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/movie`, {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'es-ES',
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al buscar películas:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'es-ES',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los detalles de la película:', error);
    throw error;
  }
};

export const getMovieTrailers = async (movieId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${movieId}/videos`, {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: 'es-ES',
      },
    });
    return response.data.results; // Lista de videos (trailers, clips, etc.)
  } catch (error) {
    console.error('Error al obtener los trailers de la película:', error);
    throw error;
  }
};