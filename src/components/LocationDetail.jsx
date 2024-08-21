import { useEffect, useState } from "react";
import SmallMap from "./SmallMap";

import { useParams } from "react-router-dom";
import { getPlaceDetail } from "../utils/axios";

const LocationDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [placeDetail, setPlaceDetail] = useState([]);
  const [isError, setIsError] = useState(false);

  const place_id = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPlaceDetail(place_id)
      .then((placeDetail) => {
        setIsLoading(false);
        setPlaceDetail(placeDetail);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, [place_id]);

  return isError ? (
    "Error fetching place detail"
  ) : isLoading ? (
    "page loading"
  ) : (
    <div>
      <h1>{placeDetail.name}</h1>
      <p>{placeDetail.description}</p>
      <h3>Rating: {placeDetail.rating}</h3>
      <h4>Opening Times: {placeDetail.openingTimes}</h4>
      <SmallMap
        location={{
          name: placeDetail.name,
          "co-ords": placeDetail.geometry.location,
        }}
      />
    </div>
  );
};

export default LocationDetail;
