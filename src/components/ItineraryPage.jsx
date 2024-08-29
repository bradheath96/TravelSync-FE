import React from "react";
import ItineraryList from "./ItineraryList";
import HomeHeader from "./HomeHeader";
import ReturnToMap from "./ReturnToMap";
import { useContext } from "react";
import { GroupItineraryContext } from "./ItineraryContextProvider";
import fileImage from "../assets/files.png";
import { useNavigate } from "react-router-dom";

export default function Itinerary_Page() {
  const { currentItineraryTitle } = useContext(GroupItineraryContext);
  const navigate = useNavigate();
  function handleFilesPageClick() {
    navigate("/files_page");
  }
  return (
    <div className="itineraryPage">
      <HomeHeader />
      <h1 className="itineraryTitle">{currentItineraryTitle}</h1>
      <ItineraryList />
      <div className="bottomNav">
        <ReturnToMap />
        <button className="goToFilesButton" onClick={handleFilesPageClick}>
          <img src={fileImage} alt="go to files button" />
        </button>
      </div>
    </div>
  );
}
