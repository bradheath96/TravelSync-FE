import React, { createContext, useState } from "react";

export const LocationContext = createContext();

export const LocationsContextProvider = ({ children }) => {
  const [locationsList, setLocationsList] = useState([]);

  return (
    <LocationContext.Provider value={{ locationsList, setLocationsList }}>
      {children}
    </LocationContext.Provider>
  );
};
