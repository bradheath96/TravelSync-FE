import { useState } from "react";
import MapBox from "./components/MapBox";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
  return (
    <div>
      <MapBox className="map-container" />
    </div>
  );
}

export default App;
