import React from 'react';
import './MiddleProduct.css';
import { truncateTitle } from './Product';
import { useStateValue } from './Stateprovider';
import { actionTypes } from './Reducer';



function MiddleProduct({ title, img, price, rating }) {

  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    console.log('Adding item to basket:', { title, img, price, rating });
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: {
        title,
        img,
        price,
        rating
      },
    });
  };

  return (
    <div className="middle-product">
      <div className='middle-product-title1'><h1>THE DEAL TIME IS HERE</h1></div>
      <div className='middle-product-info'>
        <div className="middle-product-img-container">
          <img className="middle-product-img" src={img} alt="Middle Product Item" />
        </div>
        <p className='middle-product-title'>{title}</p>
        <p className='middle-product-price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='middle-product-rating'>
          {Array(rating).fill().map((_, i) => (<p key={i}>⭐</p>))}
        </div>
        <button className='middle-product-button' onClick={addToBasket}>Add to Basket</button>
      </div>
    </div>
  );
}

export default MiddleProduct;
