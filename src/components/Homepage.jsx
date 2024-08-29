import { useState, useContext } from "react";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import UserGroupsList from "./UserGroupsList";
import { UserContext } from "./UserContextProvider";

function Homepage() {
  const { userLoggedIn } = useContext(UserContext);

  return (
		<div className="homepage-container">
			<div className="homepage">
				<h1>Hello {userLoggedIn.username}</h1>
				<div className="profileSection"></div>
				<div className="userGroupControls">
					<CreateGroup />
					<JoinGroup userLoggedIn={userLoggedIn} />
				</div>
				<div className="userGroupList">
					<h4>Itineraries:</h4>
					<UserGroupsList />
				</div>
			</div>
		</div>
	);
}

export default Homepage;
