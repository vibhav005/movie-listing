import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const Movie = () => {
  const location = useLocation();
  const {movie} = location.state || {};
  const movieImage = movie.backdrop_path ? `https://image.tmdb.org/t/p/w200${movie.backdrop_path}` : "default.jpg";

  if (!movie) {
    return <Link to="/">Go back to the list of movies</Link>;
  }

  return (
    <div>
      <div>
        <img
          src={movieImage}
          alt={movie.title}
          width={200}
          height={200}
        />
      </div>
      <div>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>Language: {movie.original_language}</p>
        <p>Popularity: {movie.popularity}</p>
      </div>
    </div>
  );
};

export default Movie;
