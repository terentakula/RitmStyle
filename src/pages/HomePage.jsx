import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero.jpg";
import aboutImage from "../assets/images/about.jpg";
import certificateImage from "../assets/images/certificate.jpg";
import mapImage from "../assets/images/map.png";
import pinIcon from "../assets/icons/pin.svg";
import metroIcon from "../assets/icons/metro.svg";
import calendarIcon from "../assets/icons/calendar.svg";
import { prices, sessions, testimonials } from "../data/siteData";
import { ArrowIcon, ChevronIcon } from "../components/Icons";
import PageShell from "../components/PageShell";
import SectionTitle from "../components/SectionTitle";

const reveal = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function HomePage({ onBook }) {
  const heroRef = useRef(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const prevReview = () =>
    setReviewIndex(
      (index) => (index - 1 + testimonials.length) % testimonials.length,
    );
  const nextReview = () =>
    setReviewIndex((index) => (index + 1) % testimonials.length);

  return (
    <PageShell>
      <section className="hero shell" ref={heroRef}>
        <div className="hero-card">
          <motion.img
            className="hero-media"
            src={heroImage}
            alt="Человек расслабляется в воде"
            style={{ y: imageY, scale: imageScale }}
          />
          <div className="hero-overlay" />
          <div className="hero-noise" />
          <div className="hero-copy-position">
            <motion.div
              className="hero-copy"
              style={{ y: copyY, opacity: copyOpacity }}
            >
              <motion.span
                className="hero-kicker"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
              >
                Акватерапия · Санкт-Петербург
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.24,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Почувствуйте <em>тишину</em>
                <br />в движении воды
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.75 }}
              >
                RitmStyle — индивидуальные водные сеансы, где можно замедлиться,
                переключить внимание на тело и просто отдохнуть от внешнего
                шума.
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44, duration: 0.75 }}
              >
                <button
                  className="button"
                  type="button"
                  onClick={() => onBook()}
                >
                  Записаться на сеанс <ArrowIcon />
                </button>
                <Link className="text-link" to="/#sessions">
                  Смотреть форматы <ArrowIcon size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="hero-badge" aria-hidden="true">
            <span>R</span>
            <small>RITMSTYLE</small>
          </div>
        </div>
      </section>

      <section className="section" id="sessions">
        <div className="shell">
          <SectionTitle eyebrow="Форматы">Сеансы RitmStyle</SectionTitle>
          <div className="sessions-grid">
            {sessions.map((session, index) => (
              <motion.article
                className={`session-card ${index === 0 ? "session-card--feature" : ""}`}
                key={session.id}
                {...reveal}
                transition={{ ...reveal.transition, delay: index * 0.055 }}
                whileHover={{ y: -7 }}
              >
                <img src={session.image} alt="" />
                <div className="session-card__shade" />
                <div className="session-card__index">0{index + 1}</div>
                <div className="session-card__content">
                  <span>{session.price}</span>
                  <h3>{session.title}</h3>
                  <p>{session.text}</p>
                  <button
                    type="button"
                    className="round-link"
                    aria-label={`Записаться: ${session.title}`}
                    onClick={() => onBook(session.id)}
                  >
                    <ArrowIcon />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--reviews" id="reviews">
        <div className="shell reviews-layout">
          <div>
            <SectionTitle eyebrow="Отзывы" align="left">
              Что говорят после сеанса
            </SectionTitle>
            <p className="section-copy">
              Спокойный формат лучше всего описывают люди, которые уже
              попробовали его на себе.
            </p>
            <div className="slider-controls">
              <button
                className="icon-button icon-button--outlined"
                type="button"
                onClick={prevReview}
                aria-label="Предыдущий отзыв"
              >
                <ChevronIcon direction="left" />
              </button>
              <span>
                <strong>{String(reviewIndex + 1).padStart(2, "0")}</strong> /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>
              <button
                className="icon-button icon-button--outlined"
                type="button"
                onClick={nextReview}
                aria-label="Следующий отзыв"
              >
                <ChevronIcon />
              </button>
            </div>
          </div>
          <div className="review-stage">
            {testimonials.map((review, index) => {
              const offset =
                (index - reviewIndex + testimonials.length) %
                testimonials.length;
              const visible = offset < 3;
              return (
                <motion.article
                  key={review.name}
                  className="review-card"
                  animate={{
                    opacity: visible ? 1 - offset * 0.28 : 0,
                    x: 0,
                    y: offset * 12,
                    scale: 1 - offset * 0.035,
                    zIndex: testimonials.length - offset,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  style={{ pointerEvents: offset === 0 ? "auto" : "none" }}
                >
                  <p>{review.text}</p>
                  <div className="review-person">
                    <span>{review.name.charAt(0)}</span>
                    <strong>{review.name}</strong>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="shell">
          <SectionTitle eyebrow="О подходе">
            Вода меняет ощущение движения
          </SectionTitle>
          <div className="about-grid">
            <motion.div className="about-media" {...reveal}>
              <img src={aboutImage} alt="RitmStyle — водный сеанс" />
              <div className="about-media__label">
                <strong>01</strong>
                <span>
                  мягкий ритм
                  <br />и внимание к комфорту
                </span>
              </div>
            </motion.div>
            <motion.div
              className="about-copy"
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.1 }}
            >
              <span className="eyebrow">RitmStyle</span>
              <h3>Не тренировка и не гонка за результатом</h3>
              <p>
                В основе — спокойная работа в воде, плавные движения и
                пространство без лишних раздражителей. Перед началом мы
                обсуждаем формат и подбираем комфортный темп.
              </p>
              <p>
                Сеанс строится индивидуально: можно делать больше пауз,
                отказаться от погружений или заранее обсудить любые ограничения.
              </p>
              <button
                className="button button--ghost"
                type="button"
                onClick={() => onBook()}
              >
                Задать вопрос <ArrowIcon />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section section--prices">
        <div className="shell">
          <SectionTitle eyebrow="Стоимость">
            Выберите подходящий формат
          </SectionTitle>
          <div className="price-grid">
            <motion.div className="price-list" {...reveal}>
              {prices.map(([name, price], index) => (
                <button
                  type="button"
                  className="price-row"
                  key={name}
                  onClick={() => onBook(sessions[index]?.id)}
                >
                  <span className="price-row__index">0{index + 1}</span>
                  <span className="price-row__name">{name}</span>
                  <strong>{price}</strong>
                  <ArrowIcon size={18} />
                </button>
              ))}
            </motion.div>
            <motion.div
              className="certificate-card"
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.12 }}
              whileHover={{ y: -6 }}
            >
              <img
                src={certificateImage}
                alt="Подарочный сертификат RitmStyle"
              />
              <div className="certificate-card__overlay" />
              <div className="certificate-card__copy">
                <span>Подарочный сертификат</span>
                <h3>Подарите время на себя</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section" id="contacts">
        <div className="shell contact-grid">
          <motion.div className="map-card" {...reveal}>
            <img src={mapImage} alt="Карта расположения бассейна" />
            <div className="map-pulse" aria-hidden="true">
              <span />
            </div>
          </motion.div>
          <motion.div
            className="contact-panel"
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
          >
            <span className="eyebrow">Контакты</span>
            <h2>Бассейн WorkClass</h2>
            <div className="contact-lines">
              <div>
                <img src={pinIcon} alt="" />
                <span>Невский 140</span>
              </div>
              <div>
                <img src={metroIcon} alt="" />
                <span>м. Спасская</span>
              </div>
              <div>
                <img src={calendarIcon} alt="" />
                <span>Запись по договорённости</span>
              </div>
            </div>
            <p>
              Перед поездкой подтвердите время визита — сеансы проходят только
              по предварительной записи.
            </p>
            <button className="button" type="button" onClick={() => onBook()}>
              Записаться <ArrowIcon />
            </button>
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}
