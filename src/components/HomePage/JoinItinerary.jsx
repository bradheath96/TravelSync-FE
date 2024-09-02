export default function JoinItinerary({
  isHidden,
  setIsHidden,
  setIsJoin,
  isJoin,
}) {
  function handleClick() {
    if (isHidden) {
      setIsJoin(true);
      setIsHidden(false);
    } else {
      if (isJoin) {
        setIsHidden(true);
      } else {
        setIsJoin(true);
      }
    }
  }

  return (
    <button onClick={handleClick} className="styled-button JoinButton">
      Join Itinerary
    </button>
  );
}
