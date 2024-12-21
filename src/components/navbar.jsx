import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-around', 
      alignItems: 'center', 
      padding: '10px', 
      backgroundColor: ' rgb(104, 138, 104)', 
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' ,
      
       
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Home</Link>
      <Link to="/Product" style={{ textDecoration: 'none', color: 'black' }}>Product</Link>
      <Link to="/Addproduct" style={{ textDecoration: 'none', color: 'black' }}>Add Product</Link>
      <Link to="/Login" style={{ textDecoration: 'none', color: 'black' }}>Login</Link>
    </div>
  );
}

export default Navbar;
