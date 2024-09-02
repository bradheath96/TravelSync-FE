import MapPage from "./components/MapPage/MapPage";
import "mapbox-gl/dist/mapbox-gl.css";
import { Route, Routes } from "react-router-dom";
import LocationDetail from "./components/MapPage/LocationDetail";
import ItineraryPage from "./components/Itinerary/ItineraryPage";
import { LocationsContextProvider } from "./components/Context/LocationsContextProvider";
import Homepage from "./components/HomePage/Homepage";
import Login from "./components/Auth/Login";
import { ItineraryContextProvider } from "./components/Context/ItineraryContextProvider";
import FilesPage from "./components/FilesPage/FilesPage";
import SignUp from "./components/Auth/SignUp";
import { useAuth } from "./components/Context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { userLoggedIn } = useAuth();

  return (
    <LocationsContextProvider>
      <ItineraryContextProvider>
        <div className="app-container">
          <Routes className="app-container">
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />

            {/* Protected Routes with Conditional Rendering */}
            <Route
              path="/"
              element={
                userLoggedIn ? <Homepage /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/map"
              element={
                userLoggedIn ? (
                  <MapPage className="map-container" />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/location/:place_id"
              element={
                userLoggedIn ? (
                  <LocationDetail />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/itinerary_page"
              element={
                userLoggedIn ? (
                  <ItineraryPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/files_page"
              element={
                userLoggedIn ? <FilesPage /> : <Navigate to="/login" replace />
              }
            />
          </Routes>
        </div>
      </ItineraryContextProvider>
    </LocationsContextProvider>
  );
}

export default App;
