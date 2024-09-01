import { travelSyncAPI } from "./axios";

// Gets all details for one user
export const getUser = (userObj) => {
  return travelSyncAPI.post(`/users/user`, userObj).then((response) => {
    return response.data;
  });
};

// Get all itineraries for one user
export const getUserItineraries = (user_id) => {
  return travelSyncAPI.get(`/users/${user_id}/itineraries`).then(({ data }) => {
    return data;
  });
};

// Create user (sign-up)
export const createUser = (userObj) => {
  return travelSyncAPI.post(`/users/`, userObj).then((response) => {
    return response.data;
  });
};
