import { useEffect, useMemo, useRef, useState } from 'react';
import naturalVideoFrame from '../assets/images/catalogo/fondo_video_era_natural.png';
import digitalVideoFrame from '../assets/images/catalogo/fondo_video_era_digital.png';
import consumoVideoFrame from '../assets/images/catalogo/fondo_video_era_consumo.jpg';
import naturalDecorImage from '../assets/images/catalogo/imagen_era_natural.png';
import digitalDecorImage from '../assets/images/catalogo/imagen_era_digital.png';
import consumoDecorImage from '../assets/images/catalogo/imagen_era_consumo.png';
import naturalVideo from '../assets/videos/vídeo_era_natural.mp4';
import digitalVideo from '../assets/videos/video_era_digital.mp4';
import consumoVideo from '../assets/videos/video_era_consumo.mp4';
import { catalogIntroduction, eras } from '../data/eras';
import { renderBrandText } from '../utils/brandText';

const catalogAssets = {
  'era-natural': {
    image: naturalDecorImage,
    videoFrame: naturalVideoFrame,
    videoSrc: naturalVideo,
  },
  'era-digital': {
    image: digitalDecorImage,
    videoFrame: digitalVideoFrame,
    videoSrc: digitalVideo,
  },
  'era-consumismo': {
    image: consumoDecorImage,
    videoFrame: consumoVideoFrame,
    videoSrc: consumoVideo,
  },
};

