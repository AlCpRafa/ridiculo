import { useEffect, useState } from 'react';
import consumoOne from '../assets/images/sobre_mi/consumo.jpg';
import consumoTwo from '../assets/images/sobre_mi/consumo2.jpg';
import consumoThree from '../assets/images/sobre_mi/consumo3.jpg';
import digitalOne from '../assets/images/sobre_mi/digital.jpg';
import digitalTwo from '../assets/images/sobre_mi/digital2.jpg';
import digitalThree from '../assets/images/sobre_mi/digital3.jpg';
import naturalOne from '../assets/images/sobre_mi/natural2.jpg';
import naturalTwo from '../assets/images/sobre_mi/natural3.jpg';
import naturalThree from '../assets/images/sobre_mi/natural4.JPEG';
import { renderBrandText } from '../utils/brandText';

const imageGroups = {
  natural: [naturalOne, naturalTwo, naturalThree],
  digital: [digitalOne, digitalTwo, digitalThree],
  consumo: [consumoOne, consumoTwo, consumoThree],
};

const galleryImages = [
  ...imageGroups.natural.map((src) => ({ src, era: 'Natural' })),
  ...imageGroups.digital.map((src) => ({ src, era: 'Digital' })),
  ...imageGroups.consumo.map((src) => ({ src, era: 'Consumo' })),
];

const eraStatements = {
  Natural: 'El origen antes del ruido',
  Digital: 'La identidad tras la pantalla',
  Consumo: 'Desear hasta agotarlo todo',
};

function EraGallery({ images, label, onOpen, startIndex }) {
  const eraClass = label.toLowerCase();

  return (
    <section
      className={`about-era-gallery about-era-gallery--${eraClass}`}
      aria-label={`Imágenes de la era ${label}`}
    >
      <h2>
        <span>Era</span>
        {label}
      </h2>
      <header className="about-era-heading">
        <p>{eraStatements[label]}</p>
      </header>
      <div className="about-era-images">
        {images.map((image, index) => (
          <figure
            className={`about-era-image about-era-image--${index + 1}`}
            key={image}
            onClick={() => onOpen(startIndex + index)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onOpen(startIndex + index);
              }
            }}
            role="button"
            tabIndex="0"
          >
            <img src={image} alt={`Archivo visual de la era ${label}`} />
          </figure>
        ))}
      </div>
    </section>
  );
}

