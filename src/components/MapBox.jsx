import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import mapBoxAccessCode from "../utils/map_box_access_key";
import "../CSS/map_box.css";
import { data, dataMockTwo } from "../utils/mockData";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

mapboxgl.accessToken = mapBoxAccessCode;

const MapBox = () => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-2.2426);
	const [lat, setLat] = useState(53.4808);
	const [zoom, setZoom] = useState(12);
	const [search, setSearch] = useState("");
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
	});

	useEffect(() => {
		handleSearch();
		filteredLocations.forEach((location) => {
			const popupContent = document.createElement("div");
			popupContent.innerHTML = `
						<div class="popup-container">
						<h4 class="popup-title">${location.name}</h4>
						<p>Rating: ${location.rating}</p>
						<button class="popup-button">View Details</button>
						</div>
					`;
			popupContent
				.querySelector(".popup-button")
				.addEventListener("click", () => {
					navigate(`/location/${location.id}`, {
						state: { location: location },
					});
				});
			new mapboxgl.Marker()
				.setLngLat([location["co-ords"].lng, location["co-ords"].lat])
				.setPopup(new mapboxgl.Popup().setDOMContent(popupContent))
				.addTo(map.current);
		});
		console.log(search, "<<< search")
	}, [search]);

	const handleSearch = () => {
		const filtered = dataMockTwo.filter((location) => {
			return location.name.toLowerCase().includes(search.toLowerCase());
		});
		setFilteredLocations(filtered);
	};
	console.log(filteredLocations, "<<< filtered")


	// 	dataMockTwo.forEach((location) => {
	// const popupContent = document.createElement("div");
	// popupContent.innerHTML = `
	// 					<div class="popup-container">
	// 					<h4 class="popup-title">${location.name}</h4>
	// 					<p>Rating: ${location.rating}</p>
	// 					<button class="popup-button">View Details</button>
	// 					</div>
	// 				`;
	// popupContent.querySelector(".popup-button").addEventListener("click", () => {
	// 	navigate(`/location/${location.id}`, {
	// 		state: { location: location },
	// 	});
	// });
	// 		new mapboxgl.Marker()
	// 			.setLngLat([location["co-ords"].lng, location["co-ords"].lat])
	// 			.setPopup(new mapboxgl.Popup().setDOMContent(popupContent))
	// 			.addTo(map.current);
	// 	});
	// }, [dataMockTwo, navigate]);

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