function Catalog() {
  const digitalLayoutRef = useRef(null);
  const digitalCanvasRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const videoGalleryItems = useMemo(
    () =>
      eras
        .map((era) => ({
          ...era,
          ...catalogAssets[era.id],
        }))
        .filter((era) => Boolean(era.videoSrc)),
    [],
  );

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
        const colorIndex = Math.min(
          colors.length - 1,
          Math.floor(noise * colors.length),
        );

        context.globalAlpha = 1;
        context.fillStyle = colors[colorIndex];
        context.fillRect(
          Math.floor(x),
          Math.floor(y),
          pixelSize + 0.5,
          pixelSize + 0.5,
        );
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

  useEffect(() => {
    if (activeVideo === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveVideo(null);
      if (event.key === 'ArrowLeft') {
        setActiveVideo((current) =>
          current === 0 ? videoGalleryItems.length - 1 : current - 1,
        );
      }
      if (event.key === 'ArrowRight') {
        setActiveVideo((current) => (current + 1) % videoGalleryItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideo, videoGalleryItems.length]);

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

  const openVideo = (eraId) => {
    const index = videoGalleryItems.findIndex((item) => item.id === eraId);

    if (index !== -1) setActiveVideo(index);
  };

  const showPreviousVideo = () => {
    setActiveVideo((current) =>
      current === 0 ? videoGalleryItems.length - 1 : current - 1,
    );
  };

  const showNextVideo = () => {
    setActiveVideo((current) => (current + 1) % videoGalleryItems.length);
  };

  return (
    <main className="page catalog-page">
      <section className="catalog-introduction">
        <p className="eyebrow">Primera edición</p>
        <h1>Apocalipsis</h1>
        <div>
          {catalogIntroduction.map((paragraph, index) => (
            <p className={index === 4 ? 'catalog-mantra' : ''} key={paragraph}>
              {renderBrandText(paragraph)}
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
                  className={`catalog-era-layout catalog-era-layout--${era.id}${
                    assets.image ? '' : ' catalog-era-layout--no-image'
                  }`}
                  onPointerEnter={
                    era.id === 'era-digital'
                      ? (event) => {
                          digitalLayoutRef.current?.classList.add('is-active');
                          moveDigitalCursor(event);
                        }
                      : undefined
                  }
                  onPointerLeave={
                    era.id === 'era-digital' ? hideDigitalCursor : undefined
                  }
                  onPointerMove={
                    era.id === 'era-digital' ? moveDigitalCursor : undefined
                  }
                  ref={era.id === 'era-digital' ? digitalLayoutRef : undefined}
                >
                  {era.id === 'era-digital' ? (
                    <div className="catalog-era-text catalog-era-text--digital">
                      {era.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{renderBrandText(paragraph)}</p>
                      ))}
                      <canvas
                        aria-hidden="true"
                        className="catalog-digital-pixel-layer"
                        ref={digitalCanvasRef}
                      />
                    </div>
                  ) : era.id === 'era-consumismo' ? (
                    <div className="catalog-era-text catalog-era-text--consumo">
                      {era.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{renderBrandText(paragraph)}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="catalog-era-text">
                      {era.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{renderBrandText(paragraph)}</p>
                      ))}
                    </div>
                  )}

                  {assets.image && (
                    <figure
                      className={`catalog-era-image${
                        era.id === 'era-natural' ? ' catalog-era-image--doors' : ''
                      }${era.id === 'era-digital' ? ' catalog-era-image--digital' : ''}${
                        era.id === 'era-consumismo'
                          ? ' catalog-era-image--consumo'
                          : ''
                      }`}
                      tabIndex={
                        era.id === 'era-natural' ||
                        era.id === 'era-digital' ||
                        era.id === 'era-consumismo'
                          ? '0'
                          : undefined
                      }
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
                          <img
                            className="catalog-digital-cursor__base"
                            src={assets.image}
                            alt=""
                          />
                        </span>
                      ) : era.id === 'era-consumismo' ? (
                        <span className="catalog-consumo-label">
                          <img
                            className="catalog-consumo-label__base"
                            src={assets.image}
                            alt=""
                          />
                          <span
                            aria-hidden="true"
                            className="catalog-consumo-label__scan"
                          />
                        </span>
                      ) : (
                        <img src={assets.image} alt="" />
                      )}
                    </figure>
                  )}
                </div>
              </section>

              <section className="catalog-video-block" aria-label={`Vídeo de ${era.title}`}>
                {assets.videoSrc ? (
                  <button
                    className={`catalog-video-preview catalog-video-preview--${era.id}`}
                    onClick={() => openVideo(era.id)}
                    type="button"
                  >
                    <img src={assets.videoFrame} alt="" />
                    <div className="catalog-video-preview__screen">
                      <video
                        aria-label={`Vista previa del vídeo ${era.workTitle}`}
                        autoPlay
                        loop
                        muted
                        playsInline
                        src={assets.videoSrc}
                      />
                    </div>
                    <div className="catalog-video-preview__overlay">
                      <span>Ver pieza</span>
                      <p>{era.workTitle}</p>
                    </div>
                  </button>
                ) : (
                  <>
                    <img src={assets.videoFrame} alt="" />
                    <div>
                      <span>Vídeo</span>
                      <p>Próximamente</p>
                    </div>
                  </>
                )}
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

      {activeVideo !== null && (
        <div
          aria-label="Galería de vídeos"
          aria-modal="true"
          className="catalog-video-lightbox"
          onClick={() => setActiveVideo(null)}
          role="dialog"
        >
          <div
            className="catalog-video-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <header>
              <div className="catalog-video-lightbox-heading">
                <p>
                  <span className="catalog-video-lightbox-title">
                    {videoGalleryItems[activeVideo].title}
                  </span>
                  <span>
                    {String(activeVideo + 1).padStart(2, '0')} /{' '}
                    {String(videoGalleryItems.length).padStart(2, '0')}
                  </span>
                </p>
                <span
                  className={`catalog-video-lightbox-work catalog-video-lightbox-work--${videoGalleryItems[activeVideo].id}`}
                >
                  {videoGalleryItems[activeVideo].workTitle}
                </span>
              </div>
              <button
                aria-label="Cerrar galería de vídeos"
                onClick={() => setActiveVideo(null)}
                type="button"
              >
                ×
              </button>
            </header>

            <div className="catalog-video-lightbox-stage">
              <button
                aria-label="Vídeo anterior"
                onClick={showPreviousVideo}
                type="button"
              >
                ←
              </button>

              <div className="catalog-video-lightbox-player">
                <video
                  autoPlay
                  controls
                  playsInline
                  poster={videoGalleryItems[activeVideo].videoFrame}
                  src={videoGalleryItems[activeVideo].videoSrc}
                />
              </div>

              <button
                aria-label="Vídeo siguiente"
                onClick={showNextVideo}
                type="button"
              >
                →
              </button>
            </div>

            <div className="catalog-video-lightbox-thumbnails">
              {videoGalleryItems.map((item, index) => (
                <button
                  aria-label={`Abrir vídeo ${item.workTitle}`}
                  aria-pressed={activeVideo === index}
                  key={item.id}
                  onClick={() => setActiveVideo(index)}
                  type="button"
                >
                  <img src={item.videoFrame} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Catalog;