function About() {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (activeImage === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveImage(null);
      if (event.key === 'ArrowLeft') {
        setActiveImage((current) =>
          current === 0 ? galleryImages.length - 1 : current - 1,
        );
      }
      if (event.key === 'ArrowRight') {
        setActiveImage((current) => (current + 1) % galleryImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImage]);

  const showPrevious = () => {
    setActiveImage((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveImage((current) => (current + 1) % galleryImages.length);
  };

  return (
    <main className="page about-page">
      <header className="about-header">
        <div className="about-masthead">
          <h1>
            <span>Sobre</span>
            <span>{renderBrandText('Ridículo')}</span>
          </h1>
          <div className="about-masthead-meta" aria-hidden="true">
            <span>Revista web</span>
            <span>Fanzine audiovisual</span>
            <span>Mirada crítica</span>
          </div>
        </div>

        <section className="about-section about-introduction">
          <h2>Declaración de intenciones</h2>
          <div>
            <p>
              {renderBrandText('Ridículo')} surge de la necesidad de observar aquello que, con el
              paso del tiempo, ha sido aceptado como normal sin apenas
              cuestionamiento. A través del lenguaje audiovisual, el proyecto
              propone una mirada crítica hacia problemáticas contemporáneas que
              afectan tanto al entorno como a la forma en que las personas se
              relacionan con él.
            </p>
          </div>
        </section>
      </header>

      <article className="about-body">
        <div className="about-manifesto">
          <section className="about-section">
            <h2>Lenguaje audiovisual</h2>
            <div>
              <p>
                Desarrollado desde la formación en Gráfica Audiovisual y el
                interés por la narrativa visual, el proyecto nace de la
                inquietud por explorar el potencial de la imagen, el sonido y
                el diseño como herramientas de reflexión. Más allá de informar,
                busca interpretar la realidad y transformarla en experiencias
                visuales capaces de generar preguntas en el espectador.
              </p>
              <p>
                Concebido como una revista web y fanzine audiovisual, <em className="brand-inline">RIDÍCULO</em>
                utiliza cada edición para abordar una temática diferente desde
                un enfoque experimental y autoral. Cada pieza combina vídeo,
                animación, diseño gráfico, fotografía y sonido para construir
                relatos que oscilan entre lo documental, lo simbólico y lo
                poético.
              </p>
            </div>
          </section>

          <section className="about-section">
            <h2>La idea</h2>
            <div>
              <p>
                Lo ridículo no siempre es aquello que resulta absurdo a primera
                vista, sino aquello que, pese a sus consecuencias, ha terminado
                por normalizarse.
              </p>
            </div>
          </section>

          <section className="about-section">
            <h2>Perspectiva</h2>
            <div>
              <p>
                El nombre del proyecto parte de una idea sencilla: lo ridículo
                no siempre es aquello que resulta absurdo a primera vista, sino
                aquello que, pese a sus consecuencias, ha terminado por
                normalizarse. Desde esta perspectiva, la revista se convierte
                en un espacio de observación y análisis donde lo cotidiano es
                revisado desde una mirada crítica.
              </p>
            </div>
          </section>
        </div>

        <section className="about-apocalypse">
          <span>Primera edición</span>
          <h2>Apocalipsis</h2>
          <p>
            La primera edición, Apocalipsis, reflexiona sobre un proceso de
            transformación silenciosa que ya forma parte del presente. A través
            de tres eras —la natural, la digital y la del consumo— se plantea un
            recorrido que va desde la desconexión con el origen hasta el
            agotamiento de los recursos, la identidad y el propio entorno.
          </p>
        </section>

        <EraGallery
          images={imageGroups.natural}
          label="Natural"
          onOpen={setActiveImage}
          startIndex={0}
        />

        <EraGallery
          images={imageGroups.digital}
          label="Digital"
          onOpen={setActiveImage}
          startIndex={3}
        />

        <EraGallery
          images={imageGroups.consumo}
          label="Consumo"
          onOpen={setActiveImage}
          startIndex={6}
        />

        <section className="about-section about-references">
          <h2>Referencias</h2>
          <div>
            <p>
              Las referencias del proyecto proceden de ámbitos diversos como el
              diseño editorial contemporáneo, los fanzines experimentales, el
              motion graphics, la fotografía documental, la cultura digital y
              las prácticas artísticas que utilizan la imagen como herramienta
              de crítica social. Sin embargo, la principal inspiración nace de
              la observación de la realidad cotidiana y de las contradicciones
              que la atraviesan.
            </p>
          </div>
        </section>

        <footer className="about-closing">
          <div>
            <h2>Otra perspectiva</h2>
            <p>
              {renderBrandText('Ridículo')} no pretende ofrecer respuestas cerradas. Su objetivo es
              abrir espacios de reflexión, cuestionar aquello que se da por
              hecho y utilizar lo audiovisual como un medio para pensar el
              presente desde otra perspectiva.
            </p>
          </div>
        </footer>
      </article>

      {activeImage !== null && (
        <div
          aria-label="Galería de imágenes"
          aria-modal="true"
          className="about-lightbox"
          onClick={() => setActiveImage(null)}
          role="dialog"
        >
          <div
            className="about-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <header>
              <p>
                Era {galleryImages[activeImage].era}
                <span>
                  {String(activeImage + 1).padStart(2, '0')} /{' '}
                  {String(galleryImages.length).padStart(2, '0')}
                </span>
              </p>
              <button
                aria-label="Cerrar galería"
                onClick={() => setActiveImage(null)}
                type="button"
              >
                ×
              </button>
            </header>

            <div className="about-lightbox-stage">
              <button aria-label="Imagen anterior" onClick={showPrevious} type="button">
                ←
              </button>
              <img
                src={galleryImages[activeImage].src}
                alt={`Archivo visual de la era ${galleryImages[activeImage].era}`}
              />
              <button aria-label="Imagen siguiente" onClick={showNext} type="button">
                →
              </button>
            </div>

            <div className="about-lightbox-thumbnails">
              {galleryImages.map((image, index) => (
                <button
                  aria-label={`Abrir imagen ${index + 1}`}
                  aria-pressed={activeImage === index}
                  key={image.src}
                  onClick={() => setActiveImage(index)}
                  type="button"
                >
                  <img src={image.src} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default About;
