import MapPage from "./components/MapPage/MapPage";
import "mapbox-gl/dist/mapbox-gl.css";
import { Route, Router, Routes } from "react-router-dom";
import LocationDetail from "./components/MapPage/LocationDetail";
import ItineraryPage from "./components/Itinerary/ItineraryPage";
import { LocationsContextProvider } from "./components/Context/LocationsContextProvider";
import Homepage from "./components/HomePage/Homepage";
import { UserContextProvider } from "./components/Context/UserContextProvider";
import Login from "./components/Auth/Login";
import { ItineraryContextProvider } from "./components/Context/ItineraryContextProvider";
import FilesPage from "./components/FilesPage/FilesPage";
import { AuthProvider } from "./components/Context/AuthContext";
import SignUp from "./components/Auth/SignUp";

function App() {
  return (
    <AuthProvider>
      <UserContextProvider>
        <LocationsContextProvider>
          <ItineraryContextProvider>
            <div className="app-container">
              <Routes className="app-container">
                {/* Change this path later */}
                <Route path="/login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/" element={<Homepage />} />
                <Route
                  path="/map"
                  element={<MapPage className="map-container" />}
                />
                <Route
                  path="/location/:place_id"
                  element={<LocationDetail />}
                />
                <Route path="/itinerary_page" element={<ItineraryPage />} />
                <Route path="/files_page" element={<FilesPage />} />
              </Routes>
            </div>
          </ItineraryContextProvider>
        </LocationsContextProvider>
      </UserContextProvider>
    </AuthProvider>
  );
}

export default App;
