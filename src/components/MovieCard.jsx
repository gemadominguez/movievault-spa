import styles from './MovieCard.module.css'
import GenreTag from './GenreTag'
import starIcon from '../assets/icons/star.svg'
import { Link } from 'react-router-dom'


function MovieCard({id, title, rating, genres, image, onClick }) {
  const CardContent = (
    <div
      className={styles['movie-card']}
      style={{ backgroundImage: `url(${image})` }}
      onClick={onClick}
    >
      <div className={styles['movie-card__rating']}>
        <h3>{rating}</h3>
        <img src={starIcon} alt="star" />
      </div>

      <div className={styles['movie-card__title']}>
        <h2>{title}</h2>

        <div className={styles['movie-card__genre-tag']}>
          {genres.map((genre) => (
            <GenreTag key={genre} genre={genre} />
          ))}
        </div>
      </div>
    </div>
  )
  return id ? (
    <Link to={`/movie/${id}`} className={styles['movie-card__link']}>
      {CardContent}
    </Link>
  ) : (
    CardContent
  )
  

}

export default MovieCard
