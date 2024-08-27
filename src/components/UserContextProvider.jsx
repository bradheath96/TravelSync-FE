import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const devUser = {
    username: "john_doe",
    email: "john@example.com",
    id: 1,
    created_at: "2024-08-22T10:00:00",
  };

  const [userLoggedIn, setUserLoggedIn] = useState(devUser);

  return (
    <UserContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
