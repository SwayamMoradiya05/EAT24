/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Hotelmenu.css'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom';
import { listRestaurantsDetail } from '../actions/Restaurantactions'
import { addtocart } from '../actions/Cartactions'
import { getBackendImageUrl } from '../utils/imageUrl';
import Loader from './Loader';
import Message from './Message';
import setBodyColor from './setBodyColor'
function Hotelmenu(props) {
    const dispatch=useDispatch();
    const restaurantdetail=useSelector(state=>state.restaurantDetail)
    const {error,loading,restaurant}=restaurantdetail
    const {id}  = useParams();
   
     const [k,setk] = useState(props.obj)
    const[e,sete]=useState(true)
  useEffect(()=>{
   dispatch(listRestaurantsDetail(id,""))
  },[dispatch])
    const obj=[{'name':'No Item Found','img':'http://127.0.0.1:8000/images/pictures/no-item.jpg'}]
  
    

    function addtocarthandler(rid,mid,qty)
    {   
        dispatch(addtocart(rid,mid,qty))
        toast.success("ADDED TO CART.",{autoClose:2000})
    }
    setBodyColor({color:`${props.color}`})
    console.log('Restaurant data:', restaurant);
    return (
        <>
{loading?<Loader/>:error?<Message>{error}</Message>:<>
<div className={`bg-${props.color==='black'?'dark':'black'} row container-fluid`} id="div1">
                <div className="col-lg-4" id="div3">
                     {restaurant?.path ? (
                         <img src={getBackendImageUrl(restaurant.path)} onError={(e) => {console.log('Image failed to load:', e.target.src); e.target.style.display = 'none';}} className="img-thumbnail mx-auto d-block" style={{ border: "2px solid black",height:"165px",width:"264px"}} alt="Restaurant" />
                     ) : (
                         <div style={{ border: "2px solid black", height: "165px", width: "264px", backgroundColor: "#ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>No Image</div>
                     )}
                </div>
                <div className="col-lg-4 text-white p-4" style={{userSelect:'none'}}>
                    <h1 className="text-white colortry font-weight-bold" style={{fontSize:'xsmall'}}>{restaurant?.name}</h1>
                    <h6 className="text-white colortry">{restaurant?.description}</h6>
                    <br />
                    <div className="row">
                        <div className="col-4"><button disabled="" className="btn btn-success btn-sm text-white colortry"><svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill"
                            viewBox="0 0 16 16">
                            <path
                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                            </path>
                        </svg> {restaurant?.rating}</button></div>
                        <div className="col-3 text-white" style={{ fontSize: "small" }}>
                            <p className="colortry text-white">{restaurant?.time} MINS</p>
                        </div>
                        <div className="col-5 text-white" style={{ fontSize: "small" }}>
                            <p className="colortry text-white">₹{restaurant?.price}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 text-white p-4" style={{userSelect:'none'}}>
                    <fieldset className="border p-2 borderblack">
                        <legend className="text-warning w-auto colortry font-weight-bold">OFFER</legend>
                        <p className="colortry text-white"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                            fill="orange" height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 512 512"
                            xmlSpace="preserve">
                            <g>
                                <g>
                                    <path
                                        d="M177.595,155.193c-12.349,0-22.402,10.053-22.402,22.402c0,12.349,10.053,22.402,22.402,22.402    c12.349,0,22.402-10.053,22.402-22.402C199.996,165.246,189.944,155.193,177.595,155.193z" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M334.406,312.005c-12.349,0-22.402,10.053-22.402,22.402c0,12.349,10.053,22.402,22.402,22.402    c12.349,0,22.402-10.053,22.402-22.402C356.808,322.057,346.755,312.005,334.406,312.005z" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M491.153,256.001c13.617-14.953,19.283-35.681,14.427-56.967c-4.857-21.275-18.956-37.507-37.715-45.065    c5.786-19.383,1.882-40.516-11.726-57.579c-13.597-17.053-33.384-25.541-53.521-24.24c-3.205-19.962-15.883-37.321-35.539-46.794    c-19.645-9.451-41.128-8.575-58.749,1.389C296.79,10.151,277.833,0.011,256.011,0c-21.833,0-40.8,10.14-52.34,26.744    c-17.621-9.964-39.104-10.84-58.75-1.389c-19.656,9.473-32.333,26.832-35.539,46.794c-20.138-1.324-39.914,7.175-53.521,24.24    c-13.607,17.064-17.513,38.207-11.726,57.579c-18.759,7.57-32.859,23.791-37.715,45.065s0.81,42.014,14.428,56.966    C7.23,270.953,1.564,291.681,6.42,312.967c4.857,21.275,18.956,37.507,37.715,45.065c-5.786,19.383-1.882,40.516,11.726,57.579    c13.597,17.053,33.394,25.508,53.521,24.24c3.205,19.962,15.883,37.321,35.539,46.794c19.656,9.461,41.14,8.575,58.75-1.389    C215.212,501.86,234.178,512,256.012,512c21.821-0.011,40.778-10.151,52.318-26.744c17.611,9.954,39.093,10.84,58.75,1.389    c19.656-9.473,32.333-26.832,35.539-46.794c20.116,1.247,39.914-7.186,53.521-24.24c13.607-17.063,17.513-38.207,11.726-57.579    c18.759-7.57,32.859-23.791,37.715-45.065C510.438,291.692,504.771,270.953,491.153,256.001z M121.591,177.595    c0-30.878,25.126-56.004,56.004-56.004c30.878,0,56.004,25.126,56.004,56.004c0,30.878-25.126,56.004-56.004,56.004    C146.716,233.599,121.591,208.473,121.591,177.595z M189.473,346.285c-3.282,3.282-7.581,4.923-11.878,4.923    c-4.298,0-8.598-1.641-11.878-4.923c-6.563-6.563-6.563-17.195,0-23.758l156.812-156.812c6.563-6.563,17.195-6.563,23.758,0    c6.563,6.563,6.563,17.196,0,23.758L189.473,346.285z M334.406,390.411c-30.878,0-56.004-25.126-56.004-56.004    s25.126-56.004,56.004-56.004s56.004,25.126,56.004,56.004S365.285,390.411,334.406,390.411z" />
                                </g>
                            </g>
                        </svg> FREE DELIEVERY</p>
                        <p className="colortry text-white"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                            fill="orange" height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 512 512"
                            xmlSpace="preserve">
                            <g>
                                <g>
                                    <path
                                        d="M177.595,155.193c-12.349,0-22.402,10.053-22.402,22.402c0,12.349,10.053,22.402,22.402,22.402    c12.349,0,22.402-10.053,22.402-22.402C199.996,165.246,189.944,155.193,177.595,155.193z" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M334.406,312.005c-12.349,0-22.402,10.053-22.402,22.402c0,12.349,10.053,22.402,22.402,22.402    c12.349,0,22.402-10.053,22.402-22.402C356.808,322.057,346.755,312.005,334.406,312.005z" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path
                                        d="M491.153,256.001c13.617-14.953,19.283-35.681,14.427-56.967c-4.857-21.275-18.956-37.507-37.715-45.065    c5.786-19.383,1.882-40.516-11.726-57.579c-13.597-17.053-33.384-25.541-53.521-24.24c-3.205-19.962-15.883-37.321-35.539-46.794    c-19.645-9.451-41.128-8.575-58.749,1.389C296.79,10.151,277.833,0.011,256.011,0c-21.833,0-40.8,10.14-52.34,26.744    c-17.621-9.964-39.104-10.84-58.75-1.389c-19.656,9.473-32.333,26.832-35.539,46.794c-20.138-1.324-39.914,7.175-53.521,24.24    c-13.607,17.064-17.513,38.207-11.726,57.579c-18.759,7.57-32.859,23.791-37.715,45.065s0.81,42.014,14.428,56.966    C7.23,270.953,1.564,291.681,6.42,312.967c4.857,21.275,18.956,37.507,37.715,45.065c-5.786,19.383-1.882,40.516,11.726,57.579    c13.597,17.053,33.394,25.508,53.521,24.24c3.205,19.962,15.883,37.321,35.539,46.794c19.656,9.461,41.14,8.575,58.75-1.389    C215.212,501.86,234.178,512,256.012,512c21.821-0.011,40.778-10.151,52.318-26.744c17.611,9.954,39.093,10.84,58.75,1.389    c19.656-9.473,32.333-26.832,35.539-46.794c20.116,1.247,39.914-7.186,53.521-24.24c13.607-17.063,17.513-38.207,11.726-57.579    c18.759-7.57,32.859-23.791,37.715-45.065C510.438,291.692,504.771,270.953,491.153,256.001z M121.591,177.595    c0-30.878,25.126-56.004,56.004-56.004c30.878,0,56.004,25.126,56.004,56.004c0,30.878-25.126,56.004-56.004,56.004    C146.716,233.599,121.591,208.473,121.591,177.595z M189.473,346.285c-3.282,3.282-7.581,4.923-11.878,4.923    c-4.298,0-8.598-1.641-11.878-4.923c-6.563-6.563-6.563-17.195,0-23.758l156.812-156.812c6.563-6.563,17.195-6.563,23.758,0    c6.563,6.563,6.563,17.196,0,23.758L189.473,346.285z M334.406,390.411c-30.878,0-56.004-25.126-56.004-56.004    s25.126-56.004,56.004-56.004s56.004,25.126,56.004,56.004S365.285,390.411,334.406,390.411z" />
                                </g>
                            </g>
                        </svg> 20% off up to ₹120 | Use FEDERALCC Above ₹249</p>
                    </fieldset>

                </div>
            </div>
            <div className="divtoppicks"  style={{ zIndex: "-1", paddingTop: "23%",color:`${props.color==='black'?'white':"black"}`}}>
                {/* Second Col Start  */}
                <div className='row'><div className="col-lg-7"><h3 style={{ color: `${props.color==='black'?'orange':"orange"}`,userSelect:'none' }} className="pr-5" align='center'>Top Picks
                </h3></div>
                <Link to="/cart"><ToastContainer className="toastcontainer" style={{width:"300px",height:"8px"}}/></Link>
                
            <div className='col-lg-3 pt-1'>
            <form className="d-flex" role="search" autocomplete="off" autoCapitalize="Link-zA-Z0-9">
                <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search" style={{width:"50%",height:"80%"}} onChange={(e)=>{dispatch(listRestaurantsDetail(id,e.target.value))}}
            />
                <button className="btn btn-outline-warning" style={{height:"32px"}}><svg xmlns="http://www.w3.org/2000/svg" style={{paddingBottom:"6",width:"15px"}} 
                    fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg></button>
              </form>
            </div></div>
            <div className="row justify-content-center">
                
                {restaurant.content && restaurant.content.map((m, idx) => {
                return (<><div key={idx} className="col-lg-7 text-left" style={{userSelect:'none'}} >
                    <div data-target="#navbar-example3" data-offset="0">

                    </div>
                    <hr style={{border:`1px solid ${props.color==='black'?'white':'black'}`}}/>
                    <div>
                        <div className="row text-left container">
                            <div className="col-6">
                                {/* <b>Bestseller</b> */}
                                <h4>{m.name}</h4>
                                {e && <div>₹{m.price}</div>}<br/>
                                <div>{m.description}</div>
                                
                                { <button onClick={()=>{addtocarthandler(`${m.restaurant}`,`${m.id}`,`${m.quantity}`)}} className={`btn btn-${props.color==='black'?'warning':'warning'} add-to-cart`}>Add to Cart</button>
                            }</div>
                            <div className="col-6 text-right p-4"><img className="imgsize"
                                src={getBackendImageUrl(m.img)}
                                style={{ borderRadius: "15px" }} width="45%" alt="" /></div>
                        </div>
                    </div>
                </div></>)
            })}
        </div>
        </div>

            {/* Second Col End */ }
</>}

        </>
    )
}

export default Hotelmenu;