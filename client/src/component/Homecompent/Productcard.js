import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import images from "../Photos/image 1.png"; // Import Lip Gloss image
import R from "../Photos/rings.png"; // Add lip product image 2
import { Button } from "reactstrap";

// Define products
const products = [
  {
    id: 1,
    name: "luxury jewelry set",
    price: "50 OMR",
    description: "Designed to shine with every move",
    image: images,
    link: "/products",
  },
  {
    id: 2,
    name: "Eternal Glow Ring",
    price: "5 OMR",
    description: "Perfect for everyday wear and special occasions",
    image: R,
    link: "/rings",
  },
];

// ProductCard component for displaying each product
const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} className="product-image" />
    <h3 className="product-name">{product.name}</h3>
    <p className="product-price">{product.price}</p>
    <p className="product-description">{product.description}</p>

    {/* Use Link instead of Button for navigation to product page */}
    <Link to={product.link}>
      <Button color="dark" outline>
        Buy
      </Button>
    </Link>
  </div>
);

// ProductsSection component for displaying all products
const ProductsSection = () => (
  <section className="products-section">
    <h2 className="display-6">Our Products</h2>
    <div className="products-grid">
      {/* Map through the products and display each ProductCard */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);

export default ProductsSection;
