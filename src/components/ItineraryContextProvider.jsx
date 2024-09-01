import React, { createContext, useEffect, useState } from "react";

export const ItineraryContext = createContext();

export const ItineraryContextProvider = ({ children }) => {
  const [currentItinerary, setCurrentItinerary] = useState(() => {
    const storedItinerary = localStorage.getItem("currentItinerary");
    return storedItinerary ? JSON.parse(storedItinerary) : null;
  });

  useEffect(() => {
    if (currentItinerary) {
      localStorage.setItem(
        "currentItinerary",
        JSON.stringify(currentItinerary)
      );
    } else {
      localStorage.removeItem("currentItinerary");
    }
  }, [currentItinerary]);

  return (
    <ItineraryContext.Provider
      value={{
        currentItinerary,
        setCurrentItinerary,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};
