import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import ScrollManager from './components/ScrollManager'
import HomePage from './pages/HomePage'
import NewsPage from './pages/NewsPage'
import BlogPage from './pages/BlogPage'
import ArticlePage from './pages/ArticlePage'

export default function App() {
  const location = useLocation()
  const [booking, setBooking] = useState({ open: false, sessionId: null })

  const openBooking = (sessionId = null) => setBooking({ open: true, sessionId })
  const closeBooking = () => setBooking({ open: false, sessionId: null })

  return (
    <>
      <ScrollManager />
      <Header onBook={openBooking} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage onBook={openBooking} />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/article/:slug" element={<ArticlePage />} />
          <Route path="*" element={<HomePage onBook={openBooking} />} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <BookingModal open={booking.open} initialSession={booking.sessionId} onClose={closeBooking} />
    </>
  )
}
