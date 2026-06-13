import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Checkoutsteps from "./Checkoutsteps";
import { createOrder } from "../actions/Orderactions";
import { ORDER_CREATE_RESET } from "../constant/Orderconstant";
import setBodyColor from "./setBodyColor";
import { getBackendImageUrl } from '../utils/imageUrl'
function Placeorderscreen(props) {
  setBodyColor({ color: `${props.color}` });
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  cart.shippingPrice = Number(cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2);

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  useEffect(() => {
    if (success) {
      navigate(`/orders/${order.id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, navigate, dispatch]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div style={{ paddingTop: "10%" }}>
      <Checkoutsteps
        step1={"hi"}
        step2={"hi"}
        step3={"hi"}
        color={props.color}
      />
      <Row>
        <Col md={8}>
          <ListGroup
            variant="flush"
            style={{
              border: `2px solid ${
                props.color === "black" ? "white" : "black"
              }`,
            }}
          >
            <ListGroup.Item style={{ backgroundColor: `${props.color}` }}>
              <h2
                style={{
                  color: `${props.color === "black" ? "white" : "black"}`,
                  userSelect: "none",
                }}
              >
                Delivery Address
              </h2>

              <p
                style={{
                  color: `${props.color === "black" ? "white" : "black"}`,
                  userSelect: "none",
                }}
              >
                {cart.shippingAddress.street}, {cart.shippingAddress.city}
                {"  "}
                {cart.shippingAddress.state},{"  "}
                {cart.shippingAddress.postalCode}
              </p>
              {order?.isReceived && (
                <p
                  style={{
                    color: props.color === "black" ? "white" : "black",
                    userSelect: "none",
                  }}
                >
                  ✅ Order Received on{" "}
                  {new Date(order?.receivedAt).toLocaleDateString()}
                </p>
              )}

              {order?.isOutForDelivery && (
                <p
                  style={{
                    color: props.color === "black" ? "white" : "black",
                    userSelect: "none",
                  }}
                >
                  🛵 Out for delivery since{" "}
                  {new Date(order.outForDeliveryInMinutes).toLocaleDateString()}
                </p>
              )}

              {order?.isOutForDelivery && order?.outForDeliveryInMinutes && (
                <p
                  style={{
                    color: props.color === "black" ? "white" : "black",
                    userSelect: "none",
                  }}
                >
                  🛵 Estimated to be out for delivery in{" "}
                  {order.outForDeliveryInMinutes} minutes
                </p>
              )}

              {order?.isDelivered && (
                <p
                  style={{
                    color: props.color === "black" ? "white" : "black",
                    userSelect: "none",
                  }}
                >
                  ✅ Delivered on{" "}
                  {new Date(order.deliveredAt).toLocaleDateString()}
                </p>
              )}
            </ListGroup.Item>

            <ListGroup.Item style={{ backgroundColor: `${props.color}` }}>
              <h2
                style={{
                  color: `${props.color === "black" ? "white" : "black"}`,
                  userSelect: "none",
                }}
              >
                Payment
              </h2>
              <p
                style={{
                  color: `${props.color === "black" ? "white" : "black"}`,
                  userSelect: "none",
                }}
              >
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item style={{ backgroundColor: `${props.color}` }}>
              <h2
                style={{
                  color: `${props.color === "black" ? "white" : "black"}`,
                  userSelect: "none",
                }}
              >
                Order Items
              </h2>
              {cart.cartItems.length === 0 ? (
                <Message
                  variant="info"
                  style={{
                    color: `${props.color === "black" ? "white" : "black"}`,
                    userSelect: "none",
                  }}
                >
                  Your cart is empty
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{ backgroundColor: `${props.color}` }}
                    >
                      <Row>
                        <Col md={1}>
                          <Image
                            src={getBackendImageUrl(item.image)}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col
                          style={{
                            color: `${
                              props.color === "black" ? "white" : "black"
                            }`,
                            userSelect: "none",
                          }}
                        >
                          {item.name}
                        </Col>

                        <Col
                          md={4}
                          style={{
                            color: `${
                              props.color === "black" ? "white" : "black"
                            }`,
                            userSelect: "none",
                          }}
                        >
                          {item.quantity} X ₹{item.price} = ₹
                          {(item.quantity * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup
              variant="flush"
              style={{
                border: `2px solid ${
                  props.color === "black" ? "white" : "black"
                }`,
              }}
            >
              <ListGroup.Item style={{ backgroundColor: `${props.color}` }}>
                <h2
                  style={{
                    color: `${props.color === "black" ? "white" : "black"}`,
                    userSelect: "none",
                  }}
                >
                  Order Summary
                </h2>
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: `${props.color}` }}>
                <Row
                  style={{
                    color: `${props.color === "black" ? "white" : "black"}`,
                  }}
                >
                  <Col style={{ userSelect: "none" }}>SubTotal:</Col>
                  <Col style={{ userSelect: "none" }}>₹{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: `${props.color}` }}>
                <Row
                  style={{
                    color: `${props.color === "black" ? "white" : "black"}`,
                  }}
                >
                  <Col style={{ userSelect: "none" }}>Shipping:</Col>
                  <Col style={{ userSelect: "none" }}>
                    ₹{cart.shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: `${props.color}` }}>
                <Row
                  style={{
                    color: `${props.color === "black" ? "white" : "black"}`,
                  }}
                >
                  <Col style={{ userSelect: "none" }}>Tax:</Col>
                  <Col style={{ userSelect: "none" }}>₹{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: `${props.color}` }}>
                <Row>
                  <Col>
                    <h2
                      style={{
                        userSelect: "none",
                        color: `${props.color === "black" ? "white" : "black"}`,
                      }}
                    >
                      <b>Total:</b>
                    </h2>
                  </Col>
                  <Col>
                    <h2
                      style={{
                        userSelect: "none",
                        color: `${props.color === "black" ? "white" : "black"}`,
                      }}
                    >
                      <b>₹{cart.totalPrice}</b>
                    </h2>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: `${props.color}` }}>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: `${props.color}` }}>
                <Button
                  type="button"
                  className="btn-block btn-warning"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Placeorderscreen;
