import React from "react";
import ItineraryList from "./ItineraryList";
import HomeHeader from "./Header";
import { useContext } from "react";
import { ItineraryContext } from "./ItineraryContextProvider";
import BottomNav from "./BottomNav";
import TopNav from "./topNav";

export default function Itinerary_Page() {
  const { currentItinerary } = useContext(ItineraryContext);

  return (
    <div className="itineraryPageContainer">
      <TopNav />
      <div className="itineraryPage">
        <HomeHeader />
        <h1 className="itineraryTitle">{currentItinerary.name}</h1>
        <ItineraryList />
      </div>
      <BottomNav />
    </div>
  );
}
