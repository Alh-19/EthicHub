import React from 'react'
import './Footer.css'
import { useState } from 'react';



 const Footer = () => {
  const [currentPage, setCurrentPage] = useState(''); // Estado para mantener la página actual
   const handlePageChange = (page) => {
    setCurrentPage(page);
  };
   return (

    <div >    
        <div className='logo-container'> 

        <a href="https://www.facebook.com/EthicHubPlatform" className="logo-color">
        <i class="fa-brands fa-square-facebook fa-2xl"></i></a>

        <a href="https://www.instagram.com/ethichub/" className="logo-color">
        <i class="fa-brands fa-instagram fa-2xl"></i></a>

        <a href="https://twitter.com/ethichub" className="logo-color">
        <i class="fa-brands fa-twitter fa-2xl"></i></a>

        <a href="https://www.youtube.com/channel/UCxLXFp8x93-ua34yZdHR-lA" className="logo-color">
        <i class="fa-brands fa-youtube fa-2xl"></i></a>

        <a href="https://gitlab.com/EthicHub" className="logo-color">
        <i class="fa-brands fa-gitlab fa-2xl"></i></a>

        <a href="https://discord.io/Ethichub" className="logo-color">
        <i class="fa-brands fa-discord fa-2xl"></i></a>

        <a href="https://t.me/ethichub" className="logo-color">
        <i class="fa-brands fa-telegram fa-2xl" ></i></a>

        <a href="https://www.linkedin.com/company/ethichub/" className="logo-color">
        <i class="fa-brands fa-linkedin fa-2xl"></i></a>

    </div>
        
      <div className='footer-links'>

        <div>
          <a href="https://www.ethichub.com/es/politica-de-cookies" className="politic-links">Cookies Policy</a>
        </div>

        <div classname='politics-container'>

          <a href="https://www.ethichub.com/es/politica-de-privacidad?hsLang=es" className="politic-links">Privacy Policy</a>
          <p>Crypto Café, Calle Bastero 13, Madrid, Spain.</p>
          <p>ALL RIGHTS RESERVED. ETHICHUB 2023 ®</p>
        </div>
        
        <div>
          <a href="https://www.ethichub.com/es/terminos-y-condiciones?hsLang=es" className="politic-links">Terms and Conditions</a>
        </div>
      </div>
        
        
        </div>

      
    
  );
};
 export default Footer;