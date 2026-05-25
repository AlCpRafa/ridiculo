import naturalFolderImage from '../assets/images/inicio/carpeta.png';
import { eras } from '../data/eras';

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
          <h1>RID&Iacute;CULO</h1>
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
              <strong>{era.title}</strong>
            </button>
          ))}
        </div>

        <button
          className="catalog-text-link"
          onClick={() => onNavigate('catalog')}
          type="button"
        >
          VER CATALOGO COMPLETO
        </button>
      </section>
    </main>
  );
}

export default Home;
