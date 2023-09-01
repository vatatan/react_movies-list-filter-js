import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

function getPreparedMovies(movies, query) {
  const queryIncludes = value => (
    value.toLowerCase().includes(query.toLowerCase().trim())
  );

  let preparedMovies = movies;

  if (query !== '') {
    preparedMovies = preparedMovies.filter(
      ({ title, description }) => queryIncludes(title)
        || queryIncludes(description),
    );
  }

  return preparedMovies;
}

export const App = () => {
  const [query, setQuery] = useState('');

  const visibleMovies = getPreparedMovies(
    moviesFromServer,
    query,
  );

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                id="search-query"
                className="input"
                placeholder="Type search word"
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">
        Sidebar goes here
      </div>
    </div>
  );
};
