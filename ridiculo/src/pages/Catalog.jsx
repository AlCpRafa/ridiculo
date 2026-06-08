import { useEffect, useRef } from 'react';
import naturalVideoFrame from '../assets/images/catalogo/fondo_video_era_natural.png';
import digitalVideoFrame from '../assets/images/catalogo/fondo_video_era_digital.jpg';
import consumoVideoFrame from '../assets/images/catalogo/fondo_video_era_consumo.jpg';
import naturalDecorImage from '../assets/images/catalogo/imagen_era_natural.png';
import digitalDecorImage from '../assets/images/catalogo/imagen_era_digital.png';
import { catalogIntroduction, eras } from '../data/eras';

const catalogAssets = {
  'era-natural': {
    image: naturalDecorImage,
    videoFrame: naturalVideoFrame,
  },
  'era-digital': {
    image: digitalDecorImage,
    videoFrame: digitalVideoFrame,
  },
  'era-consumismo': {
    image: null,
    videoFrame: consumoVideoFrame,
  },
};

function Catalog() {
  const digitalLayoutRef = useRef(null);
  const digitalCanvasRef = useRef(null);

  const paintDigitalCanvas = () => {
    const canvas = digitalCanvasRef.current;

    if (!canvas) return;

    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const context = canvas.getContext('2d');

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.globalCompositeOperation = 'source-over';
    context.clearRect(0, 0, width, height);

    const colors = ['#f1f4f6', '#c9cdd1', '#969b9f', '#5d6266', '#252a2e', '#090c0f'];
    const pixelSize = 13;

    let row = 0;

    for (let y = 0; y < height; y += pixelSize) {
      let column = 0;

      for (let x = 0; x < width; x += pixelSize) {
        const wave = Math.sin(column * 1.83 + row * 4.27);
        const grain = Math.sin(column * 12.91 + row * 7.37);
        const noise = Math.abs(wave * 0.58 + grain * 0.42);
        const colorIndex = Math.min(colors.length - 1, Math.floor(noise * colors.length));

        context.globalAlpha = 1;
        context.fillStyle = colors[colorIndex];
        context.fillRect(Math.floor(x), Math.floor(y), pixelSize + 0.5, pixelSize + 0.5);
        column += 1;
      }

      row += 1;
    }

    context.globalAlpha = 1;
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(paintDigitalCanvas);
    document.fonts?.ready.then(paintDigitalCanvas);
    window.addEventListener('resize', paintDigitalCanvas);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          paintDigitalCanvas();
        }
      },
      { threshold: 0.08 },
    );

    if (digitalLayoutRef.current) {
      observer.observe(digitalLayoutRef.current);
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', paintDigitalCanvas);
      observer.disconnect();
    };
  }, []);

  const scrollToEra = (eraId) => {
    document.getElementById(eraId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const moveDigitalCursor = (event) => {
    const layout = digitalLayoutRef.current;

    if (!layout || event.pointerType === 'touch') return;

    const bounds = layout.getBoundingClientRect();
    layout.style.setProperty('--cursor-x', `${event.clientX - bounds.left}px`);
    layout.style.setProperty('--cursor-y', `${event.clientY - bounds.top}px`);
    layout.classList.add('is-active');

    const canvas = digitalCanvasRef.current;
    const canvasBounds = canvas?.getBoundingClientRect();
    const context = canvas?.getContext('2d');

    if (!canvasBounds || !context) return;

    const x = event.clientX - canvasBounds.left;
    const y = event.clientY - canvasBounds.top;
    const radius = 150;

    context.save();
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
    context.restore();
  };

  const hideDigitalCursor = () => {
    digitalLayoutRef.current?.classList.remove('is-active');
  };

  return (
    <main className="page catalog-page">
      <section className="catalog-introduction">
        <p className="eyebrow">Primera edición</p>
        <h1>Apocalipsis</h1>
        <div>
          {catalogIntroduction.map((paragraph, index) => (
            <p className={index === 4 ? 'catalog-mantra' : ''} key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="chapter-list" aria-label="Listado de Eras">
        {eras.map((era) => (
          <button
            className="chapter-link"
            key={era.id}
            onClick={() => scrollToEra(era.id)}
            type="button"
          >
            <span>Era</span>
            <span>{era.title.replace(/^Era\s+/i, '')}</span>
          </button>
        ))}
      </section>

      <section className="catalog-articles" aria-label="Artículos de Apocalipsis">
        {eras.map((era) => {
          const assets = catalogAssets[era.id];

          return (
            <article className="catalog-article" id={era.id} key={era.id}>
              <header className="catalog-article-header">
                <h2>{era.title}</h2>
                <h3 className={`catalog-work-title catalog-work-title--${era.id}`}>
                  {era.workTitle}
                </h3>
              </header>

              <section className="catalog-article-copy">
                <h3>Sobre la obra</h3>
                <div
                  className={`catalog-era-layout catalog-era-layout--${era.id}${assets.image ? '' : ' catalog-era-layout--no-image'}`}
                  onPointerEnter={era.id === 'era-digital' ? (event) => {
                    digitalLayoutRef.current?.classList.add('is-active');
                    moveDigitalCursor(event);
                  } : undefined}
                  onPointerLeave={era.id === 'era-digital' ? hideDigitalCursor : undefined}
                  onPointerMove={era.id === 'era-digital' ? moveDigitalCursor : undefined}
                  ref={era.id === 'era-digital' ? digitalLayoutRef : undefined}
                >
                  {era.id === 'era-digital' ? (
                    <div className="catalog-era-text catalog-era-text--digital">
                      {era.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      <canvas className="catalog-digital-pixel-layer" ref={digitalCanvasRef} aria-hidden="true" />
                    </div>
                  ) : (
                    <div className="catalog-era-text">
                      {era.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  )}

                  {assets.image && (
                    <figure
                      className={`catalog-era-image${era.id === 'era-natural' ? ' catalog-era-image--doors' : ''}${era.id === 'era-digital' ? ' catalog-era-image--digital' : ''}`}
                      tabIndex={era.id === 'era-natural' || era.id === 'era-digital' ? '0' : undefined}
                    >
                      {era.id === 'era-natural' ? (
                        <>
                          <span className="catalog-door catalog-door--left">
                            <img src={assets.image} alt="" />
                          </span>
                          <span className="catalog-door catalog-door--right">
                            <img src={assets.image} alt="" />
                          </span>
                        </>
                      ) : era.id === 'era-digital' ? (
                        <span className="catalog-digital-cursor">
                          <img className="catalog-digital-cursor__base" src={assets.image} alt="" />
                        </span>
                      ) : (
                        <img src={assets.image} alt="" />
                      )}
                    </figure>
                  )}
                </div>
              </section>

              <section className="catalog-video-block" aria-label={`Vídeo de ${era.title}`}>
                <img src={assets.videoFrame} alt="" />
                <div>
                  <span>Vídeo</span>
                  <p>Próximamente</p>
                </div>
              </section>

              <section className="catalog-article-credits">
                <h3>Créditos</h3>
                <dl>
                  {era.credits.map(([role, name]) => (
                    <div key={role}>
                      <dt>{role}</dt>
                      <dd>{name}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default Catalog;
