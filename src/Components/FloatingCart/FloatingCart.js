import React from 'react'
import cartIcon from "./panier.png"
import "./FloatingCart.css"
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Favoris from './coeur.png'

export default function FloatingCart() {
  
  const shoppingCart = useSelector(state => state)
 

  let totalItems = 0;
  for(const item of shoppingCart.cart){
    totalItems += item.quantity;
  }

  return ( 
    <Link to="/shoppingCart">
        <div className='floating-cart'>
          <div className='floating-cart-favoris'>
            <p>Mes Favoris</p>
            <img src= {Favoris} alt="coeur" id='favoris'/>
            <span className='notif-favoris'>{totalItems}</span>
          </div>
          <div>
            <span className='span-shop'>|</span>
          </div>
          <div className='floating-cart-shop'>
            <p>Mon Panier</p>
            <div className="img-notif-container">
                <img src={cartIcon} alt="icone cadi" />
                <span className='notif'>{totalItems}</span>
            </div>
          </div>
        </div>
    </Link>
    
  )
}
