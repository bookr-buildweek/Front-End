import React from 'react';
import BannerImg from '../../assets/Desktop_banner_image.png';

export default function Banner() {
  return (
    <div className="banner-box">
      <div style={{position: 'relative'}}>
        <img style={{width: '100%', marginTop: '-50px'}} src={BannerImg} alt="desktop-banner"/>
      </div>
      <div className="banner-text">
        <h1 style={{fontSize: '55px', color: 'white', textAlign: 'left',
                    fontFamily: 'Cormorant Garamond, semi-bold', paddingLeft: '30px'
      }} >BOOKR : <br/>
        <i className="hidden-text" style={{fontSize: '36px', fontFamily: 'Cormorant Garamond, medium italic '}}>your source for all things textbook</i></h1>
      </div>
    </div>
  )
}