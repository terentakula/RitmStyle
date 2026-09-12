import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { sessions } from '../data/siteData'
import { CloseIcon } from './Icons'

const initialForm = { name: '', contact: '', session: sessions[0].title, message: '' }

export default function BookingModal({ open, onClose, initialSession }) {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const selectedTitle = useMemo(() => sessions.find((item) => item.id === initialSession)?.title, [initialSession])

  useEffect(() => {
    if (!open) return
    setSubmitted(false)
    setForm((prev) => ({ ...prev, session: selectedTitle ?? prev.session }))
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open, selectedTitle])

  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const update = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="modal-backdrop" aria-label="Закрыть окно" onClick={onClose} />
          <motion.div
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="icon-button modal-close" type="button" aria-label="Закрыть" onClick={onClose}>
              <CloseIcon />
            </button>
            {!submitted ? (
              <>
                <span className="eyebrow">Запись</span>
                <h2 id="booking-title">Выберите удобный формат</h2>
                <p className="modal-lead">Оставьте контакт и выберите формат сеанса. Мы уточним детали и подберём удобное время.</p>
                <form className="booking-form" onSubmit={submit}>
                  <label>
                    <span>Имя</span>
                    <input name="name" value={form.name} onChange={update} placeholder="Ваше имя" autoComplete="name" required />
                  </label>
                  <label>
                    <span>Телефон или email</span>
                    <input name="contact" value={form.contact} onChange={update} placeholder="Как с вами связаться" required />
                  </label>
                  <label>
                    <span>Сеанс</span>
                    <select name="session" value={form.session} onChange={update}>
                      {sessions.map((item) => <option key={item.id}>{item.title}</option>)}
                    </select>
                  </label>
                  <label>
                    <span>Комментарий</span>
                    <textarea name="message" value={form.message} onChange={update} placeholder="Желаемая дата или вопрос" rows="3" />
                  </label>
                  <button className="button" type="submit">Отправить заявку</button>
                </form>
              </>
            ) : (
              <motion.div className="success-state" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
                <span className="success-mark">✓</span>
                <h2>Спасибо!</h2>
                <p>Форма заполнена. На этапе подключения сайта к реальному сервису здесь будет отправка заявки администратору.</p>
                <button className="button" type="button" onClick={onClose}>Готово</button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
