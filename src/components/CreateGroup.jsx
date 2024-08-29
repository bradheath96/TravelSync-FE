import { useState } from "react";
import { createGroup, joinGroup } from "../utils/axios";
import { useContext } from "react";
import { UserContext } from "./UserContextProvider";

function CreateGroup({ setGroupUpdates }) {
  const [currentInput, setCurrentInput] = useState("");
  const [groupButton, setGroupButton] = useState(false);
  const { userLoggedIn } = useContext(UserContext);

  const handleOnClick = (event) => {
    setGroupButton(!groupButton);
  };

  const handleChange = (event) => {
    setCurrentInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createGroup(currentInput).then((group) => {
      joinGroup(userLoggedIn.id, group.join_code).then((response) => {
        console.log(response);
        setGroupUpdates(true);
      });
    });
    setCurrentInput("");
    setGroupButton(false);
  };

  return (
    <div className="createGroupContainer">
      <button onClick={handleOnClick} className="styled-button">
        Create Group
      </button>
      {groupButton && (
        <form>
          <label htmlFor="GroupName">Group Name: </label>
          <input
            type="text"
            id="GroupName"
            name="GroupName"
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

export default CreateGroup;
