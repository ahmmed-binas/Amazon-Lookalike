import React from 'react';
import './Product.css';
import { useStateValue } from './Stateprovider';
import { actionTypes } from './Reducer';

export function truncateTitle(title, maxLength) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '...';
  }
  return title;
}

function Product({ id, title, img, price, rating, instock, description, category }) {
  const truncatedTitle = truncateTitle(title, 18);
  const [{ basket }, dispatch] = useStateValue();

  

  const addToBasket = () => {
    console.log('Adding item to basket:', { id, title, price, rating, img, instock, description, category });
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: {
        id: id,
        title: title,
        price: price,
        rating: rating,
        img: img,
        instock: instock,
        description: description,
        category: category
      },
    });
  };

  return (
    <div className="product">
      <div className='product-info'>
        <div className="product-img-container">
          <img className="product-img" src={img} alt="Product Item" />
        </div>
        <p className='product-title'>{truncatedTitle}</p>
        <p className='product-price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='product-rating'>
          {Array(rating).fill().map((_, i) => (<p key={i}>⭐</p>))}
        </div>
        <button className='product-button' onClick={addToBasket}>Add to Basket</button>
      </div>
    </div>
    
  );
}

export default Product;
