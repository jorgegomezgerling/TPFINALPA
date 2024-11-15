// src/pages/MovieDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieTrailers } from '../services/tmbdService';
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);

        const trailerData = await getMovieTrailers(id);
        setTrailers(trailerData.filter(video => video.site === 'YouTube')); // Filtrar solo videos de YouTube
      } catch (error) {
        console.error('Error al cargar los detalles de la película:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="movie-details">
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <p><strong>Fecha de lanzamiento:</strong> {movie.release_date}</p>
      <p><strong>Calificación:</strong> {movie.vote_average}</p>
      <p><strong>Sinopsis:</strong> {movie.overview}</p>
  
      <h2>Trailers</h2>
      <div className="trailers">
        {trailers.map((trailer) => (
          <iframe
            key={trailer.id}
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ))}
      </div>
    </div>
  );
  
};

export default MovieDetailsPage;
