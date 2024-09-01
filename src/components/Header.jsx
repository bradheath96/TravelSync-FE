import React from "react";
import { useContext } from "react";
import { ItineraryContext } from "./ItineraryContextProvider";

export default function () {
  const { currentItinerary } = useContext(ItineraryContext);

  return (
    <div className="joinHeader">
      <p>Join Code: {currentItinerary.join_code}</p>
    </div>
  );
}
