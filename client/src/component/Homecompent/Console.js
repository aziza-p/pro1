import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import c1 from "../Photos/c11.jpg"; // Image 1
const items = [
  {
    src: c1,
    altText:
      "Discover luxury jewelry crafted to celebrate your beauty with timeless elegance and radiant brilliance.",
    caption: "Bariq Jewelry — Shine Beyond Ordinary",
    key: 1,
    className: "c-img",
  },
  {
    src: c1,
    altText:
      "Each piece at Bariq Jewelry is crafted with premium quality and artistic precision, delivering timeless elegance that enhances every moment.",
    caption: "Brilliance crafted to last",
    key: 2,
    className: "c-img",
  },
  {
    src: c1,
    altText:
      "roudly crafted with Omani excellence, every piece from Bariq Jewelry radiates luxury and celebrates beauty in its purest form.",

    caption: "Timeless beauty, endless shine",
    key: 3,
    className: "c-img",
  },
];

function Console(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  // Map each item to a CarouselItem
  const slides = items.map((item) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={item.key} // Use the key to make it unique
    >
      <img src={item.src} alt={item.altText} className={item.className} />
      <CarouselCaption
        captionText={item.altText}
        captionHeader={item.caption}
      />
    </CarouselItem>
  ));

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default Console;
