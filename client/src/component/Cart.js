import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { deleteCartItem, getCart, checkout } from "../Features/CartSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../component/Photos/logo.png";
import {
  FaTrashAlt,
  FaShoppingBag,
  FaShoppingCart,
  FaBoxOpen,
  FaDollarSign,
} from "react-icons/fa";

const getUserKey = (user) =>
  user?._id || user?.id || user?.userId || user?.email || null;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.users.user);

  const cartItems = useMemo(() => {
    return Array.isArray(cart?.items) ? cart.items : [];
  }, [cart]);

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);
  const [isCheckoutCompleted, setIsCheckoutCompleted] = useState(false);

  const getTotalPrice = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item._id))
      .reduce(
        (total, item) =>
          total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
        0
      );
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteCartItem(itemToDelete))
      .unwrap()
      .then(() => {
        setMessage("Product has been successfully deleted from your cart.");
        setMessageType("success");
        setModalOpen(true);
      })
      .catch(() => {
        setMessage("Error during deletion. Please try again.");
        setMessageType("danger");
        setModalOpen(true);
      });

    setDeleteModalOpen(false);
  };

  const handleCheckout = () => {
    const userKey = getUserKey(user);
    if (!userKey) {
      navigate("/login");
      return;
    }

    dispatch(
      checkout({
        userOrId: userKey,
        selectedItemIds: selectedItems,
      })
    )
      .unwrap()
      .then(() => {
        setMessage("Checkout successful! Your order has been placed.");
        setMessageType("success");
        setModalOpen(true);
        setIsCheckoutCompleted(true);
      })
      .catch(() => {
        setMessage("Error during checkout. Please try again.");
        setMessageType("danger");
        setModalOpen(true);
        setIsCheckoutCompleted(false);
      });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (isCheckoutCompleted) {
      navigate("/products");
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (!user?._id) return;
    dispatch(getCart(user._id));
  }, [user, dispatch]);

  if (!cart || !Array.isArray(cart.items)) {
    return (
      <Container className="cart-container text-center py-5">
        <h1 className="display-6">
          <FaShoppingCart className="me-2" />
          Your Shopping Cart
        </h1>
        <p className="text-muted">
          Your cart is empty. Please add items to the cart.
        </p>
      </Container>
    );
  }
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <Container
        className="cart-container py-5"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Card
              className="shadow-lg rounded"
              style={{
                border: "none",
                borderRadius: "8px",
                padding: "20px",
                color: "#333",
              }}
            >
              <CardBody>
                <CardTitle
                  tag="h3"
                  className="text-center mb-4 text-uppercase"
                  style={{ fontWeight: "bold" }}
                >
                  YOUR BAG ({cartItems.length})
                </CardTitle>

                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex align-items-center justify-content-between mb-4"
                    style={{
                      borderBottom: "1px solid #ddd",
                      paddingBottom: "15px",
                      paddingTop: "15px",
                    }}
                  >
                    <div
                      className="d-flex align-items-center"
                      style={{ flex: 1 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginRight: "15px",
                          padding: "10px",
                          borderRadius: "8px",
                          border: "1px solid #ddd",
                          backgroundColor: "#f7f7f7",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item._id)}
                          onChange={() => handleSelectItem(item._id)}
                          style={{
                            width: "20px",
                            height: "20px",
                            accentColor: "#000",
                          }}
                        />
                      </div>

                      <img
                        src={item.image}
                        alt={item.desc}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>

                    <div className="d-flex flex-column flex-grow-1 ms-3">
                      <h6
                        style={{
                          fontWeight: "bold",
                          fontSize: "16px",
                          marginBottom: "5px",
                        }}
                      >
                        {item.desc}
                      </h6>

                      <CardText
                        className="text-muted mb-1"
                        style={{ fontSize: "14px" }}
                      >
                        Quantity: {item.quantity}
                      </CardText>

                      <CardText
                        className="text-muted mb-1"
                        style={{ fontSize: "14px" }}
                      >
                        Price: {Number(item.price || 0).toFixed(2)} OMR
                      </CardText>
                    </div>

                    <FaTrashAlt
                      style={{
                        fontSize: "18px",
                        color: "#e74c3c",
                        cursor: "pointer",
                        marginLeft: "10px",
                      }}
                      onClick={() => handleDelete(item._id)}
                    />
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card
              className="shadow-lg rounded"
              style={{
                border: "none",
                backgroundColor: "#333",
                color: "white",
              }}
            >
              <CardBody>
                <CardTitle
                  tag="h4"
                  className="text-center mb-4"
                  style={{ fontWeight: "bold" }}
                >
                  Order Summary
                </CardTitle>

                <div className="d-flex justify-content-between mb-2">
                  <CardText style={{ fontSize: "14px", color: "#bbb" }}>
                    <FaBoxOpen className="me-2" />
                    Total Items:
                  </CardText>
                  <CardText style={{ fontSize: "14px", color: "#bbb" }}>
                    {selectedItems.length}
                  </CardText>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <CardText style={{ fontSize: "14px", color: "#bbb" }}>
                    <FaDollarSign className="me-2" />
                    Total Price:
                  </CardText>
                  <CardText style={{ fontSize: "14px", color: "#bbb" }}>
                    {getTotalPrice().toFixed(2)} OMR
                  </CardText>
                </div>

                <Button
                  style={{
                    backgroundColor: "#555",
                    color: "white",
                    borderRadius: "8px",
                    fontSize: "16px",
                    padding: "12px 20px",
                  }}
                  size="lg"
                  className="checkout-button shadow-lg w-100"
                  onClick={handleCheckout}
                  disabled={!selectedItems.length}
                >
                  <FaShoppingBag className="me-2" /> Checkout
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* رسالة نجاح/خطأ */}
        <Modal isOpen={modalOpen} toggle={toggleModal} centered>
          <ModalHeader toggle={toggleModal}>
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "40px", marginRight: "10px" }}
            />
            Notification
          </ModalHeader>
          <ModalBody
            style={{ color: messageType === "danger" ? "#c0392b" : "#2e7d32" }}
          >
            {message}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>
              OK
            </Button>
          </ModalFooter>
        </Modal>

        {/* تأكيد حذف */}
        <Modal
          isOpen={deleteModalOpen}
          toggle={() => setDeleteModalOpen(false)}
          centered
        >
          <ModalHeader toggle={() => setDeleteModalOpen(false)}>
            Confirm Deletion
          </ModalHeader>
          <ModalBody>Are you sure you want to delete this product?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={confirmDelete}>
              <FaTrashAlt className="me-2" />
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
};
export default Cart;
