import addToMap from "../../assets/AddToMap.png";
import { useNavigate } from "react-router-dom";

export default function ReturnToMap() {
  const navigate = useNavigate();

  function handleReturnToMap() {
    navigate("/map");
  }

  return (
    <button
      className="returnToMap bottomNavButton topNavButton"
      onClick={handleReturnToMap}
    >
      <img src={addToMap} alt="a button to return to the map" />
      <p className="topNavText">Explore</p>
    </button>
  );
}
