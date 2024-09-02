import { travelSyncAPI } from "./axios";

// Gets all details for one user
export const getUser = (user_id) => {
  return travelSyncAPI.get(`/users/${user_id}`).then(({ data }) => {
    return data;
  });
};

// Get all itineraries for one user
export const getUserItineraries = (user_id) => {
  return travelSyncAPI.get(`/users/${user_id}/itineraries`).then(({ data }) => {
    return data;
  });
};

// Create user (sign-up)
export const saveNewUser = (user_id, name, email) => {
  const userObj = {
    id: user_id,
    name: name,
    email: email,
  };
  return travelSyncAPI.post(`/users/`, userObj).then(({ data }) => {
    return data;
  });
};
