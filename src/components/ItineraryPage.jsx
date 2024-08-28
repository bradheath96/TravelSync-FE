import React from "react";
import ItineraryList from "./ItineraryList";
import HomeHeader from "./HomeHeader";
import { useParams } from "react-router-dom";
import ReturnToMap from "./ReturnToMap";

export default function Itinerary_Page() {
  const { itinerary_id } = useParams();
  return (
    <div>
      <HomeHeader />
      <ItineraryList itinerary_id={itinerary_id} />
      <ReturnToMap />
    </div>
  );
}
