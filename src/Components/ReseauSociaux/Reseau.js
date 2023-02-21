import React from 'react'
import tiktok from './tiktok.svg'
import './Reseau.css'
import instagram from './Instagram.svg'
import instagram2 from './Instagram-title.svg'

export default function Reseau() {
  return (
    <div className='reseau-sociaux'>
        <h1>S'inscire à la Newsletter</h1>
        <input type="email" placeholder="Email" />
        <h2 className='title-reseau'>Suivez nous sur nos Reseaux !</h2>

        <div className='reseau'>
            <img src={tiktok} alt="tiktok" id="tiktok" />
            <img src={instagram} alt="instagram" id="instagram" />

        </div>
    </div>
  )
}

