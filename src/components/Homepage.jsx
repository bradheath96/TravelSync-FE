import { useState } from "react";
import CreateGroup from "./CreateGroup";
import JoinGroup from "./JoinGroup";
import UserGroupsList from "./UserGroupsList";

function Homepage() {
  return (
    <>
      <h1>Hello from homepage</h1>
      <div className="profileSection"></div>
      <div className="userGroupControls">
        <CreateGroup />
        <JoinGroup />
      </div>
      <div className="userGroupList">
        <UserGroupsList />
      </div>
    </>
  );
}

export default Homepage;
