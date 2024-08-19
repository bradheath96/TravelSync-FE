import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import mapBoxAccessCode from "../utils/map_box_access_key";
import "../CSS/map_box.css";
import { data } from "../utils/mockData";
import { Link, useNavigate } from "react-router-dom";

mapboxgl.accessToken = mapBoxAccessCode;

const MapBox = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-2.2426);
  const [lat, setLat] = useState(53.4808);
  const [zoom, setZoom] = useState(12);

  const navigate = useNavigate();

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    data.forEach((location) => {
      const popupContent = document.createElement("div");
      popupContent.innerHTML = `<div class="popup-container">
						<h4 class="popup-title">${location.name}</h4>
						<p>Rating: ${location.rating}</p>
						<button class="popup-button">
            View Details</button>
						</div>`;
      popupContent
        .querySelector(".popup-button")
        .addEventListener("click", () => {
          navigate(`/location/${location.id}`, {
            state: { location: location },
          });
        });
      new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup().setDOMContent(popupContent))
        .addTo(map.current);
    });
    console.log(map);
  }, [data, navigate]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "500px" }}
      className="map-container"
    />
  );
};

export default MapBox;
