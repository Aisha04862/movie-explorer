'use client';
import React, { useEffect, useState } from 'react';
import MovieCard from '../src/MovieCard';
import './globals.css';

const API_KEY = 'b7c0b7e4c21cabc6ed5f00d5cb3124c9'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = async () => {
    let url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    if (search) {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}&page=${page}`;
    }

    const res = await fetch(url);
    const data = await res.json();
    let results = data.results || [];
    setTotalResults(data.total_results || 0);

    if (sort === 'releaseAsc') results.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    if (sort === 'releaseDesc') results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    if (sort === 'ratingAsc') results.sort((a, b) => a.vote_average - b.vote_average);
    if (sort === 'ratingDesc') results.sort((a, b) => b.vote_average - a.vote_average);

    setMovies(results);
  };

  useEffect(() => {
    fetchMovies();
  }, [page, search, sort]);

  const totalPages = totalResults > 0 ? Math.ceil(totalResults / 20) : 1;

  return (
    <div className="page-container">
      {}
      <header className="main-header">
        <h1>Movie Explorer</h1>
      </header>

      <div className="controls-bar">
        <div className="controls">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort By</option>
            <option value="releaseAsc">Release Date (Asc)</option>
            <option value="releaseDesc">Release Date (Desc)</option>
            <option value="ratingAsc">Rating (Asc)</option>
            <option value="ratingDesc">Rating (Desc)</option>
          </select>
        </div>
      </div>

      {}
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster={movie.poster_path ? IMAGE_BASE + movie.poster_path : null}
            releaseDate={movie.release_date}
            rating={movie.vote_average}
          />
        ))}
      </div>

      {}
      <div className="pagination">
        <button 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)} 
          className="nav-btn"
        >
          ◀ Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          onClick={() => setPage(page + 1)} 
          className="nav-btn"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}