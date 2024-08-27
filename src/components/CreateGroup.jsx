import { useState } from "react";
import { postGroups } from "../utils/axios";

function CreateGroup() {
  const [currentInput, setCurrentInput] = useState("");

  const [groupButton, setGroupButton] = useState(false);

  const [groupName, setGroupName] = useState("");

  const handleOnClick = (event) => {
    setGroupButton(!groupButton);
  };

  const handleChange = (event) => {
    setCurrentInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setGroupName(currentInput);
    setCurrentInput("");
    setGroupButton(false);
  };

  return (
    <div>
      <button onClick={handleOnClick}>Create Group</button>
      {groupButton &&
        <form>
          <label htmlFor="GroupName">Group Name: </label>
          <input
            type="text"
            id="GroupName"
            name="GroupName"
            onChange={handleChange}
            value={currentInput}
          />
          <button onClick={handleSubmit}>Confirm</button>
        </form>
      }
    </div>
  );
}

export default CreateGroup;