import React from "react";
import itineraryImage from "../assets/ItineraryIcon.png";
import { useNavigate } from "react-router-dom";
export default function GoToItineraryButton() {
  const navigate = useNavigate();
  function handleGoToItineraryPageClick() {
    navigate("/itinerary_page");
  }
  return (
    <button
      className="goToItineraryButton bottomNavButton"
      onClick={handleGoToItineraryPageClick}
    >
      <img src={itineraryImage} alt="go to itinerary button" />
    </button>
  );
}
