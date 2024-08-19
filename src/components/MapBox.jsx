import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import mapBoxAccessCode from "../utils/map_box_access_key";
import "../CSS/map_box.css";
import { dataMockTwo } from "../utils/mockData";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

mapboxgl.accessToken = mapBoxAccessCode;

const MapBox = () => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-2.2426);
	const [lat, setLat] = useState(53.4808);
	const [zoom, setZoom] = useState(12);
	const [search, setSearch] = useState("");
	const [markers, setMarkers] = useState([]);
	const [filteredLocations, setFilteredLocations] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		if (map.current) return;
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [lng, lat],
			zoom: zoom,
		});
	}, []);

	useEffect(() => {
		markers.forEach((marker) => marker.remove());
		setMarkers([]);

		if (filteredLocations.length > 0) {
			const bounds = new mapboxgl.LngLatBounds();
			const newMarkers = filteredLocations.map((location) => {
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
						navigate(`/location/${location.id}`, {
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
	}, [filteredLocations, navigate]);

	useEffect(() => {
		if (search !== "") {
			const filtered = dataMockTwo.filter((location) =>
				location.name.toLowerCase().includes(search.toLowerCase())
			);
			setFilteredLocations(filtered);
		}
	}, [search]);

	console.log(filteredLocations);

	return (
		<div>
			<SearchBar setSearch={setSearch} />
			<div
				ref={mapContainer}
				style={{ width: "100%", height: "500px" }}
				className="map-container"
			/>
		</div>
	);
};

export default MapBox;
