import { useState } from 'react';

const contactEmail = 'cristinagnzrodriguez@gmail.com';
const instagramUser = '@ridiculo.es';
const instagramUrl = 'https://www.instagram.com/ridiculo.es';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent('Idea para colaborar en Ridiculo');
    const body = encodeURIComponent(
      `Hola,\n\nSoy ${formData.name}.\n\n${formData.message}\n\nPuedes responderme en: ${formData.email}`,
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="page contact-page">
      <section className="contact-hero">
        <div className="contact-copy">
          <p className="eyebrow">Contacto</p>
          <h1>Mandame tu idea para colaborar</h1>
          <p>
            Si el proyecto te mueve algo, si quieres proponer una pieza, una
            conversacion o una colaboracion, escribeme.
          </p>

          <div className="contact-cards" aria-label="Datos de contacto">
            <a href={`mailto:${contactEmail}`}>
              <span>Gmail</span>
              <strong>{contactEmail}</strong>
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              <span>Instagram</span>
              <strong>{instagramUser}</strong>
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Tu nombre
            <input
              name="name"
              onChange={handleChange}
              placeholder="Nombre"
              required
              type="text"
              value={formData.name}
            />
          </label>

          <label>
            Tu email
            <input
              name="email"
              onChange={handleChange}
              placeholder="email@ejemplo.com"
              required
              type="email"
              value={formData.email}
            />
          </label>

          <label>
            Tu idea
            <textarea
              name="message"
              onChange={handleChange}
              placeholder="Cuentame que tienes en mente..."
              required
              rows="7"
              value={formData.message}
            />
          </label>

          <button type="submit">Enviar propuesta</button>
        </form>
      </section>
    </main>
  );
}

export default Contact;
