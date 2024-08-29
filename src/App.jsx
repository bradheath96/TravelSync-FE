import MapPage from "./components/MapPage";
import "mapbox-gl/dist/mapbox-gl.css";
import { Route, Router, Routes } from "react-router-dom";
import LocationDetail from "./components/LocationDetail";
import ItineraryPage from "./components/ItineraryPage";
import { LocationsContextProvider } from "./components/LocationsContextProvider";
import Homepage from "./components/Homepage";
import { UserContextProvider } from "./components/UserContextProvider";
import { LoginPage } from "./components/LoginPage";
import { GroupItineraryContextProvider } from "./components/ItineraryContextProvider";
import FilesPage from "./components/FilesPage";

function App() {
  return (
    <UserContextProvider>
      <LocationsContextProvider>
        <GroupItineraryContextProvider>
          <div className="app-container">
            <Routes className="app-container">
              {/* Change this path later */}
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/map"
                element={<MapPage className="map-container" />}
              />
              <Route path="/location/:place_id" element={<LocationDetail />} />
              <Route path="/itinerary_page" element={<ItineraryPage />} />
              <Route path="/files_page" element={<FilesPage />} />
            </Routes>
          </div>
        </GroupItineraryContextProvider>
      </LocationsContextProvider>
    </UserContextProvider>
  );
}

export default App;
