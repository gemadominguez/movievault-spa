import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { searchMovies, getGenres } from '../tmdb'
import MovieCard from './MovieCard'
import TopHeader from '../components/TopHeader'
import styles from './SearchResults.module.css'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function SearchResults() {
  const query = useQuery().get('q')
  const [results, setResults] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    async function fetchData() {
      if (query) {
        const [foundMovies, genreList] = await Promise.all([
          searchMovies(query),
          getGenres()
        ])
        setResults(foundMovies)
        setGenres(genreList)
      }
    }
    fetchData()
  }, [query])

  const getGenreNames = (ids) => {
    return ids
      .map(id => {
        const genre = genres.find(g => g.id === id)
        return genre ? genre.name : null
      })
      .filter(Boolean)
      .slice(0, 2)
  }

  return (
    <div className="container">
    <TopHeader />
      <h2 className={styles['search-title']}>
        {results.length > 0
          ? `Resultados para "${query}"`
          : `No se encontraron resultados para "${query}"`}
      </h2>

      <div className={`grid-12 ${styles['search-results']}`}>
        {results.map((movie) => (

          <MovieCard
            key={movie.id}
            title={movie.title}
            rating={movie.vote_average.toFixed(1)}
            genres={getGenreNames(movie.genre_ids)}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            id={movie.id}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchResults
