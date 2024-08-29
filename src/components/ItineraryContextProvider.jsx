import React, { createContext, useEffect, useState } from "react";

export const GroupItineraryContext = createContext();

export const GroupItineraryContextProvider = ({ children }) => {
  const [currentItineraryId, setCurrentItineraryId] = useState(null);
  const [currentItineraryTitle, setCurrentItineraryTitle] = useState(null);
  const [currentGroup, setCurrentGroup] = useState({});

  useEffect(() => {
    setCurrentItineraryId(localStorage.getItem("currentItineraryId"));
    setCurrentGroup(JSON.parse(localStorage.getItem("currentGroup")));
    setCurrentItineraryTitle(localStorage.getItem("currentItineraryTitle"));
  }, []);

  return (
    <GroupItineraryContext.Provider
      value={{
        currentItineraryId,
        setCurrentItineraryId,
        currentGroup,
        setCurrentGroup,
        currentItineraryTitle,
        setCurrentItineraryTitle,
      }}
    >
      {children}
    </GroupItineraryContext.Provider>
  );
};
