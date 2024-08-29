import React from "react";
import { useState } from "react";
import { joinGroup } from "../utils/axios";

export default function JoinGroup({ userLoggedIn }) {
  const [joinGroupForm, setJoinGroupForm] = useState(false);

  const [groupCodeInput, setGroupCodeInput] = useState("");

  const [message, setMessage] = useState("");

  const [error, setError] = useState(null);

  function handleClick() {
    setJoinGroupForm(!joinGroupForm);
  }

  function handleChange(event) {
    setMessage("");
    setGroupCodeInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    joinGroup(userLoggedIn.id, groupCodeInput)
      .then((response) => {
        console.log("from then block");
        setGroupUpdates(true);
        setMessage("You've successfully joined the group!");
        setError(false);
      })
      .catch((response) => {
        if (response.msg === "Request failed with status code 404") {
          setMessage("Invalid Group Code!");
          setError(true);
        }
      });
  }

  return (
    <div className="joinGroupContainer">
      <button onClick={handleClick} className="styled-button">
        Join Group
      </button>
      {joinGroupForm && (
        <form onSubmit={handleSubmit}>
          <label htmlFor="GroupCode">Group Code:</label>
          <input
            type="text"
            id="GroupCode"
            name="GroupCode"
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
