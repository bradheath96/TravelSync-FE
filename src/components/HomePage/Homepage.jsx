import { useState, useContext, useEffect } from "react";
import CreateItinerary from "./CreateItinerary";
import JoinItinerary from "./JoinItinerary";
import UserItinerariesList from "./UserItinerariesList";
import logo from "../../assets/TravelSync.png";
import { useNavigate } from "react-router-dom";
import { ItineraryContext } from "../Context/ItineraryContextProvider";
import { useAuth } from "../Context/AuthContext/index";
import { doSignOut } from "../../firebase/auth";
import { getUser } from "../../axios";
import CreateAndJoin from "./CreateAndJoin";

export default function Homepage() {
  const { userLoggedIn, currentUser } = useAuth();
  const { setCurrentItinerary } = useContext(ItineraryContext);
  console.log(currentUser);
  const [name, setName] = useState("");

  const [itineraryUpdates, setItineraryUpdates] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentItinerary(null);

    getUser(currentUser.uid).then((user) => {
      setName(user.name);
    });
  }, []);

  const handleOnClick = () => {
    doSignOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="homepage-container">
      <div className="homepage">
        <button onClick={handleOnClick} className="styled-button sign-out">
          Sign Out
        </button>
        <img className="logo" src={logo} alt="logo" />
        <h1>Hello {name}</h1>
        <div className="profileSection"></div>
        <div className="userItineraryControls">
          <CreateAndJoin setItineraryUpdates={setItineraryUpdates} />
        </div>
        <div className="userItineraryList">
          <h4>Itineraries:</h4>
          <UserItinerariesList
            itineraryUpdates={itineraryUpdates}
            setItineraryUpdates={setItineraryUpdates}
          />
        </div>
      </div>
    </div>
  );
}
