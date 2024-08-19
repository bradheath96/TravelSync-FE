import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import mapBoxAccessCode from "../utils/map_box_access_key";
import "../CSS/map_box.css";

mapboxgl.accessToken = mapBoxAccessCode;

const SmallMap = ({ location }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  console.log(location.lng);
  useEffect(() => {
    console.log(mapContainer);
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [location.lng, location.lat],
      zoom: 14,
    });

    new mapboxgl.Marker()
      .setLngLat([location.lng, location.lat])
      .setPopup(new mapboxgl.Popup().setHTML(`<h6 >${location.name}</h6>`))
      .addTo(map.current);
  }, [location]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "50%", height: "250px" }}
      className="map-container"
    />
  );
};

export default SmallMap;
