import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import mapBoxAccessCode from "../utils/map_box_access_key";
import "../CSS/map_box.css";
import { ContentCopySharp } from "@mui/icons-material";

mapboxgl.accessToken = mapBoxAccessCode;

export default function LargeMap({ locationsList, lat, lng }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

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

    console.log(mapboxgl);
    if (locationsList && locationsList.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();

      locationsList.forEach((location) => {
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
            navigate(`/location/${location.place_id}`);
          });

        const marker = new mapboxgl.Marker()
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
