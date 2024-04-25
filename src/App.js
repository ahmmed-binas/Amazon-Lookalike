import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase'; 
import { useStateValue } from './Stateprovider';
import Payment from './Payment';
import Order from './order';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

export const stripePromise = loadStripe('pk_test_51OgbKmKYBpYnIFJVArvsqU1gjTAbXqJBVY7rWAOKnd1s17RpBFn8yCxNxyssvLEj6Z7q24HaMGNPQZgHkvwRlxYT00r3DzN9pO');

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      console.log('the user is >>>', authUser);

      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    });


    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <div className="content-wrapper">
          <Routes>
            <Route path="/checkout" element={<><Header /><Checkout /></>} />
            <Route path="/" element={<><Header /><Home /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/Order" element={<Order/>} />
            <Route path='/payment' element={<><Header /><Elements stripe={stripePromise}><Payment /></Elements></>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
