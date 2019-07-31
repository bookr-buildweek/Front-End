import React from 'react';
import BannerImg from '../../assets/Desktop_banner_image.png';

export default function Banner() {
  return (
    <div style={{position: 'relative'}}>
      <div ><img style={{width: '100%', marginTop: '-50px'}} src={BannerImg}alt="banner"/></div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '60%', minHeight: '60%', background: '#332706', opacity: '0.8', position: 'absolute', top: '80px', left: '0'}}>
        <h1 style={{fontSize: '58px', color: 'white', textAlign: 'left',
                    font: 'Cormorant Garamond, semi-bold', paddingLeft: '30px'
      }} >BOOKR : </h1>
        <i style={{fontSize: '36px', font: 'Cormorant Garamond, medium italic ', minHeight: '36px', color: 'white', paddingLeft: '30px'}}>your source for all things textbook</i>
      </div>
    </div>
  )
}