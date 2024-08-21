import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import mapBoxAccessCode from "../utils/map_box_access_key";
import "../CSS/map_box.css";
import { dataMockTwo } from "../utils/mockData";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { getCoordinates, getNearbyLocations } from "../utils/axios";
import Slider from "@mui/material/Slider";
import debounce from "lodash.debounce";
import TypeMenu from "./TypeMenu";

mapboxgl.accessToken = mapBoxAccessCode;

const MapBox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-2.2426);
  const [lat, setLat] = useState(53.4808);
  const [search, setSearch] = useState("");
  const [mainLocation, setMainLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showNearby, setShowNearby] = useState(false);
  const [radius, setRadius] = useState(2000);
  const [type, setType] = useState("tourist_attraction");

  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLng(position.coords.longitude);
        setLat(position.coords.latitude);
      });
    }
  }, []);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: 12,
    });
  }, [lng, lat]);

  useEffect(() => {
    markers.forEach((marker) => marker.remove());
    setMarkers([]);

    if (filteredLocations.length > 0) {
      console.log(filteredLocations, "<<< FILTERED");
      const bounds = new mapboxgl.LngLatBounds();

      const locationsToDisplay = showNearby
        ? filteredLocations
        : mainLocation
        ? [mainLocation]
        : [];

      const newMarkers = locationsToDisplay.map((location) => {
        const markerElement = document.createElement("div");
        markerElement.innerHTML = `
					<div class="popup-container">
						<h4 class="popup-title">${location.name}</h4>
						<p>Rating: ${location.rating}</p>
						<button class="popup-button">View Details</button>
					</div>
				`;

        markerElement
          .querySelector(".popup-button")
          .addEventListener("click", () => {
            navigate(`/location/${location.place_id}`, {
              state: { location: location },
            });
          });

        const marker = new mapboxgl.Marker()
          .setLngLat([location["co-ords"].lng, location["co-ords"].lat])
          .setPopup(new mapboxgl.Popup().setDOMContent(markerElement))
          .addTo(map.current);

        bounds.extend([location["co-ords"].lng, location["co-ords"].lat]);

        return marker;
      });
      setMarkers(newMarkers);

      map.current.fitBounds(bounds, {
        padding: 40,
        maxZoom: 14,
        duration: 1500,
      });
    }
  }, [filteredLocations, showNearby]);

  useEffect(() => {
    if (search !== "") {
      getCoordinates(search)
        .then((coordData) => {
          return coordData;
        })
        .then((coordData) => {
          getNearbyLocations(coordData, radius, type).then((locations) => {
            setMainLocation(locations[0]);
            setFilteredLocations(locations);
          });
        });
    }
  }, [search, radius, type]);

  const handleLocationOnClick = (event) => {
    event.preventDefault();
    setShowNearby(!showNearby);
    console.log(showNearby, "<<< show locations");
  };

  const handleSliderChange = debounce((event, value) => {
    setRadius(value);
    if (!showNearby) {
      setShowNearby(true);
    }
  }, 1);

  return (
    <div>
      <SearchBar setType={setType} setSearch={setSearch} />
      <button onClick={handleLocationOnClick}>
        {showNearby ? "Hide Nearby Locations" : "Nearby Locations"}
      </button>
      {showNearby && (
        <div>
          <Slider
            onChange={handleSliderChange}
            aria-label="Radius"
            value={radius}
            valueLabelDisplay="auto"
            step={100}
            marks
            min={200}
            max={3000}
          />
          <TypeMenu type={type} setType={setType} />
        </div>
      )}
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "500px" }}
        className="map-container"
      />
    </div>
  );
};

export default MapBox;
