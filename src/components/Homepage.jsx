import { useState, useContext } from "react";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import UserGroupsList from "./UserGroupsList";
import { UserContext } from "./UserContextProvider";
import logo from "../assets/TravelSync.png";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const { userLoggedIn } = useContext(UserContext);
  const [groupUpdates, setGroupUpdates] = useState(false);

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/login");
  };

  return (
    <div className="homepage-container">
      <div className="homepage">
        <button onClick={handleOnClick} className="styled-button sign-out">
          Sign Out
        </button>
        <img className="logo" src={logo} alt="logo" />
        <h1>Hello {userLoggedIn.username}</h1>
        <div className="profileSection"></div>
        <div className="userGroupControls">
          <CreateGroup setGroupUpdates={setGroupUpdates} />
          <JoinGroup
            userLoggedIn={userLoggedIn}
            setGroupUpdates={setGroupUpdates}
          />
        </div>
        <div className="userGroupList">
          <h4>Groups:</h4>
          <UserGroupsList
            groupUpdates={groupUpdates}
            setGroupUpdates={setGroupUpdates}
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
