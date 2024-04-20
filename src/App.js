import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { auth, onAuthStateChanged } from './firebase';
import { useStateValue } from './Stateprovider';
import Payment from './Payment';

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

    // Clean up the subscription when the component unmounts
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
            <Route path='/payment' element={<Payment/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
