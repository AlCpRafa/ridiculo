import { useState } from 'react';
import './App.css';
import About from './pages/About';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Home from './pages/Home';

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
          {pages.map((page) => (
            <button
              className={currentPage === page.id ? 'active' : ''}
              key={page.id}
              onClick={() => {
                setCurrentPage(page.id);
              }}
              type="button"
            >
              {page.label}
            </button>
          ))}
        </nav>
      </header>

      {renderPage()}
    </>
  );
}

export default App;
