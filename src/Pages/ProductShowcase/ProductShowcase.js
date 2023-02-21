import React, {useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom'
import './ProductShowcase.css'
import inventory from '../../data/inventory'
import { useDispatch } from 'react-redux'


export default function ProductShowcase() {

  const [nbMugs, setMbMugs] = useState(1)

  const {id} = useParams()
  
  const productClicked = inventory.findIndex(obj => obj.title.replace(/\s+/g, "").trim()
  === id)

  const updateMugs = e => {
    setMbMugs(Number(e.target.value))
  };

  const addingInfo = useRef();

  const dispatch = useDispatch();
  let timerInfo;
  let display = true

  const addToCart= e => {
    e.preventDefault()
    
    const itemAdded = {
      ...inventory[productClicked],
      quantity: nbMugs
    }

    dispatch({
      type: 'ADDITEM',
      payload: itemAdded
    })

    addingInfo.current.innerText = "Ajouter au panier"

    if(display) {
      display = false;
      timerInfo = setTimeout(() => {
        addingInfo.current.innerText ="";
        display =true;
    },1000)
  }
}

useEffect(() => {
  return () => {
    clearTimeout(timerInfo);
  }
}, [])
  
  return (
    <div className='showcase'>
      <div className='showcase-sold'>
        <div className="container-img-showcase">
          <img 
          className='img-showcase'
          src={process.env.PUBLIC_URL + `/images/${inventory[productClicked].img}.png`}
          alt="" />
        </div>
        <div className="product-infos">
          <h2>{inventory[productClicked].title}</h2>
          <p>Prix:{inventory[productClicked].price}€</p>
          <form
          onSubmit={addToCart}>
            <label htmlFor="quantity">Quantité</label>
            <input 
            type="number" 
            id="quantity"
            value={nbMugs}
            onChange={updateMugs} />
            <button>Ajouter au panier</button>
            <span 
            className ="adding-info"
            ref={addingInfo}></span>
            <h3>Personnaliser votre objet:</h3>
            
          </form>
        </div>
      </div>
      <div className='showcase-info'>
        <h2>Description</h2>
        <p>{inventory[productClicked].description}</p>
      
      </div>

    </div>
  )
}
