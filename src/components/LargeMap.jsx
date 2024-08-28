import React, { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "mapbox-gl";
import mapBoxAccessCode from "../utils/map_box_access_key";
import "../CSS/map_box.css";
import { ContentCopySharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { GroupItineraryContext } from "./ItineraryContextProvider";
import { addLocationToItinerary } from "../utils/axios";
mapboxgl.accessToken = mapBoxAccessCode;

export default function LargeMap({ locationsList, lat, lng }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  const navigate = useNavigate();
  const { currentItineraryId } = useContext(GroupItineraryContext);
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: 12,
    });
  }, [lng, lat]);

  useEffect(() => {
    if (markers.current) {
      markers.current.forEach((marker) => marker.remove());
    }

    if (locationsList && locationsList.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();

      locationsList.forEach((location, index) => {
        const markerElement = document.createElement("div");

        const locationRating = location.rating
          ? `<p> Rating: ${location.rating} </p>`
          : "";
        markerElement.innerHTML = `
                <div class="popup-container">
                    <h4 class="popup-title">${location.name}</h4>
                    ${locationRating}
                    <button class="popup-details-button">View Details</button>
                    <button class="popup-add-button">Add</button>
                </div>
            `;

        markerElement
          .querySelector(".popup-details-button")
          .addEventListener("click", () => {
            console.log(location.place_id);
            navigate(`/location/${location.place_id}`);
          });

        markerElement
          .querySelector(".popup-add-button")
          .addEventListener("click", () => {
            const coords =
              String(location.geometry.location.lng) +
              "," +
              String(location.geometry.location.lat);

            const event = {
              name: location.name,
              place_id: location.place_id,
              coords: coords,
            };
            addLocationToItinerary(currentItineraryId, event).then(
              (response) => {
                console.log(response, "<<< Added to the itinerary");
              }
            );
          });

        const markerColor = index === 0 ? "#77d072" : "#ffa69e";

        const marker = new mapboxgl.Marker({ color: markerColor })
          .setLngLat([
            location.geometry.location.lng,
            location.geometry.location.lat,
          ])
          .setPopup(new mapboxgl.Popup().setDOMContent(markerElement))
          .addTo(map.current);

        markers.current.push(marker);

        bounds.extend([
          location.geometry.location.lng,
          location.geometry.location.lat,
        ]);
      });
      map.current.fitBounds(bounds, {
        padding: 40,
        maxZoom: 14,
        duration: 1500,
      });
    }
  }, [locationsList]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "500px" }}
      className="map-container"
    />
  );
}
