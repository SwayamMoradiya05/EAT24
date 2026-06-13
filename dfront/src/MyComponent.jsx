
import { useState, useEffect } from "react";

function MyComponent() {
  const [userAddress, setUserAddress] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      // use the latitude and longitude to get the user's address
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD3GG7Qq1XgRMAcjPejT9spgnR4RZ9xzbU`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results.length > 0) {
            setUserAddress(data.results[0].formatted_address);
          }
        });
    });
  }, []);

  return <div style={{backgroundColor:"white"}}>User's address: {userAddress}</div>;
}
export default MyComponent;