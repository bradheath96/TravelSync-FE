import MapPage from "./components/MapPage";
import "mapbox-gl/dist/mapbox-gl.css";
import { Route, Router, Routes } from "react-router-dom";
import LocationDetail from "./components/LocationDetail";
import ItineraryPage from "./components/Itinerary_Page";
import { LocationsContextProvider } from "./components/LocationsContextProvider";
import Homepage from "./components/Homepage";
import { UserContextProvider } from "./components/UserContextProvider";

function App() {
  return (
    <UserContextProvider>
      <LocationsContextProvider>
        <div className="app-container">
          <Routes className="app-container">
            {/* Change this path later */}
            <Route path="/" element={<Homepage />} />
            <Route
              path="/map"
              element={<MapPage className="map-container" />}
            />
            <Route path="/location/:place_id" element={<LocationDetail />} />
            <Route
              path="/itinerary_page/:itinerary_id"
              element={<ItineraryPage />}
            />
          </Routes>
        </div>
      </LocationsContextProvider>
    </UserContextProvider>
  );
}

export default App;
