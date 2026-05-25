function About() {
  return (
    <main className="page about-page">
      <section className="page-intro">
        <p className="eyebrow">Sobre mi</p>
        <h1>Presentacion personal</h1>
        <p>
          Aqui podras contar quien eres, que estudias, que te interesa y como
          se relaciona tu perfil con el TFG.
        </p>
      </section>

      <section className="content-grid">
        <article>
          <h2>Perfil</h2>
          <p>
            Escribe una breve biografia con tu enfoque academico, tus
            intereses y el tipo de proyectos que quieres desarrollar.
          </p>
        </article>
        <article>
          <h2>Proyecto</h2>
          <p>
            Resume el objetivo de tu TFG y por que has decidido tratar este
            tema desde esta web.
          </p>
        </article>
      </section>
    </main>
  );
}

export default About;
