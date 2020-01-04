import React, { useState } from 'react';
import Img from 'gatsby-image';

function renderDots(index, images, setIndex) {
  return <div></div>;
}

const SlideShow = ({ images }) => {
  const [index, setIndex] = useState(0);

  //Minus 1 for array offset from 0
  const length = images.length - 1;
  const handleNext = () => (index === length ? setIndex(0) : setIndex(index + 1));
  const handlePrevious = () => (index === 0 ? setIndex(length) : setIndex(index - 1));
  const image = images[index];
  console.log(index);
  console.log(image);
  return (
    <div className="slideshow__container">
      <div className="slideshow__img">
        <Img fluid={image.fluid} key={index} />
      </div>
      <div className="img_count">
        {index + 1} / {images.length}
      </div>
      <button className="arrow_previous" onClick={() => handlePrevious()}>
        <span>&#10094;</span>
      </button>
      <button className="arrow_next" onClick={() => handleNext()}>
        <span>&#10095;</span>
      </button>
      <div className="dot__container">
        {images.map((image, i) => {
          if (i === index) return <span className="dot dot_active"></span>;
          else return <span className="dot" onClick={() => setIndex(i)}></span>;
        })}
      </div>
    </div>
  );
};

//alt={node.name.replace(/-/g, " ").substring(2)}
export default SlideShow;
