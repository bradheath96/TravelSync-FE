import { useEffect, useState } from "react";
import SmallMap from "./SmallMap";
import { useParams, useNavigate } from "react-router-dom";
import { getPlaceDetail } from "../../axios/index";

const LocationDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [placeDetail, setPlaceDetail] = useState([]);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const { place_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPlaceDetail(place_id)
      .then((placeDetail) => {
        setIsLoading(false);
        const typeWords = placeDetail.types[0].split("_").map((word) => {
          return word[0].toUpperCase() + word.slice(1);
        });
        placeDetail.type = typeWords.join(" ");
        setPlaceDetail(placeDetail);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, [place_id]);

  function handleReturnToSearch() {
    navigate(`/map`);
  }

  return isError ? (
    "Error fetching place detail"
  ) : isLoading ? (
    "page loading"
  ) : (
    <div className="location-detail-container">
      <h1>{placeDetail.name}</h1>
      <h3>{placeDetail.type}</h3>
      {placeDetail.editorial_summary && (
        <p>{placeDetail.editorial_summary.overview}</p>
      )}
      {placeDetail.rating && <h3>Rating: {placeDetail.rating}</h3>}
      {placeDetail.opening_hours && (
        <ul>
          <h4>Opening Times:</h4>
          {placeDetail.opening_hours.weekday_text.map((day) => (
            <li key={day}>{day}</li>
          ))}
        </ul>
      )}
      <SmallMap
        location={{
          name: placeDetail.name,
          "co-ords": placeDetail.geometry.location,
        }}
      />
      <button className="return-button" onClick={handleReturnToSearch}>
        Return
      </button>
    </div>
  );
};

export default LocationDetail;
