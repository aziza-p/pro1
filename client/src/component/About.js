import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import logoImage from "../component/Photos/logo.png"; // Add logo image path here
import lipProduct1 from "../component/Photos/c2.jpg"; // Add lip product image 1
import Rings from "../component/Photos/rings.png"; // Add lip product image 2

const About = () => {
  return (
    <div>
      {/* About Us Section */}
      <Container>
        <Row className="my-5">
          <Col xs={12} md={6}>
            <h1>About Us</h1>
            <p>
              At Bariq Jewelry, we believe that every woman deserves to shine
              with confidence. Founded with a passion for elegance and
              craftsmanship, Bariq Jewelry brings together modern design and
              premium quality to create timeless pieces that reflect
              individuality and beauty.
            </p>
            <p>
              Fartistry to ensure both luxury and comfort. From everyday
              elegance to once-in-a-lifetime moments, our jewelry is made to
              celebrate your story — one sparkle at a time. We are proud of our
              Omani identity, delivering a touch of local artistry to
              international standards of luxury. Bariq Jewelry — Your sparkle,
              your story.
            </p>
          </Col>
          <Col xs={12} md={6}>
            <img
              src={logoImage}
              alt=" Bariq Jewelry Logo"
              style={{ width: "100%", height: "auto" }}
            />
          </Col>
        </Row>

        {/* Product Showcase Section */}
        <Row>
          <Col xs={12} md={6}>
            <Card>
              <CardImg
                top
                width="100%"
                src={lipProduct1}
                alt="Lip Product 1"
                className="medium-card-img" // Custom class to make the image medium-sized
                fluid
              />
              <CardBody>
                <CardTitle tag="h5">luxury jewelry set</CardTitle>
                <CardText>
                  Elevate your elegance with this luxury jewelry set, crafted to
                  add a dazzling finishing touch to every look. Each piece is
                  designed with exquisite detail, blending timeless beauty with
                  modern sophistication making it the perfect choice for those
                  unforgettable moments.
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <Card>
              <CardImg
                top
                width="100%"
                src={Rings}
                alt="Lip Product 2"
                className="medium-card-img" // Custom class to make the image medium-sized
                fluid
              />
              <CardBody>
                <CardTitle tag="h5">Eternal Glow Ring</CardTitle>
                <CardText>
                  Discover rings designed to capture elegance in every detail.
                  Crafted with premium materials and refined artistry, each
                  piece highlights your beauty with a radiant and timeless
                  sparkle — perfect for adding confidence and grace to any
                  moment.
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
