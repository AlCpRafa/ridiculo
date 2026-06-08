import naturalFolderImage from '../assets/images/inicio/carpeta.png';
import { eras } from '../data/eras';

const homeTitle = 'RIDÍCULO';

const homeEraImages = {
  'era-natural': naturalFolderImage,
  'era-digital': naturalFolderImage,
  'era-consumismo': naturalFolderImage,
};

function Home({ onNavigate, onOpenEra }) {
  return (
    <main className="page home-page">
      <section className="home-hero">
        <div className="home-title-block">
          <h1 aria-label={homeTitle}>
            {Array.from(homeTitle).map((letter, index) => (
              <span
                aria-hidden="true"
                key={`${letter}-${index}`}
                style={{ '--title-letter-index': index }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <div className="dictionary-entry" aria-label="Definicion de ridiculo">
            <p className="dictionary-origin">
              <em>Del lat. ridiculus.</em>
            </p>
            <ol>
              <li>
                <abbr title="adjetivo">adj.</abbr> Que por su rareza o
                extravagancia mueve o puede mover a risa.
              </li>
              <li>
                <abbr title="sinonimos">Sin.</abbr> irrisorio, grotesco,
                absurdo, anomalo, extravagante, estrafalario.
              </li>
            </ol>
          </div>
        </div>

        <div className="era-links" aria-label="Accesos a las Eras">
          {eras.map((era, index) => (
            <button
              className="era-link"
              key={era.id}
              onClick={() => onOpenEra(era.id)}
              style={{ '--era-index': index }}
              type="button"
            >
              <img src={homeEraImages[era.id]} alt="" />
              <strong>
                {era.title.split(' ').map((word) => (
                  <span className={`era-word era-word--${word.toLowerCase()}`} key={word}>
                    {word}
                  </span>
                ))}
              </strong>
            </button>
          ))}
        </div>

        <button
          className="catalog-text-link"
          onClick={() => onNavigate('catalog')}
          type="button"
        >
          VER CATÁLOGO COMPLETO
        </button>
      </section>
    </main>
  );
}

export default Home;
