import React from "react";
import {useState,useEffect} from 'react';
import loc from './img/loc.png'

export default function Map(){
  const [lat,setlat]=useState(null)
  const [long,setlong]=useState(null)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setlat(latitude)
      setlong(longitude)
    });
  });

  return (
    <div style={{backgroundColor:"white"}}>
      <div style={{ paddingLeft:"2%",paddingTop:"2%", width: '350px',height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {long ? (
          <div>
            <img src={loc} alt="location" style={{width: '50px', height: '50px'}} />
            <p style={{marginTop: '10px', textAlign: 'center'}}>Latitude: {lat?.toFixed(4)}<br/>Longitude: {long?.toFixed(4)}</p>
          </div>
        ) : (
          <p>Getting your location...</p>
        )}
      </div>
    </div>
  );
}