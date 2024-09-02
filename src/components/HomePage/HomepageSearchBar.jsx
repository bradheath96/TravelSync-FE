import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { createItinerary, joinItinerary } from "../../axios";

export default function HomepageSearchBar({
  isHidden,
  isJoin,
  setItineraryUpdates,
  setIsHidden,
}) {
  const [input, setInput] = useState("");
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setInput("");
    setMessage("");
  }, [isHidden, isJoin]);

  function handleJoinSubmit(event) {
    event.preventDefault();
    joinItinerary(currentUser.uid, input)
      .then((data) => {
        console.log(data);
        setItineraryUpdates(true);
        setInput("");
        setIsHidden(true);
        setError(false);
      })
      .catch((response) => {
        if (response.status === 404) {
          setMessage("Invalid Itinerary Code!");
        }
      });
  }

  function handleCreateSubmit(event) {
    event.preventDefault();
    createItinerary(input).then((itinerary) => {
      joinItinerary(currentUser.uid, itinerary.join_code).then((response) => {
        setItineraryUpdates(true);
        setInput("");
        setIsHidden(true);
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
