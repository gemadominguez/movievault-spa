import styles from './Header.module.css'
import logo from '../assets/logo.svg'
import SearchBar from './SearchBar'
import Button from './Button'
import { Link, useNavigate } from 'react-router-dom'


function TopHeader() {
  const navigate = useNavigate()

  const buttonSurprise = () => {
    navigate('/loading')
  }
  

  return (
    <div className="grid-12">
      <div className={styles['top-header']}>
        <Link to="/" className="grid-2">
          <img
            src={logo}
            alt="logo"
            className={styles['top-header__logo']}
          />
        </Link>

        <div className="grid-6"></div>

        <div className={`grid-4 ${styles['top-header__searchSection']}`}>
          <SearchBar />
          <Button
            text="surprise me"
            className="btn btn--primary"
            onClick={buttonSurprise}
          />
        </div>
      </div>
    </div>
  )
}

export default TopHeader
