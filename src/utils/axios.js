import axios from "axios";

const travelSyncAPI = axios.create({
	baseURL: "https://travelsync-api-production.up.railway.app/api/",
});

export const getCoordinates = (addressStr) => {
  return travelSyncAPI
    .post(`/places/info?address=${addressStr}`)
    .then(({ data }) => {
      const coords = data.placeInfo[0].geometry.location;
      return coords;
    });
};

export const getNearbyLocations = (coords, radius, type) => {
  console.log(type, "<<< axios")
  return travelSyncAPI
    .post(
      `/places/nearby?location=${coords.lat}%2C${coords.lng}&radius=${radius}&type=${type}`
    )
    .then((locations) => {
      return locations.data.locations;
    });
};
