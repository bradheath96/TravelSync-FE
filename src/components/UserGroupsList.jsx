import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { getItineraryByGroupId, getUserGroups } from "../utils/axios";
import ItineraryList from "./Itinerary_List";
import { useNavigate } from "react-router-dom";

export default function UserGroupsList() {
  const { userLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    console.log(userLoggedIn.id);
    getUserGroups(userLoggedIn.id)
      .then((groups) => {
        setIsLoading(false);
        setUserGroups(groups);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, []);

  function handleEnterGroupItinerary(group_id) {
    getItineraryByGroupId(group_id).then((itinerary) => {
      navigate(`/itinerary_page/${itinerary.id}`);
    });
  }

  console.log(userGroups);
  return isError ? (
    "error"
  ) : isLoading ? (
    "groups loading..."
  ) : (
    <div>
      <ul>
        {userGroups.map((group) => (
          <button onClick={() => handleEnterGroupItinerary(group.id)}>
            <li key={group.id}>
              <p>{group.name}</p>
            </li>
          </button>
        ))}
      </ul>
    </div>
  );
}
