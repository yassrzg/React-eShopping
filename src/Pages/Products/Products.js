import React from 'react'
import Hear from './heart.svg'
import './Products.css'
import { Link } from 'react-router-dom'
import inventory from '../../data/inventory.js'


export default function Products() {
  return (
    
      <div className="card">
      
      {inventory.map((item) => (
        <Link
          to={{
            pathname: `/produits/${item.title.replace(/\s+/g, "").trim()}`,
          }}
          key={item.id}
        >
          <div className='card-img'>
            <div>
              <img 
              src={process.env.PUBLIC_URL + `/images/${item.img}.png`} 
              alt="produit" 
              className='img-product'/>
            </div>

            <div className='info-card'>
              <div>
                <p>{item.title}</p>
                <p>Prix : {item.price}€</p>
              </div>
              <div>
                <img src={Hear} alt="heart" className='heart'/>
              </div>
            </div>
          </div>
        </Link>
      ))}
      </div>
   
  );
}
