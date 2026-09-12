import { Link, useParams } from 'react-router-dom'
import { articles } from '../data/siteData'
import { ArrowIcon } from '../components/Icons'
import PageShell from '../components/PageShell'

export default function ArticlePage() {
  const { slug } = useParams()
  const article = articles.find((item) => item.slug === slug) ?? articles[0]

  return (
    <PageShell>
      <article className="article shell">
        <div className="article-head">
          <Link className="text-link text-link--back" to="/blog"><ArrowIcon size={18} /> Все статьи</Link>
          <span className="eyebrow">{article.date}</span>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
        </div>
        <div className="article-cover"><img src={article.image} alt="" /></div>
        <div className="article-body">
          {article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="article-callout">Если у вас есть индивидуальные ограничения или сомнения по формату, обсудите их до записи на сеанс.</div>
        </div>
      </article>
    </PageShell>
  )
}
