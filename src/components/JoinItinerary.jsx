import React, { useState } from "react";
import { joinItinerary } from "../axios/index"; // Updated import to use joinItinerary

export default function JoinItinerary({ userLoggedIn }) {
  const [joinItineraryForm, setJoinItineraryForm] = useState(false);

  const [itineraryCodeInput, setItineraryCodeInput] = useState("");

  const [message, setMessage] = useState("");

  const [error, setError] = useState(null);

  function handleClick() {
    setJoinItineraryForm(!joinItineraryForm);
  }

  function handleChange(event) {
    setMessage("");
    setItineraryCodeInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    joinItinerary(userLoggedIn.id, itineraryCodeInput)
      .then((data) => {
        console.log(data);
        setMessage("You've successfully joined the itinerary!");
        setError(false);
      })
      .catch((response) => {
        if (response.msg === "Request failed with status code 404") {
          setMessage("Invalid Itinerary Code!");
          setError(true);
        }
      });
  }

  return (
    <div>
      <button onClick={handleClick} className="styled-button">
        Join Itinerary
      </button>
      {joinItineraryForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="ItineraryCode">Itinerary Code:</label>{" "}
          <input
            type="text"
            id="ItineraryCode"
            name="ItineraryCode"
            onChange={handleChange}
          />
          <button className="styled-button">Join</button>
          {error === true && <p>{message}</p>}
          {error === false && <p>{message}</p>}
        </form>
      )}
    </div>
  );
}
