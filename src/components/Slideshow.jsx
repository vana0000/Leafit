import React, { useState, useEffect, useRef } from 'react';

const images = [
  "https://via.placeholder.com/700x400.png?text=Image+1",
  "https://via.placeholder.com/700x400.png?text=Image+2",
  "https://via.placeholder.com/700x400.png?text=Image+3"
];
const delay = 2500;

function Slideshow() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1)),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow w-full overflow-hidden">
      <div
        className="slideshowSlider flex transition-transform ease-in-out duration-1000"
        style={{ transform: `translateX(${-index * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div className="slide flex-shrink-0 w-full" key={idx}>
            <img src={src} alt={`Slide ${idx + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>

      <div className="slideshowDots flex justify-center mt-4">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot w-3 h-3 mx-1 rounded-full bg-gray-400 cursor-pointer ${index === idx ? 'bg-[#5fbf00]' : ''}`}
            onClick={() => setIndex(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slideshow;
