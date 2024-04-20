import React from 'react';
import './Header.css';
import ShoppingCartImage from "./Media/shopping-cart-logo1.jpg";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from './Stateprovider';
import { auth } from './firebase';
// Remove import statement for signOut from './firebase';

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const userName = user ? user.email.split('@')[0] : '';

  const handleAuthentication = () => {
    if (user) {
      auth.signOut(); 
    }
  };

  return (
    <div className='header'>
      <Link to="/">
        <img className='header-logo' src={ShoppingCartImage} alt="Shopping Cart" />
      </Link>
      <div className='header-search'>
        <input />
        <SearchIcon className='header-searchicon'/>
      </div>
      <div className='header-nav'></div>
      <Link to='/Login' >
        <div onClick={handleAuthentication} className='header-option'> 
          <span className='header-option-one'>Hello {user ? userName : 'User'}</span> {/* Display user email if logged in */}
          <span className='header-option-one'>{user ? 'Sign Out' : 'Sign In'}</span> {/* Corrected sign in/out text */}
        </div>
      </Link>

      <div className='header-option'>
        <span className='header-option-two'>Returns</span> {/* Corrected spelling */}
        <span className='header-option-two'>& Orders</span>
      </div>

      <div className='header-option'>
        <span className='header-option-three'>Your</span>
        <span className='header-option-three'>Prime</span>
      </div>
     
      <Link to='/checkout'>
        <div className='header-optionbasket'>
          <span className='header-basketcount'>{basket?.length}</span>
          <ShoppingCartIcon/>
        </div>
      </Link>
    </div>
  );
}

export default Header;
