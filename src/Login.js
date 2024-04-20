import React, { useState } from 'react';
import './Login.css';
import Logo from './Media/Amazon_logo.png';
import { Link } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebase'; // Make sure to import signInWithEmailAndPassword
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password) 
      .then((userCredential) => {
        var user = userCredential.user;
        console.log("User signed in:", user);
        if (user) {
          navigate('/'); 
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Error:", errorCode, errorMessage);
      });
  };
  const register = (e) => {
    e.preventDefault();
    console.log("Register button clicked"); 

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log("User registered:", user);
        if (user) { 
          console.log("Navigating to home page..."); 
          navigate('/');
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Error:", errorCode, errorMessage);
        if (errorCode === 'auth/email-already-in-use') {
          alert('This email address is already registered. Please sign in instead.');
 
        }
      });
  };

  return (
    <div className="Login">
      <Link to="/">
        <img src={Logo} alt="Amazon Logo" />
      </Link>
      <div className="Login-container">
        <h1 className="Login-signin">Sign In</h1>
        <form className="Login-form">
          <h5 className="Login-email">Email or mobile phone number</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="Login-emailinput"
          />
          <h5 className="Login-password">Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="Login-passwordinput"
          />
        </form>
        <button type="submit" className="Login-button" onClick={signIn}>
          Continue
        </button>
        <p className="Login-policy">
          By continuing, you agree to Amazon's{' '}
          <span className="Login-agreement">Conditions of Use</span> and{' '}
          <span className="Login-agreement">Privacy Notice</span>.
        </p>
        <div className="help-section">
          <div className="arrow-right"></div>
          <span className="Needhelp">Need help?</span>
        </div>
        <div className="line"></div>
        <p className="second-line">
          Buying for work? <br />
          <a href="#" className="link">
            Shop on Amazon Business
          </a>
        </p>
      </div>
      <br />
      <div className="createacc">
        <div className="line2"></div>
        <div className="new-to-amazon">New to Amazon?</div>
        <div className="line3"></div>
      </div>
      <button className="Login-createacc" onClick={register}>
        Create your Amazon Account
      </button>
    </div>
  );
}

export default Login;
