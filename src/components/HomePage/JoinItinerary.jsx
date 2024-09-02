export default function JoinItinerary({ isHidden, setIsHidden, setIsJoin }) {
  function handleClick() {
    if (isHidden) {
      setIsJoin(true);
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  }

  return (
    <button onClick={handleClick} className="styled-button JoinButton">
      Join Itinerary
    </button>
  );
}
