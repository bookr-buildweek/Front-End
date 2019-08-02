import React from 'react';
import BannerImg from '../../assets/Desktop_banner_image.png';

export default function Banner() {
  return (
    <div className="banner-box">
      <div style={{position: 'relative'}}>
        <img style={{width: '100%', marginTop: '-50px'}} src={BannerImg} alt="desktop-banner"/>
      </div>
      <div 
      className="banner-text">
        <h1 style={{fontSize: '5rem', color: 'white', textAlign: 'left',
                    fontFamily: 'Cormorant Garamond, semi-bold'
      }} >BOOKR : </h1>
        <i className="hidden-text">your source for all things textbook</i>
      </div>
    </div>
  )
}