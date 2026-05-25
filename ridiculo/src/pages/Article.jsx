import { eras } from '../data/eras';

function Article({ eraId }) {
  const era = eras.find((item) => item.id === eraId) ?? eras[0];

  return (
    <main className={`page article-page ${era.id}-page`}>
      <article className="article">
        <header className="article-header">
          <p className="eyebrow">{era.kicker}</p>
          <h1>{era.title}</h1>
          <p>{era.summary}</p>
        </header>

        <div className="article-body">
          {era.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}

export default Article;
