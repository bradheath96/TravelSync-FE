import axios from "axios";

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
