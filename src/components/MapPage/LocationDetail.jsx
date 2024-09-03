import { useEffect, useState } from "react";
import SmallMap from "./SmallMap";
import { useParams, useNavigate } from "react-router-dom";
import { getPlaceDetail } from "../../axios/index";
import OpenInGoogleMapsButton from "./OpenInGoogleMaps";
import BottomNav from "../NavBar/BottomNav";
import StarRating from "./StarRating";
import websiteIcon from "../../assets/websiteIcon.png";
import addressIcon from "../../assets/addressIcon.png";
import phoneIcon from "../../assets/phoneIcon.png";

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
          {console.log(placeDetail)}
          {placeDetail.name} ({placeDetail.type})
        </h1>
        {placeDetail.rating && (
          <div className="ratingAndReviews">
            <p>{placeDetail.rating}</p>
            <StarRating DecRating={placeDetail.rating} />
            <p>({placeDetail.user_ratings_total} Ratings)</p>
          </div>
        )}
        {placeDetail.editorial_summary && (
          <p>{placeDetail.editorial_summary.overview}</p>
        )}
        <div className="locationInfoSection">
          {placeDetail.opening_hours && (
            <ul>
              <h4>Opening Times:</h4>
              {placeDetail.opening_hours.weekday_text.map((day) => (
                <li key={day}>{day}</li>
              ))}
            </ul>
          )}
          <div className="locationsExtraInfo">
            {placeDetail.website && (
              <a href={placeDetail.website}>
                <img src={websiteIcon} alt="website icon" />
                Website
              </a>
            )}
            {placeDetail.formatted_address && (
              <p className="Address">
                <img src={addressIcon} alt="address icon" />
                {placeDetail.formatted_address}
              </p>
            )}
            {placeDetail.formatted_phone_number && (
              <a href={placeDetail.formatted_phone_number}>
                <img src={phoneIcon} alt="phone icon" />
                {placeDetail.formatted_phone_number}
              </a>
            )}
          </div>
        </div>
        <SmallMap
          location={{
            name: placeDetail.name,
            "co-ords": placeDetail.geometry.location,
          }}
        />
        <div className="location-detail-buttons">
          <button
            className="styled-button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Return
          </button>
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
