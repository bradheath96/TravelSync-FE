import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { createItinerary, joinItinerary } from "../../axios";

export default function HomepageSearchBar({
  isHidden,
  isJoin,
  setItineraryUpdates,
}) {
  const [input, setInput] = useState("");
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setInput("");
    setMessage("");
  }, [isHidden]);

  function handleJoinSubmit(event) {
    event.preventDefault();
    joinItinerary(currentUser.uid, input)
      .then((data) => {
        console.log(data);
        setMessage("You've successfully joined the itinerary!");
        setItineraryUpdates(true);
        setError(false);
      })
      .catch((response) => {
        if (response.msg === "Request failed with status code 404") {
          setMessage("Invalid Itinerary Code!");
          setError(true);
        }
      });
  }

  function handleCreateSubmit(event) {
    event.preventDefault();
    createItinerary(currentInput).then((itinerary) => {
      joinItinerary(userLoggedIn.id, itinerary.join_code).then((response) => {
        setItineraryUpdates(true);
      });
    });
    setCurrentInput("");
    setItineraryButton(false);
  }

  return (
    <div
      className="homeSearchContainer"
      style={isHidden ? { display: "none" } : { display: "flex" }}
    >
      <p>{message}</p>
      <form
        onSubmit={isJoin ? handleJoinSubmit : handleCreateSubmit}
        className="homeSearchBar"
      >
        <label htmlFor="CreateAndJoin">
          {isJoin ? "Join Code" : "Itinerary Name"}
        </label>{" "}
        <input
          placeholder={isJoin ? "Join Code" : "Itinerary Name"}
          type="text"
          name="CreateAndJoin"
          id="CreateAndJoin"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button className="styled-button">Join</button>
      </form>
    </div>
  );
}
