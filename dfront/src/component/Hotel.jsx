import React, { useEffect, useState } from 'react'
import './Hotel.css'
import setBodyColor from './setBodyColor'
import {Link, json} from "react-router-dom";
import { getBackendImageUrl } from '../utils/imageUrl';
import Carosuel from './Carosuel';
import '../App.css'
import Loader from './Loader';
import Message from './Message';

const Hotel = (props) => {
  let w=props.obj
  const[k1,setk]=useState(w)
  useEffect(()=>{
    setk(w)
  },[w])
  function price() {
    let newp = w.sort((a, b) => (a.price > b.price) ? 1 : (a.price < b.price) ? -1 : 0)
    setk([...newp]);
  }
  function priceh() {
    let newp1 = w.sort((a, b) => (a.price < b.price) ? 1 : (a.price > b.price) ? -1 : 0)
    setk([...newp1]);
  }
  
  function ratingh() {
    let newk1 = w.sort((a, b) => (a.rating < b.rating) ? 1 : (a.rating > b.rating) ? -1 : 0)
    setk([...newk1]);
  }
  function time() {
    let newt = w.sort((a, b) => (a.time > b.time) ? 1 : (a.time < b.time) ? -1 : 0)
    setk([...newt]);
  }
  setBodyColor({color:`${props.color}`})
  return (<>{props.loading?<Loader/>:props.error?<Message>{props.error}</Message>:<>
  <Carosuel color={props.color}></Carosuel> 
      <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid row">
      <a className="navbar-brand font-weight-bold pl-5 col-md-9 id1" style={{color:`${props.color==='black'?'orange':'black'}`,userSelect:'none'}}>{props.len} Restaurants</a>
      <div className="pl-5 dropdown col-md-2">
                    <button className={`btn btn-outline-${props.color==='black'?'warning':'dark'} dropdown-toggle dropdown profiledropdow`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                    </svg> Filter</button><div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" onClick={price} >Price:Low To High</a>
                        <a className="dropdown-item" onClick={priceh} >Price:High To Low</a>
                        <a className="dropdown-item" onClick={ratingh} >Rating:High To Low</a>
                        <a className="dropdown-item" onClick={time} >Time:Low To High</a>
                        
                    </div>
      </div>
    </div>
  </nav>
  <div className="row">
    <div className="container pt-2 pb-5">
    <div className="row">
    {k1 && k1.map((i,index)=>
        {
          console.log('Restaurant item:', {name: i.name, path: i.path, allKeys: Object.keys(i)});
          return(<React.Fragment key={index}>
        <Link className="col-lg mx-auto container justify-content-center p-3 hi " to={`/restaurant/${i.id}`} align="center" style={{textDecoration: "none",color:`${props.color==='black'?'white':'black'}`,pointerEvents:`${props.len===0?'none':""}`}}>
        <img src={getBackendImageUrl(i.path)} onError={(e) => console.log('Image load error:', e.target.src)} alt="" style={{width:'250px',height:'150px',borderRadius:'10px'}} /> 
        <h5 className="font-weight-bold pt-2">{i.name}</h5>
        <pre className="text-muted" style={{fontSize:"small"}}>{i.description}</pre>
          <div className="text-muted" style={{fontSize:"x-small"}}>{props.value && <div className="col-lg"><button  className="btn btn-success btn-sm"><svg
                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill"
                viewBox="0 0 16 16">
                <path
                  d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                </path>
              </svg>{i.rating}</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{i.time} MINS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹{i.price} FOR TWO</div>}
     

        </div>
      </Link>
      </React.Fragment>)  
        })
    }
    
         
    </div>
    </div>
    
    </div>
    
    </div>
   
    <div className="row p-5 text-white" style={{backgroundColor: "black",border:"1px solid white"}}>
   
    <div className="col-sm-3">
    
      <b>Company</b><br/><br/>
      <ul>
        <li>About us</li>
        <li>Team</li>
        <li>Career</li>
        <li>Swiggy Blog</li>
        <li>Bug Bounty</li>
        <li>Swiggy One</li>
        <li>Swiggy Corporate</li>
        <li>Swiggy Instamart</li>
        <li>Swiggy Genie</li>
      </ul>
    </div>
    <div className="col-sm-3">
      <b>Contact</b><br/><br/>
      <ul>
        <li>Help & Support</li>
        <li>Partner with us</li>
        <li>Ride with us</li>
      </ul>
    </div>
    <div className="col-sm-3">
      <b>LEGAL</b><br/><br/>
      <ul>
        <li>Terms & Conditions</li>
        <li>Refund & Cancellation</li>
        <li>Privacy Policy</li>
        <li>Cookie policy</li>
        <li>Offer terms</li>
        <li>Phishing & Fraud</li>
        <li>Corporate - Swiggy Money Codes Terms and Conditions</li>
        <li>Corporate - Swiggy Discount Voucher Terms and Conditions</li>
      </ul>
    </div>
    <div className="col-sm-3 ">
      <ul>
        <li><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/play_ip0jfp"
            className="p-3" alt="" width="50%"/></li>
        <li><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/iOS_ajgrty"
            className="p-3" alt="" width="50%"/></li>
      </ul>
    </div>
  </div></>}
      
    </>
  )
}

export default Hotel