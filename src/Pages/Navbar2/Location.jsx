import React, { useState } from "react";

export default function LocationTracker() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState("");
  const [showLocation, setShowLocation] = useState(false); 

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setShowLocation(true); 
        setError(""); 
      },
      (err) => {
        console.error("Error fetching location:", err.message);
        setError("Unable to fetch location. Please allow location access.");
      }
    );
  };

  return (
    <div style={{ padding: "5px" }}>
      <button onClick={fetchLocation} style={{ marginRight: "5px" }}>
        Get My Location
      </button>

      {showLocation && (
        <div style={{ display: "flex",flexDirection:"column",gap:"5px", marginLeft: "5px" }}>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
