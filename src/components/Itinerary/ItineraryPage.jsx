import React from "react";
import ItineraryList from "./ItineraryList";
import HomeHeader from "../General/Header";
import { useContext } from "react";
import { ItineraryContext } from "../Context/ItineraryContextProvider";
import BottomNav from "../NavBar/BottomNav";
import TopNav from "../NavBar/TopNav";

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
