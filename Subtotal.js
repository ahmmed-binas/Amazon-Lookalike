import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './Stateprovider';
import { useNavigate } from 'react-router-dom';


function Subtotal() {
  const [{ basket }] = useStateValue();

  const navigate=useNavigate();

  const handleProceedToCheckout = () => {
    navigate('/Payment'); 
  };

  const totalPrice = basket.reduce((total, item) => total + Number(item.price), 0);

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
           <span className='subtotal-title'>  Subtotal</span> ({basket.length} items): <strong>{value}</strong>
            </p>
          </>
        )}
        decimalScale={2}
        value={totalPrice}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <button className='checkout-button'   onClick={handleProceedToCheckout} >Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
