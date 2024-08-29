import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GroupItineraryContext } from "./ItineraryContextProvider";

export default function () {
  const navigate = useNavigate();
  const { currentGroup } = useContext(GroupItineraryContext);

  function handleHomeClick() {
    localStorage.setItem("currentItineraryId", null);
    localStorage.setItem("currentGroup", null);
    localStorage.setItem("currentItineraryTitle", null);

    navigate("/");
  }
  return (
    <div className="homeHeader">
      <p>Join Code: {currentGroup.join_code}</p>
      <button
        className="styled-button HomeHeaderButton"
        onClick={handleHomeClick}
      >
        Home
      </button>
    </div>
  );
}
