import React from 'react'
import bannerPic from '../assets/ottosBanner.jpg'
import altBanner from '../assets/ottosAltBanner.jpg'

const Banner = (props) => {
  return (
    <div>
      <img src={altBanner} alt="Otto's Ottomatic Comedy Club" style={{width:"50%"}}></img>
    </div>
  )
}

export default Banner