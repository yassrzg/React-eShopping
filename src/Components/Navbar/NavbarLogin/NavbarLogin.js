import React, {useState, useEffect, useRef} from 'react'
import { useHistory } from'react-router-dom';
import { auth } from '../../Firebase/FirebaseConfig';
import imgLogo from '../loulou.png';
import { Link } from'react-router-dom';
import { signOut } from 'firebase/auth';
import './NavbarLogin.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'




export default function NavbarLogin() {


    // déconnexion
  
    const history = useHistory();

    const handleSignOut = () => {
      auth.signOut().then(() => {
        
        setTimeout(() => {
          history.push('/login');
        }, 1000);
      }).catch((error) => {
        
      });
    };
    

    




  return (
    
        
    
    <div className="nav-top2">
      <div className="logo">
        <img src={imgLogo} alt="logo Shop" id="logo" />
      </div>
      <div >
        <Link to="/">
          Home
        </Link>
        <Link to="/produits">
          Nos Produits
        </Link>
        <Link to="/contact">
          Catégories
        </Link>
        <Link to="/contact">
          A propos
        </Link>
      </div>
      <div className="profile-dropdown">
        <button className="dropdown-toggle">
          <i className="fa fa-user"></i>
        </button>
        
        <div>
          <Link to="/welcome">Mon profil</Link>
          <Link to="/welcome">Nous Contacter</Link>
          <Link to="/welcome">Vos Commandes</Link>
          <button onClick={handleSignOut} >Déconnexion</button>
        </div>
      </div>
    </div>
  
      
   
  )
}
