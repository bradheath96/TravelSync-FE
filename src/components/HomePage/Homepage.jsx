import { useState, useContext, useEffect } from "react";
import CreateItinerary from "./CreateItinerary";
import JoinItinerary from "./JoinItinerary";
import UserItinerariesList from "./UserItinerariesList";
import { UserContext } from "../Context/UserContextProvider";
import logo from "../../assets/TravelSync.png";
import { useNavigate } from "react-router-dom";
import { ItineraryContext } from "../Context/ItineraryContextProvider";
import { useAuth } from "../Context/AuthContext/index";
import { doSignOut } from "../../firebase/auth";

export default function Homepage() {
  const { userLoggedIn } = useContext(UserContext);
  const { setCurrentItinerary } = useContext(ItineraryContext);
  const { currentUser } = useAuth();

  const [itineraryUpdates, setItineraryUpdates] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentItinerary(null);
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
        <h1>Hello {userLoggedIn.username}</h1>
        <div className="profileSection"></div>
        <div className="userItineraryControls">
          <CreateItinerary setItineraryUpdates={setItineraryUpdates} />
          <JoinItinerary
            userLoggedIn={userLoggedIn}
            setItineraryUpdates={setItineraryUpdates}
          />
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
