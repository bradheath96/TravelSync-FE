import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { getUserItineraries } from "../axios/index";
import { useNavigate } from "react-router-dom";
import { ItineraryContext } from "./ItineraryContextProvider";

export default function UserItinerariesList({
  itineraryUpdates,
  setItineraryUpdates,
}) {
  const { userLoggedIn } = useContext(UserContext);
  const { setCurrentItinerary } = useContext(ItineraryContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userItineraries, setUserItineraries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getUserItineraries(userLoggedIn.id)
      .then((itineraries) => {
        setIsLoading(false);
        setUserItineraries(itineraries);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
    setItineraryUpdates(false);
  }, [itineraryUpdates]);

  function handleEnterItinerary(itinerary) {
    setCurrentItinerary(itinerary);
    navigate(`/itinerary_page`);
  }

  return isError ? (
    "error"
  ) : isLoading ? (
    "itineraries loading..."
  ) : (
    <div>
      <ul>
        {userItineraries.map((itinerary) => (
          <li key={itinerary.id}>
            <button
              className="styled-button userItineraryButton"
              onClick={() => handleEnterItinerary(itinerary)}
            >
              <p>{itinerary.name}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
