import { Link } from 'react-router-dom'
import logo from '../assets/icons/logo.svg'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <Link className="brand footer-brand" to="/" aria-label="RitmStyle — на главную">
            <img src={logo} alt="RitmStyle" />
          </Link>
          <p className="footer-copy">Акватерапия в спокойном ритме — пространство для отдыха и новых ощущений.</p>
        </div>
        <div className="footer-links">
          <Link to="/#sessions">Сеансы</Link>
          <Link to="/#reviews">Отзывы</Link>
          <Link to="/news">Новости</Link>
          <Link to="/blog">Блог</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2018–{year} RitmStyle</span>
        <span>Frontend — Alexander Terentiev</span>
      </div>
    </footer>
  )
}
