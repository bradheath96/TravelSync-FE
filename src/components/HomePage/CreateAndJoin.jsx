import React from "react";
import JoinItinerary from "./JoinItinerary";
import { useState } from "react";
import CreateItinerary from "./CreateItinerary";
import HomepageSearchBar from "./HomepageSearchBar";

export default function CreateAndJoin({ setItineraryUpdates }) {
  const [isHidden, setIsHidden] = useState(true);
  const [isJoin, setIsJoin] = useState(false);

  return (
    <div className="createAndJoin">
      <div className="CreateAndJoinButtons">
        <JoinItinerary
          setIsHidden={setIsHidden}
          setIsJoin={setIsJoin}
          isHidden={isHidden}
        />
        <CreateItinerary
          setIsHidden={setIsHidden}
          setIsJoin={setIsJoin}
          isHidden={isHidden}
        />
      </div>
      <HomepageSearchBar
        isHidden={isHidden}
        isJoin={isJoin}
        setItineraryUpdates={setItineraryUpdates}
      />
    </div>
  );
}
