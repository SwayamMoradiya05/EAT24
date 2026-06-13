import React from "react";
import brand_img from "../img/brand_img1.png";
import { Routes, Route, Link } from "react-router-dom";
import "./Navbar.css";
import { listRestaurants } from "../actions/Restaurantactions";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown} from 'react-bootstrap'
import { logout } from '../actions/Useractions'
import Home from "./Hotel";
import Offer from "../Offer";
import Help from "../Help";
import Hotelmenu from "./Hotelmenu";
import { useState, useEffect } from "react";
import Cartscreen from "./Cartscreen";
import LoginScreen from "./LoginScreen";
import Registerscreen from "./Registerscreen";
import Profilescreen from "./Profilescreen";
import Shippingscreen from "./Shippingscreen";
import Paymentscreen from "./Paymentscreen";
import Placeorderscreen from "./Placeorderscreen";
import Orderscreen from "./Orderscreen";
import Detailscreen from "./Detailscreen";

function Navbar() {
  const dispatch = useDispatch();
  const restaurantList = useSelector((state) => state.restaurantList);
  const { error, loading, restaurants = [] } = restaurantList || {};
  const userLogin=useSelector((state)=>state.userLogin)
  const{userInfo}=userLogin
  useEffect(() => {
    dispatch(listRestaurants(""));
  }, [dispatch]);
  
  
  

  const [value, setvalue] = useState(true);
  const [align, setalign] = useState("left");
  const [color, setcolor] = useState("white");
  const [colornav, setnavcolor] = useState("white");
  const [e, sete] = useState(false);
  function togglemode() {
    if (color === "black") {
      setnavcolor("light");
      setcolor("white");
    } else if (color === "white") {
      setnavcolor("dark");
      setcolor("black");
    }
  }
  function logouthandler(){
    dispatch(logout())
  }


  return (
    <>
      <nav
        className={`navbar navbar-expand-lg bg-body-tertiary fixed-top bg-${colornav} text-${
          colornav === "dark" ? "light" : "dark"
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={() => sete(true)}>
            <img
              src={brand_img}
              height="60px"
              width="60px"
              alt="brand_img"

            />
            <span
              className="font-weight-bold"
              style={{
                fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                color: `${color === "black" ? "orange" : "#6b3a1b"}`,
              }}
            >
              {" "}
              Eat24 
            </span>
          </Link>
          
            <div className="dropdown nav-link"  id="search1" style={{width:"15%",height:"80%"}}>
            <Link
              id="search2"
              to="/"
              style={{ textDecoration: "none" }}
            >
              <form
                className="d-flex"
                role="search"
                autoComplete="off"
                autoCapitalize="Link-zA-Z0-9"
              >
                <input className="form-control me-2"  type="text" placeholder="Search" aria-label="Search"  onChange={(e)=>{dispatch(listRestaurants(e.target.value))}}/>
                <button
                  className="btn btn-outline-warning"
                  style={{ height: "32px" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ paddingBottom: "4", width: "15px" }}
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </form>
              </Link>
            </div>
          
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item pl-3">
           
          </li>
              <li className="nav-item pl-3">
                <Link
                
                  className="nav-link"
                  to="/Offer"
                  style={{ color: `${color === "black" ? "white" : "black"}` ,userSelect:"none"}}
                  onClick={() => sete(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="13"
                    fill="currentColor"
                    className="bi bi-percent"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0zM4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                  </svg>
                  Offers
                </Link>
              </li>
              <li className="nav-item pl-3">
                <Link 
                  className="nav-link"
                  to="/Help"
                  style={{ color: `${color === "black" ? "white" : "black"}`,userSelect:"none" }}
                  onClick={() => sete(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-info-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>{" "}
                  Help
                </Link>
              </li>
              <li className="nav-item pl-5 pt-2 custom-control custom-switch">
                <input  
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitch1"
                  onClick={togglemode}
                />
                <label 
                  className="custom-control-label"
                  htmlFor="customSwitch1"
                  style={{ color: `${color === "black" ? "white" : "black"}`,userSelect:"none"}}
                >
                  Dark Mode
                </label>
              </li>
              <li className="nav-item pl-3">
                {userInfo?(<>
                 
                  <NavDropdown  title={<span style={{ color: `${color === "black" ? "white" : "black"}`,userSelect:"none"}}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-person-fill"
                    viewBox="0 2 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>{" "}
                    {userInfo.name}</span>} id="username">
                    <NavDropdown.Item  style={{userSelect:"none"}}>
                    <Link style={{textDecoration:"none ",color: `${color === "black" ? "black" : "black"}`}}  to="/profile" className="nav-link" data-toggle="collapse"
                    data-target="#navbarNav">Profile</Link>
                    </NavDropdown.Item>
                    
                    <NavDropdown.Item onClick={logouthandler}  style={{userSelect:"none"}}>
                      <Link to="/" className="nav-link" style={{textDecoration:"none",color: `${color === "black" ? "black" : "black"}`}}>Logout</Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                  </>):(<Link className="nav-link" to="/login" >
                <div
                  style={{
                    color: `${color === "black" ? "white" : "black"}`,userSelect:"none"
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>{" "}
                  Login
                </div>
              </Link>)}
                
              </li>

              <li className="nav-item pl-3">
                <Link 
                  className="nav-link"
                  to="/cart"
                  style={{ color: `${color === "black" ? "white" : "black"}` ,userSelect:"none"}}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill={color === "black" ? "white" : "black"}
                    className="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>{" "}
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              obj={restaurants}
              align={align}
              value={value}
              color={color}
              length={restaurants ? restaurants.length : 0}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="/Offer" element={<Offer color={color} />} />
        <Route path="/Help" element={<Help color={color} />} />
        <Route path="/restaurant/:id" element={<Hotelmenu color={color} />} obj={restaurants.content} />
        <Route path="/cart" element={<Cartscreen color={color} />} />
        <Route path="/login" element={<LoginScreen color={color} />}/>
        <Route path="/register" element={<Registerscreen color={color} />} />
        <Route path="/shipping" element={<Shippingscreen color={color} />} />
        <Route path="/profile" element={<Profilescreen color={color} />} />
        <Route path="/payment" element={<Paymentscreen color={color} />} />
        <Route path="/placeorder" element={<Placeorderscreen color={color} />} />
        <Route path="/orders/:id" element={<Orderscreen color={color}/>} />
        <Route path="/order/:id" element={<Detailscreen color={color}/>}/>
        {/* {restaurants.map((l)=>
      {
        return(<Route path={'restaurant/:id'} element={<Hotelmenu color={color} //object={l.content} name={l.name} description={l.description} 
          //</Routes>rating={l.rating} image={l.path}
          >

          </Hotelmenu>}/>)
      })}  */}
      </Routes>
    </>
  );
}

export default Navbar;
