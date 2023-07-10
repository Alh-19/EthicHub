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
        <a href="http://localhost:3000/">
          <img src="logo.png" alt="Logo" style={{width:'250px'}}/>
        </a>
      </div>
      <div className='navbar'>
        <ul>
          <li className={currentPage === 'Ethix' ? 'active' : ''}>
            <Link to="/Ethix" onClick={() => handlePageChange('Ethix')}>Ethix</Link>
          </li>
          <li className={currentPage === 'Stake' ? 'active' : ''}>
            <Link to= "/Stake" onClick={() => handlePageChange('Stake')}>Stake</Link>
          </li>
          <li className={currentPage === 'Bonds' ? 'active' : ''}>
            <Link to="/Bonds" onClick={() => handlePageChange('Bonds')}>Bonds</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
 export default Header;