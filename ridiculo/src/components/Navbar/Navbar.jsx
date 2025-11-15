import './Navbar.css';

function Navbar({ currentPage, onPageChange }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span>Mi App</span>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <button 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => onPageChange('home')}
            >
              Inicio
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => onPageChange('about')}
            >
              Sobre Nosotros
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${currentPage === 'services' ? 'active' : ''}`}
              onClick={() => onPageChange('services')}
            >
              Servicios
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
              onClick={() => onPageChange('contact')}
            >
              Contacto
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;