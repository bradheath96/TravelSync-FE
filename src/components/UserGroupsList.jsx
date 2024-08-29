import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { getItineraryByGroupId, getUserGroups } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { GroupItineraryContext } from "./ItineraryContextProvider";

export default function UserGroupsList({ groupUpdates, setGroupUpdates }) {
  const { userLoggedIn } = useContext(UserContext);
  const { setCurrentItineraryId, setCurrentGroup, setCurrentItineraryTitle } =
    useContext(GroupItineraryContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userGroups, setUserGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getUserGroups(userLoggedIn.id)
      .then((groups) => {
        setIsLoading(false);
        setUserGroups(groups);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
    setGroupUpdates(false);
  }, [groupUpdates]);

  function handleEnterGroupItinerary(group) {
    getItineraryByGroupId(group.id).then((itinerary) => {
      setCurrentGroup(group);
      setCurrentItineraryTitle(itinerary.title);
      setCurrentItineraryId(itinerary.id);

      localStorage.setItem("currentItineraryId", itinerary.id);
      localStorage.setItem("currentGroup", JSON.stringify(group));
      localStorage.setItem("currentItineraryTitle", itinerary.title);

      navigate(`/itinerary_page`);
    });
  }

  return isError ? (
    "error"
  ) : isLoading ? (
    "groups loading..."
  ) : (
    <div>
      <ul>
        {userGroups.map((group) => (
          <li key={group.id}>
            <button
              className="styled-button userGroupButton"
              onClick={() => handleEnterGroupItinerary(group)}
            >
              <p>{group.name}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
