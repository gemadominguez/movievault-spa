import { useEffect, useState } from 'react'
import { getWatchProviders } from '../tmdb'
import styles from './WatchInfo.module.css'

// Mapeo de nombres a iconos
const iconMap = {
  'Netflix': '/logos/netflix.svg',
  'Amazon': '/logos/amazon.svg',
  'Amazon Prime Video': '/logos/amazon.svg',
  'Amazon Video': '/logos/amazon.svg',
  'Disney Plus': '/logos/disney.svg',
  'Disney+': '/logos/disney.svg',
  'Apple TV': '/logos/apple.svg',
  'Google Play': '/logos/google.svg',
  'Google Play Movies': '/logos/google.svg',
  'YouTube': '/logos/youtube.svg',
  'Rakuten TV': '/logos/rakuten.svg',
  'FILMIN': '/logos/filmin.svg',
  'Filmin': '/logos/filmin.svg',
  'Filmin Plus': '/logos/filmin.svg',
  'Movistar Plus': '/logos/movistar.svg',
  'Movistar Plus+ Ficción Total': '/logos/movistar.svg',
  'HBO Max': '/logos/hbo.svg',
  'Max': '/logos/hbo.svg',
  'HBO MAX': '/logos/hbo.svg'
}

const typeIcons = {
  flatrate: '/logos/stream.svg',
  rent: '/logos/rent.svg',
  buy: '/logos/buy.svg'
}

// Acorta nombres largos para mostrar
const shortenName = (name) => {
  if (/amazon/i.test(name)) return 'Amazon'
  if (/disney/i.test(name)) return 'Disney+'
  if (/google/i.test(name)) return 'Google Play'
  if (/filmin/i.test(name)) return 'Filmin'
  if (/movistar/i.test(name)) return 'Movistar'
  if (/hbo|max/i.test(name)) return 'HBO'
  return name
}

export default function WatchInfo({ movieId }) {
  const [view, setView] = useState('initial')
  const [providers, setProviders] = useState(null)
  const [link, setLink] = useState('#')

  useEffect(() => {
    async function fetchProviders() {
      const data = await getWatchProviders(movieId)
      if (data) {
        setProviders(data)
        setLink(data.link)
      }
    }
    fetchProviders()
  }, [movieId])

  const handleBack = () => setView('initial')

  if (!providers) return <h4 className={styles.watchInfo__title}>No watch info available for this movie.</h4>

  return (
    <div className={styles.watchInfo}>
      {view === 'initial' ? (
        <>
          <h4 className={styles.watchInfo__title}>THIS GEM IS AVAILABLE ON...</h4>
          <div className={styles.watchInfo__options}>
            {['flatrate', 'rent', 'buy'].map((type) =>
              providers[type] ? (
                <div
                  key={type}
                  className={styles.watchInfo__option}
                  onClick={() => setView(type)}
                >
                  <img src={typeIcons[type]} alt={type} width={32} height={32} />
                  <p>{type}</p>
                </div>
              ) : null
            )}
          </div>
        </>
      ) : (
        <>
          <div className={styles.watchInfo__header}>
            <h4 className={styles.watchInfo__title}>{view.toUpperCase()} OPTIONS:</h4>
            <button onClick={handleBack} className={styles.backBtn}>
              <span className={styles.icon}>◀</span>
              <span className={styles.label}>back</span>
            </button>
          </div>

          <div className={styles.watchInfo__options}>
            {providers[view]?.map((p) => {
              const icon = iconMap[p.provider_name] || '/logos/generic.svg'
              return (
                <a
                  key={p.provider_id}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.watchInfo__option}
                >
                  <img
                    src={icon}
                    alt={p.provider_name}
                    width={32}
                    height={32}
                  />
                  <p>{shortenName(p.provider_name)}</p>
                </a>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
