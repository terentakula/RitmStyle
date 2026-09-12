import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { articles } from '../data/siteData'
import { ArrowIcon } from '../components/Icons'
import PageShell from '../components/PageShell'
import SectionTitle from '../components/SectionTitle'

export default function NewsPage() {
  return (
    <PageShell>
      <section className="page-hero shell">
        <span className="eyebrow">RitmStyle Journal</span>
        <h1>Новости</h1>
        <p>Обновления форматов, ответы на частые вопросы и короткие заметки о водных практиках.</p>
      </section>
      <section className="section section--page">
        <div className="shell">
          <SectionTitle eyebrow="Последнее">Новые материалы</SectionTitle>
          <div className="news-grid">
            {[...articles, ...articles].map((article, index) => (
              <motion.article
                className="news-card"
                key={`${article.slug}-${index}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: (index % 3) * 0.07, duration: 0.55 }}
                whileHover={{ y: -6 }}
              >
                <Link to={`/article/${article.slug}`} className="news-card__media"><img src={article.image} alt="" /></Link>
                <div className="news-card__body">
                  <span>{article.date}</span>
                  <h3><Link to={`/article/${article.slug}`}>{article.title}</Link></h3>
                  <p>{article.excerpt}</p>
                  <Link className="text-link" to={`/article/${article.slug}`}>Читать <ArrowIcon size={18} /></Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  )
}
