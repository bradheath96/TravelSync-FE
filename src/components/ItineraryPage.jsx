import React from "react";
import ItineraryList from "./ItineraryList";
import HomeHeader from "./HomeHeader";
import ReturnToMap from "./ReturnToMap";
import { useContext } from "react";
import { GroupItineraryContext } from "./ItineraryContextProvider";

export default function Itinerary_Page() {
  const { currentGroup, currentItineraryTitle } = useContext(
    GroupItineraryContext
  );
  return (
    <div className="itineraryPage">
      <HomeHeader />
      <h1 className="itineraryTitle">{currentItineraryTitle}</h1>
      <ItineraryList />
      <ReturnToMap />
    </div>
  );
}
