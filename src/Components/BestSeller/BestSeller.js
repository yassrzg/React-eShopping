import React from 'react'
import './BestSeller.css'

export default function BestSeller() {
  return (
    <div className='BestSeller'>
        <div>   
            <h2 className='title-home-seller'>Best Seller</h2>
        
            <div className='home-card'>
                <div className='card-content'>
                    <h2 className='home-card-title'>Something awesome</h2>
                    <button className='button-home'>See More</button>
                </div>
            </div>

        </div>

        <div>
            <h2 className='title-home-seller'>New Product</h2>

            <div className='home-card2'>
                <div className='card-content'>
                    <h2 className='home-card-title'>Something awesome</h2>
                    <button className='button-home'>See More</button>
                </div>
            </div>

        </div>

        <div>  
            <h2 className='title-home-seller'>Promotion</h2>

            <div className='home-card3'>
                <div className='card-content'>
                    <h2 className='home-card-title'>Something awesome</h2>
                    <button className='button-home'>See More</button>
                </div>
            </div>

        </div>

    </div>
  )
}
