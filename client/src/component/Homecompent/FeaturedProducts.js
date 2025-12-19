// VisionCards.js
import React from "react";
import { FaBullseye, FaGlobe, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";
import "./VisionComponent.css";

const VisionCards = () => {
  return (
    <motion.div
      className="vision-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <br />
      <br />
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className="section-title">Our Commitment to Lasting Luxury</h3>
      </motion.div>
      <div className="cards-container">
        {[
          {
            icon: <FaBullseye />,
            title: "Our Goal",
            text: "To Delivering jewelry that reflects precision, luxury, and beauty",
          },
          {
            icon: <FaGlobe />,
            title: "Our Vision",
            text: "To empower every woman with jewelry that reflects her unique beauty and inspires confidence in every moment",
          },
          {
            icon: <FaRocket />,
            title: "Our Mission",
            text: "To bring timeless elegance and unmatched craftsmanship to jewelry that lets every woman shine in her own way.",
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            className="card2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
          >
            <div className="card-icon">{card.icon}</div>
            <h4>{card.title}</h4>
            <p style={{ color: "#fff" }}>{card.text}</p>
          </motion.div>
        ))}
      </div>
      <br />
      <br />
    </motion.div>
  );
};

export default VisionCards;
