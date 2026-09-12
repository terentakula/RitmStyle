import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'
import logo from '../assets/icons/logo.svg'
import { CloseIcon, MenuIcon } from './Icons'

const links = [
  ['Главная', '/'],
  ['Сеансы', '/#sessions'],
  ['Отзывы', '/#reviews'],
  ['Контакты', '/#contacts'],
  ['Новости', '/news'],
  ['О RitmStyle', '/#about'],
  ['Блог', '/blog'],
]

export default function Header({ onBook }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="shell header-row">
        <Link className="brand" to="/" aria-label="RitmStyle — на главную" onClick={close}>
          <img src={logo} alt="RitmStyle" />
        </Link>

        <nav className="desktop-nav" aria-label="Основная навигация">
          {links.map(([label, to]) => (
            <Link key={label} to={to} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>

        <button className="button button--compact header-cta" type="button" onClick={() => onBook()}>
          Записаться
        </button>

        <button
          className="icon-button menu-button"
          type="button"
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 270, damping: 28 }}
            >
              <div className="mobile-menu__top">
                <span className="mobile-menu__label">Навигация</span>
                <button className="icon-button" type="button" aria-label="Закрыть меню" onClick={close}>
                  <CloseIcon />
                </button>
              </div>
              <nav className="mobile-nav">
                {links.map(([label, to], index) => (
                  <motion.div key={label} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * index }}>
                    <Link to={to} onClick={close}>{label}</Link>
                  </motion.div>
                ))}
              </nav>
              <button className="button mobile-menu__cta" type="button" onClick={() => { close(); onBook() }}>
                Записаться на сеанс
              </button>
            </motion.div>
            <button className="mobile-menu-backdrop" aria-label="Закрыть меню" onClick={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
