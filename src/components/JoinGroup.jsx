import React from "react";
import { useState } from "react";
import { joinGroups } from "../utils/axios";

export default function JoinGroup({userLoggedIn}) {
  const [joinGroupForm, setJoinGroupForm] = useState(false);

  const [groupCodeInput, setGroupCodeInput] = useState("");

  const [message, setMessage] = useState(false);

  function handleClick() {
    setJoinGroupForm(!joinGroupForm);
  }

  function handleChange(event) {
    setMessage(false)
    setGroupCodeInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    joinGroups(userLoggedIn.id, groupCodeInput)
    .then((group) => {
      setGroupCodeInput("")
      setMessage("You've successfully joined the group!");
      setError(false)
    })
    .catch(() => {
      setGroupCodeInput("")
      setMessage("Invalid Group Code");
      setError(true)
    })
  }

  return (
    <>
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
          <button>Join</button>
          {message && <p>{message}</p>}
        </form>
      )}
    </>
  );
}
