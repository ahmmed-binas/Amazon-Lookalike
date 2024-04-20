import React, { useState, useEffect } from 'react';
import './Home.css'; 
import HomeImage from "./Media/home-image1.png";
import HomeImage1 from "./Media/homepaper2.jpg";
import HomeImage2 from "./Media/homepaper3.jpg";
import HomeImage3 from "./Media/homepaper4.jpg";
import HomeImage4 from "./Media/homepaper5.jpg";
import Product from './Product';
import MiddleProduct from './MiddleProduct';
import ProductGuidesSection from './ProductGuidesSection';
import Item1 from './Media/item1.jpg';
import Item2 from './Media/item2.jpg';
import Item3 from './Media/item3.jpg';
import Vediohomecomponent from './Vediohomecomponent';
import { Flipper, Flipped } from 'react-flip-toolkit';
import shuffle from 'lodash.shuffle';

const products = [
  { id: '12833', title: "P Sports are the epitome of athleticism and endurance, showcasing the dedication and passion of athletes worldwide. With cutting-edge technology and innovative designs, P Sports revolutionizes the sports industry, offering top-notch equipment for every sport imaginable.", img: Item2, price: '100.99', rating: 1 },
  { id: '00999', title: "tal Sports provide athletes with the tools they need to excel in their chosen discipline. From precision-engineered gear to high-performance apparel, tal Sports empowers individuals to push their limits and achieve greatness on and off the field.", img: Item2, price: '100.99', rating: 2 },
  { id: '12830', title: "PALADA Menorts is synonymous with quality and reliability, catering to the needs of modern-day sports enthusiasts. Whether you're a beginner or a seasoned pro, PALADA Menorts has everything you need to elevate your game and reach new heights of performance.", img: Item2, price: '100.99', rating: 3 },
  { id: '13999', title: "Digital Sports brings innovation to the forefront of the sports industry, merging technology with athleticism to create groundbreaking experiences. From virtual reality training to smart equipment, Digital Sports redefines what it means to train and compete in the digital age.", img: Item2, price: '100.99', rating: 4 },
  { id: '12890', title: "Sports enthusiasts rejoice with a wide range of gear and accessories from Sports Unlimited. Whether you're into team sports, outdoor adventures, or fitness training, Sports Unlimited has everything you need to pursue your passion and unleash your full potential.", img: Item2, price: '100.99', rating: 5 },
];

function Home() {
  const [displayedProducts, setDisplayedProducts] = useState(shuffle(products).slice(0, 3));
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((currentImage + 1) % 5);
    }, 8000);       
    return () => clearInterval(timer);
  }, [currentImage]);

  const images = [HomeImage1, HomeImage2, HomeImage3, HomeImage4, HomeImage];

  const handleLeftArrowClick = () => {
    setDisplayedProducts(shuffle(products).slice(0, 3));
  };

  const handleRightArrowClick = () => {
    setDisplayedProducts(shuffle(products).slice(0, 3));
  };

  return (
    <div className='home'>
      <div className='home-container'>
        <img className="home-image" src={images[currentImage]} alt="Home" />
        <div className='home-row'>
          <Product Id='120' title='Mens Black Watches Minimalist Watches Minimalist Watches Minimalist Watches Minimalist Unisex Dress with Leather Band' img={Item1} price='889.99' rating={4} />
          <Product Id='130' title="PALADA Men's Digital Sports Watch Waterproof Tactical Watch with LED Backlight Watch for Men" img={Item2} price='100.99' rating={3} />
          <Product Id='130' title="PALADA Men's Digital Sports Watch Waterproof Tactical Watch with LED Backlight Watch for Men" img={Item2} price='100.99' rating={3} />
        </div>
        <Flipper flipKey={displayedProducts.map(product => product.id).join('')}>
            
          <div className='home-row'>
            {displayedProducts.map((product) => (
              <Flipped key={product.id} flipId={product.id}>
                <div className="product-wrapper">
                  <Product title={product.title} img={product.img} price={product.price} rating={product.rating} />
                </div>
              </Flipped>
            ))}
          </div>
        </Flipper>
        <div className='home-row'>
          <button className="scroll-arrow left-arrow" onClick={handleLeftArrowClick}>&#8249;</button>
          <button className="scroll-arrow right-arrow" onClick={handleRightArrowClick}>&#8250;</button>
        </div>
        <div className='home-row-middle'>
          <MiddleProduct id='190' title="MSI Stealth 17 Studio 17.3 Gaming Laptop: 13th Gen Intel Core i9, RTX 4080, 32GB DDR5 " img={Item3} price='100.99' rating={5} />
        </div>
        <div className='vediohomecomponent'>
          <Vediohomecomponent description="Discover elegance and precision with our exquisite timepiece. Crafted with meticulous attention to detail, this watch boasts timeless sophistication and superior functionality, making it the perfect accessory for any occasion." id='198' title="MSI Stealth 17 Studio 17.3 Gaming Laptop: 13th Gen Intel Core i9, RTX 4080, 32GB DDR5 " price='100.99' rating={5} />
        </div>
        <ProductGuidesSection/>
      </div>
    </div>
  );
}

export default Home;
