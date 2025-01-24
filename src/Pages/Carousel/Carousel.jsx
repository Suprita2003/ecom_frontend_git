import React, { useState, useEffect } from 'react';
import './Carousel.css';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Carousel = () => {
  const slides = [
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Consumables/X-GL/Feb5/PC_Hero_1_3000._CB582457311_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/IMG24/Smart_Watches/MED_MAY/Tall_Hero_1500X600_BAU_NewLaunches._CB554931622_.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/uber_new_high._CB537689643_.jpg',
  ];

  const saleEndTime = new Date().getTime() + 10000; // Sale ends in 10 seconds
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(saleEndTime - new Date().getTime());
  const totalSlides = slides.length;

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(saleEndTime - new Date().getTime());
      if (timeLeft <= 0) {
        clearInterval(timerInterval); 
      }
    }, 1000);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000); 

    return () => {
      clearInterval(timerInterval); 
      clearInterval(slideInterval); 
    };
  }, [timeLeft, totalSlides]);

  const formatTime = (time) => {
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="carousel-container">
      <button className="carousel-arrow left" onClick={goToPreviousSlide}><MdOutlineKeyboardArrowLeft />
      </button>

      <div className="carousel">
        <img 
          src={slides[currentSlide]} 
          alt={`Sale ${currentSlide + 1}`} 
        />
      </div>

      {/* <div className="sale-timer">
        <h3>Sale Ending In: {formatTime(timeLeft)}</h3>
      </div> */}

      <button className="carousel-arrow right" onClick={goToNextSlide}><MdOutlineKeyboardArrowRight /></button>
    </div>
  );
};

export default Carousel;
