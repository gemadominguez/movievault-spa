import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMovieDetails, getMovieCredits } from '../tmdb'

import TopHeader from '../components/TopHeader'
import MovieInfo from '../components/MovieInfo'
import CastList from '../components/CastList'
import WatchInfo from './WatchInfo'
import styles from './MoviePage.module.css'

function MoviePage() {
  const { id: movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)
  const [cast, setCast] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMovieDetails(movieId)
        setMovie(data)
        
        const credits = await getMovieCredits(movieId)
        setCast(credits)
  
        const trailers = data.videos?.results?.filter(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        )
  
        if (trailers && trailers.length > 0) {
          setTrailerKey(trailers[0].key)
          return 
        }
  
        // Si no hay trailer en TMDb, se usa la API de YouTube:
        const query = encodeURIComponent(`${data.title} trailer`)
        const ytResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&type=video&maxResults=1`
        )
        const ytData = await ytResponse.json()
        const video = ytData.items?.[0]
        if (video) {
          setTrailerKey(video.id.videoId)
        }
  
      } catch (error) {
        console.error('Error fetching trailer:', error)
      }
    }
  
    fetchData()
  }, [movieId])
  
  

 

  function TrailerEmbed() {
    if (!trailerKey) return <p>Cargando tráiler...</p>

    return (
      <div className={styles['movie-detail__video']}>
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?rel=0&modestbranding=1`}
          title="Trailer"
          allowFullScreen
        ></iframe>
      </div>
    )
  }



  if (!movie) return <p style={{ color: 'white' }}>Cargando película...</p>

  return (
    <div className="container">
      <TopHeader />

      <div className={`grid-12 ${styles['movie-detail__section']}`}>
        <div className={`grid-4 ${styles['movie-detail__info']}`}>
          <MovieInfo
            showTopLabel={false}
            rating={movie.vote_average.toFixed(1)}
            title={movie.title}
            synopsis={movie.overview}
            genres={movie.genres.map((g) => g.name)}
            fullSynopsis={true}
          />
          <WatchInfo movieId={movie.id} />

        </div>

        <div className={`grid-8`}>
          <TrailerEmbed />
        </div>
      </div>

      <CastList cast={cast} />

    </div>
  )
}

export default MoviePage
