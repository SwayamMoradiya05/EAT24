import emailjs from "emailjs-com";
import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import Messageorderscreen from "./Messageorderscreen";
import Loader from "./Loader";
import { getOrderDetails, payOrder } from "../actions/Orderactions";
import { ORDER_PAY_RESET } from "../constant/Orderconstant";
import setBodyColor from "./setBodyColor";
import { getBackendImageUrl } from '../utils/imageUrl'
import {
  markOrderAsReceived,
  markOrderAsDelivered,
  markOrderAsOutForDelivery,
} from "../actions/Orderactions";

function Orderscreen(props) {
  setBodyColor({ color: `${props.color}` });
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const [remainingSeconds, setRemainingSeconds] = useState(
    order?.outForDeliveryInMinutes * 60
  );

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const cart = useSelector((state) => state.cart);
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  }

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AeQzDaDpSUQ2XmLeb-RGRt0x21Ysa2ZUM9LddIJOX1SMZKQOiN6ugx2jGmTFDiw0PaBCEtecC_Zd3zg9";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  {
    userInfo && userInfo.isAdmin && !order?.isReceived && (
      <Button
        className="btn btn-success my-2"
        onClick={() => dispatch(markOrderAsReceived(order._id))}
      >
        ✅ Mark as Received
      </Button>
    );
  }

  {
    userInfo && userInfo.isAdmin && !order?.isOutForDelivery && (
      <Button onClick={() => dispatch(markOrderAsOutForDelivery(order._id))}>
        Mark as Out for Delivery
      </Button>
    );
  }

  {
    userInfo && userInfo.isAdmin && order?.isReceived && !order?.isDelivered && (
      <Button
        className="btn btn-info my-2"
        onClick={() => dispatch(markOrderAsDelivered(order._id))}
      >
        📦 Mark as Delivered
      </Button>
    );
  }

  let subjectcontent = `HI ${order?.user.name.toUpperCase()} YOUR ORDER IS SUCCESSFULLY PLACED!!`;
  let messagecontent = "";
  messagecontent += "YOUR ORDER DETAILS:" + "\n";
  const sendmessage = async () => {
    order &&
      order.orderItems.map((i) => {
        messagecontent = messagecontent + i.name.toString() + "\n";

        return messagecontent;
      });
  };
  sendmessage();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!order || successPay || order.id !== parseInt(id)) {
      dispatch({ type: ORDER_PAY_RESET });

      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    messagecontent += "TOTAL PRICE: ₹" + order?.totalPrice + "\n";
    setToEmail(order?.user.email);
    setSubject(subjectcontent);
    setMessage(messagecontent);
  }, [dispatch, order, id, successPay, navigate, userInfo]);

  useEffect(() => {
    if (order?.isOutForDelivery && order?.outForDeliveryInMinutes) {
      const totalSeconds = order.outForDeliveryInMinutes * 60;
      setRemainingSeconds(totalSeconds);
  
      const interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [order]);

  const serviceId = "service_kq6lmog";
  const templateId = "template_rdbps0e";
  const userId = "ymzK1ppAZ5y8KoLpp";
  const emailParams = {
    to_email: toEmail,
    subject: subject,
    message: message,
    to_name: `${order?.user.name}`,
  };
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
    emailjs
      .send(serviceId, templateId, emailParams, userId)
      .then((response) => {
        console.log("Email sent successfully:", response);
        messagecontent = "";
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });
    setMessage("");
    setSubject("");
    setToEmail("");
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Messageorderscreen var="danger" message={error}></Messageorderscreen>
  ) : (
    <div style={{ paddingTop: "5%" }}>
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
                <strong>Name: </strong> {order.user.name}
              </p>
              <p
                style={{
                  color: `${props.color === "black" ? "white" : "black"}`,
                  userSelect: "none",
                }}
              >
                <strong>Email: </strong>
                {order.user.email}
              </p>
              <p
                style={{
                  color: `${props.color === "black" ? "white" : "black"}`,
                  userSelect: "none",
                }}
              >
                <strong>Shipping: </strong>
                {cart.shippingAddress.street}, {order.shippingAddress.city}
                {"  "}
                {order.shippingAddress.state},{"  "}
                {order.shippingAddress.postalCode}
              </p>
              {/* {order?.isReceived && (
  <p
    style={{
      color: props.color === "black" ? "white" : "black",
      userSelect: "none",
    }}
  >
    <span style={{ color: "green", fontWeight: "bold" }}>
      ✅ Order Received on{" "}
    </span>
    {new Date(order.receivedAt).toLocaleDateString()}
  </p>
)} */}

              {/* {order?.isReceived && (
  <p
  style={{
    color: "green",
    fontWeight: "bold",
    userSelect: "none",
    margin: 0,
    backgroundColor: "#32cd32", // light red background
    padding: "5px 10px", // optional padding for better look
    borderRadius: "5px", // optional rounded corners
  }}
>
    ✅ Order Received on{" "}
    {order.receivedAt
      .toString()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("-")}
  </p>
)} */}
              {order.isReceived ? (
                <Messageorderscreen
                  var="success"
                  message={"Order Received and Preparing on"}
                  delivered={order.receivedAt
                    .toString()
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("-")}
                ></Messageorderscreen>
              ) : (
                <Messageorderscreen
                  var="danger"
                  message={"Order Received Soon : "}
                ></Messageorderscreen>
              )}

{order.isDelivered ? (
  <Messageorderscreen
    var="success"
    message={"Delivered on"}
    delivered={order.deliveredAt
      .toString()
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("-")}
  ></Messageorderscreen>
) : (
  <>
    <Messageorderscreen
      var="danger"
      message={"Not Delivered"}
    ></Messageorderscreen>

    {/* Show progress bar and bike animation if order is out for delivery */}
    {order.isOutForDelivery && order.outForDeliveryInMinutes && (
      <div
        style={{
          position: "relative",
          padding: "10px",
          marginBottom: "15px",
        }}
      >
        <Messageorderscreen
          var="success"
          message={`Order is Out for Delivery - ETA: ${minutes}m ${seconds}s`}
        />

        {/* Progress Bar with Bike */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "30px",
            backgroundColor: "#eee",
            borderRadius: "20px",
            overflow: "hidden",
            marginTop: "10px",
          }}
        >
          {/* Fill */}
<div
  style={{
    height: "100%",
    backgroundColor: "green",
    width: "0%",
    animation: `fillBar ${order.outForDeliveryInMinutes * 60}s linear forwards`,
  }}
/>

{/* Bike */}
<div
  style={{
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "0",
    fontSize: "24px",
    animation: `moveBike ${order.outForDeliveryInMinutes * 60}s linear forwards`,
  }}
>
  <img
    src="/Bike.png"
    alt="Bike"
    height="30px"
    width="30px"
    style={{
      objectFit: "cover",
      borderRadius: "50%",
    }}
  />
</div>

        </div>

        {/* Inline keyframes */}
        <style>
          {`
            @keyframes fillBar {
              from { width: 0%; }
              to { width: 100%; }
            }

            @keyframes moveBike {
              from { left: 0%; }
              to { left: 95%; }
            }
          `}
        </style>
      </div>
    )}
  </>
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
                {order.paymentMethod}
              </p> 

              {order.isPaid ? (
                <Messageorderscreen
                  var="success"
                  message={"Paid on "}
                  paid={order.paidAt
                    .toString()
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("-")}
                ></Messageorderscreen>
              ) : (
                <Messageorderscreen
                  var="danger"
                  message={"Not Paid"}
                ></Messageorderscreen>
              )}
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
              {order.orderItems.length === 0 ? (
                <Messageorderscreen
                  var="info"
                  message={"Order is empty"}
                ></Messageorderscreen>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{ backgroundColor: `${props.color}` }}
                    >
                      <Row
                        style={{
                          color: `${
                            props.color === "black" ? "white" : "black"
                          }`,
                        }}
                      >
                        <Col md={1}>
                          <Image src={getBackendImageUrl(item.img)} alt={item.name} fluid rounded />
                        </Col>

                        <Col style={{ userSelect: "none" }}>{item.name}</Col>

                        <Col md={4} style={{ userSelect: "none" }}>
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
                  <Col style={{ userSelect: "none" }}>Items:</Col>
                  <Col style={{ userSelect: "none" }}>₹{order.itemsPrice}</Col>
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
                    ₹{order.shippingPrice}
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
                  <Col style={{ userSelect: "none" }}>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item style={{ backgroundColor: `${props.color}` }}>
                <Row
                  style={{
                    color: `${props.color === "black" ? "white" : "black"}`,
                  }}
                >
                  <Col style={{ userSelect: "none" }}>Total:</Col>
                  <Col style={{ userSelect: "none" }}>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item style={{ backgroundColor: `${props.color}` }}>
                  {loadingPay && <Loader />}

                  {!sdkReady ? (
                    <Loader />
                  ) : order.orderItems.length === 0 ? (
                    ""
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Orderscreen;
