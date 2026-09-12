import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { articles } from '../data/siteData'
import { ArrowIcon } from '../components/Icons'
import PageShell from '../components/PageShell'

export default function BlogPage() {
  return (
    <PageShell>
      <section className="page-hero shell">
        <span className="eyebrow">Блог</span>
        <h1>О воде, ритме и ощущениях</h1>
        <p>Материалы для тех, кто хочет заранее разобраться в формате и прийти на первый сеанс без лишних вопросов.</p>
      </section>
      <section className="section section--page">
        <div className="shell blog-list">
          {articles.map((article, index) => (
            <motion.article
              className="blog-card"
              key={article.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.6, delay: index * 0.07 }}
            >
              <Link className="blog-card__media" to={`/article/${article.slug}`}><img src={article.image} alt="" /></Link>
              <div className="blog-card__body">
                <span>{article.date}</span>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <Link className="button button--ghost" to={`/article/${article.slug}`}>Читать статью <ArrowIcon /></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
