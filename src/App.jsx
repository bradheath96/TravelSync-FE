import MapPage from "./components/MapPage";
import "mapbox-gl/dist/mapbox-gl.css";
import { Route, Router, Routes } from "react-router-dom";
import LocationDetail from "./components/LocationDetail";
import ItineraryPage from "./components/Itinerary_Page";
import { LocationsContextProvider } from "./components/LocationsContextProvider";

function App() {
  return (
    <LocationsContextProvider>
      <Routes>
        {/* Change this path later */}
        <Route path="/" element={<MapPage className="map-container" />} />
        <Route path="/location/:place_id" element={<LocationDetail />} />
        <Route path="itinerary_page" element={<ItineraryPage />} />
      </Routes>
    </LocationsContextProvider>
  );
}

export default App;
