import axios from "axios";
import ItineraryList from "../components/Itinerary_List";

const travelSyncAPI = axios.create({
  baseURL: "https://travelsync-api-production.up.railway.app/api/",
});

export const getSingleLocation = (addressStr) => {
  return travelSyncAPI
    .post(`/places/info?address=${addressStr}`)
    .then(({ data }) => {
      const singleLocationData = data.placeInfo[0];
      return singleLocationData;
    });
};

export const getPlaceDetail = (place_id) => {
  return travelSyncAPI
    .post(`/places/detail?place_id=${place_id}`)
    .then((placeDetail) => {
      return placeDetail.data.details;
    });
};

export const getNearbyLocations = (coords, radius, type) => {
  console.log(type, "<<< axios");
  return travelSyncAPI
    .post(
      `/places/nearby?location=${coords.lat}%2C${coords.lng}&radius=${radius}&type=${type}`
    )
    .then((locations) => {
      return locations.data.locations;
    });
};

export const postGroups = (groupName) => {

  console.log(groupName, "axios input")
  return travelSyncAPI.post(`/groups`, {groupName})
  .then((group) => {
    console.log(group, "<<<axios")
    return group.data.groups
  })
}

export const joinGroups = (userId, joinCode) => {
  return travelSyncAPI.post(`/group_members/join`, {
    "user_id": userId,
    "join_code": joinCode
  })
  .then((response) => {
    console.log(response.data)
    return response.data
  })
}

export const getUserGroups = (user_id) => {
  console.log(user_id);
  return travelSyncAPI.get(`/users/${user_id}/groups`).then((groups) => {
    console.log(groups);
    return groups.data;
  });
};

export const getItineraryByGroupId = (group_id) => {
  return travelSyncAPI.get(`groups/${group_id}/itinerary`).then(({ data }) => {
    return data;
  });
};

