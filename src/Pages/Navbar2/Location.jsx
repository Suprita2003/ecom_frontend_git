import React, { useState } from "react";
import './Location.css';

const LocationComponent = () => {
  const [location, setLocation] = useState("Bengaluru");
  const [zipcode, setZipcode] = useState("562130");

  const updateLocation = () => {
    const newLocation = prompt("Enter new location:");
    const newZipcode = prompt("Enter new zipcode:");
    if (newLocation && newZipcode) {
      setLocation(newLocation);
      setZipcode(newZipcode);
    }
  };

  return (
    <div className="location-container">
      <span className="location-text">
        Delivering to {location} {zipcode}
      </span>
      <button className="update-button" onClick={updateLocation}>
        Update location
      </button>
    </div>
  );
};

export default LocationComponent;
