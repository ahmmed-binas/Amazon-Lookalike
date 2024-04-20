import React, { useState, useEffect } from 'react';
import './Basketproducts.css';
import { useStateValue } from './Stateprovider';

function Basketproducts({ id, instock, title, img, price, rating }) {
  const [quantity, setQuantity] = useState(1);
  const [{ basket }, dispatch] = useStateValue();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleDeleteFromBasket = () => {
    setIsRemoving(true);
  };

  const handleTransitionEnd = () => {
    if (isRemoving) {
      dispatch({
        type: 'REMOVE_FROM_BASKET',
        id: id,
      });
    }
  };

  useEffect(() => {
    if (isRemoving) {
      const timer = setTimeout(() => {
        setIsRemoving(false);
      }, 400); 
      return () => clearTimeout(timer);
    }
  }, [isRemoving]);

  return (
    <div
      className={`basket-product ${isRemoving ? 'removing' : ''}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <img className="basket-product-img" src={img} alt="Product Item" />
      <div className='basket-product-info'>
        <p className='basket-product-title'>{title}</p>
        <p className='instock' style={{ color: instock ? 'green' : 'red' }}>{instock ? 'In stock' : 'Out of stock'}</p>
        <p className='basket-product-price'>
          <strong>${price}</strong>
        </p>
        <div className="quantity-selector">
          <input
            type="number"
            value={quantity}
            min={1}
            max={100}
            onChange={(event) => setQuantity(parseInt(event.target.value))}
            className="quantity-input"
          />
          <span className="separator">|</span>
          <span className="remove-one" onClick={handleDeleteFromBasket}>Delete</span>
          <span className="separator">|</span>
          <span className="save-for-later">Save for Later</span>
          <span className="separator">|</span>
        </div>
      </div>
    </div>
  );
}

export default Basketproducts;
