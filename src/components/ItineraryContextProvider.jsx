import React, { createContext, useState } from "react";

export const GroupItineraryContext = createContext();

export const GroupItineraryContextProvider = ({ children }) => {
  const [currentItineraryId, setCurrentItineraryId] = useState(null);
  const [currentItineraryTitle, setCurrentItineraryTitle] = useState(null);

  const [currentGroup, setCurrentGroup] = useState({});

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
