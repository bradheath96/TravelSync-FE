import SearchBar from "./SearchBar";
import React, { useRef, useEffect, useState } from "react";
import { getNearbyLocations, getSingleLocation } from "../utils/axios";
import LargeMap from "./LargeMap";
import TypeMenu from "./TypeMenu";
import debounce from "lodash.debounce";
import Slider from "@mui/material/Slider";

export default function MapPage() {
  const [search, setSearch] = useState("");
  const [mainLocation, setMainLocation] = useState(null);
  const [locationsList, setLocationsList] = useState([]);
  const [radius, setRadius] = useState(2000);
  const [type, setType] = useState("tourist_attraction");
  const [showNearby, setShowNearby] = useState(false);
  const [lng, setLng] = useState(-2.2426);
  const [lat, setLat] = useState(53.4808);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLng(position.coords.longitude);
        setLat(position.coords.latitude);
      });
    }
  }, []);

  useEffect(() => {
    if (search !== "") {
      setShowNearby(false);
      getSingleLocation(search).then((mainLocationData) => {
        setMainLocation(mainLocationData);
        setLocationsList([mainLocationData]);
      });
    }
  }, [search]);

  const handleChangeSearchModeOnClick = (event) => {
    event.preventDefault();
    setShowNearby(!showNearby);
    if (showNearby) {
      setLocationsList([mainLocation]);
    }
  };

  const handleSliderChange = debounce((event, value) => {
    event.preventDefault();
    setRadius(value);
  }, 1);

  useEffect(() => {
    if (showNearby) {
      getNearbyLocations(mainLocation.geometry.location, radius, type).then(
        (nearbyLocations) => {
          setLocationsList([locationsList[0], ...nearbyLocations]);
          console.log(locationsList);
        }
      );
    }
  }, [radius, type, showNearby]);

  return (
    <div>
      <SearchBar setSearch={setSearch} />
      <button onClick={handleChangeSearchModeOnClick} disabled={!mainLocation}>
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
      <LargeMap locationsList={locationsList} lat={lat} lng={lng} />
    </div>
  );
}
