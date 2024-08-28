import React from "react";
import { useState, useEffect } from "react";
import { joinGroups } from "../utils/axios";

export default function JoinGroup() {
  const [joinGroupForm, setJoinGroupForm] = useState(false);

  const [groupCodeInput, setGroupCodeInput] = useState("");

  const [successMessage, setSuccessMessage] = useState(false);

  function handleClick() {
    setJoinGroupForm(!joinGroupForm);
  }

  function handleChange(event) {
    setGroupCodeInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setGroupCodeInput("");
    joinGroups(userId, joinCode).then((group) => {
      setSuccessMessage(true);
    });
  }

  return (
    <div className="joinGroupContainer">
      <button onClick={handleClick} className="styled-button">
        Join Group
      </button>
      {joinGroupForm && (
        <form>
          <label htmlFor="GroupCode">Group Code:</label>
          <input
            type="text"
            id="GroupCode"
            name="GroupCode"
            onChange={handleChange}
          />
          <button onSubmit={handleSubmit}>Join</button>
          {successMessage && <p>You've joined the group successfully!</p>}
        </form>
      )}
    </div>
  );
}
