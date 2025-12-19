import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
  FaPhoneAlt,
  FaInstagram,
  FaSnapchat,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logoImage from "../component/Photos/logo.png"; // Path to your logo image

const Footer = () => {
  return (
    <footer className="footer py-4">
      <Container>
        <Row>
          {/* Left Section: Logo and About Info */}
          <Col md={4} className="text-left">
            <img
              src={logoImage}
              alt="Bariq Jewelry Logo"
              className="footer-logo mb-3"
              style={{ width: "150px" }}
            />
            <p className="footer-text">
              Bariq Jewelry is an Omani brand crafting high-quality jewelry that
              blends timeless elegance with meticulous care.
            </p>
          </Col>

          {/* Center Section: Contact Info (Align Left) */}
          <Col md={4} className="text-left">
            <h6 className="footer-heading">Contact Information</h6>
            <p className="footer-text">
              <FaMapMarkerAlt /> <strong>Store Location:</strong> Salalah, Oman
            </p>
            <p className="footer-text">
              <FaPhoneAlt />{" "}
              <a href="tel:+96898262330" className="text-white">
                98262330
              </a>
            </p>
            <p className="footer-text">
              <FaEnvelope />{" "}
              <a href="mailto:halazabnoot123" className="text-white">
                BariqJewelry
              </a>
            </p>
          </Col>

          {/* Right Section: Social Media */}
          <Col md={4} className="text-left">
            <h6 className="footer-heading">Social Media</h6>
            <ul className="list-unstyled">
              <li className="footer-text">
                <FaInstagram />{" "}
                <a
                  href="https://www.instagram.com/bariq_jewelry1"
                  target="_blank"
                  className="text-white"
                >
                  Instagram
                </a>
              </li>
              <li className="footer-text">
                <FaSnapchat />{" "}
                <a
                  href="https://www.snapchat.com/add/tfg74"
                  target="_blank"
                  className="text-white"
                >
                  Snapchat
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Divider and Copyright */}
        <hr className="my-4" style={{ borderColor: "#fff" }} />
        <Row>
          <Col className="text-center">
            <p className="footer-text mb-0">
              &copy; 2025 Bariq Jewelry. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
