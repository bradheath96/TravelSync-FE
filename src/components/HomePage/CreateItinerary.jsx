export default function JoinItinerary({
  isHidden,
  setIsHidden,
  setIsJoin,
  isJoin,
}) {
  function handleClick() {
    if (isHidden) {
      setIsJoin(false);
      setIsHidden(false);
    } else {
      if (isJoin) {
        setIsJoin(false);
      } else {
        setIsHidden(true);
      }
    }
  }

  return (
    <button onClick={handleClick} className="styled-button CreateButton">
      Create Itinerary
    </button>
  );
}
