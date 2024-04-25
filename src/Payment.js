import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useStateValue } from './Stateprovider';
import axios from './Axios';
import './Payment.css';

function Payment() {
  const [{ basket }, dispatch] = useStateValue();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const totalPrice = basket.reduce((total, item) => total + Number(item.price), 0);

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios({
          method: 'post',
          url: `/payments/create?total=${totalPrice * 100}`
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        setError(error.message);
      }
    };

    getClientSecret();
  }, [basket, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      setSucceeded(true);
      setError(null);
      setProcessing(false);
      navigate('/Order');
      dispatch({
        type: 'EMPTY_BASKET'
      });
    } catch (error) {
      setError(error.message);
      setSucceeded(false);
      setProcessing(false);
    }
  };

  const handleChange = event => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className='payment'>
      <div className='payment-container'>
        <h1 className='payment-title'>✨Checkout✨(<Link to="/checkout">{basket.length} items</Link>)</h1>

        <div className='payment-section-address'>
          <h3>Delivery Address</h3>
          <form onSubmit={handleSubmit}>
            <div className='payment-address'>
              <label>Street Address:</label>
              <input
                type='text'
                name='streetAddress'
                className='street-input'
                required
              />
              <label>City:</label>
              <input
                type='text'
                name='city'
                className='city-input'
                required
              />
              <label>Postal Code:</label>
              <input
                type='text'
                name='postalCode'
                className='postal-input'
                required
              />
            </div>
          </form>
        </div>

        <div className='payment-section-payment'>
          <h3>Payment Methods</h3>
          <div className='payment-details'>
            <CardElement onChange={handleChange} />
          </div>
          <div className='payment-price'>
            <CurrencyFormat
              renderText={(value) => (
                <strong>{value}</strong>
              )}
              decimalScale={2}
              value={totalPrice}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
            <br/>
            <br/>
            <button className='payment-submit-button' disabled={processing || disabled || !!error}>
              <span>{processing ? 'Processing' : 'Buy Now'}</span>
            </button>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
