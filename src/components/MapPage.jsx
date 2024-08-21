import SearchBar from "./SearchBar";
import React, { useRef, useEffect, useState } from "react";
import { getNearbyLocations, getSingleLocation } from "../utils/axios";
import LargeMap from "./LargeMap";
import TypeMenu from "./TypeMenu";

export default function MapPage() {
  const [search, setSearch] = useState("");
  const [mainLocation, setMainLocation] = useState(null);
  const [locationsList, setLocationsList] = useState([]);
  const [radius, setRadius] = useState(2000);
  const [type, setType] = useState("tourist_attraction");
  const [showNearby, setShowNearby] = useState(false);

  useEffect(() => {
    if (search !== "") {
      getSingleLocation(search).then((mainLocationData) => {
        setMainLocation(mainLocationData);
        setLocationsList(mainLocation);
      });
    }
  }, [search]);

  const handleChangeSearchModeOnClick = (event) => {
    event.preventDefault();
    setShowNearby(!showNearby);
    if (showNearby) {
      getNearbyLocations(mainLocation.geometry.locations, radius, type).then(
        (nearbyLocations) => {
          setLocationsList([locationsList[0], ...nearbyLocations]);
        }
      );
    }
  };

  const handleSliderChange = debounce((event, value) => {
    event.preventDefault();
    setRadius(value);
    getNearbyLocations(mainLocation.geometry.locations, radius, type).then(
      (nearbyLocations) => {
        setLocationsList([locationsList[0], ...nearbyLocations]);
      }
    );
  }, 1);

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
      <LargeMap locationList={locationsList} />
    </div>
  );
}
