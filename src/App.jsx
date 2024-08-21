import MapPage from "./components/MapPage";
import "mapbox-gl/dist/mapbox-gl.css";
import { Route, Router, Routes } from "react-router-dom";
import LocationDetail from "./components/LocationDetail";

function App() {
  return (
    <Routes>
      {/* Change this path later */}
      <Route path="/" element={<MapPage className="map-container" />} />
      <Route path="/location/:id" element={<LocationDetail />} />
    </Routes>
  );
}

export default App;
