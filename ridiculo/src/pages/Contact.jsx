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

    const subject = encodeURIComponent('Idea para colaborar en Ridículo');
    const body = encodeURIComponent(
      `Hola,\n\nSoy ${formData.name}.\n\n${formData.message}\n\nPuedes responderme en: ${formData.email}`,
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="page contact-page">
      <section className="contact-hero">
        <div className="contact-copy">
          <h1>Mándame tu idea</h1>
          <div className="contact-intro">
            <p>Ridículo nace como un proyecto editorial abierto al diálogo.</p>
            <p>
              Cada edición surge de una inquietud concreta, pero las inquietudes
              nunca pertenecen a una sola persona. Por ello, este espacio está
              pensado para recibir propuestas, reflexiones, experiencias o
              problemáticas que merezcan ser observadas desde una mirada
              crítica y audiovisual.
            </p>
            <p>
              Si existe un tema que consideras relevante, una realidad que
              crees que está siendo ignorada o una idea que podría formar parte
              de futuras ediciones, este es el lugar para compartirla.
            </p>
            <p>
              Las próximas editoriales podrán construirse de forma
              colaborativa, incorporando nuevas perspectivas, voces y
              experiencias.
            </p>
          </div>

          <div className="contact-links" aria-label="Datos de contacto">
            <a href={`mailto:${contactEmail}`}>
              <span>Gmail</span>
              <strong>{contactEmail}</strong>
            </a>
            <a href={instagramUrl} rel="noreferrer" target="_blank">
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
              placeholder="Cuéntame qué tienes en mente..."
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
