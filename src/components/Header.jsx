import styles from './Header.module.css'
import MovieCard from './MovieCard'
import MovieInfo from './MovieInfo'
import TopHeader from './TopHeader'
import Button from './Button'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Header({ movies, genres, featuredMovie, setFeaturedMovie , setMovies }) {
  const [animateBackground, setAnimateBackground] = useState(false)


  const getGenreNames = (ids) => {
    return ids
      .map((id) => {
        const genre = genres.find((g) => g.id === id)
        return genre ? genre.name : null
      })
      .filter(Boolean)
      .slice(0, 2)
  }

  const backgroundImage = featuredMovie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
    : ''

  useEffect(() => {
    setAnimateBackground(false)
    const timeout = setTimeout(() => setAnimateBackground(true), 50)
    return () => clearTimeout(timeout)
  }, [featuredMovie?.id])


  const navigate = useNavigate()

  
  return (
    <header className={styles['header-container']}>
      <div
        className={`${styles['header-bg']} ${animateBackground ? styles['zoom-animate'] : ''}`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      
      <div className={'container'}>
      <TopHeader />


        <div className="grid-12">
          <div className={styles['movie-section']}>

            <div className={`grid-4 ${styles['movie-info__wrapper']}`}>
              {featuredMovie && (
                <MovieInfo
                  title={featuredMovie.title}
                  synopsis={featuredMovie.overview}
                  genres={getGenreNames(featuredMovie.genre_ids)}
                  background={featuredMovie.backdrop_path} 
                  fullSynopsis={false}
                  showTopLabel={true}
                />
              )}
              <Button
                text="know more"
                className="btn btn--secondary"
                onClick={() => navigate(`/movie/${featuredMovie.id}`)}
              />

            </div>

            <div className={`grid-8 ${styles['movie-cards__wrapper']}`}>
              {movies
                  .filter(movie => movie.id !== featuredMovie.id) 
                  .map((movie) => (
                    <MovieCard
                      key={movie.id}
                      title={movie.title}
                      rating={movie.vote_average.toFixed(1)}
                      genres={getGenreNames(movie.genre_ids)}
                      image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      onClick={() => {
                          setFeaturedMovie(movie)

                          // Mandar la película clicada al final
                          const reordered = [
                            ...movies.filter((m) => m.id !== movie.id),
                            movie
                          ]
                          setMovies(reordered) 
                        }}

                    />
                ))}


            </div>
          </div>
        </div>

        <div className="grid-9"></div>
        <div className={`grid-3 ${styles['tmdb-attribution']}`}>
          <p>
            This website uses the TMDb API but is not endorsed or certified by
            TMDb.
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
