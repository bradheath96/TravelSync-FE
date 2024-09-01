import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ItineraryContext } from "./ItineraryContextProvider";
import homeIcon from "../assets/homeIcon.png";
export default function HomeButton() {
  const { setCurrentItinerary } = useContext(ItineraryContext);

  const navigate = useNavigate();
  function handleHomeClick() {
    setCurrentItinerary(null);
    navigate("/");
  }
  return (
    <button className="bottomNavButton topNavButton" onClick={handleHomeClick}>
      <img src={homeIcon} alt="" />
      <p className="topNavText">Home</p>
    </button>
  );
}
