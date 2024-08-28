import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { getItineraryByGroupId, getUserGroups } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { GroupItineraryContext } from "./ItineraryContextProvider";

export default function UserGroupsList() {
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

  function handleEnterGroupItinerary(group) {
    getItineraryByGroupId(group.id).then((itinerary) => {
      setCurrentGroup(group);
      setCurrentItineraryTitle(itinerary.title);
      setCurrentItineraryId(itinerary.id);
      navigate(`/itinerary_page`);
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
