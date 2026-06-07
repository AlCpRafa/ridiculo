import { useState } from 'react';
import './App.css';
import About from './pages/About';
import Article from './pages/Article';
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
  const [selectedEra, setSelectedEra] = useState(null);
  const activePage = currentPage === 'article' ? 'catalog' : currentPage;

  const renderPage = () => {
    switch (currentPage) {
      case 'catalog':
        return (
          <Catalog
            onOpenEra={(eraId) => {
              setSelectedEra(eraId);
              setCurrentPage('article');
            }}
          />
        );
      case 'article':
        return <Article eraId={selectedEra} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <Home
            onNavigate={setCurrentPage}
            onOpenEra={(eraId) => {
              setSelectedEra(eraId);
              setCurrentPage('article');
            }}
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
              className={activePage === page.id ? 'active' : ''}
              key={page.id}
              onClick={() => {
                setCurrentPage(page.id);
                setSelectedEra(null);
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
