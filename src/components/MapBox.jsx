import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import mapBoxAccessCode from "../utils/map_box_access_key";
import "../CSS/map_box.css";
import { data } from "../utils/mockData";

mapboxgl.accessToken = mapBoxAccessCode;

const MapBox = () => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-2.2426);
	const [lat, setLat] = useState(53.4808);
	const [zoom, setZoom] = useState(12);

	useEffect(() => {
		if (map.current) return;
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [lng, lat],
			zoom: zoom,
		});

		data.forEach((location) => {
			console.log(location);
			new mapboxgl.Marker()
				.setLngLat([location.lng, location.lat])
				.setPopup(
					new mapboxgl.Popup().setHTML(
						`<div class="popup-container">
						<h4 class="popup-title">${location.name}</h4>
						<p>Rating: ${location.rating}</p>
						<button class="popup-button">Learn More</button>
						</div>`
					)
				)
				.addTo(map.current);
		});
		console.log(map);
	}, [data]);

	return (
		<div
			ref={mapContainer}
			style={{ width: "100%", height: "500px" }}
			className="map-container"
		/>
	);
};

export default MapBox;
