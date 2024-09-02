import React from "react";
import googleMaps from "../../assets/google-maps-icon.png";

function OpenInGoogleMapsButton({ placeName, lat, lng }) {
  const handleOpenInGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      placeName || `${lat},${lng}`
    )}`;

    window.open(googleMapsUrl, "_blank");
  };

  return (
    <button
      onClick={handleOpenInGoogleMaps}
      className="styled-button googleMapButton"
    >
      <img src={googleMaps} alt="google-maps-icon" />
      <p>Open in Google Maps</p>
    </button>
  );
}

export default OpenInGoogleMapsButton;
