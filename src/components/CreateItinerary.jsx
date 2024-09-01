import { useState, useContext } from "react";
import { createItinerary, joinItinerary } from "../axios/index";
import { UserContext } from "./UserContextProvider";

export default function CreateItinerary({ setItineraryUpdates }) {
  const [currentInput, setCurrentInput] = useState("");
  const [itineraryButton, setItineraryButton] = useState(false);
  const { userLoggedIn } = useContext(UserContext);

  const handleOnClick = () => {
    setItineraryButton(!itineraryButton);
  };

  const handleChange = (event) => {
    setCurrentInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createItinerary(currentInput).then((itinerary) => {
      joinItinerary(userLoggedIn.id, itinerary.join_code).then((response) => {
        setItineraryUpdates(true);
      });
    });
    setCurrentInput("");
    setItineraryButton(false);
  };

  return (
    <div>
      <button onClick={handleOnClick} className="styled-button">
        Create Itinerary
      </button>
      {itineraryButton && (
        <form>
          <label htmlFor="ItineraryName">Itinerary Name: </label>
          <input
            type="text"
            id="ItineraryName"
            name="ItineraryName"
            onChange={handleChange}
            value={currentInput}
          />
          <button onClick={handleSubmit} className="styled-button">
            Confirm
          </button>
        </form>
      )}
    </div>
  );
}
