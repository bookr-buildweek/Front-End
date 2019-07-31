import React from 'react';
import BannerImg from '../../assets/Desktop_banner_image.png';

export default function Banner() {
  return (
    <div>
      <div style={{position: 'relative'}}>
        <img style={{width: '100%', marginTop: '-50px'}} src={BannerImg} alt="desktop-banner"/>
      </div>
      <div className="banner-box" style={{ display: 'flex', alignItems: 'center', width: '70%', height: '30%', background: '#332706', opacity: '0.8', position: 'absolute', top: '70px', left: '0'}}>
        <h1 style={{fontSize: '48px', color: 'white', textAlign: 'left',
                    font: 'Cormorant Garamond, semi-bold', paddingLeft: '30px'
      }} >BOOKR : <br/>
        <i style={{fontSize: '36px', font: 'Cormorant Garamond, medium italic '}}>your source for all things textbook</i></h1>
      </div>
    </div>
  )
}