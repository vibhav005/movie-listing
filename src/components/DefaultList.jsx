import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DefaultList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const fetchMovies = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }
      const data = await response.json();
      console.log(data);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const nvigateToMovie = (movie) => {
    const movieId = encodeURIComponent(movie.id);
    navigate(`/movie/${movieId}`, { state: { movie } });
  };

  return (
    <div className="movies-container">
      <h1>List of movies</h1>
      <div className="movie-list">
        {movies.map((movie) => {
          const movieImage = movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w200${movie.backdrop_path}`
            : "default.jpg";
          return (
            <div key={movie.id} onClick={() => nvigateToMovie(movie)}>
              <div>
                <img src={movieImage} alt={movie.title} />
              </div>
              <div>
                <h1>{movie.title}</h1>
                <p>Plot : {movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
              </div>
            </div>
          );
        })}
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
    </div>
  );
};

export default DefaultList;
