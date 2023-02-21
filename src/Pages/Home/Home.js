import './Home.css'
import React from 'react'
import Slider from '../../Components/Slider/Slider'
import Reseau from '../../Components/ReseauSociaux/Reseau'
import BestSeller from '../../Components/BestSeller/BestSeller'


export default function Home() {

  return (
    <div>
      <Slider />
      <BestSeller />
      <Reseau />
    </div>
  )
}

