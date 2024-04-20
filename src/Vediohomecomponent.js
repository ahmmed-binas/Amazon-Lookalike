import React, { useEffect, useRef } from 'react';
import vid1 from './Media/vedio/Fake Watch Ad by Seb.webm';
import './Vediohomecomponent.css';
import { useStateValue } from './Stateprovider';
import { actionTypes } from './Reducer';

function VideoHomeComponent({ title, img, price, rating, description }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    console.log('Adding item to basket:', { title, img, price, rating, description });
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

  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    video.play();
    const playAgain = () => {
      video.play();
    };
    video.addEventListener('ended', playAgain);
    return () => {
      video.removeEventListener('ended', playAgain);
    };
  }, []);

  return (
<>   
    <div className="video-container">
        <video ref={videoRef} controls autoPlay loop muted>
            <source src={vid1} type="video/mp4"></source>
            Your browser does not support the video tag.
        </video>
        <div className="video-component-right">
            <div className='video-component-info'>
                <p className='video-component-title'>{title}</p>
                <div className='element-description'>
                    <p>Description: {description}</p>
                    <p className='element-brand'>Brand</p>
                    <p className='Model'></p>
                    <p className='Year'></p>
                    <p className='element-limited'>Limited Edition</p>
                    <p className='video-component-price'>
                        <small>$</small>
                        <strong>{price}</strong>
                    </p>
                </div>
                <button className='video-component-button' onClick={addToBasket}>Add to Basket</button>
            </div>
        </div>
    </div>
</>

  );
}

export default VideoHomeComponent;
