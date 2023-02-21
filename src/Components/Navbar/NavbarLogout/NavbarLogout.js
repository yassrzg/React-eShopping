import React, {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import imgLogo from '../loulou.png'
import './NavbarLogout.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

export default function NavbarLogout() {

const [isMenuOpen, setIsMenuOpen] = useState(false);
const menuRef = useRef();

const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

const closeMenu = () => {
    setIsMenuOpen(false);
  };

useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);


  return (

    <div className='nav-top'>
          <div className='logo'>
            <img src={imgLogo} alt='logo Shop' id='logo' />
          </div>
          <div ref={menuRef}>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/produits" onClick={closeMenu}>Nos Produits</Link>
            <Link to="/contact" onClick={closeMenu}>Catégories</Link>
            <Link to="/contact" onClick={closeMenu}>A propos</Link>
            <div className="dropdown">
              <button onClick={toggleMenu} className="dropdown-toggle">
                <i className="fa fa-user"></i>
              </button>
              {isMenuOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/singup" onClick={closeMenu}>Inscription</Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={closeMenu}>Connexion</Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
  )
}
