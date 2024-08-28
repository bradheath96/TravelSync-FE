import React from "react";
import ItineraryList from "./ItineraryList";
import HomeHeader from "./HomeHeader";
import ReturnToMap from "./ReturnToMap";
import { useContext } from "react";
import { GroupItineraryContext } from "./ItineraryContextProvider";
import fileImage from "../assets/files.png";

export default function Itinerary_Page() {
  const { currentItineraryTitle } = useContext(GroupItineraryContext);
  return (
    <div className="itineraryPage">
      <HomeHeader />
      <h1 className="itineraryTitle">{currentItineraryTitle}</h1>
      <ItineraryList />
      <div className="bottomNav">
        <ReturnToMap />
        <button className="goToFilesButton">
          <img src={fileImage} alt="go to files button" />
        </button>
      </div>
    </div>
  );
}
