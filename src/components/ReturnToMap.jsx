import addToMap from "../assets/addToMap.png";
import { useNavigate } from "react-router-dom";

export default function ReturnToMap() {
  const navigate = useNavigate();

  function handleReturnToMap() {
    navigate("/map");
  }

  return (
    <div>
      <button className="returnToMap" onClick={handleReturnToMap}>
        <img src={addToMap} alt="a button to return to the map" />
      </button>
    </div>
  );
}
