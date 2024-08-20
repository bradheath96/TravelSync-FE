import axios from "axios";

const travelSyncAPI = axios.create({
  baseURL: "https://travelsync-api.onrender.com/api",
});

export const getCoordinates = (addressStr) => {
  return travelSyncAPI
    .post(`/places/info?address=${addressStr}`)
    .then(({ data }) => {
      const coords = data.placeInfo[0].geometry.location;
      return coords;
    });
};

export const getNearbyLocations = (coords, radius) => {
  return travelSyncAPI
    .post(
      `/places/nearby?location=${coords.lat}%2C${coords.lng}&radius=${radius}`
    )
    .then((locations) => {
      return locations.data.locations;
    });
};
