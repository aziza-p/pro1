import React from "react";
import r1 from "../component/Photos/Image.jpeg";
import r2 from "../component/Photos/IMG_7067.jpeg";
import r3 from "../component/Photos/IMG_7074.jpeg";
import Ring from "../component/Photos/rings.png"; // Add lip product image 2
import { Button } from "reactstrap";
import "../App.css"; // استيراد CSS مخصص

const Rings = () => {
  const products = [
    { id: 1, name: "Golden Halo", price: 5, image: r1 },
    { id: 2, name: "Blossom Vine", price: 5, image: r2 },
    { id: 3, name: "Forever Yours", price: 5, image: r3 },
  ];

  return (
    <div className="liptint-container">
      {/* صورة تعريف */}
      <div className="hero-section">
        <img src={Ring} alt="Hero" className="hero-image" />
        <h1 className="hero-text">Discover Our Rings Collection</h1>
      </div>

      {/* العنوان الرئيسي */}
      <h1 className="liptint-title">Rings Collection</h1>

      {/* المنتجات */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">Price: {product.price} OMR</p>
            <Button color="dark" outline className="order-button">
              Order Now
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rings;
