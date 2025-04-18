import { useEffect, useState } from 'react'
import { getPopularMovies, getGenres } from './tmdb'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MoviePage from './components/MoviePage'
import Header from './components/Header'
import LoadingPage from './components/LoadingPage'
import SearchResults from './components/SearchResults'


function App() {
  const [popularMovies, setPopularMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [featuredMovie, setFeaturedMovie] = useState(null) // ✨

  useEffect(() => {
    async function fetchData() {
      const movies = await getPopularMovies()
      const genresData = await getGenres()
      setPopularMovies(movies)
      setGenres(genresData)
      setFeaturedMovie(movies[0])
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (popularMovies.length > 0 && featuredMovie) {
      const interval = setInterval(() => {
        const currentIndex = popularMovies.findIndex(
          (m) => m.id === featuredMovie.id
        )
        const nextIndex = (currentIndex + 1) % popularMovies.length
        const nextFeatured = popularMovies[nextIndex]

        // Sacar la destacada y mandarla al final
        const reordered = [
          ...popularMovies.filter((m) => m.id !== nextFeatured.id),
          nextFeatured,
        ]

        setPopularMovies(reordered)
        setFeaturedMovie(nextFeatured)
      }, 6000)

      return () => clearInterval(interval)
    }
  }, [popularMovies, featuredMovie])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Header
              movies={popularMovies}
              genres={genres}
              featuredMovie={featuredMovie}
              setFeaturedMovie={setFeaturedMovie}
              setMovies={setPopularMovies}
            />
          }
        />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/search" element={<SearchResults />} />


      </Routes>
    </BrowserRouter>
  )
  
}

export default App
