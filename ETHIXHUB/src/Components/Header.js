import React from 'react'
import './Header.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';


 const Header = () => {
  const [currentPage, setCurrentPage] = useState(''); // Estado para mantener la página actual
   const handlePageChange = (page) => {
    setCurrentPage(page);
  };
   return (
    <div className='header-container'>
      <div className='logo-container'>
        <Link to="http://localhost:3000/">
          <img src="logo.png" alt="Logo" style={{width:'250px'}}/>
        </Link>
      </div>
      <div className='navbar'>
        <ul>
          
            <Link to="/Ethix" onClick={() => handlePageChange('Ethix')}>
            <li className={currentPage === 'Ethix' ? 'active' : ''}>Ethix</li>
            </Link>
          
          
            <Link to= "/Stake" onClick={() => handlePageChange('Stake')}>
            <li className={currentPage === 'Stake' ? 'active' : ''}>Stake</li>
            </Link>
          
          
            <Link to="/Bonds" onClick={() => handlePageChange('Bonds')}>
            <li className={currentPage === 'Bonds' ? 'active' : ''}>Bonds</li>
            </Link>
          
        </ul>
      </div>
    </div>
  );
};
 export default Header;
 
 