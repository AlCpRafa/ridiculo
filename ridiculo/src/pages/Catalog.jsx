import { eras } from '../data/eras';

function Catalog({ onOpenEra }) {
  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">Catalogo</p>
        <h1>Indice de Eras</h1>
        <p>
          Cada Era funciona como entrada a un articulo independiente dentro de
          la web.
        </p>
      </section>

      <section className="chapter-list" aria-label="Listado de Eras">
        {eras.map((era) => (
          <article className="chapter-card" key={era.id}>
            <span>{era.kicker}</span>
            <h2>{era.title}</h2>
            <p>{era.summary}</p>
            <button onClick={() => onOpenEra(era.id)} type="button">
              Leer articulo
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Catalog;
