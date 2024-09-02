import { useEffect, useState } from "react";
import SmallMap from "./SmallMap";
import { useParams, useNavigate } from "react-router-dom";
import { getPlaceDetail } from "../../axios/index";
import OpenInGoogleMapsButton from "./OpenInGoogleMaps";
import BottomNav from "../NavBar/BottomNav";
import StarRating from "./StarRating";

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
        console.log(placeDetail);
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

  return isError ? (
    "Error fetching place detail"
  ) : isLoading ? (
    "page loading"
  ) : (
    <div className="location-detail-page">
      <div className="location-detail-container">
        <h1>
          {placeDetail.name} ({placeDetail.type})
          {placeDetail.rating && <StarRating RawRating={placeDetail.rating} />}
        </h1>
        {placeDetail.editorial_summary && (
          <p>{placeDetail.editorial_summary.overview}</p>
        )}

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
        <div className="location-detail-buttons">
          {/* <button className="styled-button" onClick={handleReturnToSearch}>
            Return
          </button> */}
          <OpenInGoogleMapsButton
            name={placeDetail.name}
            lat={placeDetail.geometry.location.lat}
            lng={placeDetail.geometry.location.lng}
          />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default LocationDetail;
