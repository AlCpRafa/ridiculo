import { eras } from '../data/eras';

function Article({ eraId }) {
  const era = eras.find((item) => item.id === eraId) ?? eras[0];

  return (
    <main className={`page article-page ${era.id}-page`}>
      <article className="article">
        <header className="article-header">
          <p className="eyebrow">{era.kicker}</p>
          <h1>{era.title}</h1>
          <h2>{era.workTitle}</h2>
          <p>{era.summary}</p>
        </header>

        <div className="article-body">
          <section>
            <h2>Sobre la obra</h2>
            <div className="article-copy">
              {era.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="article-credits">
            <h2>Créditos</h2>
            <dl>
              {era.credits.map(([role, name]) => (
                <div key={role}>
                  <dt>{role}</dt>
                  <dd>{name}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </article>
    </main>
  );
}

export default Article;
