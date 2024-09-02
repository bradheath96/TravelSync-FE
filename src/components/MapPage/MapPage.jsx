import SearchBar from "./SearchBar";
import React, { useContext, useEffect, useState } from "react";
import { getNearbyLocations, getSingleLocation } from "../../axios/index";
import LargeMap from "./LargeMap";
import TypeMenu from "./TypeMenu";
import debounce from "lodash.debounce";
import Slider from "@mui/material/Slider";
import { LocationContext } from "../Context/LocationsContextProvider";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../General/Header";
import BottomNav from "../NavBar/BottomNav";
import TopNav from "../NavBar/TopNav";

export default function MapPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { locationsList, setLocationsList } = useContext(LocationContext);
  const [mainLocation, setMainLocation] = useState(
    locationsList ? locationsList[0] : null
  );
  const [radius, setRadius] = useState(2000);
  const [type, setType] = useState("tourist_attraction");
  const [showNearby, setShowNearby] = useState(false);
  const [lng, setLng] = useState(-2.2426);
  const [lat, setLat] = useState(53.4808);

  useEffect(() => {
    if (locationsList.length < 1 && navigator.geolocation) {
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
  }, 500);

  useEffect(() => {
    if (showNearby) {
      getNearbyLocations(mainLocation.geometry.location, radius, type).then(
        (nearbyLocations) => {
          setLocationsList([locationsList[0], ...nearbyLocations]);
        }
      );
    }
  }, [radius, type, showNearby]);

  function handleGoToItineraryClick() {
    navigate(`/itinerary_page`);
  }

  return (
    <div className="mapPage">
      <TopNav />
      <HomeHeader />
      <SearchBar setSearch={setSearch} />
      <div className="nearbyAndType">
        <button
          className={showNearby ? "styled-button hide" : "styled-button"}
          onClick={handleChangeSearchModeOnClick}
          disabled={!mainLocation && locationsList.length < 1}
        >
          {showNearby ? "Hide Nearby Locations" : "Nearby Locations"}
        </button>
        {showNearby && <TypeMenu type={type} setType={setType} />}
      </div>
      {showNearby && (
        <Slider
          onChange={handleSliderChange}
          aria-label="Radius"
          value={radius}
          valueLabelDisplay="auto"
          step={100}
          marks
          min={100}
          max={3000}
        />
      )}

      <LargeMap
        className="largeMap"
        locationsList={locationsList}
        lat={lat}
        lng={lng}
      />
      <BottomNav />
    </div>
  );
}
