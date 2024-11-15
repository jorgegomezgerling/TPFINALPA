import React, { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies } from '../services/tmbdService';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, Button, TextField } from '@mui/material';
import './HomePage.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos predeterminados del carrusel

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let data;
        if (isSearching) {
          data = await searchMovies(searchQuery, currentPage);
        } else {
          data = await getPopularMovies(currentPage);
        }
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error al cargar las películas:', error);
      }
    };

    const fetchRecommendedMovies = async () => {
      try {
        const data = await getPopularMovies(1);
        setRecommendedMovies(data.results.slice(0, 5)); // Tomo las primeras 5 para el carrusel
      } catch (error) {
        console.error('Error al cargar películas recomendadas:', error);
      }
    };

    fetchMovies();
    fetchRecommendedMovies();
  }, [currentPage, isSearching]);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      setIsSearching(true);
      setCurrentPage(1);
    } else {
      setIsSearching(false);
      setCurrentPage(1);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      setIsSearching(false);
      setCurrentPage(1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1>+CINE</h1>

      {/* Carrusel de películas recomendadas */}
      <div className="carousel-container">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={4000}
          stopOnHover
          showStatus={false}
          showArrows={true}
        >
          {recommendedMovies.map((movie) => (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="custom-carousel"
              />
              <div className="carousel-caption">
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <TextField
          variant="outlined"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Buscar películas..."
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Buscar
        </Button>
      </div>

      {/* Grilla de películas */}
      <Grid container spacing={3} justifyContent="center">
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
              <Card sx={{ maxWidth: 345, transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {movie.title}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Controles de paginación */}
      <div className="pagination">
        <Button variant="contained" onClick={handlePreviousPage} disabled={currentPage === 1} style={{ marginRight: '10px' }}>
          Anterior
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button variant="contained" onClick={handleNextPage} disabled={currentPage === totalPages} style={{ marginLeft: '10px' }}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
