import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRandomMovie } from '../tmdb'
import loadingVideo from '../assets/videos/background.mp4'
import key from '../assets/icons/key.svg'
import styles from './LoadingPage.module.css'

function LoadingPage() {
  const [fadeOut, setFadeOut] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadAndRedirect() {
      const movie = await getRandomMovie()


      setTimeout(() => {
        setFadeOut(true)
      }, 3000)

      
      setTimeout(() => {
        navigate(`/movie/${movie.id}`)
      }, 4000)
    }

    loadAndRedirect()
  }, [navigate])

  return (
    <div className={`${styles['loading']} ${fadeOut ? styles['fade-out'] : ''}`}>
      <video autoPlay muted loop className={styles['loading__video']}>
        <source src={loadingVideo} type="video/mp4" />
      </video>

      <div className={styles['loading__content']}>
        <img className={styles['loading__key']} src={key}></img>
        <p className={styles['loading__text']}>Looking for a gem in the vault...</p>
      </div>
    </div>
  )
}

export default LoadingPage
