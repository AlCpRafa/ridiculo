import { useState } from 'react';
import './App.css';
import About from './pages/About';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Home from './pages/Home';
import { renderBrandText } from './utils/brandText';

const pages = [
  { id: 'home', label: 'Inicio' },
  { id: 'catalog', label: 'Catálogo' },
  { id: 'about', label: 'Ridículo' },
  { id: 'contact', label: 'Contacto' },
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const openCatalogEra = (eraId) => {
    setCurrentPage('catalog');
    window.setTimeout(() => {
      document.getElementById(eraId)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'catalog':
        return <Catalog />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <Home
            onNavigate={setCurrentPage}
            onOpenEra={openCatalogEra}
          />
        );
    }
  };

  return (
    <>
      <header className="site-header">
        <nav className="top-nav" aria-label="Navegacion principal">
          {pages.map((page, index) => (
            <div className="top-nav-item" key={page.id}>
              <button
                className={currentPage === page.id ? 'active' : ''}
                onClick={() => {
                  setCurrentPage(page.id);
                }}
                type="button"
              >
                {renderBrandText(page.label)}
              </button>
              {index < pages.length - 1 ? (
                <span aria-hidden="true" className="top-nav-separator" />
              ) : null}
            </div>
          ))}
        </nav>
      </header>

      {renderPage()}
    </>
  );
}

export default App;
